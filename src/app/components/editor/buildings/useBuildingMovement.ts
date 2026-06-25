import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import { GAME_MAPS } from "../../../../data/maps";
import type { EditorBuildingAsset } from "../../../../data/cityMaps/mapAsset";
import type { EditedBuildingsByMap, EditedRowsByMap } from "../hooks/useEditorState";
import { clearBuildingFootprintFromRows } from "./buildingHelpers";

export function useBuildingMovement({
  mapIdRef,
  editedRowsByMapRef,
  editedBuildingsByMapRef,
  setEditedRowsByMap,
  setEditedBuildingsByMap,
  buildingsForMap,
}: {
  mapIdRef: MutableRefObject<GameMapId>;
  editedRowsByMapRef: MutableRefObject<EditedRowsByMap>;
  editedBuildingsByMapRef: MutableRefObject<EditedBuildingsByMap>;
  setEditedRowsByMap: Dispatch<SetStateAction<EditedRowsByMap>>;
  setEditedBuildingsByMap: Dispatch<SetStateAction<EditedBuildingsByMap>>;
  buildingsForMap: (id: GameMapId) => EditorBuildingAsset[];
}) {
  const clearBuildingFromEditedRows = (id: GameMapId, building: EditorBuildingAsset) => {
    const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
    const nextRows = clearBuildingFootprintFromRows(baseRows, building);
    editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: nextRows };
    setEditedRowsByMap(prev => ({ ...prev, [id]: nextRows }));
    return nextRows;
  };

  const moveEditorBuildingTo = (buildingId: string, x: number, y: number) => {
    const id = mapIdRef.current;

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const currentBuilding = current.find(building => building.id === buildingId);
      if (!currentBuilding) return prev;

      // Moving a legacy/procedural building must also clean its old terrain
      // footprint. Otherwise the old blue/red/purple building tiles remain
      // blocked and can still look like terrain.
      const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
      const cleanedRows = clearBuildingFootprintFromRows(baseRows, currentBuilding);
      editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: cleanedRows };
      setEditedRowsByMap(rowsPrev => ({ ...rowsPrev, [id]: cleanedRows }));

      const movedBuilding = { ...currentBuilding, x, y };
      const next = current.map(building => building.id === buildingId ? movedBuilding : building);

      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });
  };

  return {
    clearBuildingFromEditedRows,
    moveEditorBuildingTo,
  };
}
