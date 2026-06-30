import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId } from "../../../../data/maps";
import type { EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind, EditorNpcAsset } from "../../../../data/cityMaps/mapAsset";
import { buildingCrestForKind } from "../../../../data/cityMaps/mapAsset";
import { CharacterSheetRenderer } from "../../../rendering/characters/CharacterSheetRenderer";
import { CharacterRenderer } from "../hero/CharacterRenderer";

type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";

type EditorSelection =
  | { kind: "npc"; id: string }
  | { kind: "building"; id: string }
  | { kind: "object"; coord: string }
  | { kind: "tile"; x: number; y: number }
  | null;

type EditedBuildingsByMap = Partial<Record<GameMapId, EditorBuildingAsset[]>>;
type EditedObjectsByMap = Partial<Record<GameMapId, Record<string, string>>>;

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const BUILDING_TYPES = [
  { kind: "house" as const, label: "House", defaultColor: "purple" as const, defaultW: 5, defaultH: 4, description: "Normal enterable house" },
  { kind: "shop" as const, label: "Shop", defaultColor: "green" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to shop interior" },
  { kind: "healing" as const, label: "Healing Center", defaultColor: "blue" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to healing center" },
  { kind: "station" as const, label: "Train Station", defaultColor: "red" as const, defaultW: 7, defaultH: 4, description: "Auto-opens train menu" },
  { kind: "hall" as const, label: "Hall / Institution", defaultColor: "purple" as const, defaultW: 6, defaultH: 5, description: "Large civic building" },
];

const BUILDING_COLORS = ["default", "purple", "red", "green", "white", "orange", "blue", "yellow"] as const;

const BUILDING_KIND_LABEL: Record<EditorBuildingKind, string> = {
  house: "House",
  shop: "Shop",
  healing: "Healing Center",
  station: "Train Station",
  hall: "Hall / Institution",
};

const UNIQUE_BUILDING_KINDS = new Set<EditorBuildingKind>(["shop", "healing", "station"]);

const NPC_VISUAL_PRESETS = [
  { id: "generic-young-man-0", label: "Young Man 1", variant: 0, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-woman-1", label: "Young Woman 1", variant: 1, styleRole: "young-woman", category: "Generic" },
  { id: "generic-older-woman-2", label: "Older Woman 1", variant: 2, styleRole: "older-woman", category: "Generic" },
  { id: "generic-older-man-3", label: "Older Man 1", variant: 3, styleRole: "older-man", category: "Generic" },
  { id: "generic-guide-4", label: "Guide", variant: 4, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-man-5", label: "Young Man 2", variant: 5, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-woman-6", label: "Young Woman 2", variant: 6, styleRole: "young-woman", category: "Generic" },
  { id: "generic-older-man-7", label: "Older Man 2", variant: 7, styleRole: "older-man", category: "Generic" },
  { id: "generic-official-8", label: "Official", variant: 8, styleRole: "older-man", category: "Generic" },
  { id: "generic-local-9", label: "Local 9", variant: 9, styleRole: "young-woman", category: "Generic" },
  { id: "woke-consensus-ranger", label: "Consensus Ranger", variant: 6, styleRole: "young-woman", category: "Wokeshire" },
  { id: "woke-tulip-mediator", label: "Tulip Mediator", variant: 1, styleRole: "older-woman", category: "Wokeshire" },
  { id: "woke-canal-cyclist", label: "Canal Cyclist", variant: 3, styleRole: "young-man", category: "Wokeshire" },
  { id: "woke-bike-activist", label: "Bike Activist", variant: 5, styleRole: "young-woman", category: "Wokeshire" },
  { id: "woke-canal-elder", label: "Canal Elder", variant: 7, styleRole: "older-man", category: "Wokeshire" },
  { id: "woke-tulip-kid", label: "Tulip Kid", variant: 0, styleRole: "young-man", category: "Wokeshire" },
  { id: "special-robot-8", label: "Robot", variant: 8, styleRole: "robot", category: "Special" },
  { id: "special-robot-4", label: "Robot Guard", variant: 4, styleRole: "robot", category: "Special" },
  { id: "special-clerk", label: "Clerk-Like", variant: 2, styleRole: "older-man", category: "Special" },
  { id: "special-nurse", label: "Nurse-Like", variant: 1, styleRole: "young-woman", category: "Special" },
  { id: "crypto-bro-5", label: "Crypto Bro", variant: 5, styleRole: "crypto-bro", category: "Cryptonia" },
  { id: "crypto-sister-6", label: "Crypto Sister", variant: 6, styleRole: "crypto-sister", category: "Cryptonia" },
  { id: "crypto-baron", label: "Token Baron", variant: 5, styleRole: "older-man", category: "Cryptonia" },
  { id: "crypto-analyst", label: "Yacht Analyst", variant: 2, styleRole: "young-man", category: "Cryptonia" },
  { id: "surv-camera-guard", label: "Camera Guard", variant: 4, styleRole: "older-man", category: "Surveillia" },
  { id: "surv-data-minder", label: "Data Minder", variant: 7, styleRole: "young-woman", category: "Surveillia" },
  { id: "surv-neon-patrol", label: "Neon Patrol", variant: 1, styleRole: "young-man", category: "Surveillia" },
  { id: "surv-robot", label: "Surveillance Bot", variant: 8, styleRole: "robot", category: "Surveillia" },
] as const;

const isSelectEditorMode = (mode: EditorMode) => mode === "select";

const colorForEditorBuildingKind = (kind: EditorBuildingKind): EditorBuildingColor => {
  if (kind === "shop") return "green";
  if (kind === "healing") return "blue";
  if (kind === "station") return "red";
  return "purple";
};

export function SelectedInspector({
  editorMode,
  editorSelection,
  selectedBuilding,
  selectedNpc,
  mapId,
  mapIdRef,
  rowsForMap,
  tileTypeFor,
  displayObjects,
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
}: {
  editorMode: EditorMode;
  editorSelection: EditorSelection;
  selectedBuilding: EditorBuildingAsset | null | undefined;
  selectedNpc: EditorNpcAsset | null | undefined;
  mapId: GameMapId;
  mapIdRef: MutableRefObject<GameMapId>;
  rowsForMap: (id: GameMapId) => string[][];
  tileTypeFor: (id: string) => { name: string; description?: string } | undefined;
  displayObjects: Record<string, string>;
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
  isTownMap: (id: GameMapId) => boolean;
}) {
  return (
    <>
      {isSelectEditorMode(editorMode) && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ ...VT, fontSize: "1.25rem", color: "#252018", marginBottom: 8 }}>
                  Inspector
                </div>

                {!editorSelection && (
                  <div style={{ ...RJ, fontSize: "0.9rem", color: "#66512c" }}>
                    Click an NPC, building, object, or tile to inspect it. Drag NPCs/buildings/objects to move them. Use the inspector to edit, duplicate, or delete.
                  </div>
                )}

                {editorSelection?.kind === "tile" && (() => {
                  const selectedTile = rowsForMap(mapId)[editorSelection.y]?.[editorSelection.x] ?? "G";
                  const selectedTerrain = tileTypeFor(selectedTile);
                  return (
                    <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                      Selected tile: {editorSelection.x},{editorSelection.y}
                      <br />
                      Terrain: <b>{selectedTerrain?.name ?? selectedTile}</b> ({selectedTile})
                    </div>
                  );
                })()}

                {selectedBuilding && (
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                      Building: <b>{BUILDING_KIND_LABEL[selectedBuilding!.kind]}</b> at {selectedBuilding!.x},{selectedBuilding!.y}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Type</span>
                        <select
                          value={selectedBuilding!.kind}
                          onChange={(e) => {
                            const kind = e.target.value as EditorBuildingKind;
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map((building: EditorBuildingAsset) => building.id === selectedBuilding!.id
                                ? { ...building, kind, crest: buildingCrestForKind(kind), color: colorForEditorBuildingKind(kind) }
                                : building
                              ).filter((building: EditorBuildingAsset, _: number, all: EditorBuildingAsset[]) => !UNIQUE_BUILDING_KINDS.has(building.kind) || building.id === selectedBuilding!.id || all.find((other: EditorBuildingAsset) => other.kind === building.kind)?.id === building.id);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        >
                          {BUILDING_TYPES.map(type => <option key={type.kind} value={type.kind}>{type.label}</option>)}
                        </select>
                      </label>

                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Color</span>
                        <select
                          value={selectedBuilding!.color}
                          onChange={(e) => {
                            const color = e.target.value as EditorBuildingColor;
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map((building: EditorBuildingAsset) => building.id === selectedBuilding!.id ? { ...building, color } : building);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        >
                          {BUILDING_COLORS.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>
                      </label>

                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Width</span>
                        <input
                          type="number"
                          min={3}
                          max={14}
                          value={selectedBuilding!.w}
                          onChange={(e) => {
                            const w = Number(e.target.value);
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map((building: EditorBuildingAsset) => building.id === selectedBuilding!.id ? { ...building, w } : building);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>

                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Height</span>
                        <input
                          type="number"
                          min={3}
                          max={10}
                          value={selectedBuilding!.h}
                          onChange={(e) => {
                            const h = Number(e.target.value);
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map((building: EditorBuildingAsset) => building.id === selectedBuilding!.id ? { ...building, h } : building);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>X</span>
                        <input
                          type="number"
                          value={selectedBuilding!.x}
                          onChange={(e) => moveEditorBuildingTo(selectedBuilding!, Number(e.target.value), selectedBuilding!.y)}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>
                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Y</span>
                        <input
                          type="number"
                          value={selectedBuilding!.y}
                          onChange={(e) => moveEditorBuildingTo(selectedBuilding!, selectedBuilding!.x, Number(e.target.value))}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>
                    </div>

                    <div style={{ ...RJ, fontSize: "0.82rem", color: "#66512c", fontWeight: 700 }}>
                      Drag the building to move it. Drag its bottom-right tile to resize it.
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => duplicateSelectedBuilding(selectedBuilding)}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
                      >
                        Duplicate Building
                      </button>
                      <button
                        type="button"
                        onClick={() => removeEditorBuilding(selectedBuilding)}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #ca4b36", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
                      >
                        Delete Building
                      </button>
                    </div>
                  </div>
                )}

                {editorSelection?.kind === "object" && (
                  <div style={{ display: "grid", gap: 8 }}>
                    <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                      Object at {editorSelection.coord}: <b>{displayObjects[editorSelection.coord]}</b>
                    </div>

                    <div style={{ ...RJ, fontSize: "0.82rem", color: "#66512c", fontWeight: 700 }}>
                      Drag the object on the editor grid to move it.
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => duplicateSelectedObject(editorSelection.coord)}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
                      >
                        Duplicate Object
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const id = mapIdRef.current;
                          setEditedObjectsByMap(prev => {
                            const base = prev[id] ?? { ...objectsForMap(id) };
                            const next = { ...base };
                            delete next[editorSelection.coord];
                            editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
                            return { ...prev, [id]: next };
                          });
                          setEditorSelection(null);
                        }}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #ca4b36", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
                      >
                        Delete Object
                      </button>
                    </div>
                  </div>
                )}

                {selectedNpc && (
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        width: 48,
                        height: 48,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#d7c58d",
                        border: "2px solid #252018",
                      }}>
                        {selectedNpc.appearance ? (
                          <CharacterRenderer
                            appearance={selectedNpc.appearance}
                            animation="idle"
                            facing="down"
                            pixelSize={1}
                            showShadow={false}
                          />
                        ) : selectedNpc.sheetAssetId ? (
                          <CharacterSheetRenderer
                            assetId={selectedNpc.sheetAssetId}
                            animation="idle"
                            facing="down"
                            pixelSize={1}
                            playing
                            showShadow={false}
                          />
                        ) : (
                          <span className={`npc-sprite npc-variant-${selectedNpc.variant ?? 0} ${selectedNpc.style ?? ""}`} />
                        )}
                      </span>
                      <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                        NPC at {selectedNpc.x},{selectedNpc.y}
                      </div>
                    </div>

                    <label style={{ display: "grid", gap: 4 }}>
                      <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Name</span>
                      <input
                        value={selectedNpc.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.map((npc: EditorNpcAsset) => npc.id === selectedNpc.id ? { ...npc, name: value } : npc));
                        }}
                        style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                      />
                    </label>

                    <label style={{ display: "grid", gap: 4 }}>
                      <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Dialogue, one line per row</span>
                      <textarea
                        value={selectedNpc.lines.join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value.split("\n").map(line => line.trim()).filter(Boolean);
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.map((npc: EditorNpcAsset) => npc.id === selectedNpc.id ? { ...npc, lines } : npc));
                        }}
                        style={{ minHeight: 76, padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace" }}
                      />
                    </label>

                    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#252018", ...RJ, fontSize: "1rem", fontWeight: 800 }}>
                      <input
                        type="checkbox"
                        checked={selectedNpc.walking !== false}
                        onChange={(e) => {
                          const walking = e.target.checked;
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.map((npc: EditorNpcAsset) => npc.id === selectedNpc.id ? { ...npc, walking } : npc));
                        }}
                      />
                      Walks around home tile
                    </label>

                    <div>
                      <div style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018", marginBottom: 6 }}>Change visual</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8, maxHeight: 180, overflow: "auto", paddingRight: 4 }}>
                        {NPC_VISUAL_PRESETS.map(preset => {
                          const style = isTownMap(mapId) ? `npc-town-${mapId} npc-role-${preset.styleRole}` : `npc-role-${preset.styleRole}`;
                          return (
                            <button
                              key={`selected-${preset.id}`}
                              type="button"
                              onClick={() => {
                                upsertEditedNpcsForMap(mapIdRef.current, current => current.map((npc: EditorNpcAsset) => npc.id === selectedNpc.id ? { ...npc, variant: preset.variant, style, sheetAssetId: undefined } : npc));
                              }}
                              style={{
                                minHeight: 58,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "6px 8px",
                                border: selectedNpc.variant === preset.variant && selectedNpc.style === style ? "4px solid #315f2a" : "2px solid #252018",
                                background: "#fff8c8",
                                color: "#252018",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ width: 36, height: 36, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "#d7c58d", border: "2px solid #252018", flexShrink: 0 }}>
                                <span className={`npc-sprite npc-variant-${preset.variant} ${style}`} />
                              </span>
                              <span style={{ ...VT, fontSize: "0.95rem", lineHeight: 1 }}>{preset.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => {
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.filter(npc => npc.id !== selectedNpc.id));
                          setEditorSelection(null);
                        }}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #ca4b36", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
                      >
                        Delete NPC
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const clone: EditorNpcAsset = {
                            ...selectedNpc,
                            id: `${mapIdRef.current}-editor-npc-${Date.now()}-copy`,
                            x: selectedNpc.x + 1,
                            homeX: selectedNpc.x + 1,
                            y: selectedNpc.y,
                            homeY: selectedNpc.y,
                            lines: [...selectedNpc.lines],
                          };
                          upsertEditedNpcsForMap(mapIdRef.current, current => [...current, clone]);
                          setEditorSelection({ kind: "npc", id: clone.id });
                        }}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
                      >
                        Duplicate NPC
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
    </>
  );
}
