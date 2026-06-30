import { useMemo, useState } from "react";
import { getBuildingAssets } from "./BuildingLibrary";
import type { LimeZuRuntimeAsset } from "../../../assets/limezu/types";
import {
  BUILDING_CATALOG_GRID_HEIGHT,
  BUILDING_CATALOG_GRID_WIDTH,
  clearBuildingCatalogDraft,
  createEmptyBuildingCatalogDraft,
  draftToPrefab,
  exportDraftAsCatalogEntry,
  prefabToDraft,
  readBuildingCatalogDraft,
  removeTile,
  setTile,
  tileAt,
  writeBuildingCatalogDraft,
  type BuildingBuilderTool,
  type BuildingCatalogBuilderDraft,
} from "../../../assets/limezu/BuildingCatalogBuilderRuntime";
import type { BuildingCatalogLayer, BuildingCatalogPrefab } from "../../../assets/limezu/BuildingPrefabCatalog";
import { humanBuildingAssetLabel } from "../../../assets/limezu/BuildingPlacementRuntime";
import {
  deleteBuildingPrefab,
  exportBuildingPrefabCatalogFile,
  readBuildingPrefabs,
  upsertBuildingPrefab,
  type BuildingPrefab,
} from "../../../assets/limezu/BuildingPrefabRuntime";

const TILE_SIZE = 40;
const TOOLS: BuildingBuilderTool[] = ["brush", "eraser", "picker", "fill"];
const LAYERS: BuildingCatalogLayer[] = ["base", "decor", "collision"];
const BUILDING_COLOR_OPTIONS: BuildingCatalogBuilderDraft["color"][] = [
  "default",
  "purple",
  "red",
  "green",
  "white",
  "orange",
  "blue",
  "yellow",
];

function selectedAssetMeta(assetById: Map<string, LimeZuRuntimeAsset>, assetId: string) {
  const asset = assetById.get(assetId);
  return asset
    ? { assetId: asset.id, src: asset.src, width: asset.width, height: asset.height }
    : { assetId };
}

function sanitizeIdPreview(name: string) {
  return `building-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "prefab"}`;
}

function normalizeCatalogPrefab(prefab: BuildingPrefab): BuildingCatalogPrefab {
  return {
    id: prefab.id,
    name: prefab.name,
    kind: prefab.kind,
    color: prefab.color,
    width: prefab.width,
    height: prefab.height,
    tiles: prefab.tiles
      .filter(tile => tile.assetId || tile.src || tile.collision)
      .sort((a, b) => a.y - b.y || a.x - b.x || a.layer.localeCompare(b.layer)),
    entrance: prefab.entrance,
    entrances: prefab.entrances?.length ? prefab.entrances : [prefab.entrance],
    tags: prefab.tags,
  };
}

function sortedPrefabs(prefabs: readonly BuildingCatalogPrefab[]) {
  return [...prefabs].sort((a, b) => a.name.localeCompare(b.name));
}

function upsertWorkingPrefab(
  prefabs: readonly BuildingCatalogPrefab[],
  prefab: BuildingCatalogPrefab,
) {
  const next = prefabs.filter(item => item.id !== prefab.id);
  next.push(prefab);
  return sortedPrefabs(next);
}

function BuildingAssetPalette({
  assets,
  selectedAssetId,
  onSelect,
}: {
  assets: LimeZuRuntimeAsset[];
  selectedAssetId: string;
  onSelect: (assetId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [visibleCount, setVisibleCount] = useState(80);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return assets.filter((asset: LimeZuRuntimeAsset) => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return (group === "all" || haystack.includes(group)) && (!q || haystack.includes(q));
    });
  }, [assets, group, query]);

  return (
    <div style={paletteStyle}>
      <div style={titleStyle}>Building Materials</div>

      <input
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          setVisibleCount(80);
        }}
        placeholder="Search wall, roof, door..."
        style={inputStyle}
      />

      <select
        value={group}
        onChange={event => {
          setGroup(event.target.value);
          setVisibleCount(80);
        }}
        style={inputStyle}
      >
        {[
          "all",
          "buildingset1",
          "buildingset2",
          "buildingset3",
          "buildingset4",
          "buildingset5",
          "buildingset6",
          "buildingset7",
          "buildingset8",
          "buildingset9",
          "buildingset10",
          "buildingset11",
          "buildingset12",
          "buildingset13",
          "buildingset14",
          "buildingset15",
          "buildingset16",
          "wall",
          "roof",
          "door",
          "window",
          "sign",
          "garage",
          "garden",
          "office",
          "house",
          "post",
        ].map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <div style={assetGridStyle}>
        {filteredAssets.slice(0, visibleCount).map(asset => {
          const selected = selectedAssetId === asset.id;

          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => onSelect(asset.id)}
              title={asset.source}
              style={{
                ...assetButtonStyle,
                border: selected ? "4px solid #315f2a" : "2px solid #252018",
                background: selected ? "#d8f0b0" : "#fff8c8",
              }}
            >
              <span style={assetPreviewStyle}>
                <img src={asset.src} alt="" loading="lazy" style={assetImageStyle} />
              </span>
              <span style={assetLabelStyle}>{humanBuildingAssetLabel(asset.label)}</span>
            </button>
          );
        })}
      </div>

      {visibleCount < filteredAssets.length && (
        <button type="button" onClick={() => setVisibleCount(count => count + 80)} style={buttonStyle}>
          Load more
        </button>
      )}
    </div>
  );
}

function BuildingGrid({
  draft,
  assetById,
  setDraft,
  pushHistory,
}: {
  draft: BuildingCatalogBuilderDraft;
  assetById: Map<string, LimeZuRuntimeAsset>;
  setDraft: (draft: BuildingCatalogBuilderDraft) => void;
  pushHistory: (draft: BuildingCatalogBuilderDraft) => void;
}) {
  function applyAt(x: number, y: number) {
    if (draft.tool === "picker") {
      const picked = tileAt(draft, x, y, draft.selectedLayer);
      if (picked?.assetId) {
        setDraft({ ...draft, selectedAssetId: picked.assetId, tool: "brush" });
      }
      return;
    }

    pushHistory(draft);

    if (draft.tool === "eraser") {
      setDraft(removeTile(draft, x, y, draft.selectedLayer));
      return;
    }

    if (draft.tool === "fill") {
      let next = {
        ...draft,
        tiles: draft.tiles.filter(tile => tile.layer !== draft.selectedLayer),
      };

      for (let yy = 0; yy < BUILDING_CATALOG_GRID_HEIGHT; yy += 1) {
        for (let xx = 0; xx < BUILDING_CATALOG_GRID_WIDTH; xx += 1) {
          next = setTile(next, {
            x: xx,
            y: yy,
            layer: draft.selectedLayer,
            ...(draft.selectedLayer === "collision" ? {} : selectedAssetMeta(assetById, draft.selectedAssetId)),
            collision: draft.selectedLayer === "collision" ? true : undefined,
          });
        }
      }

      setDraft(next);
      return;
    }

    if (draft.selectedLayer === "collision") {
      const current = tileAt(draft, x, y, "collision");
      setDraft(
        current?.collision
          ? removeTile(draft, x, y, "collision")
          : setTile(draft, { x, y, layer: "collision", collision: true }),
      );
      return;
    }

    if (!draft.selectedAssetId) return;

    setDraft(setTile(draft, {
      x,
      y,
      layer: draft.selectedLayer,
      ...selectedAssetMeta(assetById, draft.selectedAssetId),
    }));
  }

  const tileLookup = useMemo(() => {
    const lookup = new Map<string, ReturnType<typeof tileAt>>();
    for (const tile of draft.tiles) {
      lookup.set(`${tile.layer}:${tile.x},${tile.y}`, tile);
    }
    return lookup;
  }, [draft.tiles]);

  const cells = [];

  for (let y = 0; y < BUILDING_CATALOG_GRID_HEIGHT; y += 1) {
    for (let x = 0; x < BUILDING_CATALOG_GRID_WIDTH; x += 1) {
      const base = tileLookup.get(`base:${x},${y}`);
      const decor = tileLookup.get(`decor:${x},${y}`);
      const collision = tileLookup.get(`collision:${x},${y}`);
      const baseAsset = base?.assetId ? assetById.get(base.assetId) : undefined;
      const decorAsset = decor?.assetId ? assetById.get(decor.assetId) : undefined;
      const entranceIndex = draft.entrances.findIndex(entrance => entrance.x === x && entrance.y === y);
      const entrance = entranceIndex >= 0;

      cells.push(
        <button
          key={`${x}-${y}`}
          type="button"
          onClick={() => applyAt(x, y)}
          title={`${x}, ${y}`}
          style={{
            position: "absolute",
            left: x * TILE_SIZE,
            top: y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
            border: "1px solid rgba(37,32,24,0.5)",
            background: "rgba(255,248,200,0.7)",
            padding: 0,
            cursor: draft.tool === "picker" ? "crosshair" : "pointer",
          }}
        >
          {baseAsset && <i style={{ ...gridAssetStyle, backgroundImage: `url(${baseAsset.src})` }} />}
          {decorAsset && <i style={{ ...gridAssetStyle, backgroundImage: `url(${decorAsset.src})` }} />}
          {collision?.collision && <i style={collisionStyle} />}
          {entrance && <span style={entranceStyle}>DOOR {entranceIndex + 1}</span>}
        </button>,
      );
    }
  }

  return (
    <div style={canvasOuterStyle}>
      <div style={canvasInfoStyle}>{BUILDING_CATALOG_GRID_WIDTH} × {BUILDING_CATALOG_GRID_HEIGHT} building grid</div>
      <div
        style={{
          position: "relative",
          width: BUILDING_CATALOG_GRID_WIDTH * TILE_SIZE,
          height: BUILDING_CATALOG_GRID_HEIGHT * TILE_SIZE,
          backgroundColor: "#d7c58d",
          backgroundImage:
            "linear-gradient(45deg, rgba(37,32,24,.12) 25%, transparent 25%), linear-gradient(-45deg, rgba(37,32,24,.12) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(37,32,24,.12) 75%), linear-gradient(-45deg, transparent 75%, rgba(37,32,24,.12) 75%)",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
          backgroundSize: "16px 16px",
        }}
      >
        {cells}
      </div>
    </div>
  );
}

export function BuildingCatalogBuilder({ onClose }: { onClose: () => void }) {
  const buildingAssets = useMemo(() => getBuildingAssets(), []);
  const buildingAssetById = useMemo(
    () => new Map(buildingAssets.flatMap(asset => [[asset.id, asset], [asset.sourceAssetId, asset]] as [string | undefined, LimeZuRuntimeAsset][])
      .filter((entry): entry is [string, LimeZuRuntimeAsset] => !!entry[0])),
    [buildingAssets],
  );
  const [workingCatalog, setWorkingCatalog] = useState<BuildingCatalogPrefab[]>(() =>
    sortedPrefabs(Object.values(readBuildingPrefabs()).map(normalizeCatalogPrefab)),
  );
  const [draft, setDraftState] = useState(() => readBuildingCatalogDraft());
  const [history, setHistory] = useState<BuildingCatalogBuilderDraft[]>([]);
  const [future, setFuture] = useState<BuildingCatalogBuilderDraft[]>([]);
  const [selectedPrefabId, setSelectedPrefabId] = useState("");
  const [exportText, setExportText] = useState("");

  function setDraft(next: BuildingCatalogBuilderDraft) {
    const fixed: BuildingCatalogBuilderDraft = {
      ...next,
      width: BUILDING_CATALOG_GRID_WIDTH,
      height: BUILDING_CATALOG_GRID_HEIGHT,
    };
    setDraftState(fixed);
    writeBuildingCatalogDraft(fixed);
  }

  function pushHistory(current: BuildingCatalogBuilderDraft) {
    setHistory(prev => [...prev.slice(-40), current]);
    setFuture([]);
  }

  function update(patch: Partial<BuildingCatalogBuilderDraft>) {
    setDraft({ ...draft, ...patch });
  }

  function syncEntrances(entrances: BuildingCatalogBuilderDraft["entrances"]) {
    const safeEntrances = (entrances.length
      ? entrances
      : [{ x: Math.floor(BUILDING_CATALOG_GRID_WIDTH / 2), y: BUILDING_CATALOG_GRID_HEIGHT - 1 }]
    ).map(entrance => ({
      x: Math.max(0, Math.min(BUILDING_CATALOG_GRID_WIDTH - 1, entrance.x)),
      y: Math.max(0, Math.min(BUILDING_CATALOG_GRID_HEIGHT - 1, entrance.y)),
    }));
    setDraft({ ...draft, entrance: safeEntrances[0], entrances: safeEntrances });
  }

  function updateEntrance(index: number, patch: Partial<BuildingCatalogBuilderDraft["entrance"]>) {
    syncEntrances(
      draft.entrances.map((entrance, entranceIndex) =>
        entranceIndex === index ? { ...entrance, ...patch } : entrance,
      ),
    );
  }

  function addEntrance() {
    const lastEntrance = draft.entrances.at(-1) ?? draft.entrance;
    syncEntrances([...draft.entrances, { ...lastEntrance }]);
  }

  function removeEntrance(index: number) {
    syncEntrances(draft.entrances.filter((_, entranceIndex) => entranceIndex !== index));
  }

  function currentCatalogPrefab(): BuildingCatalogPrefab {
    return normalizeCatalogPrefab(draftToPrefab(draft));
  }

  function selectPrefab(prefab: BuildingCatalogPrefab) {
    setDraft(prefabToDraft(prefab));
    setSelectedPrefabId(prefab.id);
    setHistory([]);
    setFuture([]);
    setExportText("");
  }

  function saveDraftToWorkingCatalog() {
    const prefab = currentCatalogPrefab();
    setWorkingCatalog(current => upsertWorkingPrefab(current, prefab));
    setSelectedPrefabId(prefab.id);
    return prefab;
  }

  function undo() {
    const previous = history.at(-1);
    if (!previous) return;
    setFuture(prev => [draft, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    setDraft(previous);
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    setHistory(prev => [...prev, draft]);
    setFuture(prev => prev.slice(1));
    setDraft(next);
  }

  function newPrefab() {
    clearBuildingCatalogDraft();
    setDraftState(createEmptyBuildingCatalogDraft());
    setSelectedPrefabId("");
    setHistory([]);
    setFuture([]);
    setExportText("");
  }

  async function exportCatalogEntry() {
    const prefab = saveDraftToWorkingCatalog();
    const text = exportDraftAsCatalogEntry(prefabToDraft(prefab));
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  async function exportFullCatalog() {
    const prefab = currentCatalogPrefab();
    const nextCatalog = upsertWorkingPrefab(workingCatalog, prefab);
    const text = exportBuildingPrefabCatalogFile(nextCatalog);
    setWorkingCatalog(nextCatalog);
    setSelectedPrefabId(prefab.id);
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  function saveBrowserOnly() {
    const prefab = saveDraftToWorkingCatalog();
    upsertBuildingPrefab(prefab);
  }

  function deleteCurrentPrefab() {
    const prefab = currentCatalogPrefab();
    setWorkingCatalog(current => current.filter(item => item.id !== prefab.id));
    deleteBuildingPrefab(prefab.id);
    newPrefab();
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Building Catalog Builder</div>
            <div style={subtitleStyle}>
              Build, adjust, and delete reusable {BUILDING_CATALOG_GRID_WIDTH}×{BUILDING_CATALOG_GRID_HEIGHT} building prefabs. Copy the full catalog when the edited list should become source code.
            </div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={undo} style={buttonStyle}>Undo</button>
            <button type="button" onClick={redo} style={buttonStyle}>Redo</button>
            <button type="button" onClick={saveBrowserOnly} style={buttonStyle}>Save/Test</button>
            <button type="button" onClick={exportCatalogEntry} style={buttonStyle}>Copy Current Building</button>
            <button type="button" onClick={exportFullCatalog} style={saveButtonStyle}>Copy Full Catalog</button>
            <button type="button" onClick={deleteCurrentPrefab} style={dangerButtonStyle}>Delete Building</button>
            <button type="button" onClick={newPrefab} style={buttonStyle}>New Building</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={settingsStyle}>
          <label style={fieldStyle}>
            Building name
            <input value={draft.name} onChange={event => update({ name: event.target.value })} style={inputStyle} />
          </label>

          <label style={fieldStyle}>
            Catalog id preview
            <input value={sanitizeIdPreview(draft.name)} readOnly style={inputStyle} />
          </label>

          <label style={fieldStyle}>
            Kind
            <select value={draft.kind} onChange={event => update({ kind: event.target.value as BuildingCatalogBuilderDraft["kind"] })} style={inputStyle}>
              <option value="house">house</option>
              <option value="shop">shop</option>
              <option value="healing">healing</option>
              <option value="station">station</option>
              <option value="hall">hall</option>
            </select>
          </label>

          <label style={fieldStyle}>
            Color
            <select value={draft.color} onChange={event => update({ color: event.target.value as BuildingCatalogBuilderDraft["color"] })} style={inputStyle}>
              {BUILDING_COLOR_OPTIONS.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </label>

          <div style={entrancesPanelStyle}>
            <div style={entrancesHeaderStyle}>
              <span>Entrances</span>
              <button type="button" onClick={addEntrance} style={miniButtonStyle}>Add entrance</button>
            </div>
            {draft.entrances.map((entrance, index) => (
              <div key={`entrance-${index}`} style={entranceRowStyle}>
                <span style={entranceLabelStyle}>#{index + 1}</span>
                <label style={fieldStyle}>
                  X
                  <input
                    type="number"
                    min={0}
                    max={BUILDING_CATALOG_GRID_WIDTH - 1}
                    value={entrance.x}
                    onChange={event => updateEntrance(index, { x: Number(event.target.value) })}
                    style={inputStyle}
                  />
                </label>
                <label style={fieldStyle}>
                  Y
                  <input
                    type="number"
                    min={0}
                    max={BUILDING_CATALOG_GRID_HEIGHT - 1}
                    value={entrance.y}
                    onChange={event => updateEntrance(index, { y: Number(event.target.value) })}
                    style={inputStyle}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeEntrance(index)}
                  disabled={draft.entrances.length <= 1}
                  style={{
                    ...miniButtonStyle,
                    opacity: draft.entrances.length <= 1 ? 0.5 : 1,
                    cursor: draft.entrances.length <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={toolbarStyle}>
          <strong>Tool:</strong>
          {TOOLS.map(tool => (
            <button
              key={tool}
              type="button"
              onClick={() => update({ tool })}
              style={{
                ...buttonStyle,
                background: draft.tool === tool ? "#d8f0b0" : "#fff8c8",
                border: draft.tool === tool ? "4px solid #315f2a" : "2px solid #252018",
              }}
            >
              {tool}
            </button>
          ))}

          <strong>Layer:</strong>
          {LAYERS.map(layer => (
            <button
              key={layer}
              type="button"
              onClick={() => update({ selectedLayer: layer })}
              style={{
                ...buttonStyle,
                background: draft.selectedLayer === layer ? "#d8f0b0" : "#fff8c8",
                border: draft.selectedLayer === layer ? "4px solid #315f2a" : "2px solid #252018",
              }}
            >
              {layer}
            </button>
          ))}
        </div>

        <div style={mainStyle}>
          <div style={catalogStyle}>
            <div style={titleStyle}>Existing Buildings</div>
            <div style={catalogHintStyle}>
              Select one to edit it. Deletes and edits are reflected when copying the full catalog.
            </div>
            <div style={catalogListStyle}>
              {workingCatalog.map(prefab => {
                const selected = selectedPrefabId === prefab.id || sanitizeIdPreview(draft.name) === prefab.id;

                return (
                  <button
                    key={prefab.id}
                    type="button"
                    onClick={() => selectPrefab(prefab)}
                    style={{
                      ...catalogItemStyle,
                      background: selected ? "#d8f0b0" : "#fff8c8",
                      border: selected ? "4px solid #315f2a" : "2px solid #252018",
                    }}
                  >
                    <span style={catalogNameStyle}>{prefab.name}</span>
                    <span style={catalogIdStyle}>{prefab.id}</span>
                    <span style={catalogTagsStyle}>{prefab.kind} · {prefab.color} · {prefab.tags.join(", ")}</span>
                  </button>
                );
              })}
              {!workingCatalog.length && (
                <div style={emptyCatalogStyle}>No buildings in the working catalog yet.</div>
              )}
            </div>
          </div>
          <BuildingAssetPalette assets={buildingAssets} selectedAssetId={draft.selectedAssetId} onSelect={assetId => update({ selectedAssetId: assetId, tool: "brush" })} />
          <BuildingGrid draft={draft} assetById={buildingAssetById} setDraft={setDraft} pushHistory={pushHistory} />
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>Paste this code into src/app/assets/limezu/BuildingPrefabCatalog.ts, or paste the object into BUILDING_PREFAB_CATALOG when copying one building.</strong>
            <textarea value={exportText} readOnly style={exportTextareaStyle} />
          </div>
        )}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, zIndex: 5900, background: "rgba(37,32,24,0.94)", padding: 18, overflow: "auto" };
const windowStyle: React.CSSProperties = { background: "#fff8c8", border: "4px solid #252018", padding: 16, color: "#252018" };
const topStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 };
const titleStyle: React.CSSProperties = { fontFamily: "'VT323', monospace", fontSize: "1.6rem", lineHeight: 1, fontWeight: 900 };
const subtitleStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.82rem", fontWeight: 900, color: "#584c35", maxWidth: 720 };
const topButtonsStyle: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const buttonStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: "7px 10px", fontWeight: 900, cursor: "pointer" };
const miniButtonStyle: React.CSSProperties = { ...buttonStyle, padding: "5px 8px", fontSize: "0.7rem" };
const saveButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#315f2a", color: "#fff8c8" };
const dangerButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#b85b3f", color: "#fff8c8" };
const doneButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#ca4b36", color: "#fff8c8" };
const settingsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 8, marginBottom: 10 };
const fieldStyle: React.CSSProperties = { display: "grid", gap: 4, fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "0.72rem" };
const inputStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: 8, fontWeight: 900 };
const entrancesPanelStyle: React.CSSProperties = { gridColumn: "span 2", border: "2px solid #252018", background: "#f4e8b5", padding: 8, display: "grid", gap: 6 };
const entrancesHeaderStyle: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontFamily: "'Rajdhani', sans-serif", fontWeight: 900 };
const entranceRowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "auto minmax(70px, 1fr) minmax(70px, 1fr) auto", gap: 6, alignItems: "end" };
const entranceLabelStyle: React.CSSProperties = { fontFamily: "'VT323', monospace", fontSize: "1.25rem", alignSelf: "center" };
const toolbarStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10, border: "2px solid #252018", background: "#f4e8b5", padding: 8 };
const mainStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "minmax(220px, 280px) 320px minmax(0, 1fr)", gap: 12, alignItems: "start" };
const catalogStyle: React.CSSProperties = { border: "3px solid #252018", background: "#f4e8b5", padding: 10, display: "grid", gap: 8 };
const catalogHintStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.72rem", fontWeight: 900, color: "#584c35" };
const catalogListStyle: React.CSSProperties = { display: "grid", gap: 6, maxHeight: "62vh", overflow: "auto", paddingRight: 2 };
const catalogItemStyle: React.CSSProperties = { display: "grid", gap: 2, color: "#252018", cursor: "pointer", textAlign: "left", padding: 8 };
const catalogNameStyle: React.CSSProperties = { fontFamily: "'VT323', monospace", fontSize: "1.12rem", lineHeight: 1 };
const catalogIdStyle: React.CSSProperties = { fontFamily: "monospace", fontSize: "0.62rem", color: "#584c35", overflowWrap: "anywhere" };
const catalogTagsStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.68rem", fontWeight: 900, color: "#315f2a" };
const emptyCatalogStyle: React.CSSProperties = { border: "2px dashed #8d7a52", padding: 10, fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, color: "#584c35" };
const paletteStyle: React.CSSProperties = { border: "3px solid #252018", background: "#f4e8b5", padding: 10, display: "grid", gap: 8 };
const assetGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(95px, 1fr))", gap: 7, maxHeight: "62vh", overflow: "auto", paddingRight: 4 };
const assetButtonStyle: React.CSSProperties = { display: "grid", gap: 4, justifyItems: "center", padding: 6, color: "#252018", cursor: "pointer" };
const assetPreviewStyle: React.CSSProperties = { width: 52, height: 52, display: "grid", placeItems: "center", background: "#d7c58d", border: "2px solid #252018", overflow: "hidden" };
const assetImageStyle: React.CSSProperties = { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", imageRendering: "pixelated" };
const assetLabelStyle: React.CSSProperties = { fontSize: "0.61rem", fontWeight: 900, lineHeight: 1, maxHeight: 30, overflow: "hidden", textAlign: "center" };
const canvasOuterStyle: React.CSSProperties = { border: "4px solid #252018", background: "#584c35", padding: 12, overflow: "auto", maxHeight: "72vh" };
const canvasInfoStyle: React.CSSProperties = { color: "#fff8c8", fontWeight: 900, marginBottom: 8, fontFamily: "'Rajdhani', sans-serif" };
const gridAssetStyle: React.CSSProperties = { position: "absolute", inset: 0, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center", imageRendering: "pixelated", pointerEvents: "none" };
const collisionStyle: React.CSSProperties = { position: "absolute", inset: 4, background: "rgba(202,75,54,0.45)", border: "2px solid #ca4b36", pointerEvents: "none" };
const entranceStyle: React.CSSProperties = { position: "absolute", left: 2, right: 2, bottom: 2, background: "#315f2a", color: "#fff8c8", fontSize: 8, fontWeight: 900, pointerEvents: "none" };
const exportPanelStyle: React.CSSProperties = { marginTop: 12, border: "2px solid #252018", background: "#fff3a8", padding: 8, display: "grid", gap: 6 };
const exportTextareaStyle: React.CSSProperties = { width: "100%", height: 260, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace", fontSize: 12, boxSizing: "border-box" };
