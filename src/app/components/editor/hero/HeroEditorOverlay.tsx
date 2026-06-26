import {
  HERO_APPEARANCE_OPTIONS,
  type HeroAppearance,
} from "./heroAppearance";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

type HeroAppearanceKey = keyof HeroAppearance;
type Pose = "frontIdle" | "frontWalk" | "backIdle" | "backWalk" | "sideIdle" | "sideWalk";

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

        <div style={topArtStyle}>
          <div style={titleBannerStyle}>HERO EDITOR</div>
          <div style={subtitleStyle}>
            Customize your hero and make them your own.
          </div>
          <PixelPortrait appearance={heroAppearance} />
        </div>

        <div style={contentGridStyle}>
          <div>
            <PanelTitle>PREVIEW</PanelTitle>

            <div style={previewGridStyle}>
              <PreviewCard label="FRONT (IDLE)">
                <PixelHero appearance={heroAppearance} pose="frontIdle" />
              </PreviewCard>
              <PreviewCard label="FRONT (WALK)">
                <PixelHero appearance={heroAppearance} pose="frontWalk" />
              </PreviewCard>
              <PreviewCard label="BACK (IDLE)">
                <PixelHero appearance={heroAppearance} pose="backIdle" />
              </PreviewCard>
              <PreviewCard label="BACK (WALK)">
                <PixelHero appearance={heroAppearance} pose="backWalk" />
              </PreviewCard>
              <PreviewCard label="SIDE (IDLE)">
                <PixelHero appearance={heroAppearance} pose="sideIdle" />
              </PreviewCard>
              <PreviewCard label="SIDE (WALK)">
                <PixelHero appearance={heroAppearance} pose="sideWalk" />
              </PreviewCard>
            </div>

            <div style={hintBoxStyle}>
              <span style={{ fontSize: 28 }}>📖</span>
              <span>Press H in-game to open or close this editor.</span>
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
          <button type="button" onClick={onClose} style={closeButtonStyle}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

function PixelHero({
  appearance,
  pose,
}: {
  appearance: HeroAppearance;
  pose: Pose;
}) {
  const skin = getOptionColor("skin", appearance.skin);
  const hair = getOptionColor("hair", appearance.hair);
  const hat = getOptionColor("hat", appearance.hat);
  const shirt = getOptionColor("shirt", appearance.shirt);
  const pants = getOptionColor("pants", appearance.pants);
  const shoes = getOptionColor("shoes", appearance.shoes);

  const isBack = pose.startsWith("back");
  const isSide = pose.startsWith("side");
  const isWalk = pose.endsWith("Walk");

  const leftLegY = isWalk ? 83 : 78;
  const rightLegY = isWalk ? 78 : 78;
  const leftArmY = isWalk ? 50 : 52;
  const rightArmY = isWalk ? 55 : 52;

  return (
    <div style={spriteStageStyle}>
      <div style={shadowStyle} />

      {/* shoes */}
      <Px x={28} y={leftLegY + 25} w={13} h={6} c={shoes} />
      <Px x={48} y={rightLegY + 25} w={13} h={6} c={shoes} />

      {/* legs */}
      <Px x={31} y={leftLegY} w={9} h={29} c={pants} />
      <Px x={49} y={rightLegY} w={9} h={29} c={pants} />
      <Px x={31} y={leftLegY} w={3} h={24} c="rgba(255,255,255,0.22)" noBorder />
      <Px x={49} y={rightLegY} w={3} h={24} c="rgba(255,255,255,0.18)" noBorder />

      {/* body */}
      <Px x={25} y={46} w={39} h={35} c={shirt} />
      <Px x={33} y={51} w={20} h={4} c="rgba(255,255,255,0.25)" noBorder />

      {/* arms */}
      {!isSide && (
        <>
          <Px x={15} y={leftArmY} w={12} h={29} c={skin} />
          <Px x={62} y={rightArmY} w={12} h={29} c={skin} />
        </>
      )}

      {isSide && (
        <>
          <Px x={58} y={leftArmY} w={12} h={31} c={skin} />
          <Px x={56} y={leftArmY + 27} w={13} h={10} c={skin} />
        </>
      )}

      {/* neck */}
      <Px x={38} y={38} w={12} h={11} c={skin} />

      {/* head */}
      <Px x={27} y={13} w={35} h={31} c={skin} />

      {/* ears */}
      {!isBack && !isSide && (
        <>
          <Px x={22} y={25} w={7} h={11} c={skin} />
          <Px x={60} y={25} w={7} h={11} c={skin} />
        </>
      )}

      {isSide && <Px x={58} y={26} w={7} h={11} c={skin} />}

      {/* hair */}
      {appearance.hair !== "none" && (
        <>
          <Px x={23} y={8} w={43} h={13} c={hair} />
          <Px x={22} y={19} w={11} h={22} c={hair} />
          <Px x={56} y={18} w={11} h={23} c={hair} />

          {!isBack && (
            <>
              <Tri x={27} y={17} w={12} h={18} c={hair} />
              <Tri x={39} y={14} w={13} h={20} c={hair} />
              <Tri x={51} y={17} w={12} h={18} c={hair} />
            </>
          )}

          {isBack && (
            <>
              <Px x={30} y={22} w={29} h={21} c={hair} />
              <Px x={34} y={40} w={21} h={7} c={hair} />
            </>
          )}

          {isSide && (
            <>
              <Tri x={53} y={17} w={13} h={21} c={hair} />
              <Px x={24} y={18} w={13} h={25} c={hair} />
            </>
          )}
        </>
      )}

      {/* hat */}
      {appearance.hat !== "none" && (
        <>
          <Px x={21} y={6} w={47} h={10} c={hat} />
          <Px x={32} y={0} w={25} h={10} c={hat} />
          {!isBack && <Px x={58} y={12} w={16} h={5} c={hat} />}
        </>
      )}

      {/* face */}
      {!isBack && !isSide && (
        <>
          {appearance.sunglasses === "none" ? (
            <>
              <Px x={35} y={27} w={5} h={7} c="#252018" noBorder />
              <Px x={50} y={27} w={5} h={7} c="#252018" noBorder />
              <Px x={36} y={27} w={2} h={2} c="#fffef0" noBorder />
              <Px x={51} y={27} w={2} h={2} c="#fffef0" noBorder />
            </>
          ) : (
            <>
              <Px x={32} y={25} w={13} h={8} c="#111" />
              <Px x={47} y={25} w={13} h={8} c="#111" />
              <Px x={44} y={28} w={4} h={3} c="#111" noBorder />
            </>
          )}

          <Px x={42} y={37} w={10} h={3} c="#252018" noBorder />

          {appearance.facialHair === "mustache" && (
            <Px x={36} y={35} w={18} h={4} c="#252018" noBorder />
          )}

          {appearance.facialHair === "beard" && (
            <>
              <Px x={34} y={34} w={22} h={8} c="#252018" />
              <Px x={39} y={41} w={12} h={6} c="#252018" />
            </>
          )}
        </>
      )}

      {isSide && (
        <>
          {appearance.sunglasses === "none" ? (
            <>
              <Px x={52} y={27} w={5} h={7} c="#252018" noBorder />
              <Px x={53} y={27} w={2} h={2} c="#fffef0" noBorder />
            </>
          ) : (
            <Px x={49} y={25} w={14} h={8} c="#111" />
          )}

          <Px x={55} y={37} w={8} h={3} c="#252018" noBorder />

          {appearance.facialHair !== "none" && (
            <Px x={50} y={35} w={12} h={8} c="#252018" />
          )}
        </>
      )}
    </div>
  );
}

function Px({
  x,
  y,
  w,
  h,
  c,
  noBorder,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  c: string;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        backgroundColor: c,
        border: noBorder ? undefined : "3px solid #252018",
        boxSizing: "border-box",
        imageRendering: "pixelated",
        boxShadow: noBorder
          ? undefined
          : "inset 2px 2px 0 rgba(255,255,255,0.2)",
      }}
    />
  );
}

function Tri({
  x,
  y,
  w,
  h,
  c,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  c: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        backgroundColor: c,
        borderLeft: "3px solid #252018",
        borderRight: "3px solid #252018",
        borderBottom: "3px solid #252018",
        clipPath: "polygon(50% 100%, 0 0, 100% 0)",
        boxSizing: "border-box",
      }}
    />
  );
}

function PixelPortrait({ appearance }: { appearance: HeroAppearance }) {
  return (
    <div style={portraitStyle}>
      <PixelHero appearance={appearance} pose="sideIdle" />
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
      <div style={{ transform: "scale(1.45)", transformOrigin: "center bottom", height: 145 }}>
        {children}
      </div>
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
        <span style={arrowStyle}>◀</span>

        {options.map(option => {
          const selected = option.id === value;
          const color = getOptionColor(category, option.id as HeroAppearance[K]);

          return (
            <button
              key={option.id}
              type="button"
              title={option.label}
              onClick={() => onChange(category, option.id as HeroAppearance[K])}
              style={{
                ...swatchStyle,
                outline: selected ? "3px solid #ca4b36" : "none",
                backgroundColor: color === "transparent" ? "#fff6d0" : color,
              }}
            >
              {color === "transparent" && <span style={noneIconStyle}>×</span>}
            </button>
          );
        })}

        <span style={arrowStyle}>▶</span>
      </div>
    </FieldPanel>
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
  width: "min(980px, calc(100vw - 36px))",
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

const topArtStyle: React.CSSProperties = {
  position: "relative",
  minHeight: 170,
  overflow: "hidden",
  borderBottom: "4px solid #252018",
  marginBottom: 16,
};

const titleBannerStyle: React.CSSProperties = {
  ...PX,
  display: "inline-block",
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  fontSize: "1.1rem",
  padding: "20px 48px",
  border: "4px solid #252018",
  boxShadow: "5px 5px 0 rgba(37,32,24,0.35)",
};

const subtitleStyle: React.CSSProperties = {
  ...VT,
  fontSize: "1.65rem",
  color: "#252018",
  marginTop: 18,
  maxWidth: 420,
};

const portraitStyle: React.CSSProperties = {
  position: "absolute",
  right: 95,
  top: 10,
  width: 160,
  height: 150,
  opacity: 0.8,
  transform: "scale(1.5)",
  transformOrigin: "center",
  filter: "sepia(0.35)",
};

const contentGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "410px 1fr",
  gap: 22,
};

const panelTitleStyle: React.CSSProperties = {
  ...PX,
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  border: "4px solid #252018",
  padding: "8px 14px",
  fontSize: "0.65rem",
  textAlign: "center",
};

const previewGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  border: "4px solid #252018",
  borderTop: 0,
  padding: 10,
  backgroundColor: "#fcefc5",
};

const previewCardStyle: React.CSSProperties = {
  minHeight: 240,
  backgroundColor: "#fff6d0",
  border: "3px solid #5d4528",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingBottom: 10,
};

const previewLabelStyle: React.CSSProperties = {
  ...PX,
  color: "#252018",
  fontSize: "0.47rem",
  marginTop: 6,
};

const spriteStageStyle: React.CSSProperties = {
  position: "relative",
  width: 90,
  height: 120,
  imageRendering: "pixelated",
};

const shadowStyle: React.CSSProperties = {
  position: "absolute",
  left: 20,
  top: 108,
  width: 50,
  height: 8,
  backgroundColor: "rgba(37,32,24,0.28)",
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
  fontSize: "1.35rem",
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
  fontSize: "0.55rem",
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
  gap: 10,
  flexWrap: "wrap",
};

const swatchStyle: React.CSSProperties = {
  width: 38,
  height: 38,
  border: "3px solid #252018",
  cursor: "pointer",
  boxShadow: "3px 3px 0 rgba(37,32,24,0.35)",
};

const noneIconStyle: React.CSSProperties = {
  ...PX,
  color: "#252018",
  fontSize: "1rem",
  lineHeight: "28px",
};

const arrowStyle: React.CSSProperties = {
  ...PX,
  color: "#252018",
  fontSize: "0.55rem",
};

const bottomBarStyle: React.CSSProperties = {
  marginTop: 20,
  minHeight: 96,
  border: "4px solid #252018",
  background:
    "linear-gradient(135deg, rgba(37,32,24,0.2), rgba(255,246,208,0.5))",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: 18,
};

const closeButtonStyle: React.CSSProperties = {
  ...PX,
  backgroundColor: "#b94a2e",
  color: "#fff6d0",
  border: "4px solid #252018",
  padding: "18px 36px",
  cursor: "pointer",
  fontSize: "0.7rem",
  boxShadow: "5px 5px 0 rgba(37,32,24,0.55)",
};