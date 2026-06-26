import type {
  CharacterAnimation,
  CharacterFacing,
  CharacterFrame,
} from "./characterTypes";

// LimeZu Character Generator 48x48 atlases:
// row 0 contains partial/head/top cells.
// row 1 contains the clean full-body standing direction frames.
//
// The important fix:
// - front/full body is col 3, row 1
// - back/full body is col 1, row 1
// - side/full body frames are col 0 and col 2, row 1
export const CHARACTER_IDLE_FRAMES: Record<CharacterFacing, CharacterFrame> = {
  down: { col: 3, row: 1 },
  up: { col: 1, row: 1 },
  right: { col: 0, row: 1 },
  left: { col: 2, row: 1 },
};

// Starter walking frames.
// These use full-body cells, not the partial head cells.
// We will fine-tune the exact walking rows after this renders correctly.
export const CHARACTER_WALK_FRAMES: Record<CharacterFacing, CharacterFrame[]> = {
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

export function framesFor({
  facing,
  animation,
}: {
  facing: CharacterFacing;
  animation: CharacterAnimation;
}) {
  if (animation === "walk") return CHARACTER_WALK_FRAMES[facing];
  return [CHARACTER_IDLE_FRAMES[facing]];
}
