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
  function updateAppearance<K extends HeroAppearanceKey>(key: K, value: HeroAppearance[K]) {
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
      <div style={{ position: "relative", width: 96, height: 144, imageRendering: "pixelated" }}>
        <div style={pixel(32, 92, 14, 36, pantsColor)} />
        <div style={pixel(50, 92, 14, 36, pantsColor)} />

        <div style={pixel(26, 126, 22, 10, shoesColor)} />
        <div style={pixel(48, 126, 22, 10, shoesColor)} />

        <div style={pixel(26, 54, 44, 42, shirtColor)} />

        <div style={pixel(14, 60, 14, 38, skinColor)} />
        <div style={pixel(68, 60, 14, 38, skinColor)} />

        <div style={pixel(40, 44, 16, 14, skinColor)} />
        <div style={pixel(28, 18, 40, 36, skinColor)} />

        {appearance.hair !== "none" && (
          <>
            <div style={pixel(26, 12, 44, 14, hairColor)} />
            <div style={pixel(24, 24, 10, 20, hairColor)} />
            <div style={pixel(62, 24, 10, 20, hairColor)} />
          </>
        )}

        {appearance.hat !== "none" && (
          <>
            <div style={pixel(24, 6, 48, 12, hatColor)} />
            <div style={pixel(32, 0, 32, 10, hatColor)} />
            <div style={pixel(64, 10, 18, 8, hatColor)} />
          </>
        )}

        <div style={pixel(38, 32, 6, 6, "#252018")} />
        <div style={pixel(54, 32, 6, 6, "#252018")} />

        {appearance.sunglasses !== "none" && (
          <>
            <div style={pixel(34, 29, 14, 10, "#111")} />
            <div style={pixel(50, 29, 14, 10, "#111")} />
            <div style={pixel(48, 33, 4, 3, "#111")} />
          </>
        )}

        {appearance.facialHair === "mustache" && <div style={pixel(40, 43, 18, 5, "#252018")} />}

        {appearance.facialHair === "beard" && (
          <>
            <div style={pixel(36, 43, 26, 7, "#252018")} />
            <div style={pixel(40, 50, 18, 8, "#252018")} />
          </>
        )}

        <div style={outline(28, 18, 40, 36)} />
        <div style={outline(26, 54, 44, 42)} />
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
  const options = HERO_APPEARANCE_OPTIONS[category] as readonly { id: string; color?: string }[];
  const option = options.find(option => option.id === id);
  return option?.color ?? "transparent";
}

function pixel(left: number, top: number, width: number, height: number, backgroundColor: string) {
  return {
    position: "absolute" as const,
    left,
    top,
    width,
    height,
    backgroundColor,
    boxSizing: "border-box" as const,
  };
}

function outline(left: number, top: number, width: number, height: number) {
  return {
    position: "absolute" as const,
    left,
    top,
    width,
    height,
    border: "3px solid #252018",
    boxSizing: "border-box" as const,
    pointerEvents: "none" as const,
  };
}

function buttonStyle(backgroundColor: string, color: string) {
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