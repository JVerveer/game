import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import { GAME_MAPS } from "../../../../data/maps";
import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";
import { buildingCrestForKind, doorForBuildingAsset } from "../../../../data/cityMaps/mapAsset";
import type { EditedBuildingsByMap, EditedRowsByMap, EditorSelection } from "../hooks/useEditorState";
import { clearBuildingFootprintsFromRows } from "./buildingHelpers";
import { assignBuildingAsset, readSelectedBuildingAssetId } from "../../../assets/limezu/BuildingPlacementRuntime";
import { selectedBuildingPrefab } from "../../../assets/limezu/BuildingPrefabRuntime";

const UNIQUE_BUILDING_KINDS = new Set<EditorBuildingKind>(["shop", "healing", "station"]);

export function useBuildingPlacement({
  mapIdRef,
  editedRowsByMapRef,
  editedBuildingsByMapRef,
  editorBuildingKindRef,
  editorBuildingColorRef,
  editorBuildingWRef,
  editorBuildingHRef,
  setEditedRowsByMap,
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
  setEditedRowsByMap: Dispatch<SetStateAction<EditedRowsByMap>>;
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

    const selectedAssetId = readSelectedBuildingAssetId();
    if (selectedAssetId) {
      assignBuildingAsset({
        buildingId: clone.id,
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

    const kind = prefab?.kind ?? editorBuildingKindRef.current;
    const building: EditorBuildingAsset = {
      id: `${id}-building-${Date.now()}`,
      x,
      y,
      w: Math.max(1, prefab?.w ?? editorBuildingWRef.current),
      h: Math.max(1, prefab?.h ?? editorBuildingHRef.current),
      kind,
      color: prefab?.color ?? editorBuildingColorRef.current,
      crest: buildingCrestForKind(kind),
    };

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id).map(item => ({ ...item }));
      const door = doorForBuildingAsset(building);
      const removedBuildings: EditorBuildingAsset[] = [];
      const withoutOverlap = current.filter(item => {
        const itemDoor = doorForBuildingAsset(item);
        const overlaps =
          building.x < item.x + item.w &&
          building.x + building.w > item.x &&
          building.y < item.y + item.h &&
          building.y + building.h > item.y;
        const sameUniqueKind = UNIQUE_BUILDING_KINDS.has(kind) && item.kind === kind;
        const shouldRemove = overlaps || sameUniqueKind || (itemDoor.x === door.x && itemDoor.y === door.y);
        if (shouldRemove) removedBuildings.push(item);
        return !shouldRemove;
      });

      if (removedBuildings.length > 0) {
        const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
        const nextRows = clearBuildingFootprintsFromRows(baseRows, removedBuildings);
        editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: nextRows };
        setEditedRowsByMap(rowsPrev => ({ ...rowsPrev, [id]: nextRows }));
      }

      const next = [...withoutOverlap, building];
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    const selectedAssetId = prefab?.assetId ?? readSelectedBuildingAssetId();
    if (selectedAssetId) {
      assignBuildingAsset({
        buildingId: building.id,
        assetId: selectedAssetId,
        x: building.x,
        y: building.y,
        w: building.w,
        h: building.h,
      });
    }
  };

  return {
    duplicateSelectedBuilding,
    placeEditorBuilding,
  };
}
