type LimeZuEditorTerrainLayerProps = {
  rows: string[][];
  objects?: Record<string, string>;
  tileSize?: number;
  showObjects?: boolean;
};

const ATLAS = "/assets/limezu/world/terrain/modern_exteriors_complete_48x48.png";

type TileVisual = {
  label: string;
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

const TILE_VISUALS: Record<string, TileVisual> = {
  G: { label: "Grass", col: 0, row: 0, fallback: "#56b447", variant: subtleVariant(0, 0, 3) },
  R: { label: "Road / Bike Path", col: 2, row: 0, fallback: "#d4a15f", variant: subtleVariant(2, 0, 2) },
  W: { label: "Water / Canal", col: 4, row: 0, fallback: "#2f9bd2", variant: subtleVariant(4, 0, 2) },
  T: { label: "Trees / Forest", col: 0, row: 8, fallback: "#185c2b", variant: subtleVariant(0, 8, 2) },
  E: { label: "Plaza / Stone", col: 3, row: 0, fallback: "#9a9a9a", variant: subtleVariant(3, 0, 2) },
  Y: { label: "Tulips / Flowers", col: 6, row: 0, fallback: "#ff4fa3", variant: subtleVariant(6, 0, 2) },
  L: { label: "Flower Patch", col: 6, row: 0, fallback: "#ffcf33", variant: subtleVariant(6, 0, 2) },
  S: { label: "Sand / Beach", col: 5, row: 0, fallback: "#f0d079", variant: subtleVariant(5, 0, 2) },
  X: { label: "Encounter Grass", col: 1, row: 0, fallback: "#2f8d3a", variant: subtleVariant(1, 0, 2) },
  D: { label: "Dungeon Floor", col: 7, row: 0, fallback: "#29213f" },
  C: { label: "Cave", col: 8, row: 0, fallback: "#65412b" },
  M: { label: "Mountain", col: 9, row: 0, fallback: "#676767" },
  J: { label: "Wooden Dock", col: 10, row: 0, fallback: "#9b5b2b" },
  F: { label: "Fence", col: 4, row: 8, fallback: "#8b4f25" },
  Q: { label: "Quest Marker Ground", col: 0, row: 0, fallback: "#56b447" },
  V: { label: "Save Point Ground", col: 3, row: 0, fallback: "#ffd84d" },
  N: { label: "NPC Ground", col: 0, row: 0, fallback: "#56b447" },
  A: { label: "Shop Ground", col: 0, row: 0, fallback: "#56b447" },
  B: { label: "Building Ground", col: 0, row: 0, fallback: "#56b447" },
  H: { label: "Healing Center Ground", col: 0, row: 0, fallback: "#56b447" },
  P: { label: "Station Ground", col: 0, row: 0, fallback: "#56b447" },
  U: { label: "Hall Ground", col: 0, row: 0, fallback: "#56b447" },
  I: { label: "Institution Ground", col: 0, row: 0, fallback: "#56b447" },
  O: { label: "Door / Entry", col: 2, row: 0, fallback: "#d4a15f" },
};

function visualFor(tileId: string): TileVisual {
  return TILE_VISUALS[tileId] ?? TILE_VISUALS.G;
}

function coordsFor(tileId: string, x: number, y: number) {
  const visual = visualFor(tileId);
  return visual.variant?.(x, y) ?? { col: visual.col, row: visual.row };
}

export function LimeZuEditorTerrainLayer({
  rows,
  tileSize = 48,
}: LimeZuEditorTerrainLayerProps) {
  const width = rows[0]?.length ?? 0;
  const height = rows.length;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: width * tileSize,
        height: height * tileSize,
        pointerEvents: "none",
        zIndex: 1,
        imageRendering: "pixelated",
      }}
    >
      {rows.map((row, y) =>
        row.map((tileId, x) => {
          const visual = visualFor(tileId);
          const coords = coordsFor(tileId, x, y);

          return (
            <div
              key={`limezu-editor-terrain-${x}-${y}`}
              style={{
                position: "absolute",
                left: x * tileSize,
                top: y * tileSize,
                width: tileSize,
                height: tileSize,
                backgroundColor: visual.fallback,
                backgroundImage: `url(${ATLAS})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `${-coords.col * tileSize}px ${-coords.row * tileSize}px`,
                imageRendering: "pixelated",
              }}
            />
          );
        }),
      )}
    </div>
  );
}
