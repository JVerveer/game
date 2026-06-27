type LimeZuTileLayerProps = {
  rows: string[][];
  tileSize?: number;
  isTown?: boolean;
};

const EXTERIOR_ATLAS = "/assets/limezu/world/terrain/modern_exteriors_complete_48x48.png";

const TILE_COORDS: Record<string, { col: number; row: number; fallback: string }> = {
  G: { col: 0, row: 0, fallback: "#56b447" },
  R: { col: 2, row: 0, fallback: "#d4a15f" },
  W: { col: 4, row: 0, fallback: "#2f9bd2" },
  T: { col: 0, row: 8, fallback: "#185c2b" },
  E: { col: 3, row: 0, fallback: "#9a9a9a" },
  Y: { col: 6, row: 0, fallback: "#ff4fa3" },
  L: { col: 6, row: 0, fallback: "#ffcf33" },
  S: { col: 5, row: 0, fallback: "#f0d079" },
  X: { col: 1, row: 0, fallback: "#2f8d3a" },
  D: { col: 7, row: 0, fallback: "#29213f" },
  C: { col: 8, row: 0, fallback: "#65412b" },
  M: { col: 9, row: 0, fallback: "#676767" },
  J: { col: 10, row: 0, fallback: "#9b5b2b" },
  F: { col: 4, row: 8, fallback: "#8b4f25" },
  Q: { col: 6, row: 0, fallback: "#f6d746" },
  V: { col: 3, row: 0, fallback: "#ffd84d" },
  N: { col: 0, row: 0, fallback: "#56b447" },

  // Building marker tiles are rendered as ground here.
  // The existing PixelMapScene/building layer still handles the building visuals.
  A: { col: 0, row: 0, fallback: "#56b447" },
  B: { col: 0, row: 0, fallback: "#56b447" },
  H: { col: 0, row: 0, fallback: "#56b447" },
  P: { col: 0, row: 0, fallback: "#56b447" },
  U: { col: 0, row: 0, fallback: "#56b447" },
  I: { col: 0, row: 0, fallback: "#56b447" },
  O: { col: 2, row: 0, fallback: "#d4a15f" },
};

function tileCoord(tile: string) {
  return TILE_COORDS[tile] ?? TILE_COORDS.G;
}

export function LimeZuTileLayer({
  rows,
  tileSize = 48,
  isTown = false,
}: LimeZuTileLayerProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: rows[0]?.length ? rows[0].length * tileSize : 0,
        height: rows.length * tileSize,
        pointerEvents: "none",
        zIndex: 0,
        imageRendering: "pixelated",
      }}
    >
      {rows.map((row, y) =>
        row.map((tile, x) => {
          const coord = tileCoord(tile);
          return (
            <div
              key={`limezu-terrain-${x}-${y}`}
              style={{
                position: "absolute",
                left: x * tileSize,
                top: y * tileSize,
                width: tileSize,
                height: tileSize,
                backgroundColor: coord.fallback,
                backgroundImage: `url(${EXTERIOR_ATLAS})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                backgroundPosition: `${-coord.col * tileSize}px ${-coord.row * tileSize}px`,
                imageRendering: "pixelated",
              }}
            />
          );
        }),
      )}
    </div>
  );
}
