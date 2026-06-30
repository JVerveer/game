import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import { GAME_MAPS } from "../../../../data/maps";
import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";
import { buildingCrestForKind, doorForBuildingAsset } from "../../../../data/cityMaps/mapAsset";
import type { EditedBuildingsByMap, EditedRowsByMap, EditorSelection } from "../hooks/useEditorState";
import {
  assignBuildingAsset,
  readSelectedBuildingAssetId,
} from "../../../assets/limezu/BuildingPlacementRuntime";
import {
  effectiveBuildingPrefabFootprint,
  firstAssetIdFromPrefab,
  selectedBuildingPrefab,
} from "../../../assets/limezu/BuildingPrefabRuntime";

const UNIQUE_BUILDING_KINDS = new Set<EditorBuildingKind>(["shop", "healing", "station"]);

export function useBuildingPlacement({
  mapIdRef,
  editedRowsByMapRef,
  editedBuildingsByMapRef,
  editorBuildingKindRef,
  editorBuildingColorRef,
  editorBuildingWRef,
  editorBuildingHRef,
  setEditedBuildingsByMap,
  setEditorSelection,
  buildingsForMap,
}: {
  mapIdRef: MutableRefObject<GameMapId>;
  editedRowsByMapRef: MutableRefObject<EditedRowsByMap>;
  editedBuildingsByMapRef: MutableRefObject<EditedBuildingsByMap>;
  editorBuildingKindRef: MutableRefObject<EditorBuildingKind>;
  editorBuildingColorRef: MutableRefObject<EditorBuildingColor>;
  editorBuildingWRef: MutableRefObject<number>;
  editorBuildingHRef: MutableRefObject<number>;
  setEditedBuildingsByMap: Dispatch<SetStateAction<EditedBuildingsByMap>>;
  setEditorSelection: (selection: EditorSelection) => void;
  buildingsForMap: (id: GameMapId) => EditorBuildingAsset[];
}) {
  const duplicateSelectedBuilding = (building: EditorBuildingAsset) => {
    const id = mapIdRef.current;
    const clone: EditorBuildingAsset = {
      ...building,
      id: `${id}-building-${Date.now()}-copy`,
      x: building.x + 1,
      y: building.y + 1,
    };

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const withoutUnique = UNIQUE_BUILDING_KINDS.has(clone.kind)
        ? current.filter(item => item.kind !== clone.kind)
        : current;
      const next = [...withoutUnique, clone];
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    const prefab = selectedBuildingPrefab();
    const selectedAssetId = prefab ? firstAssetIdFromPrefab(prefab) : readSelectedBuildingAssetId();

    if (selectedAssetId || prefab) {
      assignBuildingAsset({
        buildingId: clone.id,
        prefabId: prefab?.id,
        assetId: selectedAssetId,
        x: clone.x,
        y: clone.y,
        w: clone.w,
        h: clone.h,
      });
    }

    setEditorSelection({ kind: "building", id: clone.id });
  };

  const placeEditorBuilding = (x: number, y: number) => {
    const id = mapIdRef.current;
    const prefab = selectedBuildingPrefab();
    const prefabFootprint = prefab ? effectiveBuildingPrefabFootprint(prefab) : undefined;

    const kind = prefab?.kind ?? editorBuildingKindRef.current;
    const building: EditorBuildingAsset = {
      id: `${id}-building-${Date.now()}`,
      x,
      y,
      w: Math.max(1, prefabFootprint?.width ?? editorBuildingWRef.current),
      h: Math.max(1, prefabFootprint?.height ?? editorBuildingHRef.current),
      kind,
      color: editorBuildingColorRef.current,
      crest: buildingCrestForKind(kind),
    };

    const currentBuildings = editedBuildingsByMapRef.current[id] ?? buildingsForMap(id).map(item => ({ ...item }));
    const door = doorForBuildingAsset(building);
    const mapRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows;
    const mapHeight = mapRows.length;
    const mapWidth = mapRows[0]?.length ?? 0;
    const outOfBounds = building.x < 0 || building.y < 0 || building.x + building.w > mapWidth || building.y + building.h > mapHeight;
    const conflicts = outOfBounds || currentBuildings.some(item => {
      const itemDoor = doorForBuildingAsset(item);
      const overlaps =
        building.x < item.x + item.w &&
        building.x + building.w > item.x &&
        building.y < item.y + item.h &&
        building.y + building.h > item.y;
      const sameUniqueKind = UNIQUE_BUILDING_KINDS.has(kind) && item.kind === kind;
      return overlaps || sameUniqueKind || (itemDoor.x === door.x && itemDoor.y === door.y);
    });

    if (conflicts) return false;

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? currentBuildings;
      const next = [...current, building];
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    const selectedAssetId = prefab ? firstAssetIdFromPrefab(prefab) : readSelectedBuildingAssetId();

    if (selectedAssetId || prefab) {
      assignBuildingAsset({
        buildingId: building.id,
        prefabId: prefab?.id,
        assetId: selectedAssetId,
        x: building.x,
        y: building.y,
        w: building.w,
        h: building.h,
      });
    }

    return true;
  };

  return {
    duplicateSelectedBuilding,
    placeEditorBuilding,
  };
}
