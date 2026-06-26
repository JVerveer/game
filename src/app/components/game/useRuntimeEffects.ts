import { useEffect } from "react";
import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../data/maps";
import { WALKABLE_TILES as WALK, GAME_MAPS } from "../../../data/maps";
import type { MovingNpc } from "../../../data/npcs";
import type { EditorBuildingAsset } from "../../../data/cityMaps/mapAsset";
import type { EditorSelection } from "../editor/hooks/useEditorState";

export function useRuntimeEffects({
  trainOpenRef,
  handleTrainKey,
  terrainEditorOpenRef,
  editorSelectionRef,
  buildingsForMap,
  mapIdRef,
  duplicateSelectedBuilding,
  duplicateSelectedObject,
  duplicateSelectedNpc,
  removeEditorBuilding,
  deleteSelectedObject,
  deleteSelectedNpc,
  setTerrainEditorOpen,
  openTerrainEditor,
  setPaused,
  doInteract,
  doMove,
  dlgRef,
  pausedRef,
  battleRef,
  setNpcs,
  rowsForMap,
  generatedNpcAt,
  posRef,
  viewRef,
  setViewSize,
  isEditorDraggingRef,
  setIsEditorDragging,
  draggedNpcIdRef,
  draggedBuildingIdRef,
  draggedObjectCoordRef,
  resizeBuildingIdRef,
  setDraggedNpcId,
  setDraggedBuildingId,
  setDraggedObjectCoord,
  setResizeBuildingId,
}: {
  trainOpenRef: MutableRefObject<boolean>;
  handleTrainKey: (key: string) => void;
  terrainEditorOpenRef: MutableRefObject<boolean>;
  editorSelectionRef: MutableRefObject<EditorSelection>;
  buildingsForMap: (id: GameMapId) => EditorBuildingAsset[];
  mapIdRef: MutableRefObject<GameMapId>;
  duplicateSelectedBuilding: (building: EditorBuildingAsset) => void;
  duplicateSelectedObject: (coord: string) => void;
  duplicateSelectedNpc: (npcId: string) => void;
  removeEditorBuilding: (building: EditorBuildingAsset) => void;
  deleteSelectedObject: (coord: string) => void;
  deleteSelectedNpc: (npcId: string) => void;
  setTerrainEditorOpen: Dispatch<SetStateAction<boolean>>;
  openTerrainEditor: () => void;
  setPaused: Dispatch<SetStateAction<boolean>>;
  doInteract: () => void;
  doMove: (dx: number, dy: number, dir: "up" | "down" | "left" | "right", isRepeat?: boolean) => void;
  dlgRef: MutableRefObject<unknown>;
  pausedRef: MutableRefObject<boolean>;
  battleRef: MutableRefObject<unknown>;
  setNpcs: Dispatch<SetStateAction<MovingNpc[]>>;
  rowsForMap: (id: GameMapId) => string[][];
  generatedNpcAt: (id: GameMapId, x: number, y: number) => unknown;
  posRef: MutableRefObject<{ x: number; y: number }>;
  viewRef: RefObject<HTMLDivElement>;
  setViewSize: Dispatch<SetStateAction<{ w: number; h: number }>>;
  isEditorDraggingRef: MutableRefObject<boolean>;
  setIsEditorDragging: Dispatch<SetStateAction<boolean>>;
  draggedNpcIdRef: MutableRefObject<string | null>;
  draggedBuildingIdRef: MutableRefObject<string | null>;
  draggedObjectCoordRef: MutableRefObject<string | null>;
  resizeBuildingIdRef: MutableRefObject<string | null>;
  setDraggedNpcId: Dispatch<SetStateAction<string | null>>;
  setDraggedBuildingId: Dispatch<SetStateAction<string | null>>;
  setDraggedObjectCoord: Dispatch<SetStateAction<string | null>>;
  setResizeBuildingId: Dispatch<SetStateAction<string | null>>;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (trainOpenRef.current) {
        e.preventDefault();
        handleTrainKey(e.key);
        return;
      }
      if (terrainEditorOpenRef.current) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
          e.preventDefault();
          const selection = editorSelectionRef.current;
          if (selection?.kind === "building") {
            const building = buildingsForMap(mapIdRef.current).find(item => item.id === selection.id);
            if (building) duplicateSelectedBuilding(building);
          }
          if (selection?.kind === "object") duplicateSelectedObject(selection.coord);
          if (selection?.kind === "npc") {
            duplicateSelectedNpc(selection.id);
          }
          return;
        }
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          const selection = editorSelectionRef.current;
          if (selection?.kind === "building") {
            const building = buildingsForMap(mapIdRef.current).find(item => item.id === selection.id);
            if (building) removeEditorBuilding(building);
          }
          if (selection?.kind === "object") {
            deleteSelectedObject(selection.coord);
          }
          if (selection?.kind === "npc") {
            deleteSelectedNpc(selection.id);
          }
          return;
        }
        if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
          e.preventDefault();
          setTerrainEditorOpen(false);
        }
        return;
      }
      if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        openTerrainEditor();
        return;
      }
      if (e.key === "Escape") { setPaused(p => !p); return; }
      if (e.key === " " || e.key === "z" || e.key === "Z" || e.key === "Enter") {
        e.preventDefault(); doInteract(); return;
      }
      if (e.key === "ArrowUp"    || e.key === "w" || e.key === "W") { e.preventDefault(); doMove(0, -1, "up", e.repeat); }
      if (e.key === "ArrowDown"  || e.key === "s" || e.key === "S") { e.preventDefault(); doMove(0, 1, "down", e.repeat); }
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") { e.preventDefault(); doMove(-1, 0, "left", e.repeat); }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { e.preventDefault(); doMove(1, 0, "right", e.repeat); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (dlgRef.current || pausedRef.current || battleRef.current || trainOpenRef.current) return;
      setNpcs(prev => prev.map(npc => {
        if (Math.random() > 0.45) return { ...npc, walking: false };
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;
        const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
        const nx = npc.x + dx;
        const ny = npc.y + dy;
        const map = GAME_MAPS[npc.mapId];
        const rows = rowsForMap(npc.mapId);
        const t = rows[ny]?.[nx] ?? "T";
        const nearHome = Math.abs(nx - npc.homeX) + Math.abs(ny - npc.homeY) <= 4;
        const blockedByPlayer = mapIdRef.current === npc.mapId && posRef.current.x === nx && posRef.current.y === ny;
        const blockedByNpc = prev.some(other => other.id !== npc.id && other.mapId === npc.mapId && other.x === nx && other.y === ny) || Boolean(generatedNpcAt(npc.mapId, nx, ny));
        if (!nearHome || !WALK.has(t) || t === "O" || blockedByPlayer || blockedByNpc) return { ...npc, walking: false };
        return { ...npc, x: nx, y: ny, walking: true };
      }));
      window.setTimeout(() => setNpcs(prev => prev.map(npc => ({ ...npc, walking: false }))), 280);
    }, 1300);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const upd = () => {
      if (viewRef.current) setViewSize({ w: viewRef.current.clientWidth, h: viewRef.current.clientHeight });
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    const stopPainting = () => {
      isEditorDraggingRef.current = false;
      setIsEditorDragging(false);
      draggedNpcIdRef.current = null;
      draggedBuildingIdRef.current = null;
      draggedObjectCoordRef.current = null;
      resizeBuildingIdRef.current = null;
      setDraggedNpcId(null);
      setDraggedBuildingId(null);
      setDraggedObjectCoord(null);
      setResizeBuildingId(null);
    };
    window.addEventListener("pointerup", stopPainting);
    window.addEventListener("pointercancel", stopPainting);
    return () => {
      window.removeEventListener("pointerup", stopPainting);
      window.removeEventListener("pointercancel", stopPainting);
    };
  }, []);
}
