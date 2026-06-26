import {
  HERO_APPEARANCE_OPTIONS,
  type HeroAppearance,
  getHeroOptionColor,
} from "./heroAppearance";
import { LayeredHeroSprite, type HeroPose } from "./LayeredHeroSprite";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

type HeroAppearanceKey = keyof HeroAppearance;

const PREVIEWS: { title: string; poses: { pose: HeroPose; label: string }[] }[] = [
  { title: "FRONT", poses: [{ pose: "front_idle", label: "IDLE" }, { pose: "front_walk_1", label: "WALK 1" }, { pose: "front_walk_2", label: "WALK 2" }] },
  { title: "BACK", poses: [{ pose: "back_idle", label: "IDLE" }, { pose: "back_walk_1", label: "WALK 1" }, { pose: "back_walk_2", label: "WALK 2" }] },
  { title: "SIDE", poses: [{ pose: "side_idle", label: "IDLE" }, { pose: "side_walk_1", label: "WALK 1" }, { pose: "side_walk_2", label: "WALK 2" }] },
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

        <div style={topPreviewStyle}>
          <div style={floatingLabelStyle}>PRODUCTION SPRITE PREVIEW</div>
          <div style={previewGridStyle}>
            {PREVIEWS.map(group => (
              <div key={group.title} style={previewGroupStyle}>
                <div style={previewTitleStyle}>{group.title}</div>
                <div style={poseRowStyle}>
                  {group.poses.map(item => (
                    <div key={item.pose} style={poseCellStyle}>
                      <LayeredHeroSprite appearance={heroAppearance} pose={item.pose} pixelSize={2} />
                      <div style={poseLabelStyle}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={editorGridStyle}>
          <section style={optionsPanelStyle}>
            <div style={panelTitleStyle}>OPTIONS</div>
            <AppearanceSection title="Skin Tone" category="skin" value={heroAppearance.skin} onChange={updateAppearance} />
            <AppearanceSection title="Hair" category="hair" value={heroAppearance.hair} onChange={updateAppearance} />
            <AppearanceSection title="Hat" category="hat" value={heroAppearance.hat} onChange={updateAppearance} />
            <AppearanceSection title="Top" category="shirt" value={heroAppearance.shirt} onChange={updateAppearance} />
            <AppearanceSection title="Bottom" category="pants" value={heroAppearance.pants} onChange={updateAppearance} />
            <AppearanceSection title="Shoes" category="shoes" value={heroAppearance.shoes} onChange={updateAppearance} />
            <AppearanceSection title="Sunglasses" category="sunglasses" value={heroAppearance.sunglasses} onChange={updateAppearance} />
            <AppearanceSection title="Facial Hair" category="facialHair" value={heroAppearance.facialHair} onChange={updateAppearance} />
          </section>

          <section style={heroPanelStyle}>
            <div style={panelTitleStyle}>EQUIPMENT PREVIEW</div>
            <div style={largePreviewStyle}>
              <LayeredHeroSprite appearance={heroAppearance} pose="front_idle" pixelSize={5} />
            </div>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={fieldLabelStyle}>HERO NAME</span>
              <input value={heroName} onChange={event => setHeroName(event.target.value)} maxLength={18} style={inputStyle} />
            </label>
            <button type="button" onClick={onClose} style={saveButtonStyle}>SAVE APPEARANCE</button>
          </section>
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
      <div style={swatchRowStyle}>
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
                ...swatchButtonStyle,
                borderColor: selected ? "#e33c38" : "rgba(255,255,255,0.16)",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 28,
                  height: 28,
                  backgroundColor: color === "transparent" ? "#1d2324" : color,
                  border: "2px solid rgba(0,0,0,0.55)",
                  boxSizing: "border-box",
                }}
              />
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
  width: "min(1180px, calc(100vw - 28px))",
  maxHeight: "calc(100vh - 28px)",
  overflow: "auto",
  background: "linear-gradient(#263034, #151c1f)",
  border: "3px solid rgba(255,255,255,0.1)",
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
};

const topPreviewStyle: React.CSSProperties = {
  position: "relative",
  minHeight: 280,
  paddingTop: 54,
  background: "linear-gradient(rgba(240,230,180,0.78), rgba(190,170,116,0.74))",
  borderBottom: "4px solid #11191d",
};

const previewGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 0,
};

const previewGroupStyle: React.CSSProperties = {
  minHeight: 220,
  borderRight: "1px solid rgba(0,0,0,0.17)",
  display: "grid",
  justifyItems: "center",
  alignContent: "space-between",
  padding: "18px 14px 22px",
};

const previewTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#1c2527",
  fontSize: "0.65rem",
};

const poseRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 18,
  alignItems: "flex-end",
};

const poseCellStyle: React.CSSProperties = {
  display: "grid",
  justifyItems: "center",
  gap: 8,
};

const poseLabelStyle: React.CSSProperties = {
  ...PX,
  color: "#263034",
  fontSize: "0.42rem",
};

const editorGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 390px",
  gap: 10,
  padding: 10,
};

const optionsPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "2px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: 18,
};

const heroPanelStyle: React.CSSProperties = {
  backgroundColor: "#151c1f",
  border: "2px solid rgba(255,255,255,0.08)",
  borderRadius: 8,
  padding: 18,
  display: "grid",
  gap: 14,
};

const panelTitleStyle: React.CSSProperties = {
  ...PX,
  color: "#f7f0df",
  fontSize: "0.55rem",
  marginBottom: 14,
};

const optionSectionStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "0 0 14px",
  marginBottom: 14,
};

const optionTitleStyle: React.CSSProperties = {
  ...RJ,
  color: "#f7f0df",
  fontSize: "1rem",
  fontWeight: 800,
  marginBottom: 9,
};

const swatchRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 9,
};

const swatchButtonStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  padding: 7,
  border: "2px solid rgba(255,255,255,0.15)",
  borderRadius: 5,
  cursor: "pointer",
  backgroundColor: "rgba(255,255,255,0.06)",
};

const largePreviewStyle: React.CSSProperties = {
  height: 270,
  backgroundColor: "#232b2f",
  border: "1px solid rgba(255,255,255,0.09)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const fieldLabelStyle: React.CSSProperties = {
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
