import { AnimatedHero } from "./AnimatedHero";
import type { HeroAppearance } from "./heroAppearance";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

export function HeroEditorOverlay({
  heroName,
  setHeroName,
  heroAppearance,
  onClose,
}: {
  heroName: string;
  setHeroName: (name: string) => void;
  heroAppearance: HeroAppearance;
  setHeroAppearance: (appearance: HeroAppearance) => void;
  facing: "up" | "down" | "left" | "right";
  onClose: () => void;
}) {
  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <button type="button" onClick={onClose} style={closeXStyle}>×</button>

        <div style={headerStyle}>
          <div>
            <div style={titleStyle}>HERO EDITOR</div>
            <div style={subtitleStyle}>Professional wizard sprite active.</div>
          </div>

          <div style={heroCardStyle}>
            <AnimatedHero
              appearance={heroAppearance}
              facing="right"
              moving={false}
              pixelHeight={150}
            />
          </div>
        </div>

        <div style={previewGridStyle}>
          <Preview title="IDLE">
            <AnimatedHero appearance={heroAppearance} facing="right" moving={false} pixelHeight={100} />
          </Preview>
          <Preview title="WALK">
            <AnimatedHero appearance={heroAppearance} facing="right" moving pixelHeight={100} />
          </Preview>
          <Preview title="RUN">
            <AnimatedHero appearance={heroAppearance} facing="right" moving running pixelHeight={100} />
          </Preview>
          <Preview title="ATTACK">
            <AnimatedHero appearance={heroAppearance} facing="right" moving={false} attacking pixelHeight={100} />
          </Preview>
        </div>

        <div style={formPanelStyle}>
          <label style={{ display: "grid", gap: 8 }}>
            <span style={fieldLabelStyle}>HERO NAME</span>
            <input
              value={heroName}
              onChange={event => setHeroName(event.target.value)}
              maxLength={18}
              style={inputStyle}
            />
          </label>

          <div style={noteStyle}>
            The uploaded wizard sprite is now the active in-game hero. The next step is adding separate up/down sheets or layered customization.
          </div>

          <button type="button" onClick={onClose} style={saveButtonStyle}>
            SAVE APPEARANCE
          </button>
        </div>
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
    <div style={previewCardStyle}>
      <div style={previewTitleStyle}>{title}</div>
      <div style={previewStageStyle}>{children}</div>
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
  width: "min(960px, calc(100vw - 36px))",
  maxHeight: "calc(100vh - 36px)",
  overflow: "auto",
  background: "linear-gradient(#263034, #151c1f)",
  border: "3px solid rgba(255,255,255,0.1)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.08)",
  color: "#f3ead7",
  padding: 22,
};

const closeXStyle: React.CSSProperties = {
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
  gap: 24,
  alignItems: "center",
  borderBottom: "2px solid rgba(255,255,255,0.1)",
  paddingBottom: 20,
  marginBottom: 20,
};

const titleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.95rem",
  marginBottom: 12,
};

const subtitleStyle: React.CSSProperties = {
  ...VT,
  color: "#d8cba8",
  fontSize: "1.4rem",
};

const heroCardStyle: React.CSSProperties = {
  width: 220,
  height: 180,
  backgroundColor: "#20282b",
  border: "1px solid rgba(255,255,255,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const previewGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 12,
  marginBottom: 18,
};

const previewCardStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: 10,
};

const previewTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.45rem",
  marginBottom: 8,
};

const previewStageStyle: React.CSSProperties = {
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#20282b",
};

const formPanelStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
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

const noteStyle: React.CSSProperties = {
  ...RJ,
  fontSize: "0.95rem",
  color: "#d8cba8",
  fontWeight: 700,
};

const saveButtonStyle: React.CSSProperties = {
  ...PX,
  border: "1px solid #d8463d",
  background: "linear-gradient(#d5423a, #9b2524)",
  color: "#fff7e6",
  padding: "15px 16px",
  cursor: "pointer",
  fontSize: "0.5rem",
};
