import type {
  CharacterAnimation,
  CharacterFacing,
  CharacterFrame,
} from "./characterTypes";

// LimeZu Character Generator atlases are 48x48 cell grids.
// The first row contains the clean standing direction frames.
// These coordinates render a single atlas cell instead of the full sheet.
export const CHARACTER_IDLE_FRAMES: Record<CharacterFacing, CharacterFrame> = {
  down: { col: 3, row: 0 },
  up: { col: 1, row: 0 },
  right: { col: 2, row: 0 },
  left: { col: 0, row: 0 },
};

// Starter walking cells.
// These are intentionally conservative so V2 works immediately.
// Once we curate the exact animation rows, we can make this richer.
export const CHARACTER_WALK_FRAMES: Record<CharacterFacing, CharacterFrame[]> = {
  down: [
    { col: 3, row: 0 },
    { col: 0, row: 2 },
    { col: 1, row: 2 },
    { col: 2, row: 2 },
  ],
  up: [
    { col: 1, row: 0 },
    { col: 0, row: 1 },
    { col: 1, row: 1 },
    { col: 2, row: 1 },
  ],
  right: [
    { col: 2, row: 0 },
    { col: 4, row: 1 },
    { col: 5, row: 1 },
    { col: 0, row: 3 },
  ],
  left: [
    { col: 0, row: 0 },
    { col: 3, row: 1 },
    { col: 2, row: 1 },
    { col: 1, row: 1 },
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
