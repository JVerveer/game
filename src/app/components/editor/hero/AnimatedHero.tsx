import type { HeroAppearance } from "./heroAppearance";
import {
  WIZARD_ANIMATIONS,
  type WizardAnimationId,
  type WizardFacing,
  wizardAnimationForState,
} from "./heroAnimations";
import { useSpriteFrame } from "./SpriteSheet";

export const DEFAULT_HERO_PIXEL_HEIGHT = 116;

export function AnimatedHero({
  facing,
  moving,
  running = false,
  attacking = false,
  jumping = false,
  hurt = false,
  dead = false,
  animation,
  pixelHeight = DEFAULT_HERO_PIXEL_HEIGHT,
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
  const displayWidth = Math.round(def.frameWidth * scale);
  const displayHeight = Math.round(def.frameHeight * scale);
  const sheetWidth = displayWidth * def.frames;

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
        flex: "0 0 auto",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: displayWidth,
          height: displayHeight,
          backgroundImage: `url(${def.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${-frame * displayWidth}px 0px`,
          backgroundSize: `${sheetWidth}px ${displayHeight}px`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
