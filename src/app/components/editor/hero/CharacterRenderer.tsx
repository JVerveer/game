import { useEffect, useMemo, useState } from "react";
import {
  CHARACTER_LAYER_ORDER,
  CHARACTER_TILE_SIZE,
  DEFAULT_CHARACTER_APPEARANCE,
  colorOptionFor,
  optionFor,
} from "./characterAssets";
import {
  animationConfigFor,
  frameForLayer,
  thumbnailFrame,
} from "./characterFrames";
import type {
  CharacterAnimation,
  CharacterAppearance,
  CharacterColorCategory,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
} from "./characterTypes";

function useTimedAnimationFrame(frames: CharacterFrame[], animation: CharacterAnimation) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (frames.length <= 1) return;

    let cancelled = false;
    let timeoutId: number | undefined;

    function tick(currentIndex: number) {
      const frame = frames[currentIndex] ?? frames[0];
      const duration = frame.durationMs ?? (animation === "walk" ? 120 : 600);

      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setIndex(previous => {
          const next = (previous + 1) % frames.length;
          tick(next);
          return next;
        });
      }, duration);
    }

    tick(0);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [animation, frames]);

  return index;
}

function layerUsesOverflowCrop(category: CharacterLayerCategory) {
  return category === "hair" || category === "accessory";
}

function colorCategoryForLayer(category: CharacterLayerCategory): CharacterColorCategory | null {
  if (category === "body") return "skinColor";
  if (category === "hair") return "hairColor";
  if (category === "outfit") return "outfitColor";
  return null;
}

function filterForLayer(category: CharacterLayerCategory, appearance: CharacterAppearance) {
  const colorCategory = colorCategoryForLayer(category);
  if (!colorCategory) return "none";

  return colorOptionFor(colorCategory, appearance[colorCategory]).filter;
}

function colorOptionForLayer(category: CharacterLayerCategory, appearance: CharacterAppearance) {
  const colorCategory = colorCategoryForLayer(category);
  return colorCategory ? colorOptionFor(colorCategory, appearance[colorCategory]) : null;
}

function usesConsistentRecolor(category: CharacterLayerCategory, appearance: CharacterAppearance) {
  const colorCategory = colorCategoryForLayer(category);
  if (!colorCategory || (category !== "hair" && category !== "outfit")) return false;
  const colorId = appearance[colorCategory];
  return colorId !== "default" && colorId !== "black" && colorId !== "white";
}

function AtlasLayer({
  category,
  optionId,
  appearance,
  baseFrame,
  pixelSize,
  imageRendering,
}: {
  category: CharacterLayerCategory;
  optionId: string;
  appearance: CharacterAppearance;
  baseFrame: CharacterFrame;
  pixelSize: number;
  imageRendering: "auto" | "pixelated";
}) {
  const option = optionFor(category, optionId);
  if (!option || option.id === "none") return null;

  const frame = frameForLayer({ baseFrame, category });
  const displaySize = CHARACTER_TILE_SIZE * pixelSize;
  const backgroundWidth = option.atlasWidth * pixelSize;
  const backgroundHeight = option.atlasHeight * pixelSize;

  const useOverflow = layerUsesOverflowCrop(category) && frame.row > 0;
  const sourceRow = useOverflow ? frame.row - 1 : frame.row;
  const layerTop = useOverflow ? -displaySize : 0;
  const layerHeight = useOverflow ? displaySize * 2 : displaySize;
  const commonImageStyle = {
    backgroundImage: `url(${option.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
    backgroundPosition: `${-frame.col * displaySize}px ${-sourceRow * displaySize}px`,
    imageRendering,
    pointerEvents: "none" as const,
  };
  const colorOption = colorOptionForLayer(category, appearance);
  const consistentRecolor = usesConsistentRecolor(category, appearance);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: layerTop,
        width: displaySize,
        height: layerHeight,
        imageRendering,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          ...commonImageStyle,
          filter: consistentRecolor
            ? "grayscale(1) contrast(1.15) brightness(0.92)"
            : filterForLayer(category, appearance),
        }}
      />

      {consistentRecolor && colorOption && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: colorOption.color,
            mixBlendMode: "color",
            opacity: 0.95,
            WebkitMaskImage: `url(${option.src})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: `${backgroundWidth}px ${backgroundHeight}px`,
            WebkitMaskPosition: `${-frame.col * displaySize}px ${-sourceRow * displaySize}px`,
            maskImage: `url(${option.src})`,
            maskRepeat: "no-repeat",
            maskSize: `${backgroundWidth}px ${backgroundHeight}px`,
            maskPosition: `${-frame.col * displaySize}px ${-sourceRow * displaySize}px`,
            imageRendering,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

export function CharacterRenderer({
  appearance,
  facing,
  animation = "idle",
  pixelSize = 1,
  showShadow = true,
  smooth = true,
  debug = false,
}: {
  appearance: CharacterAppearance;
  facing: CharacterFacing;
  animation?: CharacterAnimation;
  pixelSize?: number;
  showShadow?: boolean;
  smooth?: boolean;
  debug?: boolean;
}) {
  const config = useMemo(() => animationConfigFor({ facing, animation }), [facing, animation]);
  const frameIndex = useTimedAnimationFrame(config.frames, animation);
  const baseFrame = config.frames[frameIndex] ?? config.frames[0];

  return (
    <CharacterComposite
      appearance={appearance}
      baseFrame={baseFrame}
      pixelSize={pixelSize}
      showShadow={showShadow}
      walking={animation === "walk"}
      smooth={smooth}
      debug={debug ? `${animation} ${facing} c${baseFrame.col} r${baseFrame.row}` : undefined}
    />
  );
}

export function CharacterComposite({
  appearance,
  baseFrame,
  pixelSize = 1,
  showShadow = true,
  walking = false,
  smooth = true,
  debug,
}: {
  appearance: CharacterAppearance;
  baseFrame: CharacterFrame;
  pixelSize?: number;
  showShadow?: boolean;
  walking?: boolean;
  smooth?: boolean;
  debug?: string;
}) {
  const size = CHARACTER_TILE_SIZE * pixelSize;
  const renderPixelSize = smooth ? pixelSize * 2 : pixelSize;
  const renderSize = CHARACTER_TILE_SIZE * renderPixelSize;
  const visualScale = size / renderSize;
  const imageRendering = smooth ? "auto" : "pixelated";

  return (
    <>
      <style>
        {`
          @keyframes limezuHeroObviousShadow {
            0% {
              opacity: 0.26;
              transform: scaleX(1);
            }
            25% {
              opacity: 0.16;
              transform: scaleX(0.82);
            }
            50% {
              opacity: 0.26;
              transform: scaleX(1);
            }
            75% {
              opacity: 0.16;
              transform: scaleX(0.82);
            }
            100% {
              opacity: 0.26;
              transform: scaleX(1);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          imageRendering,
          flex: "0 0 auto",
          overflow: "visible",
          transformOrigin: "center bottom",
        }}
      >
        {showShadow && (
          <div
            style={{
              position: "absolute",
              left: 13 * pixelSize,
              top: 39 * pixelSize,
              width: 22 * pixelSize,
              height: 5 * pixelSize,
              backgroundColor: "rgba(0,0,0,0.26)",
              borderRadius: 999,
              transformOrigin: "center",
              animation: walking ? "limezuHeroObviousShadow 360ms ease-in-out infinite" : undefined,
            }}
          />
        )}

        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: renderSize,
            height: renderSize,
            transform: `translateX(-50%) scale(${visualScale})`,
            transformOrigin: "center bottom",
            imageRendering,
            pointerEvents: "none",
          }}
        >
          {CHARACTER_LAYER_ORDER.map(category => (
            <AtlasLayer
              key={`${category}-${appearance[category]}-${appearance.skinColor}-${appearance.hairColor}-${appearance.outfitColor}-${baseFrame.col}-${baseFrame.row}`}
              category={category}
              optionId={appearance[category]}
              appearance={appearance}
              baseFrame={baseFrame}
              pixelSize={renderPixelSize}
              imageRendering={imageRendering}
            />
          ))}
        </div>

        {debug && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -18,
              fontFamily: "monospace",
              fontSize: 9,
              color: "#fff",
              background: "rgba(0,0,0,0.65)",
              padding: "1px 3px",
              whiteSpace: "nowrap",
              imageRendering: "auto",
            }}
          >
            {debug}
          </div>
        )}
      </div>
    </>
  );
}

export function CharacterLayerThumbnail({
  category,
  optionId,
  appearance,
  pixelSize = 1,
}: {
  category: CharacterLayerCategory;
  optionId: string;
  appearance?: CharacterAppearance;
  pixelSize?: number;
}) {
  const isBaldHairPreview = category === "hair" && optionId === "none";
  const thumbnailAppearance = {
    body: category === "body" ? optionId : isBaldHairPreview ? (appearance?.body ?? DEFAULT_CHARACTER_APPEARANCE.body) : "none",
    eyes: category === "eyes" ? optionId : isBaldHairPreview ? (appearance?.eyes ?? DEFAULT_CHARACTER_APPEARANCE.eyes) : "none",
    hair: category === "hair" ? optionId : "none",
    outfit: category === "outfit" ? optionId : "none",
    accessory: category === "accessory" ? optionId : "none",
    skinColor: appearance?.skinColor ?? "default",
    hairColor: appearance?.hairColor ?? "default",
    outfitColor: appearance?.outfitColor ?? "default",
  } as CharacterAppearance;

  return (
    <CharacterComposite
      appearance={thumbnailAppearance}
      baseFrame={thumbnailFrame()}
      pixelSize={pixelSize}
      showShadow={false}
      walking={false}
      smooth={false}
    />
  );
}
