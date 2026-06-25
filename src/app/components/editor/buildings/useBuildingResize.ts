import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import { GAME_MAPS } from "../../../../data/maps";
import type { EditorBuildingAsset } from "../../../../data/cityMaps/mapAsset";
import type { EditedBuildingsByMap, EditedRowsByMap } from "../hooks/useEditorState";
import { clearBuildingFootprintFromRows } from "./buildingHelpers";

export function useBuildingResize({
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
  const resizeEditorBuildingTo = (buildingId: string, x: number, y: number) => {
    const id = mapIdRef.current;
    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const currentBuilding = current.find(building => building.id === buildingId);
      if (!currentBuilding) return prev;

      // Clear old footprint first, then re-apply the resized building through
      // displayRowsWithBuildings / rowsForMap. This prevents stale blocked tiles
      // when the building is made smaller.
      const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
      const cleanedRows = clearBuildingFootprintFromRows(baseRows, currentBuilding);
      editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: cleanedRows };
      setEditedRowsByMap(rowsPrev => ({ ...rowsPrev, [id]: cleanedRows }));

      const nextW = Math.max(3, x - currentBuilding.x + 1);
      const nextH = Math.max(3, y - currentBuilding.y + 1);
      const next = current.map(building => building.id === buildingId ? { ...building, w: nextW, h: nextH } : building);

      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });
  };

  return {
    resizeEditorBuildingTo,
  };
}
