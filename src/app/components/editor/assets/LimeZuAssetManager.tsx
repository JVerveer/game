import { useEffect, useMemo, useState } from "react";
import {
  LIMEZU_ASSET_CATALOG,
  assetManagerStats,
  classifyAsset,
  classifyAssets,
  exportAssetClassificationTs,
  readAssetClassification,
  resetDraftAssetClassification,
  type LimeZuAssetCategory,
  type LimeZuAssetClassification,
} from "./AssetCatalog";

const CATEGORIES: { id: LimeZuAssetCategory; label: string; description: string }[] = [
  { id: "uncategorized", label: "Uncategorized", description: "Assets you still need to classify" },
  { id: "terrain", label: "Terrain", description: "Ground/floor/water/path base tiles" },
  { id: "object", label: "Object", description: "Props placed on top of terrain" },
  { id: "building", label: "Building", description: "Buildings, walls, roofs, doors, windows" },
  { id: "character", label: "Character", description: "Hero/body/clothing sprites" },
  { id: "npc", label: "NPC", description: "NPC-specific sprites" },
  { id: "effect", label: "Effect", description: "VFX, particles, lighting, overlays" },
  { id: "ui", label: "UI", description: "Interface icons, panels, buttons" },
  { id: "ignore", label: "Ignore", description: "Duplicates, partials, unused assets" },
];

const BATCH_SIZE = 240;

export function LimeZuAssetManager({ onClose }: { onClose: () => void }) {
  const [classification, setClassification] = useState<LimeZuAssetClassification>(() => readAssetClassification());
  const [activeCategory, setActiveCategory] = useState<LimeZuAssetCategory>("uncategorized");
  const [query, setQuery] = useState("");
  const [packFilter, setPackFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [exportText, setExportText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const refresh = () => setClassification(readAssetClassification());
    window.addEventListener("limezu:asset-classification-changed", refresh);
    return () => window.removeEventListener("limezu:asset-classification-changed", refresh);
  }, []);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    setSelectedIds({});
  }, [activeCategory, packFilter, query]);

  const packs = useMemo(
    () => ["all", ...Array.from(new Set(LIMEZU_ASSET_CATALOG.map(asset => asset.pack))).sort()],
    [],
  );

  const stats = useMemo(() => assetManagerStats(), [classification]);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LIMEZU_ASSET_CATALOG.filter(asset => {
      const category = classification[asset.id] ?? asset.defaultCategory;
      const haystack = `${asset.label} ${asset.source} ${asset.pack} ${asset.tags.join(" ")}`.toLowerCase();
      return category === activeCategory && (packFilter === "all" || asset.pack === packFilter) && (!q || haystack.includes(q));
    });
  }, [activeCategory, classification, packFilter, query]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);
  const selectedAssetIds = Object.entries(selectedIds).filter(([, value]) => value).map(([id]) => id);

  function move(assetId: string, category: LimeZuAssetCategory) {
    classifyAsset(assetId, category);
    setClassification(readAssetClassification());
  }

  function moveSelected(category: LimeZuAssetCategory) {
    if (selectedAssetIds.length === 0) return;
    classifyAssets(selectedAssetIds, category);
    setClassification(readAssetClassification());
    setSelectedIds({});
  }

  function resetDraft() {
    resetDraftAssetClassification();
    setClassification(readAssetClassification());
    setSelectedIds({});
  }

  async function exportClassification() {
    const next = exportAssetClassificationTs();
    setExportText(next);
    setCopied(false);
    try {
      await navigator.clipboard.writeText(next);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Satiria LimeZu Asset Manager</div>
            <div style={subtitleStyle}>Classify assets today. Export the permanent global classification when done.</div>
          </div>
          <div style={topButtonsStyle}>
            <button type="button" onClick={resetDraft} style={buttonStyle}>Reset draft</button>
            <button type="button" onClick={exportClassification} style={exportButtonStyle}>Export Classification</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={statsStyle}>
          <strong>Total: {stats.total}</strong>
          {CATEGORIES.map(category => <span key={category.id}>{category.label}: {stats.counts[category.id] ?? 0}</span>)}
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>{copied ? "Copied to clipboard." : "Copy this text manually."}</strong>
            <span>Replace your <code>AssetClassification.ts</code> with this export.</span>
            <textarea value={exportText} readOnly style={exportTextareaStyle} />
          </div>
        )}

        <div style={categoryTabsStyle}>
          {CATEGORIES.map(category => {
            const active = activeCategory === category.id;
            return (
              <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} style={{ ...tabStyle, background: active ? "#fff3a8" : "#fff8c8", border: active ? "4px solid #ca4b36" : "2px solid #252018" }}>
                <strong>{category.label}</strong><span>{stats.counts[category.id] ?? 0}</span><small>{category.description}</small>
              </button>
            );
          })}
        </div>

        <div style={filterBarStyle}>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search current category..." style={searchStyle} />
          <select value={packFilter} onChange={event => setPackFilter(event.target.value)} style={selectStyle}>
            {packs.map(pack => <option key={pack} value={pack}>{pack}</option>)}
          </select>
        </div>

        <div style={bulkBarStyle}>
          <span>{selectedAssetIds.length} selected</span>
          {CATEGORIES.filter(category => category.id !== activeCategory).map(category => (
            <button key={category.id} type="button" onClick={() => moveSelected(category.id)} style={smallButtonStyle}>Move selected to {category.label}</button>
          ))}
        </div>

        <div style={assetGridStyle}>
          {visibleAssets.map(asset => {
            const selected = !!selectedIds[asset.id];
            return (
              <div key={asset.id} style={{ ...assetCardStyle, outline: selected ? "4px solid #315f2a" : undefined }} title={asset.source}>
                <label style={selectLabelStyle}>
                  <input type="checkbox" checked={selected} onChange={event => setSelectedIds(prev => ({ ...prev, [asset.id]: event.target.checked }))} /> Select
                </label>
                <img src={asset.src} alt="" style={assetImageStyle} />
                <div style={assetLabelStyle}>{asset.label}</div>
                <div style={assetSourceStyle}>{asset.pack}</div>
                <div style={assetSourceStyle}>{asset.width}x{asset.height} · {asset.source}</div>
                <div style={moveGridStyle}>
                  {CATEGORIES.filter(category => category.id !== activeCategory).map(category => (
                    <button key={category.id} type="button" onClick={() => move(asset.id, category.id)} style={smallButtonStyle}>{category.label}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < filteredAssets.length && <button type="button" onClick={() => setVisibleCount(count => count + BATCH_SIZE)} style={loadMoreStyle}>Load more ({visibleCount} / {filteredAssets.length})</button>}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, zIndex: 5000, background: "rgba(37,32,24,0.92)", padding: 18, overflow: "auto" };
const windowStyle: React.CSSProperties = { background: "#fff8c8", border: "4px solid #252018", padding: 16, color: "#252018" };
const topStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12 };
const titleStyle: React.CSSProperties = { fontWeight: 900, fontSize: "1.2rem" };
const subtitleStyle: React.CSSProperties = { fontWeight: 800, color: "#584c35", marginTop: 4 };
const topButtonsStyle: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const buttonStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff3a8", color: "#252018", padding: "9px 12px", cursor: "pointer", fontWeight: 900 };
const exportButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#315f2a", color: "#fff8c8" };
const doneButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#ca4b36", color: "#fff8c8" };
const statsStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, border: "2px solid #252018", background: "#f4e8b5", padding: 8, marginBottom: 10, fontWeight: 800 };
const exportPanelStyle: React.CSSProperties = { border: "2px solid #252018", background: "#f4e8b5", padding: 10, marginBottom: 12, display: "grid", gap: 6 };
const exportTextareaStyle: React.CSSProperties = { width: "100%", height: 220, boxSizing: "border-box", border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace", fontSize: 12 };
const categoryTabsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginBottom: 12 };
const tabStyle: React.CSSProperties = { display: "grid", gap: 4, padding: 10, color: "#252018", cursor: "pointer", textAlign: "left" };
const filterBarStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr minmax(220px, 340px)", gap: 8, marginBottom: 12 };
const searchStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "2px solid #252018", background: "#fff3a8", color: "#252018", padding: "10px 12px", fontWeight: 900 };
const selectStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff3a8", color: "#252018", padding: "10px 12px", fontWeight: 900 };
const bulkBarStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 10, fontWeight: 900 };
const assetGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10, maxHeight: "62vh", overflow: "auto" };
const assetCardStyle: React.CSSProperties = { border: "2px solid #252018", background: "#f4e8b5", padding: 8, display: "grid", gap: 6 };
const selectLabelStyle: React.CSSProperties = { fontSize: "0.75rem", fontWeight: 900 };
const assetImageStyle: React.CSSProperties = { width: 64, height: 64, objectFit: "contain", imageRendering: "pixelated", justifySelf: "center", background: "#d7c58d", border: "2px solid #252018" };
const assetLabelStyle: React.CSSProperties = { fontWeight: 900, fontSize: "0.8rem", textAlign: "center" };
const assetSourceStyle: React.CSSProperties = { fontSize: "0.62rem", fontWeight: 800, color: "#584c35", maxHeight: 32, overflow: "hidden", overflowWrap: "anywhere" };
const moveGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 };
const smallButtonStyle: React.CSSProperties = { border: "1px solid #252018", background: "#fff8c8", color: "#252018", padding: "4px 5px", cursor: "pointer", fontWeight: 900, fontSize: "0.68rem" };
const loadMoreStyle: React.CSSProperties = { ...buttonStyle, width: "100%", marginTop: 12 };
