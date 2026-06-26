import type {
  CharacterAnimation,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
} from "./characterTypes";

const FULL_BODY_IDLE: Record<CharacterFacing, CharacterFrame> = {
  down: { col: 3, row: 1 },
  up: { col: 1, row: 1 },
  right: { col: 0, row: 1 },
  left: { col: 2, row: 1 },
};

const FULL_BODY_WALK: Record<CharacterFacing, CharacterFrame[]> = {
  down: [
    { col: 3, row: 1 },
    { col: 0, row: 3 },
    { col: 1, row: 3 },
    { col: 2, row: 3 },
  ],
  up: [
    { col: 1, row: 1 },
    { col: 0, row: 2 },
    { col: 1, row: 2 },
    { col: 2, row: 2 },
  ],
  right: [
    { col: 0, row: 1 },
    { col: 0, row: 4 },
    { col: 1, row: 4 },
    { col: 2, row: 4 },
  ],
  left: [
    { col: 2, row: 1 },
    { col: 3, row: 4 },
    { col: 4, row: 4 },
    { col: 5, row: 4 },
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

export function baseFramesFor({
  facing,
  animation,
}: {
  facing: CharacterFacing;
  animation: CharacterAnimation;
}) {
  if (animation === "walk") return FULL_BODY_WALK[facing];
  return [FULL_BODY_IDLE[facing]];
}

export function thumbnailFrame() {
  return FULL_BODY_IDLE.down;
}
