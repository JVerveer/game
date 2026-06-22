// ─── Map data ─────────────────────────────────────────────────────────────────
// Tile key legend:
//   T = Trees/Forest   G = Grass       W = Water      R = Road/Path
//   B = Building       H = Healing Ctr Q = Quest NPC  X = Encounter Zone
//   C = Cave           D = Dungeon     S = Sand/Beach M = Mountain
//   V = Save Point     N = NPC         P = Player spawn (design map only)

// ── Design-system overworld display map (18 rows × ~30 cols) ─────────────────
export const DS_TILE_COLORS: Record<string, string> = {
  T: "#1d3a12", G: "#2e6b2e", W: "#14527a", R: "#7a6040",
  B: "#4a4a70", H: "#3a5aaa", Q: "#8b6010", X: "#5a1a1a",
  C: "#4a2e10", D: "#0d0d1e", S: "#b09060", M: "#3a3a4a",
  V: "#7a6000", P: "#2e8b2e",
};

export const DS_TILE_ICONS: Record<string, string> = {
  H: "⚕", Q: "!", V: "★", P: "◉", D: "⬛",
};

export const DS_MAP_ROWS: string[] = [
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
  "TTTTTTTGGGGGGGGGGGGGGGGTTTTTTT",
  "TTTTTTGGGGGGXXXXXXGGGGGGTTTTTTT",
  "TTTTTGGGGGXXXXXXXXGGGGGGTTTTTTT",
  "CCTTTGGGGGGGGGRRRGGGGGGGTTTTDDT",
  "CCTTTGGGGGGGRRRRRRRGGGGGTTTTDDT",
  "CCTTTGGGGGGRRRBBBHBRRRGGGTTTTDDT",
  "CCTTTGGGGGRRRBBBBBBBRRGGGGTTDDT",
  "CCTTTGGGGGRRRBPBQBBBRRGGGGTTDDT",
  "CCTTTGGGGGRRRBBBVBBBRRGGGGTTDDT",
  "CCTTTGGGGGRRRBBBBBBBRRGGGGTTDDT",
  "CCTTTGGGGGGRRRRRRRRRGGGGGTTTTDDT",
  "CCTTTGGGGGGGGGRRRGGGGGGGTTTTDDT",
  "TTTTTTTGGGGGGSSSSSGGGGGGTTTTTTTT",
  "TTTTTTTGGGGWWWWWWWWGGGGTTTTTTTTTT",
  "TTTTTTTTTGGWWWWWWWWWGGTTTTTTTTT",
  "TTTTTTTTTTTTGGGGGGGGGGTTTTTTTTTT",
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
];

// ── Playable game map (26 rows × 40 cols) ────────────────────────────────────
export const GAME_TILE_COLORS: Record<string, string> = {
  T: "#182e0a", G: "#265424", W: "#0f4466", R: "#5a4830",
  B: "#32325a", H: "#1e3880", Q: "#5a3e08", X: "#1e4020",
  C: "#2e1c08", D: "#08081a", S: "#7a6030", M: "#282838",
  V: "#3c2e00", N: "#3a2460",
};

export const WALKABLE_TILES = new Set(["G", "R", "S", "X", "B", "H", "Q", "V", "N"]);

export const GAME_MAP_W = 40;

const MAP_RAW: string[] = [
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", // 0  deep forest
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", // 1
  "TTTTTTTTTTTTTGGGGGGGGGGGGGGGGGTTTTTTTTTTT", // 2  forest opens
  "TTTTTTTTTTTTGGGXXXXXXXXXXXXXXXXGGTTTTTTTTT", // 3  encounter zone
  "TTTTTTTTTTTGGGXXXXXXXXXXXXXXXXGGGTTTTTTTTT", // 4
  "TTTTTTTTTTGGGGXXXXXXXXXXXXXXGGGGGGTTTTTTTT", // 5
  "TTTTTTTTTGGGGGGGGGGGGGGGGGGGGGGGTTTTTTTTTT", // 6  safe strip
  "CCTTTTTGGGGGGGGRRRRRRRRGGGGGGGGTTTTTTTTDDT", // 7  road E-W
  "CCTTTTTGGGGGGRRRRRRRRRRRRGGGGGGTTTTTTTTTDDT", // 8
  "CCTTTTGGGGGGRRRRRRRRRRRRRRGGGGGTTTTTTTTTDDT", // 9
  "CCTTTTGGGGGRRRRBBBBBBBBBBRRRGGGTTTTTTTTTTDDT", // 10 town
  "CCTTTTGGGGGRRRBBBBNQBBBBBRRRGGGTTTTTTTTTTDDT", // 11 N=npc Q=quest
  "CCTTTTGGGGGRRRBHRBVBBBBBBRRRGGGTTTTTTTTTTDDT", // 12 H=heal V=save R=road
  "CCTTTTGGGGGRRRBBBBBBBBBBBRRRGGGTTTTTTTTTTDDT", // 13
  "CCTTTTGGGGGRRRRRRRRRRRRRRRRRGGGTTTTTTTTTTTDDT", // 14 south road
  "CCTTTTTGGGGGGGGRRRRRRGGGGGGGGTTTTTTTTTTTTTDDT", // 15
  "TTTTTTTTGGGGGGGGGGGGGGGGGGGGGTTTTTTTTTTTTTTTT", // 16 fields
  "TTTTTTTTTTTGGGGSSSSSSSSSGGGGTTTTTTTTTTTTTTTTTT", // 17 sand
  "TTTTTTTTTTTTTGGSSSSSSSSSSGGTTTTTTTTTTTTTTTTTTTT", // 18
  "TTTTTTTTTTTTTTTGGWWWWWWWGGGTTTTTTTTTTTTTTTTTTTT", // 19 water
  "TTTTTTTTTTTTTTTGGWWWWWWWWGGTTTTTTTTTTTTTTTTTTTT", // 20
  "TTTTTTTTTTTTTTTTTTGGGGGGGGTTTTTTTTTTTTTTTTTTTTTT", // 21
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", // 22
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", // 23
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", // 24
  "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", // 25
];

export const GAME_MAP: string[][] = MAP_RAW.map(row => {
  const a = row.split("");
  while (a.length < GAME_MAP_W) a.push("T");
  return a.slice(0, GAME_MAP_W);
});

export const GAME_MAP_H = GAME_MAP.length;

// Objects rendered on top of tiles (emoji overlays keyed by "x,y")
export const MAP_OBJECTS: Record<string, string> = {
  "2,7":  "🌲",
  "37,8": "🌲",
  "1,10": "🦇",
  "38,11": "🚪",
  "17,10": "📋",
  "17,11": "🧙",
  "19,11": "❕",
  "13,12": "⚕",
  "15,12": "★",
};

// Interactions keyed by "x,y" of the object tile
export interface Interaction {
  name: string;
  heal?: boolean;
  save?: boolean;
  lines: string[];
}

export const INTERACTIONS: Record<string, Interaction> = {
  "17,10": {
    name: "Town Sign",
    lines: [
      "★ SATIRIA TOWN ★",
      "Pop. 47 (and declining)",
      "◄ Caves             Dungeon ►",
      "Mind the tall grass!",
    ],
  },
  "17,11": {
    name: "Grep the Wizard",
    lines: [
      '"Ah, a traveler!"',
      '"I sense great irony in your future."',
      '"The tall grass to the north is teeming with wild influencers."',
      '"Go carefully. They bite."',
    ],
  },
  "19,11": {
    name: "Quest Board",
    lines: [
      "[ ! ] URGENT QUEST",
      "THE MISSING QUARTERLY REPORT",
      "Recover the spreadsheet from Server Room B.",
      "Reward: 1200 XP · Rare Item · 300 G",
    ],
  },
  "13,12": {
    name: "Satiria Healing Center",
    heal: true,
    lines: [
      "♥ Welcome to the Healing Center!",
      "Your HP has been fully restored!",
      "Come back anytime. We never close.",
      "(We also never open. It's complicated.)",
    ],
  },
  "15,12": {
    name: "Save Point",
    save: true,
    lines: [
      "★ PROGRESS SAVED ★",
      "Satiria Town — Lv. 15",
      "HP 82/100 · 14:22:08 played",
      "Good luck out there.",
    ],
  },
  "1,10": {
    name: "Cave Entrance",
    lines: [
      "??? MYSTERIOUS CAVE ???",
      "The darkness smells of bats and regret.",
      "⚠ Recommended Level: 20+",
      "(Area under construction)",
    ],
  },
  "38,11": {
    name: "Dungeon Gate",
    lines: [
      "⚠ DANGER: THE CORPORATE DUNGEON ⚠",
      "Home of the dreaded CEO Chad.",
      "Only for brave (or foolish) adventurers.",
      "⚠ Recommended Level: 30+",
    ],
  },
};

// Location name based on tile position
export function getLocationName(x: number, y: number, tile: string): string {
  if (x >= 10 && x <= 28 && y >= 9 && y <= 14) return "Satiria Town";
  if (tile === "X") return "⚠ Wild Area — Encounter Zone";
  if (x <= 3) return "Western Cave Entrance";
  if (x >= 36) return "Eastern Dungeon Gate";
  if (y >= 17) return "Southern Coast";
  return "Satiria Fields";
}
