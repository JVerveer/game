import { useEffect, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import type { GameMapId, TownMapId } from "../../../data/maps";
import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind, EditorNpcAsset } from "../../../data/cityMaps/mapAsset";
import { GAME_TILE_COLORS } from "../../../data/maps";
import { objectLabelForId } from "../../../data/objectRegistry";
import { EditorToolbar } from "./EditorToolbar";
import { TerrainPalette } from "./terrain/TerrainPalette";
import { terrainImageForCoord } from "./terrain/TerrainLibrary";
import { ObjectPalette } from "./objects/ObjectPalette";
import { BuildingPalette } from "./buildings/BuildingPalette";
import { NpcPalette } from "./npcs/NpcPalette";
import { ExportPanel } from "./export/ExportPanel";
import { SelectedInspector } from "./selection/SelectedInspector";
import { buildingAtCoord } from "./buildings/buildingHelpers";
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

export function TerrainEditorOverlay({
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

  useEffect(() => {
    const refresh = () => setTerrainPreviewVersion(version => version + 1);
    window.addEventListener("satiria:limezu-terrain-paint-changed", refresh);
    window.addEventListener("satiria:limezu-selected-terrain-changed", refresh);

    return () => {
      window.removeEventListener("satiria:limezu-terrain-paint-changed", refresh);
      window.removeEventListener("satiria:limezu-selected-terrain-changed", refresh);
    };
  }, []);

  const editorTerrainPreviewStyle = (tile: string, x: number, y: number): React.CSSProperties => {
    void terrainPreviewVersion;

    const limeZuImage = terrainImageForCoord(x, y);

    if (limeZuImage) {
      return {
        backgroundColor: "#fff8c8",
        backgroundImage: `url(${limeZuImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "18px 18px",
        imageRendering: "pixelated",
      };
    }

    return {
      background: EDITOR_TILE_COLORS[tile] ?? GAME_TILE_COLORS[tile] ?? GAME_TILE_COLORS.G,
    };
  };

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
              <TerrainPalette
                editorTile={editorTile}
                setEditorTile={setEditorTile}
              />
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
              <ObjectPalette
                objectEditAction={objectEditAction}
                setObjectEditAction={setObjectEditAction}
                editorObjectId={editorObjectId}
                setEditorObjectId={setEditorObjectId}
              />
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
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${displayRows[0]?.length ?? 1}, 18px)`,
              gap: 1,
              background: "#252018",
              width: "fit-content",
              padding: 4,
              border: "4px solid #fff8c8",
              touchAction: "none",
              userSelect: "none",
            }}
            onPointerUp={clearEditorDragState}
            onPointerLeave={clearEditorDragState}
          >
            {displayRows.map((row, y) =>
              row.map((tile, x) => (
                <button
                  key={`${x},${y}`}
                  type="button"
                  title={`${x},${y}: ${tileTypeFor(tile)?.name ?? tile} (${tile})${buildingAtCoord(displayBuildings, x, y) ? ` · Building: ${BUILDING_KIND_LABEL[buildingAtCoord(displayBuildings, x, y)!.kind]}` : ""}${displayObjects[`${x},${y}`] ? ` · Object: ${objectLabelForId(displayObjects[`${x},${y}`])}` : ""}${displayEditorNpcs.some(npc => npc.x === x && npc.y === y) ? " · NPC" : ""}`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    isEditorDraggingRef.current = true;
                    setIsEditorDragging(true);
                    paintEditorTile(x, y);
                  }}
                  onPointerEnter={() => {
                    if (isEditorDraggingRef.current && transformDragTo(x, y)) return;
                    if (isEditorDraggingRef.current) paintEditorTile(x, y);
                  }}
                  style={{
                    width: 18,
                    height: 18,
                    padding: 0,
                    border: displayEditorNpcs.some(npc => npc.x === x && npc.y === y) ? "2px solid #c87aff" : buildingAtCoord(displayBuildings, x, y) ? "2px solid #38bdf8" : displayObjects[`${x},${y}`] ? "2px solid #ffef93" : "0",
                    ...editorTerrainPreviewStyle(tile, x, y),
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {buildingAtCoord(displayBuildings, x, y) && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 1,
                        background: "rgba(56,189,248,0.58)",
                        color: "#252018",
                        fontSize: 9,
                        lineHeight: "14px",
                        fontWeight: 900,
                        textAlign: "center",
                        borderRadius: 2,
                        pointerEvents: "none",
                      }}
                    >
                      {buildingAtCoord(displayBuildings, x, y)?.id === selectedBuilding?.id && x === selectedBuilding!.x + selectedBuilding!.w - 1 && y === selectedBuilding!.y + selectedBuilding!.h - 1 ? "↘" : "⌂"}
                    </span>
                  )}
                  {displayObjects[`${x},${y}`] && (
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
                  {displayEditorNpcs.some(npc => npc.x === x && npc.y === y) && (
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
              ))
            )}
          </div>
        </div>
  );
}
