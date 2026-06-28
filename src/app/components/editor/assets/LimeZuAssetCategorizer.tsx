import { useEffect, useMemo, useState } from "react";
import {
  LIMEZU_ASSET_CATALOG,
  classifyAsset,
  exportAssetClassificationTs,
  readAssetClassification,
  resetDraftAssetClassification,
  type LimeZuAssetCategory,
  type LimeZuAssetClassification,
} from "./AssetCatalog";

const CATEGORIES: { id: LimeZuAssetCategory; label: string; description: string }[] = [
  { id: "terrain", label: "Terrain", description: "Ground/floor/water/path base tiles" },
  { id: "object", label: "Object", description: "Props placed on top of terrain" },
  { id: "building", label: "Building", description: "Buildings, walls, roofs, doors, windows" },
  { id: "ignore", label: "Ignore", description: "UI, duplicates, partials, unused sprites" },
];

export function LimeZuAssetCategorizer({
  onClose,
}: {
  onClose: () => void;
}) {
  const [classification, setClassification] = useState<LimeZuAssetClassification>(() => readAssetClassification());
  const [activeCategory, setActiveCategory] = useState<LimeZuAssetCategory>("terrain");
  const [query, setQuery] = useState("");
  const [packFilter, setPackFilter] = useState("all");
  const [exportText, setExportText] = useState("");

  useEffect(() => {
    const refresh = () => setClassification(readAssetClassification());
    window.addEventListener("limezu:asset-classification-changed", refresh);
    window.addEventListener("satiria:limezu-asset-classification-changed", refresh);
    return () => {
      window.removeEventListener("limezu:asset-classification-changed", refresh);
      window.removeEventListener("satiria:limezu-asset-classification-changed", refresh);
    };
  }, []);

  const packs = useMemo(
    () => ["all", ...Array.from(new Set(LIMEZU_ASSET_CATALOG.map(asset => asset.pack))).sort()],
    [],
  );

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return LIMEZU_ASSET_CATALOG.filter(asset => {
      const category = classification[asset.id] ?? asset.defaultCategory;
      const haystack = `${asset.label} ${asset.source} ${asset.pack} ${asset.tags.join(" ")}`.toLowerCase();

      return (
        category === activeCategory &&
        (packFilter === "all" || asset.pack === packFilter) &&
        (!q || haystack.includes(q))
      );
    });
  }, [activeCategory, classification, packFilter, query]);

  function move(assetId: string, category: LimeZuAssetCategory) {
    classifyAsset(assetId, category);
    setClassification(readAssetClassification());
  }

  function resetDraft() {
    resetDraftAssetClassification();
    setClassification(readAssetClassification());
  }

  async function copyExport() {
    const next = exportAssetClassificationTs();
    setExportText(next);

    try {
      await navigator.clipboard.writeText(next);
    } catch {
      // Textarea fallback remains visible.
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Global LimeZu Asset Categorizer</div>
            <div style={subtitleStyle}>
              Classifications are global for the whole LimeZu library, not tied to one map. Export to make them permanent.
            </div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={resetDraft} style={buttonStyle}>Reset draft</button>
            <button type="button" onClick={copyExport} style={exportButtonStyle}>Export AssetClassification.ts</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <div style={exportTitleStyle}>Copied if browser allowed it. Replace this file:</div>
            <code style={filePathStyle}>editor/assets/AssetClassification.ts</code>
            <code style={filePathStyle}>src/rendering/AssetClassification.ts</code>
            <textarea value={exportText} readOnly style={exportTextareaStyle} />
          </div>
        )}

        <div style={categoryTabsStyle}>
          {CATEGORIES.map(category => {
            const count = LIMEZU_ASSET_CATALOG.filter(asset => (classification[asset.id] ?? asset.defaultCategory) === category.id).length;
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                style={{
                  ...tabStyle,
                  background: active ? "#fff3a8" : "#fff8c8",
                  border: active ? "4px solid #ca4b36" : "2px solid #252018",
                }}
              >
                <strong>{category.label}</strong>
                <span>{count}</span>
                <small>{category.description}</small>
              </button>
            );
          })}
        </div>

        <div style={filterBarStyle}>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search current category..."
            style={searchStyle}
          />

          <select value={packFilter} onChange={event => setPackFilter(event.target.value)} style={selectStyle}>
            {packs.map(pack => (
              <option key={pack} value={pack}>{pack}</option>
            ))}
          </select>
        </div>

        <div style={assetGridStyle}>
          {filteredAssets.map(asset => (
            <div key={asset.id} style={assetCardStyle} title={asset.source}>
              <img src={asset.src} alt="" style={assetImageStyle} />
              <div style={assetLabelStyle}>{asset.label}</div>
              <div style={assetSourceStyle}>{asset.pack}</div>
              <div style={assetSourceStyle}>{asset.width}×{asset.height} · {asset.source}</div>

              <div style={moveGridStyle}>
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => move(asset.id, category.id)}
                    style={{
                      ...smallButtonStyle,
                      background: category.id === activeCategory ? "#ca4b36" : "#fff8c8",
                      color: category.id === activeCategory ? "#fff8c8" : "#252018",
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 4000,
  background: "rgba(37,32,24,0.92)",
  padding: 18,
  overflow: "auto",
};

const windowStyle: React.CSSProperties = {
  background: "#fff8c8",
  border: "4px solid #252018",
  padding: 16,
  color: "#252018",
};

const topStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  marginBottom: 12,
};

const titleStyle: React.CSSProperties = { fontWeight: 900, fontSize: "1.2rem" };
const subtitleStyle: React.CSSProperties = { fontWeight: 800, color: "#584c35", marginTop: 4 };
const topButtonsStyle: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };

const buttonStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "9px 12px",
  cursor: "pointer",
  fontWeight: 900,
};

const exportButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#315f2a", color: "#fff8c8" };
const doneButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#ca4b36", color: "#fff8c8" };

const exportPanelStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#f4e8b5",
  padding: 10,
  marginBottom: 12,
  display: "grid",
  gap: 6,
};

const exportTitleStyle: React.CSSProperties = { fontWeight: 900 };
const filePathStyle: React.CSSProperties = {
  display: "block",
  background: "#252018",
  color: "#fff8c8",
  padding: "4px 6px",
  width: "fit-content",
};

const exportTextareaStyle: React.CSSProperties = {
  width: "100%",
  height: 180,
  boxSizing: "border-box",
  border: "2px solid #252018",
  background: "#fff8c8",
  color: "#252018",
  fontFamily: "monospace",
  fontSize: 12,
};

const categoryTabsStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(160px, 1fr))",
  gap: 8,
  marginBottom: 12,
};

const tabStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 10,
  color: "#252018",
  cursor: "pointer",
  textAlign: "left",
};

const filterBarStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr minmax(220px, 340px)",
  gap: 8,
  marginBottom: 12,
};

const searchStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "10px 12px",
  fontWeight: 900,
};

const selectStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#fff3a8",
  color: "#252018",
  padding: "10px 12px",
  fontWeight: 900,
};

const assetGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
  gap: 10,
  maxHeight: "65vh",
  overflow: "auto",
};

const assetCardStyle: React.CSSProperties = {
  border: "2px solid #252018",
  background: "#f4e8b5",
  padding: 8,
  display: "grid",
  gap: 6,
};

const assetImageStyle: React.CSSProperties = {
  width: 64,
  height: 64,
  objectFit: "contain",
  imageRendering: "pixelated",
  justifySelf: "center",
  background: "#d7c58d",
  border: "2px solid #252018",
};

const assetLabelStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: "0.8rem",
  textAlign: "center",
};

const assetSourceStyle: React.CSSProperties = {
  fontSize: "0.62rem",
  fontWeight: 800,
  color: "#584c35",
  maxHeight: 32,
  overflow: "hidden",
  overflowWrap: "anywhere",
};

const moveGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 4,
};

const smallButtonStyle: React.CSSProperties = {
  border: "1px solid #252018",
  padding: "4px 5px",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: "0.68rem",
};
