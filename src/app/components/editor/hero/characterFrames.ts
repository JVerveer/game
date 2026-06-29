import type {
  CharacterAnimation,
  CharacterAnimationConfig,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
} from "./characterTypes";

const IDLE_DURATION = 600;
const WALK_DURATION = 95;

// Stable full-body cells.
// These are confirmed to render the whole character without flashes.
const IDLE_FRAMES: Record<CharacterFacing, CharacterFrame> = {
  down: { col: 3, row: 1, durationMs: IDLE_DURATION },
  up: { col: 1, row: 1, durationMs: IDLE_DURATION },
  right: { col: 0, row: 1, durationMs: IDLE_DURATION },
  left: { col: 2, row: 1, durationMs: IDLE_DURATION },
};

const cells = (row: number, cols: number[]): CharacterFrame[] =>
  cols.map(col => ({ col, row, durationMs: WALK_DURATION }));

// LimeZu layered character sheets use paired rows: the visible full-body
// frames sit on odd rows, while the preceding even row carries overflow pieces
// for hair and accessories. Row 3 contains the first clean 4-direction walk set.
const WALK_FRAMES: Record<CharacterFacing, CharacterFrame[]> = {
  right: cells(3, [0, 1, 2, 3, 4, 5]),
  up: cells(3, [6, 7, 8, 9, 10, 11]),
  left: cells(3, [12, 13, 14, 15, 16, 17]),
  down: cells(3, [18, 19, 20, 21, 22, 23]),
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
