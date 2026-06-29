import { useMemo, useState } from "react";
import {
  CHARACTER_ASSET_CATALOG,
  type CharacterAsset,
} from "../../../assets/limezu/characters/CharacterAssetCatalog";
import { readCharacterAssetClassification } from "../../../assets/limezu/characters/CharacterAssetRuntime";
import {
  exportGlobalNpcCatalogEntry,
  makeGlobalNpcId,
  upsertGlobalNpc,
  type GlobalNpcPrefab,
} from "../../../assets/limezu/characters/NpcCatalogRuntime";
import { CharacterSheetRenderer } from "../../../rendering/characters/CharacterSheetRenderer";
import type { CharacterFacing } from "../../../rendering/characters/CharacterSheetRuntime";

const NPC_CATEGORIES = new Set(["npc", "fullCharacter", "monster", "set"]);

function characterNpcAssets() {
  const classification = readCharacterAssetClassification() as Record<string, string>;

  return CHARACTER_ASSET_CATALOG.filter(asset => {
    const category = classification[asset.id] ?? asset.defaultCategory;
    return NPC_CATEGORIES.has(category);
  });
}

function readableName(asset: CharacterAsset) {
  return asset.label
    .replace(/\b\d+x\d+\b/gi, "")
    .replace(/\s+/g, " ")
    .trim() || asset.id;
}

function starterDraft(assets: CharacterAsset[]): GlobalNpcPrefab {
  const asset = assets[0];
  const name = asset ? readableName(asset) : "Global NPC";

  return {
    id: makeGlobalNpcId(name),
    name,
    sheetAssetId: asset?.id ?? "",
    lines: ['"Hello from the global NPC catalog."'],
    walking: true,
    animation: "idle",
    facing: "down",
    tags: [],
  };
}

export function NpcCatalogBuilder({ onClose }: { onClose: () => void }) {
  const [refreshToken, setRefreshToken] = useState(0);
  const assets = useMemo(() => {
    void refreshToken;
    return characterNpcAssets();
  }, [refreshToken]);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<GlobalNpcPrefab>(() => starterDraft(characterNpcAssets()));
  const [exportText, setExportText] = useState("");

  const selectedAsset = assets.find(asset => asset.id === draft.sheetAssetId) ?? assets[0];
  const filteredAssets = assets.filter(asset => {
    const q = query.trim().toLowerCase();
    const haystack = `${asset.id} ${asset.label} ${asset.source} ${asset.tags.join(" ")}`.toLowerCase();
    return !q || haystack.includes(q);
  });

  function update(patch: Partial<GlobalNpcPrefab>) {
    const next = { ...draft, ...patch };
    setDraft({
      ...next,
      id: patch.name && (!patch.id || patch.id === draft.id) ? makeGlobalNpcId(patch.name) : next.id,
    });
  }

  function selectAsset(asset: CharacterAsset) {
    setDraft(current => ({
      ...current,
      sheetAssetId: asset.id,
      name: current.name.trim() ? current.name : readableName(asset),
    }));
  }

  async function copyCatalogEntry() {
    const entry = {
      id: draft.id || makeGlobalNpcId(draft.name),
      name: draft.name.trim() || "Global NPC",
      sheetAssetId: draft.sheetAssetId,
      lines: draft.lines.map(line => line.trim()).filter(Boolean),
      walking: draft.walking,
      animation: draft.animation ?? "idle",
      facing: draft.facing ?? "down",
      tags: draft.tags?.map(tag => tag.trim()).filter(Boolean) ?? [],
    };
    const text = exportGlobalNpcCatalogEntry(entry);
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  function testInBrowser() {
    const entry: GlobalNpcPrefab = {
      ...draft,
      id: draft.id || makeGlobalNpcId(draft.name),
      lines: draft.lines.map(line => line.trim()).filter(Boolean),
      tags: draft.tags?.map(tag => tag.trim()).filter(Boolean) ?? [],
    };
    upsertGlobalNpc(entry);
  }

  function reset() {
    setDraft(starterDraft(assets));
    setExportText("");
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Global NPC Builder</div>
            <div style={subtitleStyle}>
              Create a reusable NPC, copy the object into NPC_CATALOG in NpcCatalog.ts, then select it in the NPC tab and drop it on any map.
            </div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={() => setRefreshToken(token => token + 1)} style={buttonStyle}>Refresh Sheets</button>
            <button type="button" onClick={testInBrowser} style={buttonStyle}>Test in Browser</button>
            <button type="button" onClick={copyCatalogEntry} style={saveButtonStyle}>Copy Catalog Entry</button>
            <button type="button" onClick={reset} style={dangerButtonStyle}>Reset</button>
            <button type="button" onClick={onClose} style={doneButtonStyle}>Done</button>
          </div>
        </div>

        <div style={settingsStyle}>
          <label style={fieldStyle}>
            NPC name
            <input value={draft.name} onChange={event => update({ name: event.target.value })} style={inputStyle} />
          </label>

          <label style={fieldStyle}>
            Catalog id
            <input value={draft.id} onChange={event => update({ id: event.target.value })} style={inputStyle} />
          </label>

          <label style={fieldStyle}>
            Facing
            <select value={draft.facing ?? "down"} onChange={event => update({ facing: event.target.value as CharacterFacing })} style={inputStyle}>
              <option value="down">down</option>
              <option value="up">up</option>
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </label>

          <label style={{ ...fieldStyle, alignContent: "end" }}>
            <span>
              <input
                type="checkbox"
                checked={draft.walking !== false}
                onChange={event => update({ walking: event.target.checked })}
              /> Walks around
            </span>
          </label>

          <label style={fieldStyle}>
            Tags
            <input
              value={(draft.tags ?? []).join(", ")}
              onChange={event => update({ tags: event.target.value.split(",").map(tag => tag.trim()).filter(Boolean) })}
              placeholder="shopkeeper, satiria, quest"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={mainStyle}>
          <div style={paletteStyle}>
            <div style={titleStyle}>Character Sheets</div>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search NPC sheets..." style={inputStyle} />

            <div style={assetGridStyle}>
              {filteredAssets.map(asset => {
                const selected = draft.sheetAssetId === asset.id;

                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => selectAsset(asset)}
                    title={asset.source}
                    style={{
                      ...assetButtonStyle,
                      border: selected ? "4px solid #315f2a" : "2px solid #252018",
                      background: selected ? "#d8f0b0" : "#fff8c8",
                    }}
                  >
                    <span style={assetPreviewStyle}>
                      <CharacterSheetRenderer assetId={asset.id} animation="idle" facing="down" pixelSize={1} playing showShadow={false} />
                    </span>
                    <span style={assetLabelStyle}>{readableName(asset)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={previewStyle}>
            <div style={titleStyle}>Preview</div>
            {selectedAsset ? (
              <>
                <div style={spritePreviewStyle}>
                  <CharacterSheetRenderer
                    assetId={selectedAsset.id}
                    animation="walk"
                    facing={draft.facing ?? "down"}
                    pixelSize={3}
                    playing
                  />
                </div>
                <div style={subtitleStyle}>{selectedAsset.source}</div>
              </>
            ) : (
              <div style={subtitleStyle}>No NPC/full character sheets found. Classify sheets in Character Assets first.</div>
            )}

            <label style={fieldStyle}>
              Dialogue lines
              <textarea
                value={draft.lines.join("\n")}
                onChange={event => update({ lines: event.target.value.split("\n") })}
                rows={6}
                style={textareaStyle}
              />
            </label>
          </div>
        </div>

        {exportText && (
          <div style={exportPanelStyle}>
            <strong>Paste this object into NPC_CATALOG in src/app/assets/limezu/characters/NpcCatalog.ts</strong>
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
const subtitleStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.82rem", fontWeight: 900, color: "#584c35", maxWidth: 760 };
const topButtonsStyle: React.CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const buttonStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: "7px 10px", fontWeight: 900, cursor: "pointer" };
const saveButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#315f2a", color: "#fff8c8" };
const dangerButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#b85b3f", color: "#fff8c8" };
const doneButtonStyle: React.CSSProperties = { ...buttonStyle, background: "#ca4b36", color: "#fff8c8" };
const settingsStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 10 };
const fieldStyle: React.CSSProperties = { display: "grid", gap: 4, fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "0.72rem" };
const inputStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: 8, fontWeight: 900 };
const mainStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "minmax(300px, 420px) minmax(280px, 1fr)", gap: 12, alignItems: "start" };
const paletteStyle: React.CSSProperties = { border: "3px solid #252018", background: "#f4e8b5", padding: 10, display: "grid", gap: 8 };
const assetGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(112px, 1fr))", gap: 7, maxHeight: "62vh", overflow: "auto", paddingRight: 4 };
const assetButtonStyle: React.CSSProperties = { display: "grid", gap: 4, justifyItems: "center", padding: 6, color: "#252018", cursor: "pointer" };
const assetPreviewStyle: React.CSSProperties = { width: 60, height: 60, display: "grid", placeItems: "center", background: "#d7c58d", border: "2px solid #252018", overflow: "hidden" };
const assetLabelStyle: React.CSSProperties = { fontSize: "0.65rem", fontWeight: 900, lineHeight: 1, maxHeight: 34, overflow: "hidden", textAlign: "center" };
const previewStyle: React.CSSProperties = { border: "4px solid #252018", background: "#f4e8b5", padding: 12, display: "grid", gap: 10 };
const spritePreviewStyle: React.CSSProperties = { minHeight: 170, display: "grid", placeItems: "center", background: "#d7c58d", border: "2px solid #252018" };
const textareaStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: 8, fontWeight: 900, resize: "vertical" };
const exportPanelStyle: React.CSSProperties = { marginTop: 12, border: "2px solid #252018", background: "#fff3a8", padding: 8, display: "grid", gap: 6 };
const exportTextareaStyle: React.CSSProperties = { width: "100%", height: 220, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace", fontSize: 12, boxSizing: "border-box" };
