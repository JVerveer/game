import { HERO_PRESETS, type HeroPresetId } from "./heroPresets";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

export function HeroEditorOverlay({
  heroName,
  setHeroName,
  heroPresetId,
  setHeroPresetId,
  facing,
  onClose,
}: {
  heroName: string;
  setHeroName: (name: string) => void;
  heroPresetId: HeroPresetId;
  setHeroPresetId: (id: HeroPresetId) => void;
  facing: "up" | "down" | "left" | "right";
  onClose: () => void;
}) {
  const selectedPreset = HERO_PRESETS.find(preset => preset.id === heroPresetId) ?? HERO_PRESETS[0];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        backgroundColor: "rgba(37,32,24,0.56)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        className="pixel-window"
        style={{
          width: "min(720px, calc(100vw - 48px))",
          maxHeight: "calc(100vh - 48px)",
          overflow: "auto",
          backgroundColor: "#fff8c8",
          padding: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
          <div>
            <div style={{ ...PX, fontSize: "0.75rem", color: "#ca4b36", marginBottom: 10 }}>
              HERO EDITOR
            </div>
            <div style={{ ...VT, fontSize: "1.25rem", color: "#315f2a" }}>
              Customize your in-game hero.
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              ...PX,
              fontSize: "0.5rem",
              border: "3px solid #252018",
              backgroundColor: "#ca4b36",
              color: "#fff8c8",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            CLOSE
          </button>
        </div>

        <div style={{ height: 4, backgroundColor: "#252018", margin: "18px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 22 }}>
          <div
            style={{
              border: "4px solid #252018",
              backgroundColor: "#9fdc7a",
              boxShadow: "inset 0 0 0 4px rgba(255,255,255,0.35)",
              minHeight: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "scale(2.4)",
                transformOrigin: "center",
              }}
            >
              <div className={`trainer-sprite ${selectedPreset.spriteClass} facing-${facing}`} />
            </div>
            <div style={{ ...VT, fontSize: "1.2rem", color: "#252018", marginTop: 26 }}>
              {heroName.trim() || "Hero"}
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ ...PX, fontSize: "0.48rem", color: "#252018" }}>NAME</span>
              <input
                value={heroName}
                onChange={event => setHeroName(event.target.value)}
                maxLength={18}
                style={{
                  ...VT,
                  fontSize: "1.35rem",
                  border: "3px solid #252018",
                  backgroundColor: "#fffef0",
                  padding: "8px 10px",
                  color: "#252018",
                }}
              />
            </label>

            <div>
              <div style={{ ...PX, fontSize: "0.48rem", color: "#252018", marginBottom: 8 }}>
                OUTFIT
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
                {HERO_PRESETS.map(preset => {
                  const selected = preset.id === heroPresetId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setHeroPresetId(preset.id)}
                      style={{
                        border: selected ? "3px solid #ca4b36" : "3px solid #252018",
                        backgroundColor: selected ? "#ffe58a" : "#fffef0",
                        color: "#252018",
                        padding: "10px",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div className={`trainer-sprite ${preset.spriteClass} facing-down`} />
                        </div>
                        <div>
                          <div style={{ ...VT, fontSize: "1.15rem" }}>{preset.label}</div>
                          <div style={{ ...RJ, fontSize: "0.72rem", fontWeight: 700, color: "#66512c" }}>
                            {preset.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ ...RJ, fontSize: "0.82rem", color: "#66512c", fontWeight: 700 }}>
              Press H in-game to open or close this editor.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
