import { useMemo, useState } from "react";
import { getBuildingAssets } from "./BuildingLibrary";
import type { LimeZuRuntimeAsset } from "../../../assets/limezu/types";
import {
  clearBuildingCatalogDraft,
  createEmptyBuildingCatalogDraft,
  exportDraftAsCatalogEntry,
  readBuildingCatalogDraft,
  removeTile,
  saveDraftToBrowserPrefab,
  setTile,
  tileAt,
  writeBuildingCatalogDraft,
  type BuildingBuilderTool,
  type BuildingCatalogBuilderDraft,
} from "../../../assets/limezu/BuildingCatalogBuilderRuntime";
import type { BuildingCatalogLayer } from "../../../assets/limezu/BuildingPrefabCatalog";
import { humanBuildingAssetLabel } from "../../../assets/limezu/BuildingPlacementRuntime";

const TILE_SIZE = 40;
const TOOLS: BuildingBuilderTool[] = ["brush", "eraser", "picker", "fill"];
const LAYERS: BuildingCatalogLayer[] = ["base", "decor", "collision"];

function assetFor(assetId: string | undefined) {
  return getBuildingAssets().find(asset => asset.id === assetId);
}

function selectedAssetMeta(assetId: string) {
  const asset = assetFor(assetId);
  return asset
    ? { assetId: asset.id, src: asset.src, width: asset.width, height: asset.height }
    : { assetId };
}

function sanitizeIdPreview(name: string) {
  return `building-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "prefab"}`;
}

function BuildingAssetPalette({
  selectedAssetId,
  onSelect,
}: {
  selectedAssetId: string;
  onSelect: (assetId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [visibleCount, setVisibleCount] = useState(80);

  const assets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return getBuildingAssets().filter((asset: LimeZuRuntimeAsset) => {
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return (group === "all" || haystack.includes(group)) && (!q || haystack.includes(q));
    });
  }, [group, query]);

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
        {["all", "wall", "roof", "door", "window", "sign", "garage", "garden", "office", "house", "post"].map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <div style={assetGridStyle}>
        {assets.slice(0, visibleCount).map(asset => {
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

      {visibleCount < assets.length && (
        <button type="button" onClick={() => setVisibleCount(count => count + 80)} style={buttonStyle}>
          Load more
        </button>
      )}
    </div>
  );
}

function BuildingGrid({
  draft,
  setDraft,
  pushHistory,
}: {
  draft: BuildingCatalogBuilderDraft;
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

      for (let yy = 0; yy < 10; yy += 1) {
        for (let xx = 0; xx < 20; xx += 1) {
          next = setTile(next, {
            x: xx,
            y: yy,
            layer: draft.selectedLayer,
            ...(draft.selectedLayer === "collision" ? {} : selectedAssetMeta(draft.selectedAssetId)),
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
      ...selectedAssetMeta(draft.selectedAssetId),
    }));
  }

  const cells = [];

  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 20; x += 1) {
      const base = tileAt(draft, x, y, "base");
      const decor = tileAt(draft, x, y, "decor");
      const collision = tileAt(draft, x, y, "collision");
      const baseAsset = assetFor(base?.assetId);
      const decorAsset = assetFor(decor?.assetId);
      const entrance = draft.entrance.x === x && draft.entrance.y === y;

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
          {entrance && <span style={entranceStyle}>DOOR</span>}
        </button>,
      );
    }
  }

  return (
    <div style={canvasOuterStyle}>
      <div style={canvasInfoStyle}>20 × 10 building grid</div>
      <div
        style={{
          position: "relative",
          width: 20 * TILE_SIZE,
          height: 10 * TILE_SIZE,
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
  const [draft, setDraftState] = useState(() => readBuildingCatalogDraft());
  const [history, setHistory] = useState<BuildingCatalogBuilderDraft[]>([]);
  const [future, setFuture] = useState<BuildingCatalogBuilderDraft[]>([]);
  const [exportText, setExportText] = useState("");

  function setDraft(next: BuildingCatalogBuilderDraft) {
    const fixed = { ...next, width: 20 as const, height: 10 as const };
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

  function reset() {
    clearBuildingCatalogDraft();
    setDraftState(createEmptyBuildingCatalogDraft());
    setHistory([]);
    setFuture([]);
    setExportText("");
  }

  async function exportCatalogEntry() {
    const text = exportDraftAsCatalogEntry(draft);
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  function saveBrowserOnly() {
    saveDraftToBrowserPrefab(draft);
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Building Catalog Builder</div>
            <div style={subtitleStyle}>
              Build a 20×10 prefab, export the object, paste it into BuildingPrefabCatalog.ts, commit, then select it in the editor.
            </div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={undo} style={buttonStyle}>Undo</button>
            <button type="button" onClick={redo} style={buttonStyle}>Redo</button>
            <button type="button" onClick={saveBrowserOnly} style={buttonStyle}>Test in Browser</button>
            <button type="button" onClick={exportCatalogEntry} style={saveButtonStyle}>Export Catalog Entry</button>
            <button type="button" onClick={reset} style={dangerButtonStyle}>Reset</button>
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
              <option value="purple">purple</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
              <option value="red">red</option>
            </select>
          </label>

          <label style={fieldStyle}>
            Entrance X
            <input type="number" min={0} max={19} value={draft.entrance.x} onChange={event => update({ entrance: { ...draft.entrance, x: Number(event.target.value) } })} style={inputStyle} />
          </label>

          <label style={fieldStyle}>
            Entrance Y
            <input type="number" min={0} max={9} value={draft.entrance.y} onChange={event => update({ entrance: { ...draft.entrance, y: Number(event.target.value) } })} style={inputStyle} />
          </label>
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
          <BuildingAssetPalette selectedAssetId={draft.selectedAssetId} onSelect={assetId => update({ selectedAssetId: assetId, tool: "brush" })} />
          <BuildingGrid draft={draft} setDraft={setDraft} pushHistory={pushHistory} />
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>Paste this object into BUILDING_PREFAB_CATALOG in BuildingPrefabCatalog.ts</strong>
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
const saveButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#315f2a", color: "#fff8c8" };
const dangerButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#b85b3f", color: "#fff8c8" };
const doneButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#ca4b36", color: "#fff8c8" };
const settingsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 8, marginBottom: 10 };
const fieldStyle: React.CSSProperties = { display: "grid", gap: 4, fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "0.72rem" };
const inputStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: 8, fontWeight: 900 };
const toolbarStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10, border: "2px solid #252018", background: "#f4e8b5", padding: 8 };
const mainStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "320px minmax(0, 1fr)", gap: 12, alignItems: "start" };
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
