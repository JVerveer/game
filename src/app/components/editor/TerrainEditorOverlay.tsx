import { memo, useEffect, useMemo, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import type { GameMapId, TownMapId } from "../../../data/maps";
import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind, EditorNpcAsset } from "../../../data/cityMaps/mapAsset";
import { GAME_TILE_COLORS } from "../../../data/maps";
import { objectLabelForId } from "../../../data/objectRegistry";
import { EditorToolbar } from "./EditorToolbar";
import { TerrainPalette } from "./terrain/TerrainPalette";
import { terrainImageForCoord } from "./terrain/TerrainLibrary";
import { limeZuObjectAssetForCoord } from "./objects/ObjectLibrary";
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

  const npcByCoord = useMemo(() => {
    const byCoord = new Map<string, EditorNpcAsset>();
    for (const npc of displayEditorNpcs) {
      byCoord.set(`${npc.x},${npc.y}`, npc);
    }
    return byCoord;
  }, [displayEditorNpcs]);

  const terrainPreviewStyleByCoord = useMemo(() => {
    void terrainPreviewVersion;
    const styles = new Map<string, React.CSSProperties>();

    displayRows.forEach((row, y) => {
      row.forEach((tile, x) => {
        const limeZuImage = terrainImageForCoord(x, y);
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
    const byCoord = new Map<string, ReturnType<typeof limeZuObjectAssetForCoord>>();

    displayRows.forEach((row, y) => {
      row.forEach((_, x) => {
        const asset = limeZuObjectAssetForCoord(x, y);
        if (asset) byCoord.set(`${x},${y}`, asset);
      });
    });

    return byCoord;
  }, [displayRows, terrainPreviewVersion]);

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
              row.map((tile, x) => {
                const coord = `${x},${y}`;
                const building = buildingByCoord.get(coord);
                const objectId = displayObjects[coord];
                const npc = npcByCoord.get(coord);
                const limeZuObject = limeZuObjectByCoord.get(coord);

                return (
                  <button
                    key={coord}
                    type="button"
                    title={`${coord}: ${tileTypeFor(tile)?.name ?? tile} (${tile})${building ? ` · Building: ${BUILDING_KIND_LABEL[building.kind]}` : ""}${objectId ? ` · Object: ${objectLabelForId(objectId)}` : ""}${npc ? " · NPC" : ""}`}
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
                      border: npc ? "2px solid #c87aff" : building ? "2px solid #38bdf8" : objectId ? "2px solid #ffef93" : "0",
                      ...(terrainPreviewStyleByCoord.get(coord) ?? { background: GAME_TILE_COLORS.G }),
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {building && (
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
                        {building.id === selectedBuilding?.id && x === building.x + building.w - 1 && y === building.y + building.h - 1 ? "↘" : "⌂"}
                      </span>
                    )}
                    {limeZuObject && (
                      <span
                        style={{
                          position: "absolute",
                          inset: 1,
                          backgroundImage: `url(${limeZuObject.src})`,
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
              })
            )}
          </div>
        </div>
  );
}

export const TerrainEditorOverlay = memo(TerrainEditorOverlayComponent);
