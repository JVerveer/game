import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import type { EditorBuildingAsset } from "../../../../data/cityMaps/mapAsset";
import type {
  EditedBuildingsByMap,
  EditorSelection,
  RemovedBuildingIdsByMap,
} from "../hooks/useEditorState";

export function useBuildingDeletion({
  mapIdRef,
  removedBuildingIdsByMapRef,
  editedBuildingsByMapRef,
  setRemovedBuildingIdsByMap,
  setEditedBuildingsByMap,
  setEditorSelection,
  clearBuildingFromEditedRows,
  buildingsForMap,
}: {
  mapIdRef: MutableRefObject<GameMapId>;
  removedBuildingIdsByMapRef: MutableRefObject<RemovedBuildingIdsByMap>;
  editedBuildingsByMapRef: MutableRefObject<EditedBuildingsByMap>;
  setRemovedBuildingIdsByMap: Dispatch<SetStateAction<RemovedBuildingIdsByMap>>;
  setEditedBuildingsByMap: Dispatch<SetStateAction<EditedBuildingsByMap>>;
  setEditorSelection: (selection: EditorSelection) => void;
  clearBuildingFromEditedRows: (id: GameMapId, building: EditorBuildingAsset) => string[][];
  buildingsForMap: (id: GameMapId) => EditorBuildingAsset[];
}) {
  const removeEditorBuilding = (building: EditorBuildingAsset) => {
    const id = mapIdRef.current;

    clearBuildingFromEditedRows(id, building);

    setRemovedBuildingIdsByMap(prev => {
      const nextSet = new Set(prev[id] ?? []);
      nextSet.add(building.id);
      const next = { ...prev, [id]: nextSet };
      removedBuildingIdsByMapRef.current = next;
      return next;
    });

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const nextBuildings = current.filter(item => item.id !== building.id);
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: nextBuildings };
      return { ...prev, [id]: nextBuildings };
    });

    setEditorSelection(null);
  };

  return {
    removeEditorBuilding,
  };
}
