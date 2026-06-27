const ATLAS = "/assets/limezu/world/terrain/modern_exteriors_complete_48x48.png";

type LimeZuTileVisual = {
  col: number;
  row: number;
  fallback: string;
  variant?: (x: number, y: number) => { col: number; row: number };
};

function subtleVariant(baseCol: number, baseRow: number, range = 2) {
  return (x: number, y: number) => {
    const n = Math.abs((x * 17 + y * 31 + x * y * 7) % range);
    return { col: baseCol + n, row: baseRow };
  };
}

/**
 * This maps your existing editor terrain IDs to LimeZu atlas cells.
 *
 * Your map/editor data remains unchanged:
 * G, R, W, T, E, Y, L, S, X, etc.
 *
 * Only the visual tile style changes.
 */
export const LIMEZU_TILE_VISUALS: Record<string, LimeZuTileVisual> = {
  G: { col: 0, row: 0, fallback: "#56b447", variant: subtleVariant(0, 0, 3) },
  R: { col: 2, row: 0, fallback: "#d4a15f", variant: subtleVariant(2, 0, 2) },
  W: { col: 4, row: 0, fallback: "#2f9bd2", variant: subtleVariant(4, 0, 2) },
  T: { col: 0, row: 8, fallback: "#185c2b", variant: subtleVariant(0, 8, 2) },
  E: { col: 3, row: 0, fallback: "#9a9a9a", variant: subtleVariant(3, 0, 2) },
  Y: { col: 6, row: 0, fallback: "#ff4fa3", variant: subtleVariant(6, 0, 2) },
  L: { col: 6, row: 0, fallback: "#ffcf33", variant: subtleVariant(6, 0, 2) },
  S: { col: 5, row: 0, fallback: "#f0d079", variant: subtleVariant(5, 0, 2) },
  X: { col: 1, row: 0, fallback: "#2f8d3a", variant: subtleVariant(1, 0, 2) },
  D: { col: 7, row: 0, fallback: "#29213f" },
  C: { col: 8, row: 0, fallback: "#65412b" },
  M: { col: 9, row: 0, fallback: "#676767" },
  J: { col: 10, row: 0, fallback: "#9b5b2b" },
  F: { col: 4, row: 8, fallback: "#8b4f25" },
  Q: { col: 0, row: 0, fallback: "#56b447" },
  V: { col: 3, row: 0, fallback: "#ffd84d" },
  N: { col: 0, row: 0, fallback: "#56b447" },

  // Building marker tiles become ground underneath existing building rendering.
  A: { col: 0, row: 0, fallback: "#56b447" },
  B: { col: 0, row: 0, fallback: "#56b447" },
  H: { col: 0, row: 0, fallback: "#56b447" },
  P: { col: 0, row: 0, fallback: "#56b447" },
  U: { col: 0, row: 0, fallback: "#56b447" },
  I: { col: 0, row: 0, fallback: "#56b447" },
  O: { col: 2, row: 0, fallback: "#d4a15f" },
};

function visualFor(tileId: string) {
  return LIMEZU_TILE_VISUALS[tileId] ?? LIMEZU_TILE_VISUALS.G;
}

export function limeZuTileStyle(
  tileId: string,
  x: number,
  y: number,
  tileSize = 48,
): React.CSSProperties {
  const visual = visualFor(tileId);
  const coords = visual.variant?.(x, y) ?? { col: visual.col, row: visual.row };

  return {
    backgroundColor: visual.fallback,
    backgroundImage: `url(${ATLAS})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${-coords.col * tileSize}px ${-coords.row * tileSize}px`,
    imageRendering: "pixelated",
  };
}
