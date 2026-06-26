import { useEffect, useMemo, useState } from "react";
import {
  CHARACTER_LAYER_ORDER,
  CHARACTER_TILE_SIZE,
  optionFor,
} from "./characterAssets";
import {
  baseFramesFor,
  frameForLayer,
  thumbnailFrame,
} from "./characterFrames";
import type {
  CharacterAnimation,
  CharacterAppearance,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
} from "./characterTypes";

function useAnimationFrameIndex(frameCount: number, animation: CharacterAnimation) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (animation !== "walk" || frameCount <= 1) return;

    const id = window.setInterval(() => {
      setIndex(current => (current + 1) % frameCount);
    }, 135);

    return () => window.clearInterval(id);
  }, [animation, frameCount]);

  return index;
}

function layerUsesOverflowCrop(category: CharacterLayerCategory) {
  return category === "hair" || category === "accessory";
}

function AtlasLayer({
  category,
  optionId,
  baseFrame,
  pixelSize,
}: {
  category: CharacterLayerCategory;
  optionId: string;
  baseFrame: CharacterFrame;
  pixelSize: number;
}) {
  const option = optionFor(category, optionId);
  if (!option || option.id === "none") return null;

  const frame = frameForLayer({ baseFrame, category });
  const tile = CHARACTER_TILE_SIZE;
  const displaySize = tile * pixelSize;
  const backgroundWidth = option.atlasWidth * pixelSize;
  const backgroundHeight = option.atlasHeight * pixelSize;

  const useOverflow = layerUsesOverflowCrop(category) && frame.row > 0;
  const sourceRow = useOverflow ? frame.row - 1 : frame.row;
  const layerTop = useOverflow ? -displaySize : 0;
  const layerHeight = useOverflow ? displaySize * 2 : displaySize;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: layerTop,
        width: displaySize,
        height: layerHeight,
        backgroundImage: `url(${option.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
        backgroundPosition: `${-frame.col * displaySize}px ${-sourceRow * displaySize}px`,
        imageRendering: "pixelated",
        pointerEvents: "none",
      }}
    />
  );
}

export function CharacterRenderer({
  appearance,
  facing,
  animation = "idle",
  pixelSize = 1,
  showShadow = true,
}: {
  appearance: CharacterAppearance;
  facing: CharacterFacing;
  animation?: CharacterAnimation;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const frameList = useMemo(() => baseFramesFor({ facing, animation }), [facing, animation]);
  const frameIndex = useAnimationFrameIndex(frameList.length, animation);
  const baseFrame = frameList[frameIndex] ?? frameList[0];

  return (
    <CharacterComposite
      appearance={appearance}
      baseFrame={baseFrame}
      pixelSize={pixelSize}
      showShadow={showShadow}
    />
  );
}

export function CharacterComposite({
  appearance,
  baseFrame,
  pixelSize = 1,
  showShadow = true,
}: {
  appearance: CharacterAppearance;
  baseFrame: CharacterFrame;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const size = CHARACTER_TILE_SIZE * pixelSize;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        imageRendering: "pixelated",
        flex: "0 0 auto",
        overflow: "visible",
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
            backgroundColor: "rgba(0,0,0,0.24)",
            borderRadius: 999,
          }}
        />
      )}

      {CHARACTER_LAYER_ORDER.map(category => (
        <AtlasLayer
          key={`${category}-${appearance[category]}-${baseFrame.col}-${baseFrame.row}`}
          category={category}
          optionId={appearance[category]}
          baseFrame={baseFrame}
          pixelSize={pixelSize}
        />
      ))}
    </div>
  );
}

export function CharacterLayerThumbnail({
  category,
  optionId,
  pixelSize = 1,
}: {
  category: CharacterLayerCategory;
  optionId: string;
  pixelSize?: number;
}) {
  const appearance = {
    body: category === "body" ? optionId : "none",
    eyes: category === "eyes" ? optionId : "none",
    hair: category === "hair" ? optionId : "none",
    outfit: category === "outfit" ? optionId : "none",
    accessory: category === "accessory" ? optionId : "none",
  } as CharacterAppearance;

  return (
    <CharacterComposite
      appearance={appearance}
      baseFrame={thumbnailFrame()}
      pixelSize={pixelSize}
      showShadow={false}
    />
  );
}
