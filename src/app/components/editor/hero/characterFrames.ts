import type {
  CharacterAnimation,
  CharacterFacing,
  CharacterFrame,
  CharacterLayerCategory,
  CharacterLayerFrame,
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

// LimeZu body/outfit/eyes use the full-body rows above.
// Some hairstyle/accessory atlases store the matching top/head overlay one row above.
// The first V3 patch cropped hair from the body row, causing the top of the hair to disappear.
// V4 lets each layer resolve its own crop cell.
export function frameForLayer({
  baseFrame,
  category,
}: {
  baseFrame: CharacterFrame;
  category: CharacterLayerCategory;
}): CharacterFrame {
  if (category === "hair" || category === "accessory") {
    return {
      col: baseFrame.col,
      row: Math.max(0, baseFrame.row - 1),
    };
  }

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
