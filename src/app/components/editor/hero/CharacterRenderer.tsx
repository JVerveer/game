import { useEffect, useMemo, useState } from "react";
import {
  CHARACTER_LAYER_ORDER,
  CHARACTER_TILE_SIZE,
  optionFor,
} from "./characterAssets";
import {
  baseFramesFor,
  frameForLayer,
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

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: displaySize,
        height: displaySize,
        backgroundImage: `url(${option.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
        backgroundPosition: `${-frame.col * displaySize}px ${-frame.row * displaySize}px`,
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

  const size = CHARACTER_TILE_SIZE * pixelSize;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        imageRendering: "pixelated",
        flex: "0 0 auto",
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
