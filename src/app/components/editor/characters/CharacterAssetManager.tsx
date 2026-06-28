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
  readCharacterAssetClassification,
  resetCharacterAssetDraft,
} from "../../../assets/limezu/characters/CharacterAssetRuntime";

type ManagerCategory =
  | "uncategorized"
  | "body"
  | "eyes"
  | "hair"
  | "beard"
  | "outfit"
  | "hat"
  | "weapon"
  | "accessory"
  | "fullCharacter"
  | "set"
  | "npc"
  | "monster"
  | "portrait"
  | "effect"
  | "object"
  | "ignore";

type ManagerClassification = Record<string, ManagerCategory>;

const CATEGORIES: { id: ManagerCategory; label: string; description: string }[] = [
  { id: "uncategorized", label: "Uncategorized", description: "Assets still needing review" },
  { id: "body", label: "Body", description: "Base body / skin layers" },
  { id: "eyes", label: "Eyes", description: "Eyes and face details" },
  { id: "hair", label: "Hair", description: "Hair layers" },
  { id: "beard", label: "Beard", description: "Facial hair" },
  { id: "outfit", label: "Outfit", description: "Clothes / armor / uniforms" },
  { id: "hat", label: "Hat", description: "Hats, helmets, headwear" },
  { id: "weapon", label: "Weapon", description: "Weapons and shields" },
  { id: "accessory", label: "Accessory", description: "Glasses, masks, bags, extras" },
  { id: "fullCharacter", label: "Full Character", description: "Complete animated character sheets" },
  { id: "set", label: "Set", description: "Multi-part character asset sets / atlas sheets" },
  { id: "npc", label: "NPC", description: "NPC-specific sprites" },
  { id: "monster", label: "Monster", description: "Enemy and creature sprites" },
  { id: "portrait", label: "Portrait", description: "Portrait / face images" },
  { id: "effect", label: "Effect", description: "Character-related VFX/emotes" },
  { id: "object", label: "Object", description: "Props that should live in the object asset manager" },
  { id: "ignore", label: "Ignore", description: "Duplicates, wrong files, unused" },
];

const BATCH_SIZE = 180;

function asManagerClassification(value: CharacterAssetClassification): ManagerClassification {
  return value as unknown as ManagerClassification;
}

function categoryFor(asset: CharacterAsset, classification: ManagerClassification): ManagerCategory {
  const category = classification[asset.id] ?? (asset.defaultCategory as ManagerCategory) ?? "uncategorized";
  return CATEGORIES.some(item => item.id === category) ? category : "uncategorized";
}

function isLikelyAtlasOrSet(asset: CharacterAsset) {
  return asset.width > asset.frameWidth || asset.height > asset.frameHeight || asset.columns > 1 || asset.rows > 1;
}

function assetSearchText(asset: CharacterAsset) {
  return `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
}

function suggestedCategory(asset: CharacterAsset): ManagerCategory {
  const haystack = assetSearchText(asset);

  if (haystack.includes("tree") || haystack.includes("bench") || haystack.includes("lamp") || haystack.includes("barrel") || haystack.includes("crate") || haystack.includes("fence") || haystack.includes("rock") || haystack.includes("sign")) {
    return "object";
  }

  if (haystack.includes("body")) return "body";
  if (haystack.includes("eyes") || haystack.includes("eye")) return "eyes";
  if (haystack.includes("hair")) return "hair";
  if (haystack.includes("beard")) return "beard";
  if (haystack.includes("outfit") || haystack.includes("shirt") || haystack.includes("pants") || haystack.includes("armor")) return "outfit";
  if (haystack.includes("hat") || haystack.includes("helmet")) return "hat";
  if (haystack.includes("weapon") || haystack.includes("sword") || haystack.includes("shield")) return "weapon";
  if (haystack.includes("npc") || haystack.includes("villager") || haystack.includes("guard") || haystack.includes("merchant")) return "npc";
  if (haystack.includes("monster") || haystack.includes("enemy")) return "monster";
  if (haystack.includes("portrait") || haystack.includes("face")) return "portrait";
  if (haystack.includes("effect") || haystack.includes("emote")) return "effect";
  if (isLikelyAtlasOrSet(asset)) return "set";

  return "uncategorized";
}

function AssetPreview({ asset }: { asset: CharacterAsset }) {
  const frameWidth = Math.max(1, asset.frameWidth || 48);
  const frameHeight = Math.max(1, asset.frameHeight || 48);
  const scale = Math.min(96 / frameWidth, 96 / frameHeight);
  const previewWidth = Math.max(1, Math.round(frameWidth * scale));
  const previewHeight = Math.max(1, Math.round(frameHeight * scale));
  const backgroundWidth = Math.max(1, Math.round(asset.width * scale));
  const backgroundHeight = Math.max(1, Math.round(asset.height * scale));

  return (
    <div style={previewShellStyle}>
      <div
        style={{
          width: previewWidth,
          height: previewHeight,
          backgroundImage: `url(${asset.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0px 0px",
          backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
          imageRendering: "pixelated",
        }}
      />
      {isLikelyAtlasOrSet(asset) && <span style={setBadgeStyle}>set</span>}
    </div>
  );
}

export function CharacterAssetManager({ onClose }: { onClose: () => void }) {
  const [classification, setClassification] = useState<ManagerClassification>(() => asManagerClassification(readCharacterAssetClassification()));
  const [activeCategory, setActiveCategory] = useState<ManagerCategory>("uncategorized");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [exportText, setExportText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const refresh = () => setClassification(asManagerClassification(readCharacterAssetClassification()));
    window.addEventListener("limezu:character-asset-classification-changed", refresh);
    return () => window.removeEventListener("limezu:character-asset-classification-changed", refresh);
  }, []);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    setSelectedIds({});
  }, [activeCategory, query]);

  const stats = useMemo(() => {
    const counts = Object.fromEntries(CATEGORIES.map(category => [category.id, 0])) as Record<ManagerCategory, number>;

    for (const asset of CHARACTER_ASSET_CATALOG) {
      const category = categoryFor(asset, classification);
      counts[category] = (counts[category] ?? 0) + 1;
    }

    return {
      total: CHARACTER_ASSET_CATALOG.length,
      counts,
    };
  }, [classification]);

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CHARACTER_ASSET_CATALOG.filter(asset => {
      const category = categoryFor(asset, classification);
      const haystack = assetSearchText(asset);

      return category === activeCategory && (!q || haystack.includes(q));
    });
  }, [activeCategory, classification, query]);

  const visibleAssets = filteredAssets.slice(0, visibleCount);
  const selectedAssetIds = Object.entries(selectedIds).filter(([, value]) => value).map(([id]) => id);

  function refreshClassification() {
    setClassification(asManagerClassification(readCharacterAssetClassification()));
  }

  function move(assetId: string, category: ManagerCategory) {
    classifyCharacterAsset(assetId, category as unknown as CharacterAssetCategory);
    refreshClassification();
  }

  function moveSelected(category: ManagerCategory) {
    if (selectedAssetIds.length === 0) return;
    classifyCharacterAssets(selectedAssetIds, category as unknown as CharacterAssetCategory);
    refreshClassification();
    setSelectedIds({});
  }

  function autoDetectVisible() {
    const next = { ...classification };
    for (const asset of visibleAssets) {
      next[asset.id] = suggestedCategory(asset);
    }

    classifyCharacterAssets(Object.keys(next), "uncategorized" as CharacterAssetCategory);

    for (const [assetId, category] of Object.entries(next)) {
      classifyCharacterAsset(assetId, category as CharacterAssetCategory);
    }

    refreshClassification();
  }

  function resetDraft() {
    resetCharacterAssetDraft();
    refreshClassification();
    setSelectedIds({});
  }

  async function exportClassification() {
    const ordered = Object.fromEntries(
      CHARACTER_ASSET_CATALOG.map(asset => [asset.id, categoryFor(asset, classification)]),
    );

    const next = `/**
 * Global character asset classification.
 * Generated by the Satiria Character Asset Manager.
 *
 * Note: this intentionally does not use a narrow satisfies type so categories
 * like "object" and "set" can be exported safely while the catalog evolves.
 */
export const CHARACTER_ASSET_CLASSIFICATION = ${JSON.stringify(ordered, null, 2)} as const;
`;

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
            <div style={titleStyle}>Character Asset Manager</div>
            <div style={subtitleStyle}>
              Classify character parts, full sets, NPCs, monsters, portraits, effects, and misplaced objects.
            </div>
          </div>
          <div style={topButtonsStyle}>
            <button type="button" onClick={autoDetectVisible} style={buttonStyle}>Auto-detect visible</button>
            <button type="button" onClick={resetDraft} style={buttonStyle}>Reset draft</button>
            <button type="button" onClick={exportClassification} style={exportButtonStyle}>Export Character Classification</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={statsStyle}>
          <strong>Total: {stats.total}</strong>
          {CATEGORIES.map(category => (
            <span key={category.id}>{category.label}: {stats.counts[category.id] ?? 0}</span>
          ))}
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>{copied ? "Copied to clipboard." : "Copy this text manually."}</strong>
            <span>Replace <code>src/app/assets/limezu/characters/CharacterAssetClassification.ts</code>.</span>
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
                style={{ ...tabStyle, background: active ? "#fff3a8" : "#fff8c8", border: active ? "4px solid #ca4b36" : "2px solid #252018" }}
              >
                <strong>{category.label}</strong>
                <span>{stats.counts[category.id] ?? 0}</span>
                <small>{category.description}</small>
              </button>
            );
          })}
        </div>

        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search character assets..." style={searchStyle} />

        <div style={bulkBarStyle}>
          <span>{selectedAssetIds.length} selected</span>
          {CATEGORIES.filter(category => category.id !== activeCategory).map(category => (
            <button key={category.id} type="button" onClick={() => moveSelected(category.id)} style={smallButtonStyle}>
              Move selected to {category.label}
            </button>
          ))}
        </div>

        <div style={assetGridStyle}>
          {visibleAssets.map(asset => {
            const selected = !!selectedIds[asset.id];
            const suggested = suggestedCategory(asset);
            return (
              <div key={asset.id} style={{ ...assetCardStyle, outline: selected ? "4px solid #315f2a" : undefined }} title={asset.source}>
                <label style={selectLabelStyle}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={event => setSelectedIds(prev => ({ ...prev, [asset.id]: event.target.checked }))}
                  />
                  Select
                </label>
                <AssetPreview asset={asset} />
                <div style={assetLabelStyle}>{asset.label}</div>
                <div style={assetSourceStyle}>{asset.width}x{asset.height} · frame {asset.frameWidth}x{asset.frameHeight}</div>
                <div style={assetSourceStyle}>Suggested: {suggested}</div>
                <div style={assetSourceStyle}>{asset.source}</div>
                <div style={moveGridStyle}>
                  {CATEGORIES.filter(category => category.id !== activeCategory).map(category => (
                    <button key={category.id} type="button" onClick={() => move(asset.id, category.id)} style={smallButtonStyle}>
                      {category.label}
                    </button>
                  ))}
                </div>
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
const previewShellStyle: React.CSSProperties = { width: 112, height: 112, display: "grid", placeItems: "center", justifySelf: "center", position: "relative", background: "#d7c58d", border: "2px solid #252018", overflow: "hidden" };
const setBadgeStyle: React.CSSProperties = { position: "absolute", right: 4, bottom: 4, background: "#315f2a", color: "#fff8c8", border: "1px solid #252018", fontSize: 10, fontWeight: 900, padding: "1px 4px" };
const assetLabelStyle: React.CSSProperties = { fontWeight: 900, fontSize: "0.8rem", textAlign: "center" };
const assetSourceStyle: React.CSSProperties = { fontSize: "0.62rem", fontWeight: 800, color: "#584c35", maxHeight: 32, overflow: "hidden", overflowWrap: "anywhere" };
const moveGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 };
const smallButtonStyle: React.CSSProperties = { border: "1px solid #252018", background: "#fff8c8", color: "#252018", padding: "4px 5px", cursor: "pointer", fontWeight: 900, fontSize: "0.68rem" };
const loadMoreStyle: React.CSSProperties = { ...buttonStyle, width: "100%", marginTop: 12 };
