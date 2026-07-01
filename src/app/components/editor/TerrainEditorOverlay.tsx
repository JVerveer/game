import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type Dispatch, type MutableRefObject, type PointerEvent as ReactPointerEvent, type SetStateAction } from "react";
import type { GameMapId, TownMapId } from "../../../data/maps";
import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind, EditorNpcAsset } from "../../../data/cityMaps/mapAsset";
import { GAME_TILE_COLORS } from "../../../data/maps";
import { objectLabelForId } from "../../../data/objectRegistry";
import { EditorToolbar } from "./EditorToolbar";
import { BuildingPalette } from "./buildings/BuildingPalette";
import { NpcPalette } from "./npcs/NpcPalette";
import { ExportPanel } from "./export/ExportPanel";
import { SelectedInspector } from "./selection/SelectedInspector";
import { buildingAtCoord } from "./buildings/buildingHelpers";
import { buildingPrefabForBuilding } from "../../assets/limezu/BuildingPlacementRuntime";
import { effectiveBuildingPrefabFootprint, selectedBuildingPrefab } from "../../assets/limezu/BuildingPrefabRuntime";
import { objectImageForCoordFast, terrainImageForCoordFast } from "../../assets/limezu/RuntimePaintMaps";
import type {
  EditorMode,
  EditorSelection,
  EditedBuildingsByMap,
  EditedObjectsByMap,
  ObjectEditAction,
  NpcEditorAction,
  NpcVisualCategory,
} from "./hooks/useEditorState";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const TerrainPalette = lazy(() => import("./terrain/TerrainPalette").then(module => ({ default: module.TerrainPalette })));
const ObjectPalette = lazy(() => import("./objects/ObjectPalette").then(module => ({ default: module.ObjectPalette })));

const EDITOR_TILE_SIZE = 18;
const EDITOR_TILE_GAP = 1;
const EDITOR_ROW_HEIGHT = EDITOR_TILE_SIZE + EDITOR_TILE_GAP;
const EDITOR_GRID_PADDING = 4;
const EDITOR_ROW_OVERSCAN = 8;
const paletteLoadingStyle: CSSProperties = {
  border: "3px solid #252018",
  background: "#f4e8b5",
  color: "#252018",
  padding: 10,
  marginBottom: 10,
  fontWeight: 900,
};

const BUILDING_KIND_LABEL = {
  house: "House",
  shop: "Shop",
  healing: "Healing Center",
  station: "Train Station",
  hall: "Hall / Institution",
} as const;

const EDITOR_TILE_COLORS: Record<string, string> = {
  G: "#56b447",
  R: "#d4a15f",
  W: "#2f9bd2",
  T: "#185c2b",
  E: "#9a9a9a",
  Y: "#ff4fa3",
  L: "#ffcf33",
  S: "#f0d079",
  X: "#2f8d3a",
  B: "#d94b36",
  H: "#3f7ee8",
  P: "#e07a28",
  U: "#8a4bd6",
  A: "#3fbf6f",
  I: "#52b7b0",
  O: "#3b2417",
  D: "#29213f",
  C: "#65412b",
  M: "#676767",
  J: "#9b5b2b",
  F: "#8b4f25",
  Q: "#f6d746",
  V: "#ffd84d",
  N: "#c87aff",
};

type TileTypeFor = (id: string) => { name: string; description?: string } | undefined;


type EditorTileButtonProps = {
  x: number;
  y: number;
  tile: string;
  building: EditorBuildingAsset | undefined;
  objectId: string | undefined;
  npc: EditorNpcAsset | undefined;
  limeZuObjectSrc: string | undefined;
  terrainStyle: CSSProperties | undefined;
  buildingLabel: string | undefined;
  placementPreview: "valid" | "invalid" | undefined;
  objectEditAction: ObjectEditAction;
  npcEditAction: ObjectEditAction;
  editorMode: EditorMode;
  tileTypeName: string;
  onTilePointerDown: (x: number, y: number, event: ReactPointerEvent<HTMLButtonElement>) => void;
  onTilePointerEnter: (x: number, y: number) => void;
};

const EditorTileButton = memo(function EditorTileButton({
  x,
  y,
  tile,
  building,
  objectId,
  npc,
  limeZuObjectSrc,
  terrainStyle,
  buildingLabel,
  placementPreview,
  objectEditAction,
  npcEditAction,
  editorMode,
  tileTypeName,
  onTilePointerDown,
  onTilePointerEnter,
}: EditorTileButtonProps) {
  const coord = `${x},${y}`;

  return (
    <button
      type="button"
      title={`${coord}: ${tileTypeName} (${tile})${building ? ` · Building: ${buildingLabel ?? BUILDING_KIND_LABEL[building.kind]}` : ""}${placementPreview === "invalid" ? " · Cannot place building here" : ""}${objectId ? ` · Object: ${objectLabelForId(objectId)}` : ""}${npc ? " · NPC" : ""}`}
      onPointerDown={(event) => onTilePointerDown(x, y, event)}
      onPointerEnter={() => onTilePointerEnter(x, y)}
      style={{
        width: EDITOR_TILE_SIZE,
        height: EDITOR_TILE_SIZE,
        padding: 0,
        border: placementPreview === "invalid"
          ? "2px solid #ca4b36"
          : placementPreview === "valid"
            ? "2px solid #38bdf8"
            : npc
              ? "2px solid #c87aff"
              : building
                ? "2px solid #38bdf8"
                : objectId
                  ? "2px solid #ffef93"
                  : "0",
        ...(terrainStyle ?? { background: GAME_TILE_COLORS.G }),
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        flex: "0 0 auto",
        zIndex: building && x === building.x && y === building.y ? 4 : placementPreview ? 3 : undefined,
      }}
    >
      {placementPreview && (
        <span
          style={{
            position: "absolute",
            inset: 1,
            background: placementPreview === "invalid" ? "rgba(202,75,54,0.62)" : "rgba(56,189,248,0.42)",
            borderRadius: 2,
            pointerEvents: "none",
          }}
        />
      )}
      {building && (
        <span
          style={{
            position: "absolute",
            inset: 1,
            background: "rgba(56,189,248,0.48)",
            color: "#252018",
            fontSize: 9,
            lineHeight: "14px",
            fontWeight: 900,
            textAlign: "center",
            borderRadius: 2,
            pointerEvents: "none",
          }}
        >
          ⌂
        </span>
      )}
      {building && x === building.x && y === building.y && (
        <span
          style={{
            position: "absolute",
            left: 1,
            top: 1,
            width: Math.max(EDITOR_TILE_SIZE, building.w * (EDITOR_TILE_SIZE + EDITOR_TILE_GAP) - EDITOR_TILE_GAP - 2),
            minHeight: 14,
            padding: "1px 3px",
            boxSizing: "border-box",
            background: "rgba(255,248,200,0.92)",
            border: "1px solid #252018",
            color: "#252018",
            fontSize: 8,
            lineHeight: "10px",
            fontWeight: 900,
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {buildingLabel ?? BUILDING_KIND_LABEL[building.kind]}
        </span>
      )}
      {limeZuObjectSrc && (
        <span
          style={{
            position: "absolute",
            inset: 1,
            backgroundImage: `url(${limeZuObjectSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px 16px",
            backgroundPosition: "center",
            imageRendering: "pixelated",
            pointerEvents: "none",
          }}
        />
      )}
      {objectId && (
        <span
          style={{
            position: "absolute",
            inset: 2,
            background: objectEditAction === "erase" && editorMode === "objects" ? "#ca4b36" : "#252018",
            color: "#fff8c8",
            fontSize: 9,
            lineHeight: "12px",
            fontWeight: 900,
            textAlign: "center",
            borderRadius: 2,
            pointerEvents: "none",
          }}
        >
          ◆
        </span>
      )}
      {npc && (
        <span
          style={{
            position: "absolute",
            inset: 3,
            background: npcEditAction === "erase" && editorMode === "npcs" ? "#ca4b36" : "#8a4bd6",
            color: "#fff8c8",
            fontSize: 9,
            lineHeight: "10px",
            fontWeight: 900,
            textAlign: "center",
            borderRadius: 999,
            pointerEvents: "none",
          }}
        >
          N
        </span>
      )}
    </button>
  );
});

function TerrainEditorOverlayComponent({
  mapId,
  displayRows,
  displayObjects,
  displayBuildings,
  displayEditorNpcs,
  selectedBuilding,
  selectedNpc,
  editorMode,
  setEditorMode,
  editorTile,
  setEditorTile,
  editorBuildingKind,
  setEditorBuildingKind,
  editorBuildingColor,
  setEditorBuildingColor,
  editorBuildingW,
  setEditorBuildingW,
  editorBuildingH,
  setEditorBuildingH,
  objectEditAction,
  setObjectEditAction,
  editorObjectId,
  setEditorObjectId,
  npcEditAction,
  npcEditorAction,
  setNpcEditorAction,
  editorNpcCategory,
  setEditorNpcCategory,
  editorNpcSearch,
  setEditorNpcSearch,
  editorNpcPresetId,
  setEditorNpcPresetId,
  editorNpcName,
  setEditorNpcName,
  editorNpcWalking,
  setEditorNpcWalking,
  editorNpcLines,
  setEditorNpcLines,
  editorSelection,
  mapIdRef,
  rowsForMap,
  tileTypeFor,
  setEditedBuildingsByMap,
  editedBuildingsByMapRef,
  buildingsForMap,
  setEditedObjectsByMap,
  editedObjectsByMapRef,
  objectsForMap,
  setEditorSelection,
  duplicateSelectedBuilding,
  removeEditorBuilding,
  moveEditorBuildingTo,
  duplicateSelectedObject,
  upsertEditedNpcsForMap,
  isTownMap,
  exportText,
  onCopyExport,
  onReset,
  onClose,
  clearEditorDragState,
  isEditorDraggingRef,
  setIsEditorDragging,
  paintEditorTile,
  transformDragTo,
}: {
  mapId: GameMapId;
  displayRows: string[][];
  displayObjects: Record<string, string>;
  displayBuildings: EditorBuildingAsset[];
  displayEditorNpcs: EditorNpcAsset[];
  selectedBuilding: EditorBuildingAsset | null | undefined;
  selectedNpc: EditorNpcAsset | null | undefined;
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
  editorTile: string;
  setEditorTile: (tile: string) => void;
  editorBuildingKind: EditorBuildingKind;
  setEditorBuildingKind: (kind: EditorBuildingKind) => void;
  editorBuildingColor: EditorBuildingColor;
  setEditorBuildingColor: (color: EditorBuildingColor) => void;
  editorBuildingW: number;
  setEditorBuildingW: (width: number) => void;
  editorBuildingH: number;
  setEditorBuildingH: (height: number) => void;
  objectEditAction: ObjectEditAction;
  setObjectEditAction: (action: ObjectEditAction) => void;
  editorObjectId: string;
  setEditorObjectId: (objectId: string) => void;
  npcEditAction: ObjectEditAction;
  npcEditorAction: NpcEditorAction;
  setNpcEditorAction: (action: NpcEditorAction) => void;
  editorNpcCategory: NpcVisualCategory;
  setEditorNpcCategory: (category: NpcVisualCategory) => void;
  editorNpcSearch: string;
  setEditorNpcSearch: (search: string) => void;
  editorNpcPresetId: string;
  setEditorNpcPresetId: (presetId: string) => void;
  editorNpcName: string;
  setEditorNpcName: (name: string) => void;
  editorNpcWalking: boolean;
  setEditorNpcWalking: (walking: boolean) => void;
  editorNpcLines: string;
  setEditorNpcLines: (lines: string) => void;
  editorSelection: EditorSelection;
  mapIdRef: MutableRefObject<GameMapId>;
  rowsForMap: (id: GameMapId) => string[][];
  tileTypeFor: TileTypeFor;
  setEditedBuildingsByMap: Dispatch<SetStateAction<EditedBuildingsByMap>>;
  editedBuildingsByMapRef: MutableRefObject<EditedBuildingsByMap>;
  buildingsForMap: (id: GameMapId) => EditorBuildingAsset[];
  setEditedObjectsByMap: Dispatch<SetStateAction<EditedObjectsByMap>>;
  editedObjectsByMapRef: MutableRefObject<EditedObjectsByMap>;
  objectsForMap: (id: GameMapId) => Record<string, string>;
  setEditorSelection: (selection: EditorSelection) => void;
  duplicateSelectedBuilding: (building: EditorBuildingAsset) => void;
  removeEditorBuilding: (building: EditorBuildingAsset) => void;
  moveEditorBuildingTo: (building: EditorBuildingAsset, x: number, y: number) => void;
  duplicateSelectedObject: (coord: string) => void;
  upsertEditedNpcsForMap: (id: GameMapId, updater: (current: EditorNpcAsset[]) => EditorNpcAsset[]) => EditorNpcAsset[];
  isTownMap: (id: GameMapId) => id is TownMapId;
  exportText: string;
  onCopyExport: () => void;
  onReset: () => void;
  onClose: () => void;
  clearEditorDragState: () => void;
  isEditorDraggingRef: MutableRefObject<boolean>;
  setIsEditorDragging: (dragging: boolean) => void;
  paintEditorTile: (x: number, y: number) => void;
  transformDragTo: (x: number, y: number) => boolean;
}) {
  const [terrainPreviewVersion, setTerrainPreviewVersion] = useState(0);
  const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number } | null>(null);
  const columnCount = displayRows[0]?.length ?? 0;
  const totalRowCount = displayRows.length;

  useEffect(() => {
    const refresh = () => setTerrainPreviewVersion(version => version + 1);
    window.addEventListener("satiria:limezu-terrain-paint-changed", refresh);
    window.addEventListener("satiria:limezu-selected-terrain-changed", refresh);

    return () => {
      window.removeEventListener("satiria:limezu-terrain-paint-changed", refresh);
      window.removeEventListener("satiria:limezu-selected-terrain-changed", refresh);
    };
  }, []);

  const buildingByCoord = useMemo(() => {
    const byCoord = new Map<string, EditorBuildingAsset>();
    for (const building of displayBuildings) {
      for (let yy = building.y; yy < building.y + building.h; yy += 1) {
        for (let xx = building.x; xx < building.x + building.w; xx += 1) {
          byCoord.set(`${xx},${yy}`, building);
        }
      }
    }
    return byCoord;
  }, [displayBuildings]);

  const buildingLabelById = useMemo(() => {
    const labels = new Map<string, string>();

    for (const building of displayBuildings) {
      const prefab = buildingPrefabForBuilding({ id: building.id, x: building.x, y: building.y });
      labels.set(building.id, prefab?.name ?? BUILDING_KIND_LABEL[building.kind]);
    }

    return labels;
  }, [displayBuildings]);

  const placementPreviewByCoord = useMemo(() => {
    const preview = new Map<string, "valid" | "invalid">();
    if (editorMode !== "buildings" || !hoveredTile) return preview;

    const prefab = selectedBuildingPrefab();
    const footprint = prefab ? effectiveBuildingPrefabFootprint(prefab) : undefined;
    const w = Math.max(1, footprint?.width ?? editorBuildingW);
    const h = Math.max(1, footprint?.height ?? editorBuildingH);
    const kind = prefab?.kind ?? editorBuildingKind;
    const outOfBounds =
      hoveredTile.x < 0 ||
      hoveredTile.y < 0 ||
      hoveredTile.x + w > columnCount ||
      hoveredTile.y + h > totalRowCount;
    const overlaps = displayBuildings.some(building =>
      hoveredTile.x < building.x + building.w &&
      hoveredTile.x + w > building.x &&
      hoveredTile.y < building.y + building.h &&
      hoveredTile.y + h > building.y,
    );
    const sameUniqueKind = (kind === "shop" || kind === "healing" || kind === "station")
      && displayBuildings.some(building => building.kind === kind);
    const state: "valid" | "invalid" = outOfBounds || overlaps || sameUniqueKind ? "invalid" : "valid";

    for (let yy = hoveredTile.y; yy < hoveredTile.y + h; yy += 1) {
      for (let xx = hoveredTile.x; xx < hoveredTile.x + w; xx += 1) {
        if (xx >= 0 && yy >= 0 && xx < columnCount && yy < totalRowCount) {
          preview.set(`${xx},${yy}`, state);
        }
      }
    }

    return preview;
  }, [columnCount, displayBuildings, editorBuildingH, editorBuildingKind, editorBuildingW, editorMode, hoveredTile, totalRowCount]);

  const npcByCoord = useMemo(() => {
    const byCoord = new Map<string, EditorNpcAsset>();
    for (const npc of displayEditorNpcs) {
      byCoord.set(`${npc.x},${npc.y}`, npc);
    }
    return byCoord;
  }, [displayEditorNpcs]);

  const terrainPreviewStyleByCoord = useMemo(() => {
    void terrainPreviewVersion;
    const styles = new Map<string, CSSProperties>();

    displayRows.forEach((row, y) => {
      row.forEach((tile, x) => {
        const limeZuImage = terrainImageForCoordFast(x, y);
        styles.set(`${x},${y}`, limeZuImage
          ? {
              backgroundColor: "#fff8c8",
              backgroundImage: `url(${limeZuImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "18px 18px",
              imageRendering: "pixelated",
            }
          : {
              background: EDITOR_TILE_COLORS[tile] ?? GAME_TILE_COLORS[tile] ?? GAME_TILE_COLORS.G,
            });
      });
    });

    return styles;
  }, [displayRows, terrainPreviewVersion]);

  const limeZuObjectByCoord = useMemo(() => {
    void terrainPreviewVersion;
    const byCoord = new Map<string, string>();

    displayRows.forEach((row, y) => {
      row.forEach((_, x) => {
        const src = objectImageForCoordFast(x, y);
        if (src) byCoord.set(`${x},${y}`, src);
      });
    });

    return byCoord;
  }, [displayRows, terrainPreviewVersion]);

  const [gridScrollTop, setGridScrollTop] = useState(0);
  const mapScrollerRef = useRef<HTMLDivElement | null>(null);
  const mapScrollFrameRef = useRef<number | null>(null);
  const gridWidth = columnCount * EDITOR_ROW_HEIGHT - EDITOR_TILE_GAP + EDITOR_GRID_PADDING * 2;
  const gridHeight = totalRowCount * EDITOR_ROW_HEIGHT - EDITOR_TILE_GAP + EDITOR_GRID_PADDING * 2;
  const viewportHeight = Math.min(720, Math.max(260, gridHeight + 8));
  const visibleRowStart = Math.max(0, Math.floor((gridScrollTop - EDITOR_GRID_PADDING) / EDITOR_ROW_HEIGHT) - EDITOR_ROW_OVERSCAN);
  const visibleRowEnd = Math.min(
    totalRowCount,
    Math.ceil((gridScrollTop - EDITOR_GRID_PADDING + viewportHeight) / EDITOR_ROW_HEIGHT) + EDITOR_ROW_OVERSCAN,
  );
  const visibleRows = displayRows.slice(visibleRowStart, visibleRowEnd);

  const handleGridScroll = useCallback(() => {
    if (mapScrollFrameRef.current !== null) return;

    mapScrollFrameRef.current = window.requestAnimationFrame(() => {
      mapScrollFrameRef.current = null;
      setGridScrollTop(mapScrollerRef.current?.scrollTop ?? 0);
    });
  }, []);

  useEffect(() => {
    setGridScrollTop(0);
    if (mapScrollerRef.current) mapScrollerRef.current.scrollTop = 0;
  }, [mapId]);

  useEffect(() => {
    return () => {
      if (mapScrollFrameRef.current !== null) window.cancelAnimationFrame(mapScrollFrameRef.current);
    };
  }, []);

  const handleTilePointerDown = useCallback((x: number, y: number, event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setHoveredTile({ x, y });
    isEditorDraggingRef.current = true;
    setIsEditorDragging(true);
    paintEditorTile(x, y);
  }, [isEditorDraggingRef, paintEditorTile, setIsEditorDragging]);

  const handleTilePointerEnter = useCallback((x: number, y: number) => {
    setHoveredTile({ x, y });
    if (isEditorDraggingRef.current && transformDragTo(x, y)) return;
    if (isEditorDraggingRef.current) paintEditorTile(x, y);
  }, [isEditorDraggingRef, paintEditorTile, transformDragTo]);

  return (
    <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            background: "rgba(37,32,24,0.94)",
            padding: 24,
            overflow: "auto",
          }}
        >
          <div className="pixel-window" style={{ padding: 18, marginBottom: 12 }}>
            <div style={{ ...PX, fontSize: "0.65rem", color: "#b6422c", marginBottom: 12 }}>
              TERRAIN EDITOR · {String(mapId).toUpperCase()}
            </div>

            <div style={{ ...VT, fontSize: "1.1rem", color: "#252018", marginBottom: 10 }}>
              Select a tile, then click or drag to paint. Your normal pixel-art map stays active. This editor is an overlay; changes feed into the normal map preview, collision, and export.
            </div>

            <EditorToolbar editorMode={editorMode} setEditorMode={setEditorMode} />

            {editorMode === "terrain" && (
              <Suspense fallback={<div style={paletteLoadingStyle}>Loading terrain assets...</div>}>
                <TerrainPalette
                  editorTile={editorTile}
                  setEditorTile={setEditorTile}
                />
              </Suspense>
            )}

            {editorMode === "buildings" && (
              <BuildingPalette
                editorBuildingKind={editorBuildingKind}
                setEditorBuildingKind={setEditorBuildingKind}
                editorBuildingColor={editorBuildingColor}
                setEditorBuildingColor={setEditorBuildingColor}
                editorBuildingW={editorBuildingW}
                setEditorBuildingW={setEditorBuildingW}
                editorBuildingH={editorBuildingH}
                setEditorBuildingH={setEditorBuildingH}
              />
            )}

            {editorMode === "objects" && (
              <Suspense fallback={<div style={paletteLoadingStyle}>Loading object assets...</div>}>
                <ObjectPalette
                  objectEditAction={objectEditAction}
                  setObjectEditAction={setObjectEditAction}
                  editorObjectId={editorObjectId}
                  setEditorObjectId={setEditorObjectId}
                />
              </Suspense>
            )}

            {editorMode === "npcs" && (
              <NpcPalette
                npcEditorAction={npcEditorAction}
                setNpcEditorAction={setNpcEditorAction}
                editorNpcCategory={editorNpcCategory}
                setEditorNpcCategory={setEditorNpcCategory}
                editorNpcSearch={editorNpcSearch}
                setEditorNpcSearch={setEditorNpcSearch}
                editorNpcPresetId={editorNpcPresetId}
                setEditorNpcPresetId={setEditorNpcPresetId}
                editorNpcName={editorNpcName}
                setEditorNpcName={setEditorNpcName}
                editorNpcWalking={editorNpcWalking}
                setEditorNpcWalking={setEditorNpcWalking}
                editorNpcLines={editorNpcLines}
                setEditorNpcLines={setEditorNpcLines}
              />
            )}

            <SelectedInspector
              editorMode={editorMode}
              editorSelection={editorSelection}
              selectedBuilding={selectedBuilding}
              selectedNpc={selectedNpc}
              mapId={mapId}
              mapIdRef={mapIdRef}
              rowsForMap={rowsForMap}
              tileTypeFor={tileTypeFor}
              displayObjects={displayObjects}
              setEditedBuildingsByMap={setEditedBuildingsByMap}
              editedBuildingsByMapRef={editedBuildingsByMapRef}
              buildingsForMap={buildingsForMap}
              setEditedObjectsByMap={setEditedObjectsByMap}
              editedObjectsByMapRef={editedObjectsByMapRef}
              objectsForMap={objectsForMap}
              setEditorSelection={setEditorSelection}
              duplicateSelectedBuilding={duplicateSelectedBuilding}
              removeEditorBuilding={removeEditorBuilding}
              moveEditorBuildingTo={moveEditorBuildingTo}
              duplicateSelectedObject={duplicateSelectedObject}
              upsertEditedNpcsForMap={upsertEditedNpcsForMap}
              isTownMap={isTownMap}
            />

            <ExportPanel
              exportText={exportText}
              onCopy={onCopyExport}
              onReset={onReset}
              onClose={onClose}
            />
          </div>

          <div
            ref={mapScrollerRef}
            onScroll={handleGridScroll}
            style={{
              background: "#252018",
              width: "fit-content",
              maxWidth: "100%",
              height: viewportHeight,
              maxHeight: "72vh",
              overflow: "auto",
              border: "4px solid #fff8c8",
              touchAction: "none",
              userSelect: "none",
            }}
            onPointerUp={clearEditorDragState}
            onPointerLeave={clearEditorDragState}
          >
            <div
              style={{
                width: gridWidth,
                height: gridHeight,
                position: "relative",
                padding: EDITOR_GRID_PADDING,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: EDITOR_GRID_PADDING,
                  top: EDITOR_GRID_PADDING + visibleRowStart * EDITOR_ROW_HEIGHT,
                  display: "flex",
                  flexDirection: "column",
                  gap: EDITOR_TILE_GAP,
                }}
              >
                {visibleRows.map((row, rowOffset) => {
                  const y = visibleRowStart + rowOffset;

                  return (
                    <div key={y} style={{ display: "flex", gap: EDITOR_TILE_GAP, height: EDITOR_TILE_SIZE }}>
                      {row.map((tile, x) => {
                        const coord = `${x},${y}`;
                        const building = buildingByCoord.get(coord);
                        const objectId = displayObjects[coord];
                        const npc = npcByCoord.get(coord);
                        const limeZuObjectSrc = limeZuObjectByCoord.get(coord);
                        const buildingLabel = building ? buildingLabelById.get(building.id) : undefined;

                        return (
                          <EditorTileButton
                            key={coord}
                            x={x}
                            y={y}
                            tile={tile}
                            building={building}
                            objectId={objectId}
                            npc={npc}
                            limeZuObjectSrc={limeZuObjectSrc}
                            terrainStyle={terrainPreviewStyleByCoord.get(coord)}
                            buildingLabel={buildingLabel}
                            placementPreview={placementPreviewByCoord.get(coord)}
                            objectEditAction={objectEditAction}
                            npcEditAction={npcEditAction}
                            editorMode={editorMode}
                            tileTypeName={tileTypeFor(tile)?.name ?? tile}
                            onTilePointerDown={handleTilePointerDown}
                            onTilePointerEnter={handleTilePointerEnter}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
  );
}

export const TerrainEditorOverlay = memo(TerrainEditorOverlayComponent);
