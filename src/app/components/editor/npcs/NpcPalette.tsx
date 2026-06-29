import { useMemo, useState } from "react";
import {
  CHARACTER_ASSET_CATALOG,
  type CharacterAsset,
} from "../../../assets/limezu/characters/CharacterAssetCatalog";
import { readCharacterAssetClassification } from "../../../assets/limezu/characters/CharacterAssetRuntime";
import { CharacterSheetRenderer } from "../../../rendering/characters/CharacterSheetRenderer";

type NpcEditorAction = "create" | "edit" | "delete";

type NpcVisualCategory =
  | "Generic"
  | "Wokeshire"
  | "Special"
  | "Cryptonia"
  | "Surveillia";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const CHARACTER_NPC_CATEGORIES = new Set(["npc", "fullCharacter", "monster", "set"]);

function characterNpcAssets() {
  const classification = readCharacterAssetClassification() as Record<string, string>;

  return CHARACTER_ASSET_CATALOG.filter(asset => {
    const category = classification[asset.id] ?? asset.defaultCategory;
    return CHARACTER_NPC_CATEGORIES.has(category);
  });
}

function categoryForAsset(asset: CharacterAsset) {
  const source = `${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();

  if (source.includes("wokeshire") || source.includes("woke")) return "Wokeshire";
  if (source.includes("crypto")) return "Cryptonia";
  if (source.includes("surv") || source.includes("camera")) return "Surveillia";
  if (source.includes("robot") || source.includes("monster") || source.includes("enemy")) return "Special";

  return "Generic";
}

function readableName(asset: CharacterAsset) {
  return asset.label
    .replace(/\b\d+x\d+\b/gi, "")
    .replace(/\s+/g, " ")
    .trim() || asset.id;
}

function AssetPreview({ asset, selected }: { asset: CharacterAsset; selected: boolean }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        background: selected ? "#d8f0b0" : "#d7c58d",
        border: "2px solid #252018",
        overflow: "hidden",
      }}
    >
      <CharacterSheetRenderer
        assetId={asset.id}
        animation="idle"
        facing="down"
        pixelSize={1}
        playing
        showShadow={false}
        style={{
          transform: "scale(0.9)",
          transformOrigin: "center bottom",
        }}
      />
    </div>
  );
}

export function NpcPalette({
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
}: {
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
}) {
  const [refreshToken, setRefreshToken] = useState(0);

  const assets = useMemo(() => {
    void refreshToken;
    return characterNpcAssets();
  }, [refreshToken]);

  const availableCategories = useMemo(() => {
    const values = Array.from(new Set(assets.map(categoryForAsset))) as NpcVisualCategory[];
    const ordered: NpcVisualCategory[] = ["Generic", "Wokeshire", "Special", "Cryptonia", "Surveillia"];
    return ordered.filter(category => values.includes(category));
  }, [assets]);

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = categoryForAsset(asset) === editorNpcCategory || availableCategories.length === 0;
    const q = editorNpcSearch.trim().toLowerCase();
    const haystack = `${asset.id} ${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
    return matchesCategory && (!q || haystack.includes(q));
  });

  const selectedAsset = assets.find(asset => asset.id === editorNpcPresetId) ?? filteredAssets[0] ?? assets[0];

  function selectAsset(asset: CharacterAsset) {
    setEditorNpcPresetId(asset.id);

    if (!editorNpcName.trim()) {
      setEditorNpcName(readableName(asset));
    }
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {(["create", "delete"] as const).map(action => (
          <button
            key={action}
            type="button"
            onClick={() => setNpcEditorAction(action)}
            style={{
              padding: "7px 10px",
              cursor: "pointer",
              border: npcEditorAction === action ? "4px solid #315f2a" : "2px solid #252018",
              background: npcEditorAction === action ? "#d8f0b0" : "#fff8c8",
              color: "#252018",
              fontWeight: 900,
              textTransform: "capitalize",
            }}
          >
            {action === "create" ? "Create NPC" : "Delete NPC"}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setRefreshToken(token => token + 1)}
          style={{
            padding: "7px 10px",
            cursor: "pointer",
            border: "2px solid #252018",
            background: "#fff3a8",
            color: "#252018",
            fontWeight: 900,
          }}
        >
          Refresh sheets
        </button>

        <span style={{ ...VT, fontSize: "1.05rem", color: "#252018", alignSelf: "center" }}>
          Selected sheet: {selectedAsset ? readableName(selectedAsset) : "none"}
        </span>
      </div>

      {npcEditorAction === "create" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 10 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Sheet group</span>
              <select
                value={editorNpcCategory}
                onChange={(e) => setEditorNpcCategory(e.target.value as NpcVisualCategory)}
                style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
              >
                {(availableCategories.length > 0 ? availableCategories : ["Generic"]).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Search character sheets</span>
              <input
                value={editorNpcSearch}
                onChange={(e) => setEditorNpcSearch(e.target.value)}
                placeholder="Search NPC sheets..."
                style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
              />
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>NPC name</span>
              <input
                value={editorNpcName}
                onChange={(e) => setEditorNpcName(e.target.value)}
                style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
              />
            </label>

            <label style={{ display: "flex", gap: 8, alignItems: "center", alignSelf: "end", paddingBottom: 8 }}>
              <input
                type="checkbox"
                checked={editorNpcWalking}
                onChange={(e) => setEditorNpcWalking(e.target.checked)}
              />
              <span style={{ ...RJ, fontSize: "0.85rem", fontWeight: 800, color: "#252018" }}>Walks around</span>
            </label>
          </div>

          {assets.length === 0 && (
            <div style={{ ...VT, fontSize: "1.1rem", color: "#252018", marginBottom: 10, padding: 10, border: "2px solid #252018", background: "#fff3a8" }}>
              No classified NPC sheets found yet. In Character Assets, classify sheets as NPC, Full Character, Monster, or Set.
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8, maxHeight: 300, overflow: "auto", paddingRight: 4, marginBottom: 10 }}>
            {filteredAssets.map(asset => {
              const selected = editorNpcPresetId === asset.id;

              return (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => selectAsset(asset)}
                  style={{
                    minHeight: 70,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 9px",
                    border: selected ? "4px solid #315f2a" : "2px solid #252018",
                    background: selected ? "#d8f0b0" : "#fff8c8",
                    color: "#252018",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  title={asset.source}
                >
                  <AssetPreview asset={asset} selected={selected} />

                  <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ ...VT, fontSize: "1.05rem", lineHeight: 1 }}>{readableName(asset)}</span>
                    <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>
                      {asset.width}x{asset.height} · {asset.frameWidth}x{asset.frameHeight}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {selectedAsset && (
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "center", marginBottom: 10, padding: 10, border: "2px solid #252018", background: "#f4e8b5" }}>
              <CharacterSheetRenderer
                assetId={selectedAsset.id}
                animation="idle"
                facing="down"
                pixelSize={2}
                playing
              />
              <div>
                <div style={{ ...VT, fontSize: "1.25rem", color: "#252018" }}>{readableName(selectedAsset)}</div>
                <div style={{ ...RJ, fontSize: "0.78rem", fontWeight: 800, color: "#584c35", overflowWrap: "anywhere" }}>{selectedAsset.source}</div>
              </div>
            </div>
          )}

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Dialogue lines</span>
            <textarea
              value={editorNpcLines}
              onChange={(e) => setEditorNpcLines(e.target.value)}
              rows={3}
              style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", resize: "vertical" }}
            />
          </label>
        </>
      )}

      {npcEditorAction === "delete" && (
        <div style={{ ...VT, fontSize: "1.1rem", color: "#252018" }}>
          Click an NPC on the map to delete it. Select mode is still used for editing and moving NPCs.
        </div>
      )}
    </div>
  );
}
