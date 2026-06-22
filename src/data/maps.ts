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

// ── Playable game maps ───────────────────────────────────────────────────────
export const GAME_TILE_COLORS: Record<string, string> = {
  T: "#182e0a", G: "#265424", W: "#0f4466", R: "#5a4830",
  B: "#32325a", H: "#1e3880", Q: "#5a3e08", X: "#1e4020",
  C: "#2e1c08", D: "#08081a", S: "#7a6030", M: "#282838",
  V: "#3c2e00", N: "#3a2460",
};

export const WALKABLE_TILES = new Set(["G", "R", "S", "X", "B", "H", "Q", "V", "N"]);

export type GameMapId = "satiria" | "sproutford" | "shop" | "house" | "healing";

export interface Portal {
  mapId: GameMapId;
  x: number;
  y: number;
  facing?: "up" | "down" | "left" | "right";
}

export interface Interaction {
  name: string;
  heal?: boolean;
  save?: boolean;
  shop?: boolean;
  portal?: Portal;
  lines: string[];
}

export interface GameMapDef {
  id: GameMapId;
  name: string;
  width: number;
  height: number;
  rows: string[][];
  objects: Record<string, string>;
  interactions: Record<string, Interaction>;
  spawn: { x: number; y: number };
}

const makeBlankMap = (width: number, height: number, fill = "T") =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => fill));

const rect = (map: string[][], x: number, y: number, w: number, h: number, tile: string) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      if (map[ry]?.[cx] !== undefined) map[ry][cx] = tile;
    }
  }
};

const hline = (map: string[][], x1: number, x2: number, y: number, tile: string) => rect(map, x1, y, x2 - x1 + 1, 1, tile);
const vline = (map: string[][], x: number, y1: number, y2: number, tile: string) => rect(map, x, y1, 1, y2 - y1 + 1, tile);

const buildSatiriaMap = () => {
  const map = makeBlankMap(64, 38, "T");
  rect(map, 5, 4, 54, 29, "G");
  rect(map, 13, 5, 18, 5, "X");
  rect(map, 9, 22, 18, 5, "S");
  rect(map, 14, 27, 18, 3, "W");
  rect(map, 6, 12, 4, 8, "C");
  rect(map, 55, 11, 5, 8, "M");

  rect(map, 19, 11, 24, 10, "R");
  hline(map, 17, 59, 16, "R");
  vline(map, 31, 8, 29, "R");
  hline(map, 31, 59, 29, "R");
  hline(map, 59, 63, 29, "R");

  rect(map, 20, 12, 6, 4, "B");
  rect(map, 28, 12, 6, 4, "H");
  rect(map, 36, 12, 6, 4, "B");
  rect(map, 22, 17, 5, 3, "B");
  rect(map, 34, 17, 5, 3, "B");
  rect(map, 30, 15, 2, 2, "V");
  return map;
};

const buildSproutfordMap = () => {
  const map = makeBlankMap(48, 32, "T");
  rect(map, 4, 4, 40, 23, "G");
  rect(map, 4, 19, 12, 5, "X");
  rect(map, 33, 5, 7, 12, "W");
  rect(map, 16, 10, 18, 10, "R");
  hline(map, 0, 20, 18, "R");
  vline(map, 24, 8, 25, "R");
  rect(map, 17, 11, 5, 4, "B");
  rect(map, 26, 11, 5, 4, "H");
  rect(map, 18, 18, 5, 4, "B");
  rect(map, 28, 18, 5, 4, "B");
  rect(map, 24, 16, 2, 2, "V");
  return map;
};

const buildShopMap = () => {
  const map = makeBlankMap(14, 10, "D");
  rect(map, 1, 1, 12, 8, "B");
  rect(map, 2, 2, 10, 2, "R");
  rect(map, 2, 5, 10, 3, "R");
  rect(map, 6, 8, 2, 1, "R");
  return map;
};

const buildHouseMap = () => {
  const map = makeBlankMap(12, 9, "D");
  rect(map, 1, 1, 10, 7, "B");
  rect(map, 2, 4, 8, 3, "R");
  rect(map, 5, 7, 2, 1, "R");
  return map;
};

const buildHealingMap = () => {
  const map = makeBlankMap(14, 10, "D");
  rect(map, 1, 1, 12, 8, "H");
  rect(map, 2, 2, 10, 2, "R");
  rect(map, 2, 5, 10, 3, "R");
  rect(map, 6, 8, 2, 1, "R");
  return map;
};

export const GAME_MAPS: Record<GameMapId, GameMapDef> = {
  satiria: {
    id: "satiria",
    name: "Satiria Town",
    width: 64,
    height: 38,
    rows: buildSatiriaMap(),
    spawn: { x: 31, y: 17 },
    objects: {
      "23,11": "SHOP",
      "31,11": "HEAL",
      "39,11": "HOME",
      "24,16": "⌂",
      "36,16": "⌂",
      "31,15": "★",
      "21,16": "SIGN",
      "33,16": "NPC",
      "57,28": "→",
      "8,15": "CAVE",
    },
    interactions: {
      "23,11": {
        name: "Satiria Shop",
        portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
        lines: ["You step into the Satiria Shop."],
      },
      "31,11": {
        name: "Healing Center",
        portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
        lines: ["The Healing Center doors slide open."],
      },
      "39,11": {
        name: "Quiet House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        lines: ["You enter a cozy little house."],
      },
      "24,16": {
        name: "Starter House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        lines: ["You duck inside the starter house."],
      },
      "36,16": {
        name: "Neighbor House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        lines: ["You visit the neighbor's house."],
      },
      "31,15": {
        name: "Save Point",
        save: true,
        lines: ["★ PROGRESS SAVED ★", "Satiria Town - Lv. 15", "Good luck out there."],
      },
      "21,16": {
        name: "Town Sign",
        lines: ["★ SATIRIA TOWN ★", "Shop west. Healing Center north.", "Follow the east road to Sproutford."],
      },
      "33,16": {
        name: "Route Guide",
        lines: ['"The road east is longer now."', '"Follow the path, and you will reach Sproutford Town."'],
      },
      "57,28": {
        name: "Route 2 Gate",
        portal: { mapId: "sproutford", x: 2, y: 18, facing: "right" },
        lines: ["You follow the road toward Sproutford Town."],
      },
      "8,15": {
        name: "Western Cave",
        lines: ["??? MYSTERIOUS CAVE ???", "The cave is still under construction.", "A sign says: bring snacks."],
      },
    },
  },
  sproutford: {
    id: "sproutford",
    name: "Sproutford Town",
    width: 48,
    height: 32,
    rows: buildSproutfordMap(),
    spawn: { x: 2, y: 18 },
    objects: {
      "1,18": "←",
      "19,10": "SHOP",
      "28,10": "HEAL",
      "20,17": "⌂",
      "30,17": "HOME",
      "25,16": "★",
      "23,18": "SIGN",
      "28,18": "NPC",
    },
    interactions: {
      "1,18": {
        name: "Route 2 West",
        portal: { mapId: "satiria", x: 58, y: 28, facing: "left" },
        lines: ["You head back toward Satiria Town."],
      },
      "19,10": {
        name: "Sproutford Shop",
        portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
        lines: ["You enter Sproutford's tiny shop."],
      },
      "28,10": {
        name: "Sproutford Healing Center",
        portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
        lines: ["The healing center smells faintly of lemonade."],
      },
      "20,17": {
        name: "Sproutford House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        lines: ["You step inside a Sproutford home."],
      },
      "30,17": {
        name: "Mayor's House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        lines: ["You enter the mayor's extremely modest house."],
      },
      "25,16": {
        name: "Save Point",
        save: true,
        lines: ["★ PROGRESS SAVED ★", "Sproutford Town - Lv. 15", "The road trip counted."],
      },
      "23,18": {
        name: "Town Sign",
        lines: ["★ SPROUTFORD TOWN ★", "Fresh grass. Fresh gossip.", "West road returns to Satiria."],
      },
      "28,18": {
        name: "Sproutford Local",
        lines: ['"Welcome to Sproutford!"', '"Our town is small, but our pathfinding is ambitious."'],
      },
    },
  },
  shop: {
    id: "shop",
    name: "Item Shop",
    width: 14,
    height: 10,
    rows: buildShopMap(),
    spawn: { x: 7, y: 7 },
    objects: {
      "7,3": "CLERK",
      "3,3": "POTN",
      "10,3": "BALL",
      "7,8": "EXIT",
    },
    interactions: {
      "7,3": {
        name: "Shop Clerk",
        shop: true,
        lines: [
          '"Welcome! Need supplies for the road?"',
          "Energy Drink - 45 G",
          "Cringe Ball - 120 G",
          "Coupon of Questionable Value - 5 G",
        ],
      },
      "7,8": {
        name: "Exit",
        portal: { mapId: "satiria", x: 23, y: 12, facing: "down" },
        lines: ["You step back outside."],
      },
    },
  },
  healing: {
    id: "healing",
    name: "Healing Center",
    width: 14,
    height: 10,
    rows: buildHealingMap(),
    spawn: { x: 7, y: 7 },
    objects: {
      "7,3": "NURSE",
      "4,3": "BED",
      "10,3": "BED",
      "7,8": "EXIT",
    },
    interactions: {
      "7,3": {
        name: "Healing Clerk",
        heal: true,
        lines: [
          '"Welcome to the Healing Center!"',
          "Your HP has been fully restored.",
          '"Please come back before things get dramatic."',
        ],
      },
      "7,8": {
        name: "Exit",
        portal: { mapId: "satiria", x: 31, y: 12, facing: "down" },
        lines: ["You step back outside."],
      },
    },
  },
  house: {
    id: "house",
    name: "House",
    width: 12,
    height: 9,
    rows: buildHouseMap(),
    spawn: { x: 6, y: 6 },
    objects: {
      "4,3": "TV",
      "8,3": "BED",
      "6,7": "EXIT",
    },
    interactions: {
      "4,3": {
        name: "Television",
        lines: ["A monster-battle rerun is on.", "The host says every road leads to content."],
      },
      "8,3": {
        name: "Comfy Bed",
        heal: true,
        lines: ["You take a quick rest.", "HP restored!"],
      },
      "6,7": {
        name: "Exit",
        portal: { mapId: "satiria", x: 39, y: 12, facing: "down" },
        lines: ["You head back outside."],
      },
    },
  },
};

export const GAME_MAP = GAME_MAPS.satiria.rows;
export const GAME_MAP_W = GAME_MAPS.satiria.width;
export const GAME_MAP_H = GAME_MAPS.satiria.height;
export const MAP_OBJECTS = GAME_MAPS.satiria.objects;
export const INTERACTIONS = GAME_MAPS.satiria.interactions;

// Location name based on tile position
export function getLocationName(mapId: GameMapId, x: number, y: number, tile: string): string {
  if (mapId === "shop") return "Item Shop";
  if (mapId === "house") return "House";
  if (mapId === "healing") return "Healing Center";
  if (mapId === "sproutford") {
    if (x >= 15 && x <= 35 && y >= 9 && y <= 22) return "Sproutford Town";
    if (tile === "X") return "Route 2 Grass";
    if (x <= 3) return "Route 2 West Gate";
    return "Sproutford Fields";
  }
  if (x >= 18 && x <= 43 && y >= 10 && y <= 21) return "Satiria Town";
  if (tile === "X") return "⚠ Wild Area — Encounter Zone";
  if (x <= 10) return "Western Cave Entrance";
  if (x >= 55) return "Route 2 East";
  if (y >= 26) return "Southern Coast";
  return "Satiria Fields";
}
