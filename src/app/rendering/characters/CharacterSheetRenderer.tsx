import type { CSSProperties } from "react";
import { framePositionForIndex, getCharacterSheetPose, type CharacterAnimationName, type CharacterFacing } from "./CharacterSheetRuntime";
import { useCharacterAnimationFrame } from "./CharacterSheetAnimator";

export function CharacterSheetRenderer({
  assetId,
  animation = "idle",
  facing = "down",
  pixelSize = 1,
  playing = true,
  frameDurationMs = 140,
  showShadow = true,
  style,
}: {
  assetId?: string;
  animation?: CharacterAnimationName;
  facing?: CharacterFacing;
  pixelSize?: number;
  playing?: boolean;
  frameDurationMs?: number;
  showShadow?: boolean;
  style?: CSSProperties;
}) {
  const pose = getCharacterSheetPose({ assetId, animation, facing });

  if (!pose) return null;

  const frames = pose.selection.frames.length > 0 ? pose.selection.frames : [0];
  const frame = useCharacterAnimationFrame({
    frames,
    enabled: playing,
    frameDurationMs,
  });

  const { asset, metadata } = pose;
  const frameWidth = metadata.frameWidth || 48;
  const frameHeight = metadata.frameHeight || 48;
  const { x, y } = framePositionForIndex({
    frame,
    columns: metadata.columns,
    frameWidth,
    frameHeight,
  });

  const width = frameWidth * pixelSize;
  const height = frameHeight * pixelSize;

  return (
    <div
      className="character-sheet-renderer"
      style={{
        position: "relative",
        width,
        height,
        imageRendering: "pixelated",
        overflow: "visible",
        ...style,
      }}
    >
      {showShadow && (
        <i
          aria-hidden
          style={{
            position: "absolute",
            left: width * 0.24,
            top: height * 0.82,
            width: width * 0.52,
            height: Math.max(3, height * 0.09),
            borderRadius: 999,
            background: "rgba(0,0,0,0.24)",
            pointerEvents: "none",
          }}
        />
      )}

      <i
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height,
          backgroundImage: `url(${asset.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${asset.width * pixelSize}px ${asset.height * pixelSize}px`,
          backgroundPosition: `-${x * pixelSize}px -${y * pixelSize}px`,
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
