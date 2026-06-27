import type {
  CharacterAnimation,
  CharacterAnimationConfig,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
} from "./characterTypes";

const IDLE_DURATION = 600;

// Stable full-body cells.
// These are confirmed to render the whole character without flashes.
const IDLE_FRAMES: Record<CharacterFacing, CharacterFrame> = {
  down: { col: 3, row: 1, durationMs: IDLE_DURATION },
  up: { col: 1, row: 1, durationMs: IDLE_DURATION },
  right: { col: 0, row: 1, durationMs: IDLE_DURATION },
  left: { col: 2, row: 1, durationMs: IDLE_DURATION },
};

// IMPORTANT:
// The previous V10 tried to use guessed walking rows.
// Those guessed coordinates caused flashing/ghost sprites around the hero.
// This stable version intentionally uses the confirmed full-body standing
// frames while the player moves. Movement remains smooth because the map
// position changes, but the sprite itself does not rapidly switch to bad cells.
//
// Once we inspect the exact LimeZu walk atlas coordinates, we can re-enable
// proper walk animation safely.
const STABLE_WALK_FRAMES: Record<CharacterFacing, CharacterFrame[]> = {
  down: [{ ...IDLE_FRAMES.down, durationMs: IDLE_DURATION }],
  up: [{ ...IDLE_FRAMES.up, durationMs: IDLE_DURATION }],
  right: [{ ...IDLE_FRAMES.right, durationMs: IDLE_DURATION }],
  left: [{ ...IDLE_FRAMES.left, durationMs: IDLE_DURATION }],
};

export function frameForLayer({
  baseFrame,
  category,
}: {
  baseFrame: CharacterFrame;
  category: CharacterLayerCategory;
}): CharacterFrame {
  return baseFrame;
}

export function animationConfigFor({
  facing,
  animation,
}: {
  facing: CharacterFacing;
  animation: CharacterAnimation;
}): CharacterAnimationConfig {
  if (animation === "walk") {
    return {
      id: "walk",
      loop: true,
      frames: STABLE_WALK_FRAMES[facing],
    };
  }

  return {
    id: "idle",
    loop: true,
    frames: [IDLE_FRAMES[facing]],
  };
}

export function thumbnailFrame() {
  return IDLE_FRAMES.down;
}

export function debugFramesFor(facing: CharacterFacing) {
  return {
    idle: IDLE_FRAMES[facing],
    walk: STABLE_WALK_FRAMES[facing],
  };
}
