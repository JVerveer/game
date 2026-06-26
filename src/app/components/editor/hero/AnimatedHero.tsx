import type { HeroAppearance } from "./heroAppearance";
import {
  WIZARD_ANIMATIONS,
  type WizardAnimationId,
  type WizardFacing,
  wizardAnimationForState,
} from "./heroAnimations";
import { useSpriteFrame } from "./SpriteSheet";

export function AnimatedHero({
  facing,
  moving,
  running = false,
  attacking = false,
  jumping = false,
  hurt = false,
  dead = false,
  animation,
  pixelHeight = 54,
}: {
  appearance?: HeroAppearance;
  facing: WizardFacing;
  moving: boolean;
  running?: boolean;
  attacking?: boolean;
  jumping?: boolean;
  hurt?: boolean;
  dead?: boolean;
  animation?: WizardAnimationId;
  pixelHeight?: number;
}) {
  const animationId = animation ?? wizardAnimationForState({
    moving,
    running,
    attacking,
    jumping,
    hurt,
    dead,
  });

  const def = WIZARD_ANIMATIONS[animationId];
  const frame = useSpriteFrame(def);

  const scale = pixelHeight / def.frameHeight;
  const displayWidth = def.frameWidth * scale;
  const displayHeight = def.frameHeight * scale;

  // Uploaded wizard sheets face right. Left is mirrored.
  // For now up/down still use the same side-facing professional sheet.
  // Later we can add separate up/down sheets if you buy/draw them.
  const flipX = facing === "left";

  return (
    <div
      style={{
        position: "relative",
        width: displayWidth,
        height: displayHeight,
        overflow: "hidden",
        imageRendering: "pixelated",
        transform: flipX ? "scaleX(-1)" : undefined,
        transformOrigin: "center bottom",
      }}
    >
      <img
        src={def.src}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          left: -frame * displayWidth,
          top: 0,
          width: def.frameWidth * def.frames * scale,
          height: displayHeight,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
