import { useMemo, useState } from "react";
import {
  CHARACTER_ASSET_MANIFEST,
  CHARACTER_CATEGORIES,
  DEFAULT_CHARACTER_APPEARANCE,
  nextOptionId,
  optionFor,
  randomCharacterAppearance,
} from "./characterAssets";
import {
  CharacterLayerThumbnail,
  CharacterRenderer,
} from "./CharacterRenderer";
import type {
  CharacterAppearance,
  CharacterLayerCategory,
} from "./characterTypes";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

export function HeroEditorOverlay({
  heroName,
  setHeroName,
  heroAppearance,
  setHeroAppearance,
  facing,
  onClose,
}: {
  heroName: string;
  setHeroName: (name: string) => void;
  heroAppearance: CharacterAppearance;
  setHeroAppearance: (appearance: CharacterAppearance) => void;
  facing: "up" | "down" | "left" | "right";
  onClose: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CharacterLayerCategory>("hair");
  const selectedConfig = CHARACTER_CATEGORIES.find(category => category.id === selectedCategory) ?? CHARACTER_CATEGORIES[0];
  const selectedOption = optionFor(selectedCategory, heroAppearance[selectedCategory]);

  function update(category: CharacterLayerCategory, id: string) {
    setHeroAppearance({
      ...heroAppearance,
      [category]: id,
    });
  }

  function step(category: CharacterLayerCategory, direction: 1 | -1) {
    update(category, nextOptionId(category, heroAppearance[category], direction));
  }

  const optionCount = CHARACTER_ASSET_MANIFEST[selectedCategory].length;
  const selectedIndex = Math.max(
    0,
    CHARACTER_ASSET_MANIFEST[selectedCategory].findIndex(option => option.id === heroAppearance[selectedCategory]),
  );

  const livePreviewAnimation = useMemo(() => selectedCategory === "outfit" ? "walk" : "idle", [selectedCategory]);

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <button type="button" onClick={onClose} style={closeStyle}>×</button>

        <div style={topBarStyle}>
          <div>
            <div style={titleStyle}>CHARACTER CREATOR</div>
            <div style={subtitleStyle}>LimeZu modular atlas system</div>
          </div>

          <div style={topActionsStyle}>
            <button type="button" onClick={() => setHeroAppearance(randomCharacterAppearance())} style={actionButtonStyle}>
              RANDOMIZE
            </button>
            <button type="button" onClick={() => setHeroAppearance(DEFAULT_CHARACTER_APPEARANCE)} style={actionButtonStyle}>
              RESET
            </button>
            <button type="button" onClick={onClose} style={saveButtonStyle}>
              SAVE
            </button>
          </div>
        </div>

        <div style={layoutStyle}>
          <aside style={categoryPanelStyle}>
            <div style={panelTitleStyle}>CATEGORIES</div>

            <div style={categoryListStyle}>
              {CHARACTER_CATEGORIES.map(category => {
                const selected = category.id === selectedCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      ...categoryButtonStyle,
                      backgroundColor: selected ? "rgba(216,70,61,0.24)" : "rgba(255,255,255,0.04)",
                      borderColor: selected ? "#d8463d" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <span>{category.label}</span>
                    <span style={categoryValueStyle}>
                      {optionFor(category.id, heroAppearance[category.id])?.label ?? "None"}
                    </span>
                  </button>
                );
              })}
            </div>

            <label style={{ display: "grid", gap: 8, marginTop: 18 }}>
              <span style={fieldLabelStyle}>HERO NAME</span>
              <input
                value={heroName}
                onChange={event => setHeroName(event.target.value)}
                maxLength={18}
                style={inputStyle}
              />
            </label>
          </aside>

          <main style={previewPanelStyle}>
            <div style={panelTitleStyle}>LIVE PREVIEW</div>

            <div style={largeStageStyle}>
              <CharacterRenderer
                appearance={heroAppearance}
                facing={facing}
                animation={livePreviewAnimation}
                pixelSize={4}
                showShadow
              />
            </div>

            <div style={directionGridStyle}>
              <DirectionPreview title="FRONT">
                <CharacterRenderer appearance={heroAppearance} facing="down" pixelSize={2} />
              </DirectionPreview>
              <DirectionPreview title="BACK">
                <CharacterRenderer appearance={heroAppearance} facing="up" pixelSize={2} />
              </DirectionPreview>
              <DirectionPreview title="LEFT">
                <CharacterRenderer appearance={heroAppearance} facing="left" pixelSize={2} />
              </DirectionPreview>
              <DirectionPreview title="RIGHT">
                <CharacterRenderer appearance={heroAppearance} facing="right" pixelSize={2} />
              </DirectionPreview>
            </div>
          </main>

          <section style={optionPanelStyle}>
            <div style={panelTitleStyle}>{selectedConfig.label.toUpperCase()}</div>
            <div style={descriptionStyle}>{selectedConfig.description}</div>

            <div style={stepperStyle}>
              <button type="button" onClick={() => step(selectedCategory, -1)} style={stepButtonStyle}>
                ◀
              </button>

              <div style={selectedOptionStyle}>
                <div style={selectedOptionNameStyle}>{selectedOption?.label ?? "None"}</div>
                <div style={selectedOptionCountStyle}>
                  {selectedIndex + 1} / {optionCount}
                </div>
              </div>

              <button type="button" onClick={() => step(selectedCategory, 1)} style={stepButtonStyle}>
                ▶
              </button>
            </div>

            <div style={optionsGridStyle}>
              {CHARACTER_ASSET_MANIFEST[selectedCategory].map(option => {
                const selected = heroAppearance[selectedCategory] === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    title={option.label}
                    onClick={() => update(selectedCategory, option.id)}
                    style={{
                      ...optionButtonStyle,
                      borderColor: selected ? "#d8463d" : "rgba(255,255,255,0.12)",
                      backgroundColor: selected ? "rgba(216,70,61,0.2)" : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={optionThumbStageStyle}>
                      {option.id !== "none" && (
                        <CharacterLayerThumbnail
                          category={selectedCategory}
                          optionId={option.id}
                          pixelSize={1}
                        />
                      )}
                    </div>
                    <div style={optionLabelStyle}>{option.label}</div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DirectionPreview({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={directionCardStyle}>
      <div style={directionTitleStyle}>{title}</div>
      <div style={directionStageStyle}>{children}</div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1300,
  backgroundColor: "rgba(9,14,16,0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 18,
};

const windowStyle: React.CSSProperties = {
  position: "relative",
  width: "min(1240px, calc(100vw - 36px))",
  maxHeight: "calc(100vh - 36px)",
  overflow: "auto",
  background: "linear-gradient(#263034, #151c1f)",
  border: "3px solid rgba(255,255,255,0.12)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.65)",
  color: "#f3ead7",
  padding: 18,
};

const closeStyle: React.CSSProperties = {
  position: "absolute",
  top: 14,
  right: 14,
  zIndex: 3,
  width: 42,
  height: 42,
  border: "2px solid rgba(255,255,255,0.2)",
  backgroundColor: "#20282b",
  color: "#f3ead7",
  fontSize: 28,
  lineHeight: 1,
  cursor: "pointer",
};

const topBarStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 18,
  alignItems: "center",
  borderBottom: "2px solid rgba(255,255,255,0.1)",
  padding: "4px 56px 16px 4px",
  marginBottom: 16,
};

const titleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.9rem",
  marginBottom: 10,
};

const subtitleStyle: React.CSSProperties = {
  ...VT,
  color: "#d8cba8",
  fontSize: "1.35rem",
};

const topActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const layoutStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "260px 360px 1fr",
  gap: 14,
};

const categoryPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 14,
};

const previewPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 14,
  display: "grid",
  gap: 12,
};

const optionPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 14,
  minWidth: 0,
};

const panelTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.52rem",
  marginBottom: 12,
};

const categoryListStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const categoryButtonStyle: React.CSSProperties = {
  border: "2px solid rgba(255,255,255,0.1)",
  color: "#f7f0df",
  padding: "10px 11px",
  display: "grid",
  gap: 6,
  textAlign: "left",
  cursor: "pointer",
};

const categoryValueStyle: React.CSSProperties = {
  ...RJ,
  color: "#d8cba8",
  fontWeight: 800,
  fontSize: "0.78rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const fieldLabelStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.45rem",
  color: "#f7f0df",
};

const inputStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.35rem",
  border: "1px solid rgba(255,255,255,0.13)",
  backgroundColor: "#101619",
  color: "#f7f0df",
  padding: "10px 12px",
};

const largeStageStyle: React.CSSProperties = {
  height: 270,
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
};

const directionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
};

const directionCardStyle: React.CSSProperties = {
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: 8,
};

const directionTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.35rem",
};

const directionStageStyle: React.CSSProperties = {
  height: 104,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
};

const descriptionStyle: React.CSSProperties = {
  ...RJ,
  color: "#d8cba8",
  fontWeight: 800,
  fontSize: "0.9rem",
  marginBottom: 12,
};

const stepperStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "48px 1fr 48px",
  gap: 8,
  alignItems: "stretch",
  marginBottom: 12,
};

const stepButtonStyle: React.CSSProperties = {
  ...PX,
  border: "1px solid rgba(255,255,255,0.14)",
  backgroundColor: "#20282b",
  color: "#f7f0df",
  cursor: "pointer",
  fontSize: "0.62rem",
};

const selectedOptionStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  backgroundColor: "#101619",
  padding: "10px 12px",
  display: "grid",
  gap: 4,
};

const selectedOptionNameStyle: React.CSSProperties = {
  ...RJ,
  color: "#f7f0df",
  fontSize: "1.05rem",
  fontWeight: 800,
};

const selectedOptionCountStyle: React.CSSProperties = {
  ...PX,
  color: "#d8463d",
  fontSize: "0.42rem",
};

const optionsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(94px, 1fr))",
  gap: 8,
  maxHeight: 430,
  overflow: "auto",
  paddingRight: 4,
};

const optionButtonStyle: React.CSSProperties = {
  border: "2px solid rgba(255,255,255,0.12)",
  color: "#f7f0df",
  cursor: "pointer",
  padding: 8,
  display: "grid",
  gap: 6,
  justifyItems: "center",
};

const optionThumbStageStyle: React.CSSProperties = {
  width: 58,
  height: 58,
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
};

const optionLabelStyle: React.CSSProperties = {
  ...RJ,
  fontWeight: 800,
  fontSize: "0.7rem",
  lineHeight: 1.1,
  textAlign: "center",
};

const actionButtonStyle: React.CSSProperties = {
  ...PX,
  border: "1px solid rgba(255,255,255,0.16)",
  backgroundColor: "#20282b",
  color: "#f7f0df",
  padding: "11px 12px",
  cursor: "pointer",
  fontSize: "0.42rem",
};

const saveButtonStyle: React.CSSProperties = {
  ...PX,
  border: "1px solid #d8463d",
  background: "linear-gradient(#d5423a, #9b2524)",
  color: "#fff7e6",
  padding: "11px 14px",
  cursor: "pointer",
  fontSize: "0.42rem",
};
