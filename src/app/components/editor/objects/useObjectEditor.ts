import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import type { EditedObjectsByMap, EditorSelection } from "../hooks/useEditorState";

export function useObjectEditor({
  mapIdRef,
  editedObjectsByMapRef,
  setEditedObjectsByMap,
  setDraggedObjectCoord,
  setEditorSelection,
  objectsForMap,
  draggedObjectCoordRef,
}: {
  mapIdRef: MutableRefObject<GameMapId>;
  editedObjectsByMapRef: MutableRefObject<EditedObjectsByMap>;
  setEditedObjectsByMap: Dispatch<SetStateAction<EditedObjectsByMap>>;
  setDraggedObjectCoord: (coord: string | null) => void;
  setEditorSelection: (selection: EditorSelection) => void;
  objectsForMap: (id: GameMapId) => Record<string, string>;
  draggedObjectCoordRef: MutableRefObject<string | null>;
}) {
  const moveEditorObjectTo = (fromCoord: string, x: number, y: number) => {
    const id = mapIdRef.current;
    const toCoord = `${x},${y}`;
    if (fromCoord === toCoord) return;

    setEditedObjectsByMap(prev => {
      const base = prev[id] ?? { ...objectsForMap(id) };
      const obj = base[fromCoord];
      if (!obj) return prev;

      const next = { ...base };
      delete next[fromCoord];
      next[toCoord] = obj;
      editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    setDraggedObjectCoord(toCoord);
    draggedObjectCoordRef.current = toCoord;
    setEditorSelection({ kind: "object", coord: toCoord });
  };

  const duplicateSelectedObject = (coord: string) => {
    const id = mapIdRef.current;
    const [x, y] = coord.split(",").map(Number);
    const nextCoord = `${x + 1},${y}`;

    setEditedObjectsByMap(prev => {
      const base = prev[id] ?? { ...objectsForMap(id) };
      const obj = base[coord];
      if (!obj) return prev;
      const next = { ...base, [nextCoord]: obj };
      editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    setEditorSelection({ kind: "object", coord: nextCoord });
  };

  const deleteSelectedObject = (coord: string) => {
    const id = mapIdRef.current;

    setEditedObjectsByMap(prev => {
      const base = prev[id] ?? { ...objectsForMap(id) };
      const next = { ...base };
      delete next[coord];
      editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    if (draggedObjectCoordRef.current === coord) {
      draggedObjectCoordRef.current = null;
      setDraggedObjectCoord(null);
    }

    setEditorSelection(null);
  };

  return {
    deleteSelectedObject,
    duplicateSelectedObject,
    moveEditorObjectTo,
  };
}
