import {
  HERO_APPEARANCE_OPTIONS,
  type HeroAppearance,
} from "./heroAppearance";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

type HeroAppearanceKey = keyof HeroAppearance;

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
      <div className="pixel-window" style={windowStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ ...PX, fontSize: "0.75rem", color: "#ca4b36", marginBottom: 10 }}>
              HERO EDITOR
            </div>
            <div style={{ ...VT, fontSize: "1.25rem", color: "#315f2a" }}>
              Customize your in-game hero.
            </div>
          </div>

          <button type="button" onClick={onClose} style={buttonStyle("#ca4b36", "#fff8c8")}>
            CLOSE
          </button>
        </div>

        <div style={{ height: 4, backgroundColor: "#252018", margin: "18px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 22 }}>
          <HeroPreview heroName={heroName} appearance={heroAppearance} facing={facing} />

          <div style={{ display: "grid", gap: 16 }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ ...PX, fontSize: "0.48rem", color: "#252018" }}>NAME</span>
              <input
                value={heroName}
                onChange={event => setHeroName(event.target.value)}
                maxLength={18}
                style={inputStyle}
              />
            </label>

            <AppearanceSection title="SKIN COLOR" category="skin" value={heroAppearance.skin} onChange={updateAppearance} />
            <AppearanceSection title="HAIR" category="hair" value={heroAppearance.hair} onChange={updateAppearance} />
            <AppearanceSection title="FACIAL HAIR" category="facialHair" value={heroAppearance.facialHair} onChange={updateAppearance} />
            <AppearanceSection title="SUNGLASSES" category="sunglasses" value={heroAppearance.sunglasses} onChange={updateAppearance} />
            <AppearanceSection title="HATS" category="hat" value={heroAppearance.hat} onChange={updateAppearance} />
            <AppearanceSection title="SHIRT" category="shirt" value={heroAppearance.shirt} onChange={updateAppearance} />
            <AppearanceSection title="PANTS" category="pants" value={heroAppearance.pants} onChange={updateAppearance} />
            <AppearanceSection title="SHOES" category="shoes" value={heroAppearance.shoes} onChange={updateAppearance} />

            <div style={{ ...RJ, fontSize: "0.82rem", color: "#66512c", fontWeight: 700 }}>
              Press H in-game to open or close this editor.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPreview({
  heroName,
  appearance,
}: {
  heroName: string;
  appearance: HeroAppearance;
  facing: "up" | "down" | "left" | "right";
}) {
  const skinColor = getOptionColor("skin", appearance.skin);
  const hairColor = getOptionColor("hair", appearance.hair);
  const hatColor = getOptionColor("hat", appearance.hat);
  const shirtColor = getOptionColor("shirt", appearance.shirt);
  const pantsColor = getOptionColor("pants", appearance.pants);
  const shoesColor = getOptionColor("shoes", appearance.shoes);

  return (
    <div style={previewBoxStyle}>
      <div
        style={{
          position: "relative",
          width: 132,
          height: 174,
          filter: "drop-shadow(4px 6px 0 rgba(37,32,24,0.22))",
        }}
      >
        <div style={drawnShape(48, 104, 15, 42, pantsColor, "10px 9px 6px 7px", -2)} />
        <div style={drawnShape(68, 104, 15, 42, pantsColor, "9px 10px 7px 6px", 2)} />

        <div style={drawnShape(39, 141, 29, 12, shoesColor, "12px 7px 8px 5px", -3)} />
        <div style={drawnShape(65, 141, 29, 12, shoesColor, "7px 12px 5px 8px", 3)} />

        <div style={drawnShape(39, 66, 54, 46, shirtColor, "18px 16px 13px 15px", -1)} />

        <div
          style={{
            position: "absolute",
            left: 48,
            top: 74,
            width: 24,
            height: 6,
            backgroundColor: "rgba(255,255,255,0.28)",
            borderRadius: "999px",
            transform: "rotate(-7deg)",
          }}
        />

        <div style={drawnShape(25, 72, 18, 42, skinColor, "12px 9px 13px 7px", 7)} />
        <div style={drawnShape(88, 72, 18, 42, skinColor, "9px 12px 7px 13px", -7)} />

        <div style={drawnShape(22, 109, 20, 17, skinColor, "12px 10px 8px 9px", -6)} />
        <div style={drawnShape(90, 109, 20, 17, skinColor, "10px 12px 9px 8px", 6)} />

        <div style={drawnShape(57, 55, 18, 18, skinColor, "7px 8px 6px 7px", 1)} />
        <div style={drawnShape(43, 25, 47, 42, skinColor, "20px 18px 17px 19px", -1)} />

        <div style={drawnShape(36, 39, 12, 18, skinColor, "8px 4px 7px 5px", -5)} />
        <div style={drawnShape(85, 39, 12, 18, skinColor, "4px 8px 5px 7px", 5)} />

        {appearance.hair !== "none" && (
          <>
            <div style={drawnShape(40, 18, 53, 20, hairColor, "18px 22px 8px 12px", -3)} />
            <div style={drawnShape(39, 33, 13, 24, hairColor, "9px 4px 10px 6px", -5)} />
            <div style={drawnShape(80, 31, 13, 25, hairColor, "4px 9px 6px 10px", 5)} />
          </>
        )}

        {appearance.hat !== "none" && (
          <>
            <div style={drawnShape(38, 13, 58, 17, hatColor, "18px 21px 7px 9px", -2)} />
            <div style={drawnShape(51, 4, 33, 15, hatColor, "13px 15px 5px 6px", 2)} />
            <div style={drawnShape(82, 20, 22, 9, hatColor, "4px 11px 5px 8px", 5)} />
          </>
        )}

        {appearance.sunglasses === "none" ? (
          <>
            <div style={drawnShape(55, 43, 6, 7, "#252018", "50%", -4, false)} />
            <div style={drawnShape(72, 42, 6, 7, "#252018", "50%", 4, false)} />
          </>
        ) : (
          <>
            <div style={drawnShape(50, 39, 17, 11, "#111", "7px 5px 6px 4px", -4)} />
            <div style={drawnShape(69, 39, 17, 11, "#111", "5px 7px 4px 6px", 4)} />
            <div style={drawnShape(65, 43, 7, 4, "#111", "999px", 0, false)} />
          </>
        )}

        <div
          style={{
            position: "absolute",
            left: 65,
            top: 48,
            width: 6,
            height: 9,
            borderRight: "3px solid rgba(37,32,24,0.55)",
            borderBottom: "3px solid rgba(37,32,24,0.35)",
            borderRadius: "0 0 8px 0",
            transform: "rotate(5deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 58,
            top: 59,
            width: 18,
            height: 7,
            borderBottom: "3px solid #252018",
            borderRadius: "0 0 999px 999px",
            transform: "rotate(-2deg)",
          }}
        />

        {appearance.facialHair === "mustache" && (
          <div style={drawnShape(55, 55, 24, 6, "#252018", "50%", -2, false)} />
        )}

        {appearance.facialHair === "beard" && (
          <>
            <div style={drawnShape(51, 55, 31, 10, "#252018", "10px 9px 11px 8px", -1)} />
            <div style={drawnShape(56, 63, 22, 10, "#252018", "7px 8px 12px 11px", 1)} />
          </>
        )}
      </div>

      <div style={{ ...VT, fontSize: "1.2rem", color: "#252018" }}>
        {heroName.trim() || "Hero"}
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
    <div>
      <div style={{ ...PX, fontSize: "0.48rem", color: "#252018", marginBottom: 8 }}>
        {title}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(option => {
          const selected = option.id === value;
          const color = getOptionColor(category, option.id as HeroAppearance[K]);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(category, option.id as HeroAppearance[K])}
              style={{
                ...buttonStyle(selected ? "#ffe58a" : "#fffef0", "#252018"),
                borderColor: selected ? "#ca4b36" : "#252018",
              }}
            >
              {color !== "transparent" && (
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    backgroundColor: color,
                    border: "2px solid #252018",
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                />
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getOptionColor<K extends HeroAppearanceKey>(
  category: K,
  id: HeroAppearance[K],
): string {
  const options = HERO_APPEARANCE_OPTIONS[category] as readonly {
    id: string;
    color?: string;
  }[];

  const option = options.find(option => option.id === id);
  return option?.color ?? "transparent";
}

function drawnShape(
  left: number,
  top: number,
  width: number,
  height: number,
  backgroundColor: string,
  borderRadius: string,
  rotate = 0,
  outlined = true,
): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    backgroundColor,
    borderRadius,
    border: outlined ? "3px solid #252018" : undefined,
    boxSizing: "border-box",
    transform: `rotate(${rotate}deg)`,
    boxShadow: outlined
      ? "inset 2px 2px 0 rgba(255,255,255,0.25), inset -2px -2px 0 rgba(37,32,24,0.12)"
      : undefined,
  };
}

function buttonStyle(backgroundColor: string, color: string): React.CSSProperties {
  return {
    ...PX,
    fontSize: "0.48rem",
    border: "3px solid #252018",
    backgroundColor,
    color,
    padding: "8px 10px",
    cursor: "pointer",
  };
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1300,
  backgroundColor: "rgba(37,32,24,0.56)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const windowStyle: React.CSSProperties = {
  width: "min(860px, calc(100vw - 48px))",
  maxHeight: "calc(100vh - 48px)",
  overflow: "auto",
  backgroundColor: "#fff8c8",
  padding: 24,
};

const inputStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.35rem",
  border: "3px solid #252018",
  backgroundColor: "#fffef0",
  padding: "8px 10px",
  color: "#252018",
};

const previewBoxStyle: React.CSSProperties = {
  border: "4px solid #252018",
  backgroundColor: "#9fdc7a",
  boxShadow: "inset 0 0 0 4px rgba(255,255,255,0.35)",
  minHeight: 260,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 12,
};