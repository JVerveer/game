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
              Build your manga-inspired pixel hero.
            </div>
          </div>

          <button type="button" onClick={onClose} style={buttonStyle("#ca4b36", "#fff8c8")}>
            CLOSE
          </button>
        </div>

        <div style={dividerStyle} />

        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: 24 }}>
          <HeroPreview heroName={heroName} appearance={heroAppearance} facing={facing} />

          <div style={{ display: "grid", gap: 16 }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={sectionTitleStyle}>NAME</span>
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
      <div style={mangaCardStyle}>
        <div style={speedLine(12, 24, 55, -18)} />
        <div style={speedLine(176, 42, 48, 18)} />
        <div style={speedLine(22, 182, 70, 14)} />
        <div style={speedLine(168, 172, 52, -15)} />

        <div style={characterStageStyle}>
          {/* shadow */}
          <div
            style={{
              position: "absolute",
              left: 42,
              bottom: 4,
              width: 116,
              height: 22,
              backgroundColor: "rgba(37,32,24,0.18)",
              borderRadius: "50%",
              transform: "rotate(-2deg)",
            }}
          />

          {/* cape-ish manga silhouette shadow */}
          <div style={block(43, 72, 78, 86, "rgba(37,32,24,0.12)", 0)} />

          {/* legs */}
          <div style={pixelBlock(73, 126, 18, 45, pantsColor)} />
          <div style={pixelBlock(105, 126, 18, 45, pantsColor)} />

          {/* leg highlights */}
          <div style={pixelBlock(78, 132, 5, 28, "rgba(255,255,255,0.22)", 0, false)} />
          <div style={pixelBlock(110, 132, 5, 28, "rgba(255,255,255,0.22)", 0, false)} />

          {/* shoes */}
          <div style={pixelBlock(62, 164, 34, 15, shoesColor)} />
          <div style={pixelBlock(100, 164, 34, 15, shoesColor)} />

          {/* torso */}
          <div style={pixelBlock(61, 83, 72, 53, shirtColor)} />

          {/* manga jacket folds */}
          <div style={pixelLine(74, 89, 3, 40, "#252018")} />
          <div style={pixelLine(118, 89, 3, 40, "#252018")} />
          <div style={pixelBlock(83, 92, 30, 6, "rgba(255,255,255,0.25)", 0, false)} />

          {/* arms */}
          <div style={pixelBlock(43, 90, 22, 52, skinColor)} />
          <div style={pixelBlock(130, 90, 22, 52, skinColor)} />

          {/* hands */}
          <div style={pixelBlock(39, 135, 27, 22, skinColor)} />
          <div style={pixelBlock(130, 135, 27, 22, skinColor)} />

          {/* neck */}
          <div style={pixelBlock(88, 70, 22, 20, skinColor)} />

          {/* head */}
          <div style={pixelBlock(65, 30, 68, 55, skinColor)} />

          {/* manga face shape lower jaw */}
          <div style={pixelBlock(75, 72, 48, 22, skinColor)} />

          {/* ears */}
          <div style={pixelBlock(55, 51, 14, 23, skinColor)} />
          <div style={pixelBlock(129, 51, 14, 23, skinColor)} />

          {/* hair */}
          {appearance.hair !== "none" && (
            <>
              <div style={pixelBlock(59, 20, 78, 24, hairColor)} />
              <div style={pixelBlock(53, 35, 24, 39, hairColor)} />
              <div style={pixelBlock(122, 35, 22, 39, hairColor)} />

              {/* spiky manga bangs */}
              <div style={spike(62, 39, 20, 35, hairColor, -14)} />
              <div style={spike(80, 33, 21, 42, hairColor, -5)} />
              <div style={spike(98, 34, 22, 39, hairColor, 6)} />
              <div style={spike(116, 40, 18, 31, hairColor, 15)} />

              {/* hair shine */}
              <div style={pixelBlock(73, 27, 28, 6, "rgba(255,255,255,0.25)", 0, false)} />
            </>
          )}

          {/* hat */}
          {appearance.hat !== "none" && (
            <>
              <div style={pixelBlock(57, 18, 84, 18, hatColor)} />
              <div style={pixelBlock(77, 5, 43, 18, hatColor)} />
              <div style={pixelBlock(126, 28, 31, 10, hatColor)} />
              <div style={pixelBlock(83, 10, 25, 5, "rgba(255,255,255,0.28)", 0, false)} />
            </>
          )}

          {/* eyes */}
          {appearance.sunglasses === "none" ? (
            <>
              <div style={mangaEye(79, 55)} />
              <div style={mangaEye(108, 55)} />
              <div style={pixelBlock(76, 49, 17, 4, "#252018", -5, false)} />
              <div style={pixelBlock(105, 49, 17, 4, "#252018", 5, false)} />
            </>
          ) : (
            <>
              <div style={pixelBlock(75, 52, 24, 14, "#111")} />
              <div style={pixelBlock(101, 52, 24, 14, "#111")} />
              <div style={pixelBlock(97, 57, 8, 4, "#111", 0, false)} />
              <div style={pixelBlock(80, 55, 8, 3, "rgba(255,255,255,0.35)", 0, false)} />
              <div style={pixelBlock(106, 55, 8, 3, "rgba(255,255,255,0.35)", 0, false)} />
            </>
          )}

          {/* nose */}
          <div style={pixelLine(98, 65, 4, 11, "rgba(37,32,24,0.65)")} />

          {/* mouth */}
          <div style={pixelBlock(88, 79, 23, 4, "#252018", 0, false)} />

          {/* facial hair */}
          {appearance.facialHair === "mustache" && (
            <div style={pixelBlock(84, 75, 30, 6, "#252018", 0, false)} />
          )}

          {appearance.facialHair === "beard" && (
            <>
              <div style={pixelBlock(78, 75, 43, 11, "#252018")} />
              <div style={pixelBlock(86, 85, 28, 12, "#252018")} />
            </>
          )}

          {/* outline accents */}
          <div style={pixelLine(63, 82, 4, 45, "#252018")} />
          <div style={pixelLine(131, 82, 4, 45, "#252018")} />
          <div style={pixelLine(68, 29, 60, 4, "#252018")} />
        </div>
      </div>

      <div style={namePlateStyle}>{heroName.trim() || "Hero"}</div>
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
      <div style={sectionTitleStyle}>{title}</div>

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
                boxShadow: selected
                  ? "3px 3px 0 #252018"
                  : "2px 2px 0 rgba(37,32,24,0.45)",
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

function pixelBlock(
  left: number,
  top: number,
  width: number,
  height: number,
  backgroundColor: string,
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
    border: outlined ? "4px solid #252018" : undefined,
    boxSizing: "border-box",
    transform: `rotate(${rotate}deg)`,
    imageRendering: "pixelated",
    boxShadow: outlined
      ? "inset 3px 3px 0 rgba(255,255,255,0.22), inset -3px -3px 0 rgba(37,32,24,0.12)"
      : undefined,
  };
}

function pixelLine(
  left: number,
  top: number,
  width: number,
  height: number,
  backgroundColor: string,
): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    backgroundColor,
    boxShadow: "1px 1px 0 rgba(255,255,255,0.16)",
  };
}

function block(
  left: number,
  top: number,
  width: number,
  height: number,
  backgroundColor: string,
  rotate = 0,
): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    backgroundColor,
    transform: `rotate(${rotate}deg)`,
  };
}

function spike(
  left: number,
  top: number,
  width: number,
  height: number,
  backgroundColor: string,
  rotate = 0,
): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    backgroundColor,
    borderLeft: "4px solid #252018",
    borderRight: "4px solid #252018",
    borderBottom: "4px solid #252018",
    boxSizing: "border-box",
    clipPath: "polygon(50% 100%, 0 0, 100% 0)",
    transform: `rotate(${rotate}deg)`,
  };
}

function mangaEye(left: number, top: number): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width: 14,
    height: 18,
    backgroundColor: "#252018",
    border: "3px solid #252018",
    boxSizing: "border-box",
    boxShadow: "inset 4px 3px 0 rgba(255,255,255,0.85)",
  };
}

function speedLine(
  left: number,
  top: number,
  width: number,
  rotate: number,
): React.CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height: 4,
    backgroundColor: "rgba(37,32,24,0.28)",
    transform: `rotate(${rotate}deg)`,
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
  backgroundColor: "rgba(37,32,24,0.62)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const windowStyle: React.CSSProperties = {
  width: "min(920px, calc(100vw - 48px))",
  maxHeight: "calc(100vh - 48px)",
  overflow: "auto",
  backgroundColor: "#fff8c8",
  padding: 24,
  boxShadow:
    "inset 0 0 0 4px #ffffff, inset 0 0 0 8px #ffef93, 8px 8px 0 rgba(37,32,24,0.55)",
};

const dividerStyle: React.CSSProperties = {
  height: 4,
  backgroundColor: "#252018",
  margin: "18px 0",
  boxShadow: "0 3px 0 rgba(202,75,54,0.35)",
};

const sectionTitleStyle: React.CSSProperties = {
  ...PX,
  fontSize: "0.48rem",
  color: "#252018",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.35rem",
  border: "3px solid #252018",
  backgroundColor: "#fffef0",
  padding: "8px 10px",
  color: "#252018",
  boxShadow: "3px 3px 0 rgba(37,32,24,0.35)",
};

const previewBoxStyle: React.CSSProperties = {
  border: "4px solid #252018",
  background:
    "linear-gradient(135deg, #fff4b0 0%, #9fdc7a 52%, #73b9d8 100%)",
  boxShadow:
    "inset 0 0 0 4px rgba(255,255,255,0.55), 5px 5px 0 rgba(37,32,24,0.45)",
  minHeight: 330,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 10,
  overflow: "hidden",
};

const mangaCardStyle: React.CSSProperties = {
  position: "relative",
  width: 220,
  height: 250,
  backgroundColor: "rgba(255,254,240,0.38)",
  border: "4px solid #252018",
  boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.55)",
  overflow: "hidden",
};

const characterStageStyle: React.CSSProperties = {
  position: "absolute",
  left: 12,
  top: 28,
  width: 196,
  height: 190,
  transform: "scale(0.95)",
  transformOrigin: "center bottom",
};

const namePlateStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.35rem",
  color: "#252018",
  backgroundColor: "#fffef0",
  border: "3px solid #252018",
  padding: "4px 14px",
  boxShadow: "3px 3px 0 rgba(37,32,24,0.35)",
};