import {
  HERO_APPEARANCE_OPTIONS,
  type HeroAppearance,
  getHeroOptionColor,
} from "./heroAppearance";
import { PixelHeroSprite, type HeroPose } from "./PixelHeroSprite";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

type HeroAppearanceKey = keyof HeroAppearance;

const POSES: { pose: HeroPose; label: string }[] = [
  { pose: "frontIdle", label: "FRONT IDLE" },
  { pose: "frontWalk", label: "FRONT WALK" },
  { pose: "backIdle", label: "BACK IDLE" },
  { pose: "backWalk", label: "BACK WALK" },
  { pose: "sideIdle", label: "SIDE IDLE" },
  { pose: "sideWalk", label: "SIDE WALK" },
];

export function HeroEditorOverlay({
  heroName,
  setHeroName,
  heroAppearance,
  setHeroAppearance,
  onClose,
}: {
  heroName: string;
  setHeroName: (name: string) => void;
  heroAppearance: HeroAppearance;
  setHeroAppearance: (appearance: HeroAppearance) => void;
  facing: "up" | "down" | "left" | "right";
  onClose: () => void;
}) {
  function updateAppearance<K extends HeroAppearanceKey>(
    key: K,
    value: HeroAppearance[K],
  ) {
    setHeroAppearance({
      ...heroAppearance,
      [key]: value,
    });
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <button type="button" onClick={onClose} style={topCloseStyle}>
          ×
        </button>

        <div style={heroHeaderStyle}>
          <div>
            <div style={titleBannerStyle}>HERO EDITOR</div>
            <div style={subtitleStyle}>Build your pixel-art manga inspired hero.</div>
            <div style={nameCardStyle}>{heroName.trim() || "Hero"}</div>
          </div>

          <div style={headerSpriteStyle}>
            <PixelHeroSprite appearance={heroAppearance} pose="frontIdle" pixelSize={5} />
          </div>
        </div>

        <div style={contentGridStyle}>
          <div>
            <PanelTitle>CHARACTER DISPLAYS</PanelTitle>
            <div style={previewGridStyle}>
              {POSES.map(({ pose, label }) => (
                <PreviewCard key={pose} label={label}>
                  <PixelHeroSprite appearance={heroAppearance} pose={pose} pixelSize={4} />
                </PreviewCard>
              ))}
            </div>

            <div style={hintBoxStyle}>
              <span style={{ fontSize: 26 }}>▣</span>
              <span>Six sprite displays: front, back and side — standing and walking.</span>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <FieldPanel title="NAME">
              <input
                value={heroName}
                onChange={event => setHeroName(event.target.value)}
                maxLength={18}
                style={inputStyle}
              />
            </FieldPanel>

            <AppearanceSection title="SKIN COLOR" category="skin" value={heroAppearance.skin} onChange={updateAppearance} />
            <AppearanceSection title="HAIR" category="hair" value={heroAppearance.hair} onChange={updateAppearance} />
            <AppearanceSection title="FACIAL HAIR" category="facialHair" value={heroAppearance.facialHair} onChange={updateAppearance} />
            <AppearanceSection title="SUNGLASSES" category="sunglasses" value={heroAppearance.sunglasses} onChange={updateAppearance} />
            <AppearanceSection title="HATS" category="hat" value={heroAppearance.hat} onChange={updateAppearance} />
            <AppearanceSection title="SHIRT" category="shirt" value={heroAppearance.shirt} onChange={updateAppearance} />
            <AppearanceSection title="PANTS" category="pants" value={heroAppearance.pants} onChange={updateAppearance} />
            <AppearanceSection title="SHOES" category="shoes" value={heroAppearance.shoes} onChange={updateAppearance} />
          </div>
        </div>

        <div style={bottomBarStyle}>
          <div style={{ ...RJ, color: "#5d4528", fontWeight: 700 }}>
            Press H in-game to open or close this editor.
          </div>
          <button type="button" onClick={onClose} style={closeButtonStyle}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={previewCardStyle}>
      <div style={spriteFrameStyle}>{children}</div>
      <div style={previewLabelStyle}>{label}</div>
    </div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <div style={panelTitleStyle}>{children}</div>;
}

function FieldPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={fieldPanelStyle}>
      <div style={fieldRibbonStyle}>{title}</div>
      {children}
    </div>
  );
}

function AppearanceSection<K extends HeroAppearanceKey>({
  title,
  category,
  value,
  onChange,
}: {
  title: string;
  category: K;
  value: HeroAppearance[K];
  onChange: <T extends HeroAppearanceKey>(key: T, value: HeroAppearance[T]) => void;
}) {
  const options = HERO_APPEARANCE_OPTIONS[category];

  return (
    <FieldPanel title={title}>
      <div style={optionRowStyle}>
        {options.map(option => {
          const selected = option.id === value;
          const color = getHeroOptionColor(category, option.id as HeroAppearance[K]);

          return (
            <button
              key={option.id}
              type="button"
              title={option.label}
              onClick={() => onChange(category, option.id as HeroAppearance[K])}
              style={{
                ...optionButtonStyle,
                borderColor: selected ? "#ca4b36" : "#252018",
                boxShadow: selected ? "4px 4px 0 #252018" : "2px 2px 0 rgba(37,32,24,0.35)",
                backgroundColor: selected ? "#ffe58a" : "#fff6d0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 22,
                  height: 22,
                  border: "3px solid #252018",
                  backgroundColor: color === "transparent" ? "#fff6d0" : color,
                  boxSizing: "border-box",
                }}
              >
                {color === "transparent" && <span style={noneIconStyle}>×</span>}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </FieldPanel>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1300,
  backgroundColor: "rgba(37,32,24,0.72)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 18,
};

const windowStyle: React.CSSProperties = {
  position: "relative",
  width: "min(1120px, calc(100vw - 36px))",
  maxHeight: "calc(100vh - 36px)",
  overflow: "auto",
  backgroundColor: "#f7e7b7",
  border: "5px solid #252018",
  boxShadow:
    "inset 0 0 0 4px #fff6d0, inset 0 0 0 8px #b58a4a, 10px 10px 0 rgba(0,0,0,0.35)",
  padding: 18,
};

const topCloseStyle: React.CSSProperties = {
  position: "absolute",
  top: 16,
  right: 16,
  width: 48,
  height: 48,
  border: "4px solid #252018",
  backgroundColor: "#f7d894",
  color: "#252018",
  fontSize: 36,
  lineHeight: 1,
  cursor: "pointer",
  boxShadow: "4px 4px 0 rgba(37,32,24,0.45)",
};

const heroHeaderStyle: React.CSSProperties = {
  position: "relative",
  minHeight: 178,
  borderBottom: "4px solid #252018",
  marginBottom: 16,
  display: "flex",
  justifyContent: "space-between",
  gap: 24,
  overflow: "hidden",
  background:
    "linear-gradient(135deg, rgba(255,246,208,0.92), rgba(247,216,148,0.7))",
  padding: 16,
};

const titleBannerStyle: React.CSSProperties = {
  ...PX,
  display: "inline-block",
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  fontSize: "1rem",
  padding: "18px 38px",
  border: "4px solid #252018",
  boxShadow: "5px 5px 0 rgba(37,32,24,0.35)",
};

const subtitleStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.6rem",
  color: "#252018",
  marginTop: 18,
};

const nameCardStyle: React.CSSProperties = {
  ...VT,
  display: "inline-block",
  marginTop: 12,
  fontSize: "1.6rem",
  color: "#252018",
  backgroundColor: "#fff6d0",
  border: "3px solid #252018",
  padding: "6px 16px",
};

const headerSpriteStyle: React.CSSProperties = {
  width: 170,
  height: 150,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 74,
};

const contentGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "560px 1fr",
  gap: 22,
};

const panelTitleStyle: React.CSSProperties = {
  ...PX,
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  border: "4px solid #252018",
  padding: "10px 14px",
  fontSize: "0.62rem",
  textAlign: "center",
};

const previewGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 10,
  border: "4px solid #252018",
  borderTop: 0,
  padding: 10,
  backgroundColor: "#fcefc5",
};

const previewCardStyle: React.CSSProperties = {
  minHeight: 180,
  backgroundColor: "#fff6d0",
  border: "3px solid #5d4528",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 8,
};

const spriteFrameStyle: React.CSSProperties = {
  flex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg, rgba(181,138,74,0.22), rgba(255,255,255,0.18))",
  border: "2px solid rgba(37,32,24,0.35)",
};

const previewLabelStyle: React.CSSProperties = {
  ...PX,
  color: "#252018",
  fontSize: "0.39rem",
  marginTop: 8,
};

const hintBoxStyle: React.CSSProperties = {
  ...VT,
  marginTop: 16,
  border: "4px solid #b58a4a",
  backgroundColor: "#fff6d0",
  padding: "14px 16px",
  display: "flex",
  gap: 14,
  alignItems: "center",
  color: "#252018",
  fontSize: "1.25rem",
};

const fieldPanelStyle: React.CSSProperties = {
  position: "relative",
  border: "4px solid #b58a4a",
  backgroundColor: "#fcefc5",
  padding: "18px 16px 14px",
};

const fieldRibbonStyle: React.CSSProperties = {
  ...PX,
  position: "absolute",
  top: -13,
  left: 16,
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  border: "3px solid #252018",
  padding: "5px 13px",
  fontSize: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  ...VT,
  width: "100%",
  boxSizing: "border-box",
  fontSize: "1.8rem",
  border: "4px solid #5d4528",
  backgroundColor: "#fff6d0",
  padding: "8px 12px",
  color: "#252018",
};

const optionRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  flexWrap: "wrap",
};

const optionButtonStyle: React.CSSProperties = {
  ...RJ,
  display: "flex",
  alignItems: "center",
  gap: 7,
  minHeight: 34,
  border: "3px solid #252018",
  color: "#252018",
  padding: "5px 8px",
  cursor: "pointer",
  fontSize: "0.78rem",
  fontWeight: 800,
};

const noneIconStyle: React.CSSProperties = {
  ...PX,
  display: "block",
  color: "#252018",
  fontSize: "0.7rem",
  lineHeight: "16px",
};

const bottomBarStyle: React.CSSProperties = {
  marginTop: 20,
  minHeight: 76,
  border: "4px solid #252018",
  background:
    "linear-gradient(135deg, rgba(37,32,24,0.2), rgba(255,246,208,0.5))",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 18,
};

const closeButtonStyle: React.CSSProperties = {
  ...PX,
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  border: "4px solid #252018",
  padding: "16px 34px",
  cursor: "pointer",
  fontSize: "0.68rem",
  boxShadow: "5px 5px 0 rgba(37,32,24,0.55)",
};
