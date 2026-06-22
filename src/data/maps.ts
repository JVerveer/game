// ─── Map data ─────────────────────────────────────────────────────────────────
// Tile key legend:
//   T = Trees/Forest   G = Grass       W = Water      R = Road/Path/Floor
//   B = Building       H = Healing Ctr Q = Quest NPC  X = Encounter Zone
//   C = Cave           D = Dungeon     S = Sand/Beach M = Mountain
//   V = Save Point     N = NPC         O = Door/Portal P = Player spawn (design map only)

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
  V: "#3c2e00", N: "#3a2460", O: "#5a4830",
};

export const WALKABLE_TILES = new Set(["G", "R", "S", "X", "Q", "V", "N", "O"]);

export type TownMapId =
  | "satiria"
  | "brexiton"
  | "tweetsburg"
  | "cryptonia"
  | "wokeshire"
  | "tariff"
  | "factcheck"
  | "ragebait"
  | "surveillia"
  | "promptford"
  | "inflatopolis";

export type GameMapId = TownMapId | "shop" | "house" | "healing";

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
  auto?: boolean;
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
  map[15][23] = "O";
  map[15][31] = "O";
  map[15][39] = "O";
  map[19][24] = "O";
  map[19][36] = "O";
  map[16][30] = "V";
  return map;
};

type TownTheme = {
  id: TownMapId;
  name: string;
  visual: string;
  satire: string;
  hook: string;
  accent: "water" | "sand" | "mountain" | "forest" | "port" | "city";
  sign: string[];
  npcName: string;
  npcLines: string[];
  world: { x: number; y: number };
};

export const TOWN_THEMES: TownTheme[] = [
  {
    id: "satiria",
    name: "Satiria Town",
    visual: "Starter village",
    satire: "A warm-up town where every joke still needs a tutorial.",
    hook: "Starting location with shop, healing center, save point, and routes outward.",
    accent: "forest",
    sign: ["★ SATIRIA TOWN ★", "Shop west. Healing Center north.", "Follow the east road to Brexiton."],
    npcName: "Route Guide",
    npcLines: ['"The east road is open now."', '"Eleven towns, one pair of shoes. Very heroic."'],
    world: { x: 10, y: 64 },
  },
  {
    id: "brexiton",
    name: "Brexiton",
    visual: "London",
    satire: "Endless debates, bureaucracy, and exit negotiations.",
    hook: "Gates constantly open and close depending on town votes.",
    accent: "city",
    sign: ["★ BREXITON ★", "Mind the gap between promise and policy.", "The exit gate is having a consultation."],
    npcName: "Queue Minister",
    npcLines: ['"We voted to open this gate, then formed a committee to close it."', '"Please enjoy the paperwork maze."'],
    world: { x: 22, y: 58 },
  },
  {
    id: "tweetsburg",
    name: "Tweetsburg",
    visual: "San Francisco",
    satire: "Social media discourse and online outrage.",
    hook: "NPCs spread rumors that alter quests in real time.",
    accent: "water",
    sign: ["★ TWEETSBURG ★", "Every rumor has fiber internet.", "Quest facts may update without notice."],
    npcName: "Trend Watcher",
    npcLines: ['"A rumor just patched itself into the main quest."', '"Do not read the replies unless you brought potions."'],
    world: { x: 34, y: 50 },
  },
  {
    id: "cryptonia",
    name: "Cryptonia City",
    visual: "Miami",
    satire: "Crypto hype, speculation, and sudden crashes.",
    hook: "Currency value changes every few minutes.",
    accent: "sand",
    sign: ["★ CRYPTONIA CITY ★", "Prices moon at dawn and crash by lunch.", "No refunds on vibes."],
    npcName: "Token Baron",
    npcLines: ['"My wallet was full this morning. Now it is a learning experience."', '"The beach is real. The yield is theoretical."'],
    world: { x: 48, y: 62 },
  },
  {
    id: "wokeshire",
    name: "Wokeshire",
    visual: "Portland",
    satire: "Culture-war debates, activism, and ideological purity tests.",
    hook: "Every faction has different rules for acceptable behavior.",
    accent: "forest",
    sign: ["★ WOKESHIRE ★", "Check the notice board before speaking.", "The notices disagree."],
    npcName: "Consensus Ranger",
    npcLines: ['"The north path is approved by three factions and denounced by four."', '"Bring empathy, patience, and a spare checklist."'],
    world: { x: 58, y: 44 },
  },
  {
    id: "tariff",
    name: "Tariff Town",
    visual: "Shanghai and major port cities",
    satire: "Trade wars and import/export restrictions.",
    hook: "Crossing districts requires paying changing tariffs.",
    accent: "port",
    sign: ["★ TARIFF TOWN ★", "All roads are imports.", "Toll prices refresh when nobody is looking."],
    npcName: "Dock Broker",
    npcLines: ['"Crossing the street costs three stamps and one surprise fee."', '"The ships are punctual. The forms are not."'],
    world: { x: 72, y: 48 },
  },
  {
    id: "factcheck",
    name: "Factcheck Falls",
    visual: "Washington",
    satire: "Competing narratives, spin, and fact-checking.",
    hook: "Every NPC gives a different version of the same quest.",
    accent: "water",
    sign: ["★ FACTCHECK FALLS ★", "Three plaques explain this waterfall.", "Only one is mostly true."],
    npcName: "Citation Clerk",
    npcLines: ['"The quest began here, unless you ask the mayor."', '"I rate that potion claim: needs context."'],
    world: { x: 62, y: 30 },
  },
  {
    id: "ragebait",
    name: "Ragebait Bay",
    visual: "Los Angeles",
    satire: "Attention economy and outrage-driven media.",
    hook: "The more dramatic your actions, the more rewards you receive.",
    accent: "sand",
    sign: ["★ RAGEBAIT BAY ★", "Quiet deeds earn quiet applause.", "Dramatic deeds get sponsored."],
    npcName: "Reaction Producer",
    npcLines: ['"Try entering the shop with a gasp. The algorithm loves commitment."', '"Subtlety was nerfed last season."'],
    world: { x: 80, y: 22 },
  },
  {
    id: "surveillia",
    name: "Surveillia",
    visual: "Beijing",
    satire: "Surveillance technology, data collection, and monitoring.",
    hook: "Guards know where you are unless you disable cameras.",
    accent: "city",
    sign: ["★ SURVEILLIA ★", "Smile. The signs already know you read them.", "Cameras cover every shortcut."],
    npcName: "Camera Guard",
    npcLines: ['"You are currently standing exactly there."', '"Disable the cameras and I will have to guess like everyone else."'],
    world: { x: 68, y: 14 },
  },
  {
    id: "promptford",
    name: "Promptford",
    visual: "Amsterdam mixed with AI startup hubs",
    satire: "AI assistants, automation, and prompt engineering.",
    hook: "Citizens outsource every decision to AI oracles.",
    accent: "water",
    sign: ["★ PROMPTFORD ★", "Canals, startups, and oracles with opinions.", "Please phrase your destiny clearly."],
    npcName: "Oracle Intern",
    npcLines: ['"The oracle suggests taking the scenic route, with confidence 0.51."', '"I asked it what to eat. It opened a sprint board."'],
    world: { x: 50, y: 14 },
  },
  {
    id: "inflatopolis",
    name: "Inflatopolis",
    visual: "Buenos Aires",
    satire: "Inflation, currency instability, and rising prices.",
    hook: "Shop prices increase as you play.",
    accent: "city",
    sign: ["★ INFLATOPOLIS ★", "Read prices quickly.", "Yesterday's bargain is today's museum exhibit."],
    npcName: "Price Sprinter",
    npcLines: ['"I saved up for bread. Now I can afford a receipt."', '"The shop sign updates faster than my legs."'],
    world: { x: 35, y: 24 },
  },
];

export const MAIN_TOWN_IDS = TOWN_THEMES.map(town => town.id);
export const TOWN_WORLD_POSITIONS = Object.fromEntries(TOWN_THEMES.map(town => [town.id, town.world])) as Record<TownMapId, { x: number; y: number }>;

const buildThemedTownMap = (theme: TownTheme) => {
  const map = makeBlankMap(56, 34, "T");
  rect(map, 4, 4, 48, 24, "G");
  rect(map, 15, 10, 24, 11, "R");
  hline(map, 0, 55, 18, "R");
  vline(map, 27, 7, 29, "R");
  hline(map, 27, 55, 29, "R");
  hline(map, 0, 27, 29, "R");

  if (theme.accent === "water" || theme.accent === "port") {
    rect(map, 41, 5, 8, 13, "W");
    rect(map, 38, 18, 13, 4, theme.accent === "port" ? "R" : "S");
  }
  if (theme.accent === "sand") {
    rect(map, 5, 22, 18, 5, "S");
    rect(map, 36, 5, 10, 5, "S");
  }
  if (theme.accent === "mountain" || theme.accent === "city") {
    rect(map, 43, 7, 7, 11, theme.accent === "mountain" ? "M" : "B");
  }
  if (theme.accent === "forest") {
    rect(map, 6, 6, 8, 9, "X");
    rect(map, 39, 21, 8, 5, "X");
  }

  rect(map, 16, 11, 6, 4, "B");
  rect(map, 25, 11, 6, 4, "H");
  rect(map, 34, 11, 6, 4, "B");
  rect(map, 18, 21, 6, 4, "B");
  rect(map, 32, 21, 6, 4, "B");
  map[14][19] = "O";
  map[14][28] = "O";
  map[14][37] = "O";
  map[24][21] = "O";
  map[24][35] = "O";
  map[18][27] = "V";
  return map;
};

const buildShopMap = () => {
  const map = makeBlankMap(14, 10, "D");
  rect(map, 1, 1, 12, 8, "B");
  rect(map, 2, 2, 10, 2, "R");
  rect(map, 2, 5, 10, 3, "R");
  rect(map, 6, 8, 2, 1, "O");
  return map;
};

const buildHouseMap = () => {
  const map = makeBlankMap(12, 9, "D");
  rect(map, 1, 1, 10, 7, "B");
  rect(map, 2, 4, 8, 3, "R");
  rect(map, 5, 7, 2, 1, "O");
  return map;
};

const buildHealingMap = () => {
  const map = makeBlankMap(14, 10, "D");
  rect(map, 1, 1, 12, 8, "H");
  rect(map, 2, 2, 10, 2, "R");
  rect(map, 2, 5, 10, 3, "R");
  rect(map, 6, 8, 2, 1, "O");
  return map;
};

const createThemedTownDef = (theme: TownTheme, prevId: TownMapId, nextId?: TownMapId): GameMapDef => ({
  id: theme.id,
  name: theme.name,
  width: 56,
  height: 34,
  rows: buildThemedTownMap(theme),
  spawn: { x: 2, y: 18 },
  objects: {
    "1,18": "←",
    ...(nextId ? { "55,29": "→" } : {}),
    "19,14": "DOOR_SHOP",
    "28,14": "DOOR_HEAL",
    "37,14": "DOOR_HOME",
    "21,24": "DOOR_HOME",
    "35,24": "DOOR_HOME",
    "27,18": "★",
    "25,18": "SIGN",
  },
  interactions: {
    "1,18": {
      name: "West Route",
      portal: { mapId: prevId, x: prevId === "satiria" ? 62 : 54, y: prevId === "satiria" ? 29 : 29, facing: "left" },
      auto: true,
      lines: [],
    },
    ...(nextId ? {
      "55,29": {
        name: "East Route",
        portal: { mapId: nextId, x: 2, y: 18, facing: "right" },
        auto: true,
        lines: [],
      },
    } : {}),
    "19,14": {
      name: `${theme.name} Shop`,
      portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
      auto: true,
      lines: [],
    },
    "28,14": {
      name: `${theme.name} Healing Center`,
      portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
      auto: true,
      lines: [],
    },
    "37,14": {
      name: `${theme.name} House`,
      portal: { mapId: "house", x: 6, y: 6, facing: "up" },
      auto: true,
      lines: [],
    },
    "21,24": {
      name: "Local House",
      portal: { mapId: "house", x: 6, y: 6, facing: "up" },
      auto: true,
      lines: [],
    },
    "35,24": {
      name: "Mayor's House",
      portal: { mapId: "house", x: 6, y: 6, facing: "up" },
      auto: true,
      lines: [],
    },
    "27,18": {
      name: "Save Point",
      save: true,
      lines: ["★ PROGRESS SAVED ★", `${theme.name} - Lv. 15`, theme.hook],
    },
    "25,18": {
      name: "Town Sign",
      lines: [...theme.sign, `Hook: ${theme.hook}`],
    },
  },
});

const GENERATED_TOWN_MAPS = Object.fromEntries(
  TOWN_THEMES.slice(1).map((theme, index) => {
    const prev = TOWN_THEMES[index].id;
    const next = TOWN_THEMES[index + 2]?.id;
    return [theme.id, createThemedTownDef(theme, prev, next)];
  }),
) as Record<Exclude<TownMapId, "satiria">, GameMapDef>;

export const GAME_MAPS: Record<GameMapId, GameMapDef> = {
  satiria: {
    id: "satiria",
    name: "Satiria Town",
    width: 64,
    height: 38,
    rows: buildSatiriaMap(),
    spawn: { x: 31, y: 17 },
    objects: {
      "23,15": "DOOR_SHOP",
      "31,15": "DOOR_HEAL",
      "39,15": "DOOR_HOME",
      "24,19": "DOOR_HOME",
      "36,19": "DOOR_HOME",
      "30,16": "★",
      "21,16": "SIGN",
      "63,29": "→",
      "8,15": "CAVE",
    },
    interactions: {
      "23,15": {
        name: "Satiria Shop",
        portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
        auto: true,
        lines: [],
      },
      "31,15": {
        name: "Healing Center",
        portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
        auto: true,
        lines: [],
      },
      "39,15": {
        name: "Quiet House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        auto: true,
        lines: [],
      },
      "24,19": {
        name: "Starter House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        auto: true,
        lines: [],
      },
      "36,19": {
        name: "Neighbor House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        auto: true,
        lines: [],
      },
      "30,16": {
        name: "Save Point",
        save: true,
        lines: ["★ PROGRESS SAVED ★", "Satiria Town - Lv. 15", "Good luck out there."],
      },
      "21,16": {
        name: "Town Sign",
        lines: ["★ SATIRIA TOWN ★", "Shop west. Healing Center north.", "Follow the east road to Brexiton."],
      },
      "63,29": {
        name: "Route 2 Gate",
        portal: { mapId: "brexiton", x: 2, y: 18, facing: "right" },
        auto: true,
        lines: [],
      },
      "8,15": {
        name: "Western Cave",
        lines: ["??? MYSTERIOUS CAVE ???", "The cave is still under construction.", "A sign says: bring snacks."],
      },
    },
  },
  ...GENERATED_TOWN_MAPS,
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
        auto: true,
        lines: [],
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
        auto: true,
        lines: [],
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
        auto: true,
        lines: [],
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
  const theme = TOWN_THEMES.find(town => town.id === mapId);
  if (theme && mapId !== "satiria") {
    if (x <= 3) return `${theme.name} West Route`;
    if (x >= 52) return `${theme.name} East Route`;
    if (tile === "X") return `${theme.name} Rumor Grass`;
    if (tile === "W") return `${theme.name} Waterfront`;
    if (tile === "S") return `${theme.name} Shore`;
    if (x >= 14 && x <= 41 && y >= 9 && y <= 25) return theme.name;
    return `${theme.name} Outskirts`;
  }
  if (x >= 18 && x <= 43 && y >= 10 && y <= 21) return "Satiria Town";
  if (tile === "X") return "⚠ Wild Area — Encounter Zone";
  if (x <= 10) return "Western Cave Entrance";
  if (x >= 55) return "Route to Brexiton";
  if (y >= 26) return "Southern Coast";
  return "Satiria Fields";
}
