import { useEffect, useMemo, useState } from "react";
import {
  LIMEZU_ASSET_CATALOG,
  assetManagerStats,
  classifyAsset,
  classifyAssets,
  exportAssetClassificationTs,
  exportAssetMetadataTs,
  readAssetClassification,
  readAssetMetadata,
  resetDraftAssetClassification,
  uncategorizeAsset,
  updateAssetMetadata,
  type LimeZuAssetCategory,
  type LimeZuAssetClassification,
  type LimeZuAssetMetadata,
  type LimeZuCatalogAsset,
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

type SortMode = "name" | "source" | "size" | "pack";
type DuplicateMode = "all" | "duplicatesOnly" | "uniqueOnly";

const BATCH_SIZE = 240;

function normalizeAssetName(asset: LimeZuCatalogAsset) {
  return asset.label
    .toLowerCase()
    .replace(/\b\d+x\d+\b/g, "")
    .replace(/\b(16x16|32x32|48x48)\b/g, "")
    .replace(/\bcopy\b/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function duplicateKeyFor(asset: LimeZuCatalogAsset) {
  // Name + dimensions catches true duplicate exports while keeping intentional size variants apart.
  return `${normalizeAssetName(asset)}::${asset.width}x${asset.height}`;
}

function compareAssets(a: LimeZuCatalogAsset, b: LimeZuCatalogAsset, sortMode: SortMode) {
  if (sortMode === "source") {
    return a.source.localeCompare(b.source) || a.label.localeCompare(b.label);
  }

  if (sortMode === "size") {
    return a.width - b.width || a.height - b.height || normalizeAssetName(a).localeCompare(normalizeAssetName(b));
  }

  if (sortMode === "pack") {
    return a.pack.localeCompare(b.pack) || normalizeAssetName(a).localeCompare(normalizeAssetName(b));
  }

  return normalizeAssetName(a).localeCompare(normalizeAssetName(b))
    || a.width - b.width
    || a.height - b.height
    || a.pack.localeCompare(b.pack)
    || a.source.localeCompare(b.source);
}

function groupAssetsByDuplicateKey(assets: LimeZuCatalogAsset[]) {
  const groups = new Map<string, LimeZuCatalogAsset[]>();

  for (const asset of assets) {
    const key = duplicateKeyFor(asset);
    groups.set(key, [...(groups.get(key) ?? []), asset]);
  }

  return groups;
}

function duplicateCountFor(asset: LimeZuCatalogAsset, groups: Map<string, LimeZuCatalogAsset[]>) {
  return groups.get(duplicateKeyFor(asset))?.length ?? 1;
}

export function LimeZuAssetManager({ onClose }: { onClose: () => void }) {
  const [classification, setClassification] = useState<LimeZuAssetClassification>(() => readAssetClassification());
  const [metadata, setMetadata] = useState<LimeZuAssetMetadata>(() => readAssetMetadata());
  const [activeCategory, setActiveCategory] = useState<LimeZuAssetCategory>("uncategorized");
  const [query, setQuery] = useState("");
  const [packFilter, setPackFilter] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("name");
  const [duplicateMode, setDuplicateMode] = useState<DuplicateMode>("all");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [exportText, setExportText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setClassification(readAssetClassification());
      setMetadata(readAssetMetadata());
    };
    window.addEventListener("limezu:asset-classification-changed", refresh);
    window.addEventListener("limezu:asset-metadata-changed", refresh);
    return () => {
      window.removeEventListener("limezu:asset-classification-changed", refresh);
      window.removeEventListener("limezu:asset-metadata-changed", refresh);
    };
  }, []);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    setSelectedIds({});
  }, [activeCategory, packFilter, query, sortMode, duplicateMode]);

  const packs = useMemo(
    () => ["all", ...Array.from(new Set(LIMEZU_ASSET_CATALOG.map(asset => asset.pack))).sort()],
    [],
  );

  const stats = useMemo(() => assetManagerStats(), [classification]);

  const currentCategoryAssets = useMemo(() => {
    return LIMEZU_ASSET_CATALOG.filter(asset => {
      const category = classification[asset.id] ?? asset.defaultCategory;
      return category === activeCategory;
    });
  }, [activeCategory, classification]);

  const duplicateGroups = useMemo(() => groupAssetsByDuplicateKey(currentCategoryAssets), [currentCategoryAssets]);

  const duplicateGroupCount = useMemo(
    () => Array.from(duplicateGroups.values()).filter(group => group.length > 1).length,
    [duplicateGroups],
  );

  const duplicateAssetCount = useMemo(
    () => Array.from(duplicateGroups.values()).filter(group => group.length > 1).reduce((total, group) => total + group.length, 0),
    [duplicateGroups],
  );

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return currentCategoryAssets
      .filter(asset => {
        const haystack = `${asset.label} ${normalizeAssetName(asset)} ${asset.source} ${asset.pack} ${asset.tags.join(" ")}`.toLowerCase();
        const duplicateCount = duplicateCountFor(asset, duplicateGroups);
        const duplicateAllowed =
          duplicateMode === "all" ||
          (duplicateMode === "duplicatesOnly" && duplicateCount > 1) ||
          (duplicateMode === "uniqueOnly" && duplicateCount === 1);

        return duplicateAllowed
          && (packFilter === "all" || asset.pack === packFilter)
          && (!q || haystack.includes(q));
      })
      .sort((a, b) => compareAssets(a, b, sortMode));
  }, [currentCategoryAssets, duplicateGroups, duplicateMode, packFilter, query, sortMode]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);
  const selectedAssetIds = Object.entries(selectedIds).filter(([, value]) => value).map(([id]) => id);

  function move(assetId: string, category: LimeZuAssetCategory) {
    classifyAsset(assetId, category);
    setClassification(readAssetClassification());
  }

  function uncategorize(assetId: string) {
    uncategorizeAsset(assetId);
    setClassification(readAssetClassification());
  }

  function moveSelected(category: LimeZuAssetCategory) {
    if (selectedAssetIds.length === 0) return;
    classifyAssets(selectedAssetIds, category);
    setClassification(readAssetClassification());
    setSelectedIds({});
  }

  function uncategorizeSelected() {
    if (selectedAssetIds.length === 0) return;
    classifyAssets(selectedAssetIds, "uncategorized");
    setClassification(readAssetClassification());
    setSelectedIds({});
  }

  function setObjectWalkable(assetId: string, objectWalkable: boolean) {
    updateAssetMetadata(assetId, { objectWalkable });
    setMetadata(readAssetMetadata());
  }

  function setBuildingPlacement(assetId: string, buildingPlacement: "outside" | "inside") {
    updateAssetMetadata(assetId, { buildingPlacement });
    setMetadata(readAssetMetadata());
  }

  function selectDuplicateGroup(asset: LimeZuCatalogAsset) {
    const group = duplicateGroups.get(duplicateKeyFor(asset)) ?? [];
    setSelectedIds(prev => {
      const next = { ...prev };
      for (const duplicate of group) next[duplicate.id] = true;
      return next;
    });
  }

  function ignoreDuplicateCopies(asset: LimeZuCatalogAsset) {
    const group = [...(duplicateGroups.get(duplicateKeyFor(asset)) ?? [])].sort((a, b) =>
      a.pack.localeCompare(b.pack) || a.source.localeCompare(b.source),
    );

    // Keep the first asset as the canonical copy and ignore the rest.
    const duplicatesToIgnore = group.slice(1).map(item => item.id);
    if (duplicatesToIgnore.length === 0) return;

    classifyAssets(duplicatesToIgnore, "ignore");
    setClassification(readAssetClassification());
    setSelectedIds({});
  }

  function resetDraft() {
    resetDraftAssetClassification();
    setClassification(readAssetClassification());
    setSelectedIds({});
  }

  async function exportClassification() {
    const next = `${exportAssetClassificationTs()}\n\n${exportAssetMetadataTs()}`;
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
            <div style={subtitleStyle}>
              Assets are sorted by normalized name. Use duplicate mode to find repeated names and move copies to Ignore.
            </div>
          </div>
          <div style={topButtonsStyle}>
            <button type="button" onClick={resetDraft} style={buttonStyle}>Reset draft</button>
            <button type="button" onClick={exportClassification} style={exportButtonStyle}>Export Classification + Metadata</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={statsStyle}>
          <strong>Total: {stats.total}</strong>
          {CATEGORIES.map(category => <span key={category.id}>{category.label}: {stats.counts[category.id] ?? 0}</span>)}
        </div>

        <div style={duplicateStatsStyle}>
          <strong>Current category:</strong>
          <span>{duplicateGroupCount} duplicate name groups</span>
          <span>{duplicateAssetCount} assets inside duplicate groups</span>
          <span>{filteredAssets.length} currently visible after filters</span>
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>{copied ? "Copied to clipboard." : "Copy this text manually."}</strong>
            <span>Use the first block for <code>AssetClassification.ts</code> and the second block for <code>AssetMetadata.ts</code>.</span>
            <textarea value={exportText} readOnly style={exportTextareaStyle} />
          </div>
        )}

        <div style={categoryTabsStyle}>
          {CATEGORIES.map(category => {
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
                <span>{stats.counts[category.id] ?? 0}</span>
                <small>{category.description}</small>
              </button>
            );
          })}
        </div>

        <div style={filterBarStyle}>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search current category by name, source, pack, tag..."
            style={searchStyle}
          />

          <select value={packFilter} onChange={event => setPackFilter(event.target.value)} style={selectStyle}>
            {packs.map(pack => <option key={pack} value={pack}>{pack}</option>)}
          </select>

          <select value={sortMode} onChange={event => setSortMode(event.target.value as SortMode)} style={selectStyle}>
            <option value="name">Sort by name</option>
            <option value="source">Sort by source path</option>
            <option value="size">Sort by size</option>
            <option value="pack">Sort by pack</option>
          </select>

          <select value={duplicateMode} onChange={event => setDuplicateMode(event.target.value as DuplicateMode)} style={selectStyle}>
            <option value="all">Show all</option>
            <option value="duplicatesOnly">Duplicate groups only</option>
            <option value="uniqueOnly">Unique only</option>
          </select>
        </div>

        <div style={bulkBarStyle}>
          <span>{selectedAssetIds.length} selected</span>
          {activeCategory === "uncategorized"
            ? CATEGORIES.filter(category => category.id !== "uncategorized").map(category => (
                <button key={category.id} type="button" onClick={() => moveSelected(category.id)} style={smallButtonStyle}>
                  Move selected to {category.label}
                </button>
              ))
            : (
                <button type="button" onClick={uncategorizeSelected} style={smallButtonStyle}>
                  Back to Uncategorized
                </button>
              )}
        </div>

        <div style={assetGridStyle}>
          {visibleAssets.map(asset => {
            const selected = !!selectedIds[asset.id];
            const duplicateCount = duplicateCountFor(asset, duplicateGroups);
            const duplicate = duplicateCount > 1;

            return (
              <div
                key={asset.id}
                style={{
                  ...assetCardStyle,
                  outline: selected ? "4px solid #315f2a" : undefined,
                  background: duplicate ? "#fff3a8" : "#f4e8b5",
                }}
                title={asset.source}
              >
                <label style={selectLabelStyle}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={event => setSelectedIds(prev => ({ ...prev, [asset.id]: event.target.checked }))}
                  /> Select
                </label>

                <img src={asset.src} alt="" loading="lazy" style={assetImageStyle} />

                <div style={assetLabelStyle}>{asset.label}</div>
                <div style={normalizedNameStyle}>name key: {normalizeAssetName(asset) || "unknown"}</div>

                {duplicate && (
                  <div style={duplicateBadgeStyle}>
                    Duplicate group: {duplicateCount}
                  </div>
                )}

                <div style={assetSourceStyle}>{asset.pack}</div>
                <div style={assetSourceStyle}>{asset.width}x{asset.height} · {asset.source}</div>

                {activeCategory === "object" && (
                  <div style={metadataControlStyle}>
                    <strong>Object collision</strong>
                    <div style={metadataButtonRowStyle}>
                      <button
                        type="button"
                        onClick={() => setObjectWalkable(asset.id, true)}
                        style={{
                          ...smallButtonStyle,
                          background: metadata[asset.id]?.objectWalkable === true ? "#d8f0b0" : "#fff8c8",
                        }}
                      >
                        Walkable
                      </button>
                      <button
                        type="button"
                        onClick={() => setObjectWalkable(asset.id, false)}
                        style={{
                          ...smallButtonStyle,
                          background: metadata[asset.id]?.objectWalkable !== true ? "#ffd1bf" : "#fff8c8",
                        }}
                      >
                        Blocking
                      </button>
                    </div>
                  </div>
                )}

                {activeCategory === "building" && (
                  <div style={metadataControlStyle}>
                    <strong>Building use</strong>
                    <div style={metadataButtonRowStyle}>
                      <button
                        type="button"
                        onClick={() => setBuildingPlacement(asset.id, "outside")}
                        style={{
                          ...smallButtonStyle,
                          background: (metadata[asset.id]?.buildingPlacement ?? "outside") === "outside" ? "#d8f0b0" : "#fff8c8",
                        }}
                      >
                        Outside
                      </button>
                      <button
                        type="button"
                        onClick={() => setBuildingPlacement(asset.id, "inside")}
                        style={{
                          ...smallButtonStyle,
                          background: metadata[asset.id]?.buildingPlacement === "inside" ? "#d8f0b0" : "#fff8c8",
                        }}
                      >
                        Inside
                      </button>
                    </div>
                  </div>
                )}

                {duplicate && (
                  <div style={duplicateActionsStyle}>
                    <button type="button" onClick={() => selectDuplicateGroup(asset)} style={smallButtonStyle}>
                      Select group
                    </button>
                    <button type="button" onClick={() => ignoreDuplicateCopies(asset)} style={dangerSmallButtonStyle}>
                      Ignore copies
                    </button>
                  </div>
                )}

                {activeCategory === "uncategorized" ? (
                  <div style={moveGridStyle}>
                    {CATEGORIES.filter(category => category.id !== "uncategorized").map(category => (
                      <button key={category.id} type="button" onClick={() => move(asset.id, category.id)} style={smallButtonStyle}>
                        {category.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button type="button" onClick={() => uncategorize(asset.id)} style={smallButtonStyle}>
                    Back to Uncategorized
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {visibleCount < filteredAssets.length && (
          <button type="button" onClick={() => setVisibleCount(count => count + BATCH_SIZE)} style={loadMoreStyle}>
            Load more ({visibleCount} / {filteredAssets.length})
          </button>
        )}
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
const statsStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, border: "2px solid #252018", background: "#f4e8b5", padding: 8, marginBottom: 8, fontWeight: 800 };
const duplicateStatsStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, border: "2px solid #252018", background: "#fff3a8", padding: 8, marginBottom: 10, fontWeight: 900 };
const exportPanelStyle: React.CSSProperties = { border: "2px solid #252018", background: "#f4e8b5", padding: 10, marginBottom: 12, display: "grid", gap: 6 };
const exportTextareaStyle: React.CSSProperties = { width: "100%", height: 220, boxSizing: "border-box", border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace", fontSize: 12 };
const categoryTabsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginBottom: 12 };
const tabStyle: React.CSSProperties = { display: "grid", gap: 4, padding: 10, color: "#252018", cursor: "pointer", textAlign: "left" };
const filterBarStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "minmax(240px, 1fr) minmax(180px, 280px) minmax(150px, 220px) minmax(170px, 230px)", gap: 8, marginBottom: 12 };
const searchStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "2px solid #252018", background: "#fff3a8", color: "#252018", padding: "10px 12px", fontWeight: 900 };
const selectStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff3a8", color: "#252018", padding: "10px 12px", fontWeight: 900 };
const bulkBarStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 10, fontWeight: 900 };
const assetGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 10, maxHeight: "62vh", overflow: "auto" };
const assetCardStyle: React.CSSProperties = { border: "2px solid #252018", padding: 8, display: "grid", gap: 6 };
const selectLabelStyle: React.CSSProperties = { fontSize: "0.75rem", fontWeight: 900 };
const assetImageStyle: React.CSSProperties = { width: 64, height: 64, objectFit: "contain", imageRendering: "pixelated", justifySelf: "center", background: "#d7c58d", border: "2px solid #252018" };
const assetLabelStyle: React.CSSProperties = { fontWeight: 900, fontSize: "0.8rem", textAlign: "center" };
const normalizedNameStyle: React.CSSProperties = { fontSize: "0.62rem", fontWeight: 900, color: "#315f2a", overflowWrap: "anywhere", textAlign: "center" };
const duplicateBadgeStyle: React.CSSProperties = { border: "2px solid #ca4b36", background: "#ffe2bf", color: "#252018", padding: "3px 5px", fontWeight: 900, fontSize: "0.68rem", textAlign: "center" };
const assetSourceStyle: React.CSSProperties = { fontSize: "0.62rem", fontWeight: 800, color: "#584c35", maxHeight: 32, overflow: "hidden", overflowWrap: "anywhere" };
const duplicateActionsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 };
const metadataControlStyle: React.CSSProperties = { border: "1px solid #8d7a52", background: "#fff3a8", padding: 6, display: "grid", gap: 5, fontSize: "0.68rem", fontWeight: 900 };
const metadataButtonRowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 };
const moveGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 };
const smallButtonStyle: React.CSSProperties = { border: "1px solid #252018", background: "#fff8c8", color: "#252018", padding: "4px 5px", cursor: "pointer", fontWeight: 900, fontSize: "0.68rem" };
const dangerSmallButtonStyle: React.CSSProperties = { ...smallButtonStyle, background: "#ca4b36", color: "#fff8c8" };
const loadMoreStyle: React.CSSProperties = { ...buttonStyle, width: "100%", marginTop: 12 };
