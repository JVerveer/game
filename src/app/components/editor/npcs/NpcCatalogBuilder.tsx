import { useState } from "react";
import {
  CHARACTER_CATEGORIES,
  DEFAULT_CHARACTER_APPEARANCE,
  categoryOptionCount,
  colorIndexFor,
  displayColorLabelFor,
  displayLabelFor,
  nextColorId,
  nextOptionId,
  optionIndexFor,
  randomCharacterAppearance,
} from "../hero/characterAssets";
import { CharacterRenderer } from "../hero/CharacterRenderer";
import type {
  CharacterAppearance,
  CharacterCategoryConfig,
  CharacterColorCategory,
  CharacterFacing,
  CharacterLayerCategory,
} from "../hero/characterTypes";
import {
  exportGlobalNpcCatalogEntry,
  makeGlobalNpcId,
  upsertGlobalNpc,
  type GlobalNpcPrefab,
} from "../../../assets/limezu/characters/NpcCatalogRuntime";

type NpcBuilderDraft = Omit<GlobalNpcPrefab, "appearance"> & {
  appearance: CharacterAppearance;
};

function starterDraft(): NpcBuilderDraft {
  return {
    id: makeGlobalNpcId("Global NPC"),
    name: "Global NPC",
    appearance: DEFAULT_CHARACTER_APPEARANCE,
    lines: ['"Hello from the global NPC catalog."'],
    walking: true,
    facing: "down",
    tags: [],
  };
}

function isColorCategory(id: CharacterCategoryConfig["id"]): id is CharacterColorCategory {
  return id === "skinColor" || id === "hairColor" || id === "outfitColor";
}

function isLayerCategory(id: CharacterCategoryConfig["id"]): id is CharacterLayerCategory {
  return !isColorCategory(id);
}

export function NpcCatalogBuilder({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState<NpcBuilderDraft>(() => starterDraft());
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategoryConfig["id"]>("body");
  const [exportText, setExportText] = useState("");

  function update(patch: Partial<NpcBuilderDraft>) {
    const next = { ...draft, ...patch };
    setDraft({
      ...next,
      id: patch.name && (!patch.id || patch.id === draft.id) ? makeGlobalNpcId(patch.name) : next.id,
    });
  }

  function updateAppearance(appearance: CharacterAppearance) {
    update({ appearance });
  }

  function nudgeCurrent(direction: 1 | -1) {
    if (isColorCategory(selectedCategory)) {
      updateAppearance({
        ...draft.appearance,
        [selectedCategory]: nextColorId(selectedCategory, draft.appearance[selectedCategory], direction),
      });
      return;
    }

    updateAppearance({
      ...draft.appearance,
      [selectedCategory]: nextOptionId(selectedCategory, draft.appearance[selectedCategory], direction),
    });
  }

  function randomize() {
    updateAppearance(randomCharacterAppearance());
  }

  function catalogEntry() {
    return {
      id: draft.id || makeGlobalNpcId(draft.name),
      name: draft.name.trim() || "Global NPC",
      appearance: draft.appearance,
      lines: draft.lines.map(line => line.trim()).filter(Boolean),
      walking: draft.walking,
      facing: draft.facing ?? "down",
      tags: draft.tags?.map(tag => tag.trim()).filter(Boolean) ?? [],
    };
  }

  async function copyCatalogEntry() {
    const text = exportGlobalNpcCatalogEntry(catalogEntry());
    setExportText(text);

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // textarea fallback stays visible
    }
  }

  function testInBrowser() {
    upsertGlobalNpc(catalogEntry());
  }

  function reset() {
    setDraft(starterDraft());
    setSelectedCategory("body");
    setExportText("");
  }

  const currentLabel = isColorCategory(selectedCategory)
    ? displayColorLabelFor(selectedCategory, draft.appearance[selectedCategory])
    : displayLabelFor(selectedCategory, draft.appearance[selectedCategory]);
  const currentIndex = isColorCategory(selectedCategory)
    ? colorIndexFor(selectedCategory, draft.appearance[selectedCategory])
    : optionIndexFor(selectedCategory, draft.appearance[selectedCategory]);
  const currentCount = categoryOptionCount(selectedCategory);

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <div style={topStyle}>
          <div>
            <div style={titleStyle}>Global NPC Builder</div>
            <div style={subtitleStyle}>
              Build NPCs from the same body, hair, outfit, colors, and accessories as the hero. Copy the entry into NpcCatalog.ts, then select it in the NPC tab.
            </div>
          </div>

          <div style={topButtonsStyle}>
            <button type="button" onClick={randomize} style={buttonStyle}>Randomize Look</button>
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
            <div style={titleStyle}>Hero Assets</div>
            <div style={categoryGridStyle}>
              {CHARACTER_CATEGORIES.map(category => {
                const selected = category.id === selectedCategory;
                const label = isColorCategory(category.id)
                  ? displayColorLabelFor(category.id, draft.appearance[category.id])
                  : displayLabelFor(category.id, draft.appearance[category.id]);

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      ...categoryButtonStyle,
                      border: selected ? "4px solid #315f2a" : "2px solid #252018",
                      background: selected ? "#d8f0b0" : "#fff8c8",
                    }}
                  >
                    <span style={categoryTitleStyle}>{category.label}</span>
                    <span style={categoryValueStyle}>{label}</span>
                  </button>
                );
              })}
            </div>

            <div style={stepperStyle}>
              <button type="button" onClick={() => nudgeCurrent(-1)} style={buttonStyle}>Previous</button>
              <div style={selectedValueStyle}>
                <strong>{currentLabel}</strong>
                <span>{currentIndex + 1} / {currentCount}</span>
              </div>
              <button type="button" onClick={() => nudgeCurrent(1)} style={buttonStyle}>Next</button>
            </div>
          </div>

          <div style={previewStyle}>
            <div style={titleStyle}>Preview</div>
            <div style={spritePreviewStyle}>
              <CharacterRenderer
                appearance={draft.appearance}
                animation={draft.walking === false ? "idle" : "walk"}
                facing={draft.facing ?? "down"}
                pixelSize={3}
                showShadow
              />
            </div>

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
const paletteStyle: React.CSSProperties = { border: "3px solid #252018", background: "#f4e8b5", padding: 10, display: "grid", gap: 10 };
const categoryGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 };
const categoryButtonStyle: React.CSSProperties = { display: "grid", gap: 3, padding: 8, color: "#252018", cursor: "pointer", textAlign: "left" };
const categoryTitleStyle: React.CSSProperties = { fontFamily: "'VT323', monospace", fontSize: "1.05rem", lineHeight: 1 };
const categoryValueStyle: React.CSSProperties = { fontFamily: "'Rajdhani', sans-serif", fontSize: "0.72rem", fontWeight: 900, color: "#584c35" };
const stepperStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 8, border: "2px solid #252018", background: "#fff3a8", padding: 8 };
const selectedValueStyle: React.CSSProperties = { display: "grid", textAlign: "center", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.82rem", fontWeight: 900 };
const previewStyle: React.CSSProperties = { border: "4px solid #252018", background: "#f4e8b5", padding: 12, display: "grid", gap: 10 };
const spritePreviewStyle: React.CSSProperties = { minHeight: 190, display: "grid", placeItems: "center", background: "#d7c58d", border: "2px solid #252018", overflow: "hidden" };
const textareaStyle: React.CSSProperties = { border: "2px solid #252018", background: "#fff8c8", color: "#252018", padding: 8, fontWeight: 900, resize: "vertical" };
const exportPanelStyle: React.CSSProperties = { marginTop: 12, border: "2px solid #252018", background: "#fff3a8", padding: 8, display: "grid", gap: 6 };
const exportTextareaStyle: React.CSSProperties = { width: "100%", height: 220, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace", fontSize: 12, boxSizing: "border-box" };
