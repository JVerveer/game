import { useRef, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import type { MovingNpc } from "../../../../data/npcs";
import type { EditorBuildingAsset } from "../../../../data/cityMaps/mapAsset";
import type { EditedObjectsByMap, EditedRowsByMap, EditorMode, EditorSelection, ObjectEditAction } from "../hooks/useEditorState";
import { getSelectedTerrainAssetId, paintTerrainAssetAt } from "./TerrainLibrary";
import { eraseLimeZuObjectAt, getSelectedLimeZuObjectAssetId, paintLimeZuObjectAt } from "../objects/ObjectLibrary";

const isSelectEditorMode = (mode: EditorMode) => mode === "select";

export function useTerrainPainter({
  mapIdRef,
  editorModeRef,
  isEditorDraggingRef,
  resizeBuildingIdRef,
  draggedBuildingIdRef,
  draggedObjectCoordRef,
  draggedNpcIdRef,
  objectEditActionRef,
  editorObjectIdRef,
  editorTileRef,
  npcsRef,
  setEditorSelection,
  setDraggedNpcId,
  setDraggedObjectCoord,
  setDraggedBuildingId,
  setResizeBuildingId,
  buildingsForMap,
  objectsForMap,
  rowsForMap,
  buildingAtCoord,
  resizeEditorBuildingTo,
  moveEditorBuildingTo,
  moveEditorObjectTo,
  moveSelectedNpcTo,
  paintNpcEditorTile,
  placeEditorBuilding,
  setEditedObjectsByMap,
  setEditedRowsByMap,
}: {
  mapIdRef: MutableRefObject<GameMapId>;
  editorModeRef: MutableRefObject<EditorMode>;
  isEditorDraggingRef: MutableRefObject<boolean>;
  resizeBuildingIdRef: MutableRefObject<string | null>;
  draggedBuildingIdRef: MutableRefObject<string | null>;
  draggedObjectCoordRef: MutableRefObject<string | null>;
  draggedNpcIdRef: MutableRefObject<string | null>;
  objectEditActionRef: MutableRefObject<ObjectEditAction>;
  editorObjectIdRef: MutableRefObject<string>;
  editorTileRef: MutableRefObject<string>;
  npcsRef: MutableRefObject<MovingNpc[]>;
  setEditorSelection: (selection: EditorSelection) => void;
  setDraggedNpcId: (id: string | null) => void;
  setDraggedObjectCoord: (coord: string | null) => void;
  setDraggedBuildingId: (id: string | null) => void;
  setResizeBuildingId: (id: string | null) => void;
  buildingsForMap: (id: GameMapId) => EditorBuildingAsset[];
  objectsForMap: (id: GameMapId) => Record<string, string>;
  rowsForMap: (id: GameMapId) => string[][];
  buildingAtCoord: (buildings: EditorBuildingAsset[], x: number, y: number) => EditorBuildingAsset | undefined;
  resizeEditorBuildingTo: (buildingId: string, x: number, y: number) => void;
  moveEditorBuildingTo: (buildingId: string, x: number, y: number) => void;
  moveEditorObjectTo: (fromCoord: string, x: number, y: number) => void;
  moveSelectedNpcTo: (x: number, y: number) => void;
  paintNpcEditorTile: (x: number, y: number) => void;
  placeEditorBuilding: (x: number, y: number) => void;
  setEditedObjectsByMap: Dispatch<SetStateAction<EditedObjectsByMap>>;
  setEditedRowsByMap: Dispatch<SetStateAction<EditedRowsByMap>>;
}) {
  const lastPaintedCoordRef = useRef<string | null>(null);

  const updateEditedTerrainTile = (id: GameMapId, x: number, y: number, tile: string) => {
    setEditedRowsByMap(prev => {
      const base = prev[id] ?? rowsForMap(id);
      if (base[y]?.[x] === undefined) return prev;
      if (base[y][x] === tile && prev[id]) return prev;

      const next = base.map((row, rowIndex) => rowIndex === y ? [...row] : row);
      next[y][x] = tile;
      return { ...prev, [id]: next };
    });
  };

  const transformDragTo = (x: number, y: number) => {
    if (!isSelectEditorMode(editorModeRef.current)) return false;

    if (resizeBuildingIdRef.current) {
      resizeEditorBuildingTo(resizeBuildingIdRef.current, x, y);
      return true;
    }

    if (draggedBuildingIdRef.current) {
      moveEditorBuildingTo(draggedBuildingIdRef.current, x, y);
      return true;
    }

    if (draggedObjectCoordRef.current) {
      moveEditorObjectTo(draggedObjectCoordRef.current, x, y);
      return true;
    }

    if (draggedNpcIdRef.current) {
      moveSelectedNpcTo(x, y);
      return true;
    }

    return false;
  };

  const paintEditorTile = (x: number, y: number) => {
    const id = mapIdRef.current;
    const coord = `${x},${y}`;
    const paintKey = `${id}:${editorModeRef.current}:${objectEditActionRef.current}:${editorTileRef.current}:${editorObjectIdRef.current}:${coord}`;

    if (isEditorDraggingRef.current && lastPaintedCoordRef.current === paintKey) {
      return;
    }
    lastPaintedCoordRef.current = paintKey;

    if (isSelectEditorMode(editorModeRef.current) && isEditorDraggingRef.current && transformDragTo(x, y)) {
      return;
    }

    if (isSelectEditorMode(editorModeRef.current)) {
      const npc = npcsRef.current.find(item => item.mapId === id && item.x === x && item.y === y);
      if (npc) {
        setEditorSelection({ kind: "npc", id: npc.id });
        setDraggedNpcId(npc.id);
        draggedNpcIdRef.current = npc.id;
        return;
      }

      // Objects are only 1 tile, so they should win over large building
      // footprints when an object sits on/near a building.
      if (objectsForMap(id)[coord]) {
        setEditorSelection({ kind: "object", coord });
        setDraggedObjectCoord(coord);
        draggedObjectCoordRef.current = coord;
        return;
      }

      const building = buildingAtCoord(buildingsForMap(id), x, y);
      if (building) {
        const isResizeHandle = x === building.x + building.w - 1 && y === building.y + building.h - 1;
        setEditorSelection({ kind: "building", id: building.id });
        setDraggedBuildingId(null);
        draggedBuildingIdRef.current = null;
        setResizeBuildingId(null);
        resizeBuildingIdRef.current = null;

        if (isResizeHandle) {
          setResizeBuildingId(building.id);
          resizeBuildingIdRef.current = building.id;
        } else {
          setDraggedBuildingId(building.id);
          draggedBuildingIdRef.current = building.id;
        }
        return;
      }

      setEditorSelection({ kind: "tile", x, y });
      return;
    }

    if (editorModeRef.current === "npcs") {
      paintNpcEditorTile(x, y);
      return;
    }

    if (editorModeRef.current === "buildings") {
      placeEditorBuilding(x, y);
      return;
    }

    if (editorModeRef.current === "objects") {
      if (objectEditActionRef.current === "erase") {
        eraseLimeZuObjectAt(x, y);
      } else {
        const selectedObjectAssetId = getSelectedLimeZuObjectAssetId();
        if (selectedObjectAssetId) {
          paintLimeZuObjectAt(x, y, selectedObjectAssetId);
        }
      }

      // Keep old object map untouched for compatibility. LimeZu object
      // placements are stored separately per coordinate.
      setEditedObjectsByMap(prev => ({ ...prev }));
      return;
    }

    if (editorModeRef.current === "terrain") {
      const selectedTerrainAssetId = getSelectedTerrainAssetId();
      if (selectedTerrainAssetId) {
        paintTerrainAssetAt(x, y, selectedTerrainAssetId);
      }

      // Keep the underlying map compatible with the old one-character terrain system.
      // Direct LimeZu terrain is stored separately per coordinate.
      updateEditedTerrainTile(id, x, y, "G");
      return;
    }


    updateEditedTerrainTile(id, x, y, editorTileRef.current);
  };

  return {
    paintEditorTile,
    transformDragTo,
  };
}
