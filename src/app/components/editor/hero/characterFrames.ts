import type {
  CharacterAnimation,
  CharacterAnimationConfig,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
} from "./characterTypes";

const IDLE_DURATION = 600;
const WALK_DURATION = 120;

const IDLE_FRAMES: Record<CharacterFacing, CharacterFrame> = {
  down: { col: 3, row: 1, durationMs: IDLE_DURATION },
  up: { col: 1, row: 1, durationMs: IDLE_DURATION },
  right: { col: 0, row: 1, durationMs: IDLE_DURATION },
  left: { col: 2, row: 1, durationMs: IDLE_DURATION },
};

// These frames are tuned for the LimeZu 48x48 Character Generator atlas.
// If you later want to inspect/tune coordinates, enable debug in HeroEditorOverlay
// or update this file only.
const WALK_FRAMES: Record<CharacterFacing, CharacterFrame[]> = {
  down: [
    { col: 3, row: 1, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 0, row: 3, durationMs: WALK_DURATION, offsetY: -1 },
    { col: 1, row: 3, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 2, row: 3, durationMs: WALK_DURATION, offsetY: -1 },
  ],
  up: [
    { col: 1, row: 1, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 0, row: 2, durationMs: WALK_DURATION, offsetY: -1 },
    { col: 1, row: 2, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 2, row: 2, durationMs: WALK_DURATION, offsetY: -1 },
  ],
  right: [
    { col: 0, row: 1, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 0, row: 4, durationMs: WALK_DURATION, offsetY: -1 },
    { col: 1, row: 4, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 2, row: 4, durationMs: WALK_DURATION, offsetY: -1 },
  ],
  left: [
    { col: 2, row: 1, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 3, row: 4, durationMs: WALK_DURATION, offsetY: -1 },
    { col: 4, row: 4, durationMs: WALK_DURATION, offsetY: 0 },
    { col: 5, row: 4, durationMs: WALK_DURATION, offsetY: -1 },
  ],
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
      frames: WALK_FRAMES[facing],
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
    walk: WALK_FRAMES[facing],
  };
}
