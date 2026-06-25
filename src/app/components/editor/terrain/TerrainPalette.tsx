import { GAME_TILE_COLORS } from "../../../../data/maps";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const TILE_TYPES = [
  { id: "G", name: "Grass", description: "Default walkable ground" },
  { id: "R", name: "Road / Bike Path", description: "Main walkable path" },
  { id: "W", name: "Water / Canal", description: "Canals, rivers, lakes" },
  { id: "T", name: "Trees / Forest", description: "Tree border or forest block" },
  { id: "E", name: "Plaza / Stone", description: "Town square or paved area" },
  { id: "Y", name: "Tulips / Flowers", description: "Flower beds and tulip fields" },
  { id: "S", name: "Sand / Beach", description: "Beach or desert terrain" },
  { id: "X", name: "Encounter Grass", description: "Wild battle zone" },
  { id: "D", name: "Dungeon Floor", description: "Dark indoor or dungeon tile" },
  { id: "C", name: "Cave", description: "Cave entrance or rocky area" },
  { id: "M", name: "Mountain", description: "Rocky mountain terrain" },
  { id: "J", name: "Wooden Dock", description: "Dock, pier, boardwalk" },
  { id: "F", name: "Fence", description: "Fence or barrier decoration" },
  { id: "L", name: "Flower Patch", description: "Decorative flowers / garden" },
  { id: "Q", name: "Quest Marker", description: "Quest/NPC marker tile" },
  { id: "V", name: "Save Point", description: "Save marker tile" },
  { id: "N", name: "NPC Tile", description: "NPC marker tile" },
] as const;

const EDITOR_TILE_COLORS: Record<string, string> = {
  G: "#56b447",
  R: "#d4a15f",
  W: "#2f9bd2",
  T: "#185c2b",
  E: "#9a9a9a",
  Y: "#ff4fa3",
  L: "#ffcf33",
  S: "#f0d079",
  X: "#2f8d3a",
  B: "#d94b36",
  H: "#3f7ee8",
  P: "#e07a28",
  U: "#8a4bd6",
  A: "#3fbf6f",
  I: "#52b7b0",
  O: "#3b2417",
  D: "#29213f",
  C: "#65412b",
  M: "#676767",
  J: "#9b5b2b",
  F: "#8b4f25",
  Q: "#f6d746",
  V: "#ffd84d",
  N: "#c87aff",
};

export function TerrainPalette({
  editorTile,
  setEditorTile,
}: {
  editorTile: string;
  setEditorTile: (tile: string) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8, marginBottom: 12 }}>
      {TILE_TYPES.map(tile => (
        <button
          key={tile.id}
          type="button"
          onClick={() => setEditorTile(tile.id)}
          title={`${tile.id} · ${tile.description}`}
          style={{
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 9px",
            border: editorTile === tile.id ? "4px solid #ca4b36" : "2px solid #252018",
            background: editorTile === tile.id ? "#ffef93" : "#fff8c8",
            color: "#252018",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 28,
              flex: "0 0 auto",
              background: EDITOR_TILE_COLORS[tile.id] ?? GAME_TILE_COLORS[tile.id] ?? GAME_TILE_COLORS.G,
              border: "3px solid #252018",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
            }}
          />
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ ...VT, fontSize: "1.1rem", lineHeight: 1 }}>{tile.name}</span>
            <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>{tile.id} · {tile.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export { TILE_TYPES, EDITOR_TILE_COLORS };
export const tileTypeFor = (id: string) => TILE_TYPES.find(tile => tile.id === id);
