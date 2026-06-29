import { useEffect, useMemo, useState } from "react";
import {
  CHARACTER_ASSET_CATALOG,
  type CharacterAsset,
  type CharacterAssetCategory,
  type CharacterAssetClassification,
} from "../../../assets/limezu/characters/CharacterAssetCatalog";
import {
  classifyCharacterAsset,
  classifyCharacterAssets,
  exportCharacterAssetClassificationTs,
  readCharacterAssetClassification,
  resetCharacterAssetDraft,
} from "../../../assets/limezu/characters/CharacterAssetRuntime";
import { CharacterSheetInspector } from "./CharacterSheetInspector";

type ManagerCategory = CharacterAssetCategory | "object" | "set";

const CATEGORIES: { id: ManagerCategory; label: string; description: string }[] = [
  { id: "uncategorized" as ManagerCategory, label: "Uncategorized", description: "Assets still needing review" },
  { id: "body" as ManagerCategory, label: "Body", description: "Base body / skin layers" },
  { id: "eyes" as ManagerCategory, label: "Eyes", description: "Eyes and face details" },
  { id: "hair" as ManagerCategory, label: "Hair", description: "Hair layers" },
  { id: "beard" as ManagerCategory, label: "Beard", description: "Facial hair" },
  { id: "outfit" as ManagerCategory, label: "Outfit", description: "Clothes / armor / uniforms" },
  { id: "hat" as ManagerCategory, label: "Hat", description: "Hats, helmets, headwear" },
  { id: "weapon" as ManagerCategory, label: "Weapon", description: "Weapons and shields" },
  { id: "accessory" as ManagerCategory, label: "Accessory", description: "Glasses, masks, bags, extras" },
  { id: "fullCharacter" as ManagerCategory, label: "Full Character", description: "Complete animated character sheets" },
  { id: "object", label: "Object", description: "Props that slipped into the character folder" },
  { id: "set", label: "Set", description: "Multi-part sheets or grouped character sets" },
  { id: "npc" as ManagerCategory, label: "NPC", description: "NPC-specific sprites" },
  { id: "monster" as ManagerCategory, label: "Monster", description: "Enemy and creature sprites" },
  { id: "portrait" as ManagerCategory, label: "Portrait", description: "Portrait / face images" },
  { id: "effect" as ManagerCategory, label: "Effect", description: "Character-related VFX/emotes" },
  { id: "ignore" as ManagerCategory, label: "Ignore", description: "Duplicates, wrong files, unused" },
];

const BATCH_SIZE = 180;

function categoryFor(classification: CharacterAssetClassification, asset: CharacterAsset): ManagerCategory {
  return ((classification as Record<string, string>)[asset.id] ?? asset.defaultCategory) as ManagerCategory;
}

function statsFor(classification: CharacterAssetClassification) {
  const counts = Object.fromEntries(CATEGORIES.map(category => [category.id, 0])) as Record<ManagerCategory, number>;
  for (const asset of CHARACTER_ASSET_CATALOG) {
    const category = categoryFor(classification, asset);
    counts[category] = (counts[category] ?? 0) + 1;
  }
  return { total: CHARACTER_ASSET_CATALOG.length, counts };
}

function compactSource(source: string) {
  const parts = source.split("/");
  if (parts.length <= 4) return source;
  return `${parts.slice(0, 2).join("/")}/.../${parts.slice(-2).join("/")}`;
}

function isSheet(asset: CharacterAsset) {
  return asset.width > 128 || asset.height > 128 || asset.columns > 2 || asset.rows > 2;
}

export function CharacterAssetManager({ onClose }: { onClose: () => void }) {
  const [classification, setClassification] = useState<CharacterAssetClassification>(() => readCharacterAssetClassification());
  const [activeCategory, setActiveCategory] = useState<ManagerCategory>("uncategorized" as ManagerCategory);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [exportText, setExportText] = useState("");
  const [copied, setCopied] = useState(false);
  const [inspectingAsset, setInspectingAsset] = useState<CharacterAsset | null>(null);

  useEffect(() => {
    const refresh = () => setClassification(readCharacterAssetClassification());
    window.addEventListener("limezu:character-asset-classification-changed", refresh);
    return () => window.removeEventListener("limezu:character-asset-classification-changed", refresh);
  }, []);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    setSelectedIds({});
  }, [activeCategory, query]);

  const stats = useMemo(() => statsFor(classification), [classification]);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHARACTER_ASSET_CATALOG.filter(asset => {
      const category = categoryFor(classification, asset);
      const haystack = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
      return category === activeCategory && (!q || haystack.includes(q));
    });
  }, [activeCategory, classification, query]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);
  const selectedAssetIds = Object.entries(selectedIds).filter(([, value]) => value).map(([id]) => id);

  function move(assetId: string, category: ManagerCategory) {
    classifyCharacterAsset(assetId, category as CharacterAssetCategory);
    setClassification(readCharacterAssetClassification());
  }

  function moveSelected(category: ManagerCategory) {
    if (selectedAssetIds.length === 0) return;
    classifyCharacterAssets(selectedAssetIds, category as CharacterAssetCategory);
    setClassification(readCharacterAssetClassification());
    setSelectedIds({});
  }

  async function exportClassification() {
    const next = exportCharacterAssetClassificationTs();
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
            <div style={titleStyle}>Character Asset Studio V24</div>
            <div style={subtitleStyle}>Click any thumbnail or Inspect Sheet to define sheet frames and animations.</div>
          </div>
          <div style={topButtonsStyle}>
            <button type="button" onClick={() => { resetCharacterAssetDraft(); setClassification(readCharacterAssetClassification()); }} style={buttonStyle}>Reset draft</button>
            <button type="button" onClick={exportClassification} style={exportButtonStyle}>Export Character Classification</button>
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
            <textarea value={exportText} readOnly style={exportTextareaStyle} />
          </div>
        )}

        <div style={categoryTabsStyle}>
          {CATEGORIES.map(category => {
            const active = activeCategory === category.id;
            return (
              <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} style={{ ...tabStyle, background: active ? "#fff3a8" : "#fff8c8", border: active ? "4px solid #ca4b36" : "2px solid #252018" }}>
                <strong>{category.label}</strong>
                <span>{stats.counts[category.id] ?? 0}</span>
                <small>{category.description}</small>
              </button>
            );
          })}
        </div>

        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search character assets..." style={searchStyle} />

        <div style={bulkBarStyle}>
          <span>{selectedAssetIds.length} selected</span>
          {CATEGORIES.filter(category => category.id !== activeCategory).map(category => <button key={category.id} type="button" onClick={() => moveSelected(category.id)} style={smallButtonStyle}>Move selected to {category.label}</button>)}
        </div>

        <div style={assetGridStyle}>
          {visibleAssets.map(asset => {
            const selected = !!selectedIds[asset.id];
            const category = categoryFor(classification, asset);
            const sheet = isSheet(asset) || category === "set" || category === "fullCharacter";
            return (
              <div key={asset.id} style={{ ...assetCardStyle, outline: selected ? "4px solid #315f2a" : undefined }} title={asset.source}>
                <label style={selectLabelStyle}><input type="checkbox" checked={selected} onChange={e => setSelectedIds(prev => ({ ...prev, [asset.id]: e.target.checked }))} /> Select</label>

                <button type="button" onClick={() => setInspectingAsset(asset)} style={previewButtonStyle} title="Open Sheet Inspector">
                  <img src={asset.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", imageRendering: "pixelated", display: "block" }} />
                  {sheet && <span style={previewBadgeStyle}>inspect</span>}
                </button>

                <div style={assetLabelStyle}>{asset.label}</div>
                <div style={assetSourceStyle}>{asset.width}x{asset.height} · frame {asset.frameWidth}x{asset.frameHeight}</div>
                <div style={assetSourceStyle}>category: {category}</div>
                <div style={assetSourceStyle}>{compactSource(asset.source)}</div>

                <button type="button" onClick={() => setInspectingAsset(asset)} style={inspectButtonStyle}>Inspect Sheet</button>

                <div style={moveGridStyle}>
                  {CATEGORIES.filter(categoryOption => categoryOption.id !== activeCategory).map(categoryOption => (
                    <button key={categoryOption.id} type="button" onClick={() => move(asset.id, categoryOption.id)} style={smallButtonStyle}>{categoryOption.label}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < filteredAssets.length && <button type="button" onClick={() => setVisibleCount(count => count + BATCH_SIZE)} style={loadMoreStyle}>Load more ({visibleCount} / {filteredAssets.length})</button>}

        {inspectingAsset && <CharacterSheetInspector asset={inspectingAsset} onClose={() => setInspectingAsset(null)} />}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, zIndex: 5200, background: "rgba(37,32,24,0.92)", padding: 18, overflow: "auto" };
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
const categoryTabsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 8, marginBottom: 12 };
const tabStyle: React.CSSProperties = { display: "grid", gap: 4, padding: 10, color: "#252018", cursor: "pointer", textAlign: "left" };
const searchStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "2px solid #252018", background: "#fff3a8", color: "#252018", padding: "10px 12px", fontWeight: 900, marginBottom: 12 };
const bulkBarStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 10, fontWeight: 900 };
const assetGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10, maxHeight: "62vh", overflow: "auto" };
const assetCardStyle: React.CSSProperties = { border: "2px solid #252018", background: "#f4e8b5", padding: 8, display: "grid", gap: 6 };
const selectLabelStyle: React.CSSProperties = { fontSize: "0.75rem", fontWeight: 900 };
const previewButtonStyle: React.CSSProperties = { position: "relative", width: 112, height: 112, display: "grid", placeItems: "center", justifySelf: "center", overflow: "hidden", border: "2px solid #252018", background: "#d7c58d", cursor: "zoom-in", padding: 0 };
const previewBadgeStyle: React.CSSProperties = { position: "absolute", right: 3, bottom: 3, background: "#252018", color: "#fff8c8", border: "1px solid #fff8c8", fontSize: 10, fontWeight: 900, padding: "1px 4px", textTransform: "uppercase" };
const inspectButtonStyle: React.CSSProperties = { border: "2px solid #252018", background: "#5b3f8c", color: "#fff8c8", padding: "5px 7px", cursor: "pointer", fontWeight: 900, fontSize: "0.72rem" };
const assetLabelStyle: React.CSSProperties = { fontWeight: 900, fontSize: "0.8rem", textAlign: "center" };
const assetSourceStyle: React.CSSProperties = { fontSize: "0.62rem", fontWeight: 800, color: "#584c35", maxHeight: 32, overflow: "hidden", overflowWrap: "anywhere" };
const moveGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 };
const smallButtonStyle: React.CSSProperties = { border: "1px solid #252018", background: "#fff8c8", color: "#252018", padding: "4px 5px", cursor: "pointer", fontWeight: 900, fontSize: "0.68rem" };
const loadMoreStyle: React.CSSProperties = { ...buttonStyle, width: "100%", marginTop: 12 };
