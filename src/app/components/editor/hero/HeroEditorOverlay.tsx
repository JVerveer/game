import {
  HERO_APPEARANCE_OPTIONS,
  type HeroAppearance,
  getHeroOptionColor,
} from "./heroAppearance";
import { ProfessionalPixelHeroSprite, type HeroPose } from "./ProfessionalPixelHeroSprite";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

type HeroAppearanceKey = keyof HeroAppearance;

const PREVIEW_GROUPS: { title: string; poses: { pose: HeroPose; label: string }[] }[] = [
  { title: "FRONT", poses: [{ pose: "frontIdle", label: "IDLE" }, { pose: "frontWalk1", label: "WALK 1" }, { pose: "frontWalk2", label: "WALK 2" }] },
  { title: "BACK", poses: [{ pose: "backIdle", label: "IDLE" }, { pose: "backWalk1", label: "WALK 1" }, { pose: "backWalk2", label: "WALK 2" }] },
  { title: "LEFT", poses: [{ pose: "sideIdle", label: "IDLE" }, { pose: "sideWalk1", label: "WALK 1" }, { pose: "sideWalk2", label: "WALK 2" }] },
  { title: "RIGHT", poses: [{ pose: "sideIdle", label: "IDLE" }, { pose: "sideWalk1", label: "WALK 1" }, { pose: "sideWalk2", label: "WALK 2" }] },
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
  function updateAppearance<K extends HeroAppearanceKey>(key: K, value: HeroAppearance[K]) {
    setHeroAppearance({ ...heroAppearance, [key]: value });
  }

  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        <button type="button" onClick={onClose} style={topCloseStyle}>×</button>

        <div style={topPreviewPanelStyle}>
          <div style={floatingLabelStyle}>IN-GAME PREVIEW</div>
          <div style={directionGridStyle}>
            {PREVIEW_GROUPS.map(group => (
              <div key={group.title} style={directionColumnStyle}>
                <div style={directionTitleStyle}>{group.title}</div>
                <div style={poseRowStyle}>
                  {group.poses.map(item => (
                    <div
                      key={`${group.title}-${item.pose}`}
                      style={{
                        ...topSpriteCellStyle,
                        transform: group.title === "LEFT" ? "scaleX(-1)" : undefined,
                      }}
                    >
                      <ProfessionalPixelHeroSprite appearance={heroAppearance} pose={item.pose} pixelSize={2} />
                      <div style={smallPoseLabelStyle}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={mainEditorPanelStyle}>
          <div style={sectionLabelStyle}>HERO EDITOR</div>

          <div style={editorGridStyle}>
            <aside style={categoryPanelStyle}>
              <div style={panelHeaderStyle}>PREVIEW</div>
              <div style={miniPreviewBoxStyle}>
                <ProfessionalPixelHeroSprite appearance={heroAppearance} pose="frontIdle" pixelSize={3} />
              </div>
            </aside>

            <main style={optionsPanelStyle}>
              <div style={panelHeaderStyle}>OPTIONS</div>
              <AppearanceSection title="Skin Tone" category="skin" value={heroAppearance.skin} onChange={updateAppearance} />
              <AppearanceSection title="Hair" category="hair" value={heroAppearance.hair} onChange={updateAppearance} />
              <AppearanceSection title="Hat" category="hat" value={heroAppearance.hat} onChange={updateAppearance} />
              <AppearanceSection title="Top" category="shirt" value={heroAppearance.shirt} onChange={updateAppearance} />
              <AppearanceSection title="Bottom" category="pants" value={heroAppearance.pants} onChange={updateAppearance} />
              <AppearanceSection title="Shoes" category="shoes" value={heroAppearance.shoes} onChange={updateAppearance} />
              <AppearanceSection title="Sunglasses" category="sunglasses" value={heroAppearance.sunglasses} onChange={updateAppearance} />
              <AppearanceSection title="Facial Hair" category="facialHair" value={heroAppearance.facialHair} onChange={updateAppearance} />
            </main>

            <aside style={equipmentPanelStyle}>
              <div style={panelHeaderStyle}>EQUIPMENT PREVIEW</div>
              <div style={largePreviewBoxStyle}>
                <ProfessionalPixelHeroSprite appearance={heroAppearance} pose="frontIdle" pixelSize={5} />
              </div>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={rightLabelStyle}>HERO NAME</span>
                <input value={heroName} onChange={event => setHeroName(event.target.value)} maxLength={18} style={inputStyle} />
              </label>
              <button type="button" onClick={onClose} style={saveButtonStyle}>SAVE APPEARANCE</button>
            </aside>
          </div>
        </div>
      </div>
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
    <section style={optionSectionStyle}>
      <div style={optionTitleStyle}>{title}</div>
      <div style={swatchGridStyle}>
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
                ...swatchStyle,
                borderColor: selected ? "#e33c38" : "rgba(255,255,255,0.16)",
                boxShadow: selected ? "0 0 0 2px rgba(227,60,56,0.45)" : "none",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 26,
                  height: 26,
                  backgroundColor: color === "transparent" ? "#1d2324" : color,
                  border: "2px solid rgba(0,0,0,0.55)",
                  boxSizing: "border-box",
                }}
              >
                {color === "transparent" && <span style={noneIconStyle}>×</span>}
              </span>
            </button>
          );
        })}
      </div>
    </section>
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
  padding: 14,
};

const windowStyle: React.CSSProperties = {
  position: "relative",
  width: "min(1220px, calc(100vw - 28px))",
  maxHeight: "calc(100vh - 28px)",
  overflow: "auto",
  background: "linear-gradient(#263034, #151c1f)",
  border: "3px solid rgba(255,255,255,0.1)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.08)",
  color: "#f3ead7",
};

const topCloseStyle: React.CSSProperties = {
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

const floatingLabelStyle: React.CSSProperties = {
  ...PX,
  position: "absolute",
  top: -1,
  left: 0,
  backgroundColor: "#11191d",
  border: "2px solid rgba(255,255,255,0.08)",
  color: "#f7f0df",
  padding: "13px 28px",
  fontSize: "0.72rem",
  zIndex: 2,
};

const topPreviewPanelStyle: React.CSSProperties = {
  position: "relative",
  minHeight: 320,
  paddingTop: 54,
  background:
    "linear-gradient(rgba(240,230,180,0.78), rgba(190,170,116,0.74)), linear-gradient(180deg, #99b46d, #cfb36e)",
  borderBottom: "4px solid #11191d",
};

const directionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  height: "100%",
};

const directionColumnStyle: React.CSSProperties = {
  minHeight: 258,
  borderRight: "1px solid rgba(0,0,0,0.17)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 14px 24px",
};

const directionTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#1c2527",
  fontSize: "0.65rem",
  marginBottom: 10,
};

const poseRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
};

const topSpriteCellStyle: React.CSSProperties = {
  display: "grid",
  justifyItems: "center",
  gap: 10,
};

const smallPoseLabelStyle: React.CSSProperties = {
  ...PX,
  color: "#263034",
  fontSize: "0.45rem",
};

const mainEditorPanelStyle: React.CSSProperties = {
  position: "relative",
  padding: "44px 10px 10px",
  backgroundColor: "#1a2225",
};

const sectionLabelStyle: React.CSSProperties = {
  ...PX,
  position: "absolute",
  left: 0,
  top: 0,
  backgroundColor: "#11191d",
  border: "2px solid rgba(255,255,255,0.09)",
  color: "#f7f0df",
  padding: "13px 28px",
  fontSize: "0.72rem",
};

const editorGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "230px 1fr 390px",
  gap: 10,
};

const categoryPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "2px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: 14,
};

const panelHeaderStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.52rem",
  marginBottom: 14,
};

const miniPreviewBoxStyle: React.CSSProperties = {
  height: 260,
  background:
    "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%)",
  backgroundSize: "16px 16px",
  backgroundColor: "#242d31",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const optionsPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "2px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: 18,
};

const equipmentPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "2px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: 18,
  display: "grid",
  gap: 14,
};

const optionSectionStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "0 0 16px",
  marginBottom: 16,
};

const optionTitleStyle: React.CSSProperties = {
  ...RJ,
  color: "#f7f0df",
  fontSize: "1rem",
  fontWeight: 800,
  marginBottom: 9,
};

const swatchGridStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 9,
};

const swatchStyle: React.CSSProperties = {
  width: 46,
  height: 46,
  padding: 7,
  border: "2px solid rgba(255,255,255,0.15)",
  borderRadius: 5,
  cursor: "pointer",
  backgroundColor: "rgba(255,255,255,0.06)",
};

const noneIconStyle: React.CSSProperties = {
  ...PX,
  display: "block",
  color: "#f7f0df",
  fontSize: "0.65rem",
  lineHeight: "21px",
};

const largePreviewBoxStyle: React.CSSProperties = {
  height: 270,
  background:
    "linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.04) 25%, transparent 25%)",
  backgroundSize: "22px 22px",
  backgroundColor: "#232b2f",
  border: "1px solid rgba(255,255,255,0.09)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const rightLabelStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.47rem",
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

const saveButtonStyle: React.CSSProperties = {
  ...PX,
  border: "1px solid #d8463d",
  background: "linear-gradient(#d5423a, #9b2524)",
  color: "#fff7e6",
  padding: "15px 16px",
  cursor: "pointer",
  fontSize: "0.5rem",
};
