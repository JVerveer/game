import {
  CHARACTER_ASSET_MANIFEST,
} from "./characterAssets";
import { CharacterRenderer } from "./CharacterRenderer";
import type { CharacterAppearance, CharacterLayerCategory } from "./characterTypes";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const CATEGORIES: { id: CharacterLayerCategory; label: string }[] = [
  { id: "body", label: "Body" },
  { id: "eyes", label: "Eyes" },
  { id: "hair", label: "Hair" },
  { id: "outfit", label: "Outfit" },
  { id: "accessory", label: "Accessory" },
];

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
  function update(category: CharacterLayerCategory, id: string) {
    setHeroAppearance({
      ...heroAppearance,
      [category]: id,
    });
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <button type="button" onClick={onClose} style={closeStyle}>×</button>

        <div style={headerStyle}>
          <div>
            <div style={titleStyle}>LIMEZU HERO CREATOR</div>
            <div style={subtitleStyle}>Atlas-cropped modular character system.</div>
          </div>

          <div style={bigPreviewStyle}>
            <CharacterRenderer
              appearance={heroAppearance}
              facing={facing}
              animation="idle"
              pixelSize={3}
              showShadow
            />
          </div>
        </div>

        <div style={mainGridStyle}>
          <section style={leftPanelStyle}>
            <label style={{ display: "grid", gap: 8, marginBottom: 16 }}>
              <span style={fieldLabelStyle}>HERO NAME</span>
              <input
                value={heroName}
                onChange={event => setHeroName(event.target.value)}
                maxLength={18}
                style={inputStyle}
              />
            </label>

            <div style={previewRowStyle}>
              <Preview title="FRONT">
                <CharacterRenderer appearance={heroAppearance} facing="down" pixelSize={2} />
              </Preview>
              <Preview title="BACK">
                <CharacterRenderer appearance={heroAppearance} facing="up" pixelSize={2} />
              </Preview>
              <Preview title="LEFT">
                <CharacterRenderer appearance={heroAppearance} facing="left" pixelSize={2} />
              </Preview>
              <Preview title="RIGHT">
                <CharacterRenderer appearance={heroAppearance} facing="right" pixelSize={2} />
              </Preview>
            </div>

            <div style={noteStyle}>
              V2 renders a single 48×48 cell from each LimeZu atlas. This fixes the “whole sheet of heroes” issue.
            </div>
          </section>

          <section style={optionsPanelStyle}>
            {CATEGORIES.map(category => (
              <div key={category.id} style={optionSectionStyle}>
                <div style={optionTitleStyle}>{category.label}</div>
                <div style={optionGridStyle}>
                  {CHARACTER_ASSET_MANIFEST[category.id].map(option => {
                    const selected = heroAppearance[category.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => update(category.id, option.id)}
                        title={option.label}
                        style={{
                          ...optionButtonStyle,
                          borderColor: selected ? "#e33c38" : "rgba(255,255,255,0.12)",
                          backgroundColor: selected ? "rgba(227,60,56,0.22)" : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <span style={thumbStageStyle}>
                          {option.id !== "none" && (
                            <span
                              style={{
                                display: "block",
                                width: 48,
                                height: 48,
                                backgroundImage: `url(${option.src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: `${option.atlasWidth}px ${option.atlasHeight}px`,
                                backgroundPosition: category.id === "body" ? "-144px 0px" : "-144px 0px",
                                imageRendering: "pixelated",
                              }}
                            />
                          )}
                        </span>
                        <span style={optionLabelStyle}>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        </div>

        <button type="button" onClick={onClose} style={saveButtonStyle}>
          SAVE HERO
        </button>
      </div>
    </div>
  );
}

function Preview({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={smallPreviewStyle}>
      <div style={smallPreviewTitleStyle}>{title}</div>
      <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1300,
  backgroundColor: "rgba(9,14,16,0.88)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 18,
};

const windowStyle: React.CSSProperties = {
  position: "relative",
  width: "min(1180px, calc(100vw - 36px))",
  maxHeight: "calc(100vh - 36px)",
  overflow: "auto",
  background: "linear-gradient(#263034, #151c1f)",
  border: "3px solid rgba(255,255,255,0.1)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.65)",
  color: "#f3ead7",
  padding: 22,
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

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 22,
  borderBottom: "2px solid rgba(255,255,255,0.1)",
  paddingBottom: 18,
  marginBottom: 18,
};

const titleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.9rem",
  marginBottom: 12,
};

const subtitleStyle: React.CSSProperties = {
  ...VT,
  color: "#d8cba8",
  fontSize: "1.35rem",
};

const bigPreviewStyle: React.CSSProperties = {
  width: 210,
  height: 180,
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "360px 1fr",
  gap: 18,
};

const leftPanelStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
  alignContent: "start",
};

const optionsPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 16,
};

const fieldLabelStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.48rem",
  color: "#f7f0df",
};

const inputStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.45rem",
  border: "1px solid rgba(255,255,255,0.13)",
  backgroundColor: "#101619",
  color: "#f7f0df",
  padding: "10px 12px",
};

const previewRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const smallPreviewStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 10,
};

const smallPreviewTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.4rem",
};

const noteStyle: React.CSSProperties = {
  ...RJ,
  color: "#d8cba8",
  fontWeight: 700,
  fontSize: "0.95rem",
  lineHeight: 1.35,
};

const optionSectionStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  paddingBottom: 16,
  marginBottom: 16,
};

const optionTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.5rem",
  marginBottom: 10,
};

const optionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
  gap: 8,
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

const thumbStageStyle: React.CSSProperties = {
  width: 54,
  height: 54,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.08)",
};

const optionLabelStyle: React.CSSProperties = {
  ...RJ,
  fontWeight: 800,
  fontSize: "0.72rem",
  lineHeight: 1.1,
};

const saveButtonStyle: React.CSSProperties = {
  ...PX,
  marginTop: 18,
  width: "100%",
  border: "1px solid #d8463d",
  background: "linear-gradient(#d5423a, #9b2524)",
  color: "#fff7e6",
  padding: "15px 16px",
  cursor: "pointer",
  fontSize: "0.5rem",
};
