import type {
  CharacterAnimation,
  CharacterAppearance,
  CharacterFacing,
  CharacterLayerCategory,
} from "./characterTypes";
import {
  CHARACTER_LAYER_ORDER,
  optionFor,
} from "./characterAssets";

const BASE_SIZE = 48;

function animationTransform({
  animation,
  facing,
}: {
  animation: CharacterAnimation;
  facing: CharacterFacing;
}) {
  const mirror = facing === "left";
  const bob = animation === "walk" ? "translateY(-1px)" : "translateY(0)";
  const scale = mirror ? "scaleX(-1)" : "scaleX(1)";
  return `${scale} ${bob}`;
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
  const size = BASE_SIZE * pixelSize;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        imageRendering: "pixelated",
        transform: animationTransform({ animation, facing }),
        transformOrigin: "center bottom",
        transition: animation === "walk" ? "transform 80ms steps(1, end)" : undefined,
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

      {CHARACTER_LAYER_ORDER.map((category: CharacterLayerCategory) => {
        const selectedId = appearance[category];
        const option = optionFor(category, selectedId);
        if (!option || option.id === "none") return null;

        return (
          <img
            key={`${category}-${option.id}`}
            src={option.src}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: size,
              height: size,
              imageRendering: "pixelated",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}
