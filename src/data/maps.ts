// ─── Map data ─────────────────────────────────────────────────────────────────
import { buildSatiriaMap } from "./cityMaps/satiria";
import { buildBrexitonMap as buildBrexitonCityMap } from "./cityMaps/brexiton";
import { buildCryptoniaMap as buildCryptoniaCityMap } from "./cityMaps/cryptonia";
import { buildFactcheckMap as buildFactcheckCityMap } from "./cityMaps/factcheck";
import { buildInflatopolisMap as buildInflatopolisCityMap } from "./cityMaps/inflatopolis";
import { buildPromptfordMap as buildPromptfordCityMap } from "./cityMaps/promptford";
import { buildRagebaitMap as buildRagebaitCityMap } from "./cityMaps/ragebait";
import { buildSurveilliaMap as buildSurveilliaCityMap } from "./cityMaps/surveillia";
import { buildTariffMap as buildTariffCityMap } from "./cityMaps/tariff";
import { buildTweetsburgMap as buildTweetsburgCityMap } from "./cityMaps/tweetsburg";
import { buildWokeshireMap as buildWokeshireCityMap } from "./cityMaps/wokeshire";

// Tile key legend:
//   T = Trees/Forest   G = Grass       W = Water      R = Road/Path/Floor
//   B = Building       H = Healing Ctr Q = Quest NPC  X = Encounter Zone
//   C = Cave           D = Dungeon     S = Sand/Beach M = Mountain
//   V = Save Point     N = NPC         O = Door/Portal P = Train Station

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
  V: "#3c2e00", N: "#3a2460", O: "#5a4830", P: "#5a4830",
  A: "#b9a06d", I: "#927947", U: "#713224", E: "#4a4a4a",
  Y: "#76a846",
};

export const WALKABLE_TILES = new Set(["G", "R", "S", "X", "Q", "V", "N", "L", "E"]);

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
  train?: boolean;
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
    world: { x: 50, y: 96 },
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
    world: { x: 50, y: 7 },
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
    world: { x: 68, y: 77 },
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
    world: { x: 68, y: 50 },
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
    world: { x: 32, y: 34 },
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
    world: { x: 68, y: 34 },
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
    world: { x: 50, y: 88 },
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
    world: { x: 32, y: 77 },
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
    world: { x: 50, y: 21 },
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
    world: { x: 50, y: 63 },
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
    world: { x: 32, y: 50 },
  },
];

export const MAIN_TOWN_IDS = TOWN_THEMES.map(town => town.id);
export const TOWN_WORLD_POSITIONS = Object.fromEntries(TOWN_THEMES.map(town => [town.id, town.world])) as Record<TownMapId, { x: number; y: number }>;

export const WORLD_ROUTES: Record<TownMapId, Partial<Record<RouteDirection, TownMapId>>> = {
  satiria: { N: "factcheck" },
  factcheck: { S: "satiria", NW: "ragebait", NE: "tweetsburg" },
  ragebait: { SE: "factcheck", NE: "promptford" },
  tweetsburg: { SW: "factcheck", NW: "promptford" },
  promptford: { SW: "ragebait", SE: "tweetsburg", NW: "inflatopolis", NE: "cryptonia" },
  inflatopolis: { S: "promptford", N: "wokeshire" },
  cryptonia: { S: "promptford", N: "tariff" },
  wokeshire: { S: "inflatopolis", NE: "surveillia" },
  tariff: { S: "cryptonia", NW: "surveillia" },
  surveillia: { SW: "wokeshire", SE: "tariff", N: "brexiton" },
  brexiton: { S: "surveillia" },
};

export type RouteDirection = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";

const PORTAL_POS: Record<RouteDirection, { x: number; y: number }> = {
  N: { x: 27, y: 0 },
  S: { x: 27, y: 33 },
  W: { x: 0, y: 18 },
  E: { x: 55, y: 18 },
  NE: { x: 55, y: 6 },
  NW: { x: 0, y: 6 },
  SE: { x: 55, y: 29 },
  SW: { x: 0, y: 29 },
};

const ENTRY_POS: Record<RouteDirection, { x: number; y: number; facing: "up" | "down" | "left" | "right" }> = {
  N: { x: 27, y: 2, facing: "down" },
  S: { x: 27, y: 31, facing: "up" },
  W: { x: 2, y: 18, facing: "right" },
  E: { x: 53, y: 18, facing: "left" },
  NE: { x: 53, y: 7, facing: "left" },
  NW: { x: 2, y: 7, facing: "right" },
  SE: { x: 53, y: 28, facing: "left" },
  SW: { x: 2, y: 28, facing: "right" },
};

const findEntryFrom = (target: TownMapId, from: TownMapId) => {
  const entry = Object.entries(WORLD_ROUTES[target]).find(([, town]) => town === from);
  return ENTRY_POS[(entry?.[0] as RouteDirection | undefined) ?? "S"];
};

const buildThemedTownMap = (theme: TownTheme) => {
  const map = makeBlankMap(56, 34, "T");
  const setTile = (x: number, y: number, tile: string) => {
    if (map[y]?.[x] !== undefined) map[y][x] = tile;
  };
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 4, 4, 48, 24, "G");
  rect(map, 6, 26, 9, 1, "F");
  rect(map, 41, 26, 9, 1, "F");
  rect(map, 7, 5, 6, 2, "L");
  rect(map, 43, 23, 6, 2, "L");
  rect(map, 15, 10, 24, 11, "R");
  vline(map, 27, 8, 28, "R");
  hline(map, 16, 38, 18, "R");

  Object.keys(WORLD_ROUTES[theme.id]).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

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
  setTile(14, 19, "O");
  setTile(14, 28, "O");
  setTile(14, 37, "O");
  setTile(24, 21, "O");
  setTile(24, 34, "P");
  setTile(24, 35, "P");
  setTile(18, 27, "V");
  Object.keys(WORLD_ROUTES[theme.id]).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });
  return map;
};

const buildBrexitonMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const setTile = (x: number, y: number, tile: string) => {
    if (map[y]?.[x] !== undefined) map[y][x] = tile;
  };
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 3, 3, 50, 27, "G");
  rect(map, 5, 24, 46, 5, "W");
  rect(map, 24, 23, 8, 7, "R");
  rect(map, 33, 24, 10, 4, "R");
  rect(map, 7, 6, 42, 17, "E");
  hline(map, 7, 49, 18, "R");
  vline(map, 27, 4, 30, "R");
  hline(map, 13, 42, 10, "R");
  hline(map, 13, 42, 15, "R");
  vline(map, 13, 7, 22, "R");
  vline(map, 42, 7, 22, "R");

  Object.keys(WORLD_ROUTES.brexiton).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 9, 7, 6, 3, "U");
  rect(map, 17, 7, 6, 3, "U");
  rect(map, 31, 7, 6, 3, "U");
  rect(map, 39, 7, 6, 3, "U");
  rect(map, 9, 12, 6, 3, "B");
  rect(map, 23, 12, 8, 3, "H");
  rect(map, 37, 12, 6, 3, "B");
  rect(map, 8, 20, 14, 4, "A");
  rect(map, 22, 18, 3, 6, "I");
  rect(map, 34, 21, 8, 4, "P");
  rect(map, 44, 20, 4, 3, "U");

  setTile(14, 9, "O");
  setTile(20, 9, "O");
  setTile(34, 9, "O");
  setTile(42, 9, "O");
  setTile(12, 14, "O");
  setTile(27, 14, "O");
  setTile(40, 14, "O");
  setTile(36, 24, "O");
  setTile(37, 24, "O");

  Object.keys(WORLD_ROUTES.brexiton).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildPromptfordMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 3, 4, 50, 25, "G");
  rect(map, 6, 21, 44, 4, "W");
  rect(map, 18, 20, 8, 6, "R");
  rect(map, 33, 20, 9, 6, "R");
  rect(map, 8, 7, 40, 13, "E");
  hline(map, 8, 48, 13, "R");
  vline(map, 27, 5, 29, "R");
  hline(map, 12, 44, 8, "R");
  hline(map, 12, 44, 18, "R");

  Object.keys(WORLD_ROUTES.promptford).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 9, 8, 7, 3, "A");
  rect(map, 18, 8, 7, 3, "A");
  rect(map, 31, 8, 7, 3, "A");
  rect(map, 40, 8, 7, 3, "A");
  rect(map, 10, 15, 7, 3, "B");
  rect(map, 24, 15, 7, 3, "H");
  rect(map, 39, 15, 7, 3, "B");
  rect(map, 34, 23, 8, 3, "P");
  rect(map, 23, 11, 3, 7, "I");

  map[10][13] = "O";
  map[10][22] = "O";
  map[10][34] = "O";
  map[10][43] = "O";
  map[17][13] = "O";
  map[17][27] = "O";
  map[17][42] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.promptford).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildWokeshireMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 4, 4, 48, 25, "G");
  rect(map, 7, 7, 42, 4, "W");
  rect(map, 7, 18, 42, 4, "W");
  rect(map, 16, 6, 5, 17, "R");
  rect(map, 34, 6, 5, 17, "R");
  rect(map, 9, 11, 38, 7, "E");
  hline(map, 9, 47, 14, "R");
  vline(map, 27, 10, 29, "R");
  rect(map, 32, 23, 10, 4, "R");

  Object.keys(WORLD_ROUTES.wokeshire).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 10, 12, 4, 4, "U");
  rect(map, 15, 12, 4, 4, "U");
  rect(map, 20, 12, 4, 4, "B");
  rect(map, 31, 12, 4, 4, "H");
  rect(map, 36, 12, 4, 4, "U");
  rect(map, 41, 12, 4, 4, "U");
  rect(map, 35, 23, 6, 3, "P");
  rect(map, 45, 23, 4, 4, "U");

  map[15][12] = "O";
  map[15][17] = "O";
  map[15][22] = "O";
  map[15][33] = "O";
  map[15][38] = "O";
  map[15][43] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.wokeshire).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildCryptoniaMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 3, 4, 50, 25, "S");
  rect(map, 39, 5, 10, 24, "W");
  rect(map, 34, 8, 8, 18, "R");
  rect(map, 9, 8, 27, 15, "E");
  hline(map, 9, 42, 16, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 12, 35, 10, "R");
  hline(map, 12, 35, 22, "R");

  Object.keys(WORLD_ROUTES.cryptonia).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 11, 9, 5, 5, "I");
  rect(map, 18, 8, 4, 6, "A");
  rect(map, 24, 7, 4, 7, "I");
  rect(map, 30, 8, 5, 6, "A");
  rect(map, 11, 18, 6, 4, "B");
  rect(map, 24, 18, 7, 4, "H");
  rect(map, 34, 23, 8, 3, "P");
  rect(map, 32, 18, 3, 5, "U");

  map[21][14] = "O";
  map[21][27] = "O";
  map[21][35] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.cryptonia).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildSurveilliaMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 3, 4, 50, 25, "G");
  rect(map, 6, 22, 44, 5, "W");
  rect(map, 10, 7, 36, 14, "E");
  hline(map, 10, 46, 16, "R");
  vline(map, 27, 4, 30, "R");
  hline(map, 12, 44, 10, "R");
  hline(map, 12, 44, 20, "R");
  rect(map, 33, 23, 10, 4, "R");

  Object.keys(WORLD_ROUTES.surveillia).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 11, 8, 5, 6, "I");
  rect(map, 18, 7, 5, 7, "A");
  rect(map, 25, 6, 5, 8, "I");
  rect(map, 32, 7, 5, 7, "A");
  rect(map, 39, 8, 5, 6, "I");
  rect(map, 12, 17, 7, 3, "B");
  rect(map, 24, 17, 7, 3, "H");
  rect(map, 35, 23, 7, 3, "P");

  map[19][15] = "O";
  map[19][27] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.surveillia).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildTweetsburgMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 4, 4, 48, 25, "S");
  rect(map, 8, 7, 40, 18, "E");
  hline(map, 8, 48, 16, "R");
  vline(map, 27, 5, 29, "R");
  hline(map, 12, 44, 10, "R");
  hline(map, 12, 44, 22, "R");
  rect(map, 18, 12, 19, 8, "R");

  Object.keys(WORLD_ROUTES.tweetsburg).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 10, 8, 6, 4, "U");
  rect(map, 18, 8, 6, 4, "B");
  rect(map, 31, 8, 6, 4, "H");
  rect(map, 40, 8, 6, 4, "U");
  rect(map, 12, 21, 6, 3, "B");
  rect(map, 35, 21, 7, 3, "P");
  rect(map, 24, 12, 7, 7, "I");

  map[11][13] = "O";
  map[11][21] = "O";
  map[11][34] = "O";
  map[11][43] = "O";
  map[23][15] = "O";
  map[23][36] = "O";
  map[23][37] = "O";

  Object.keys(WORLD_ROUTES.tweetsburg).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildInflatopolisMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 4, 4, 48, 25, "G");
  rect(map, 6, 21, 44, 5, "E");
  rect(map, 8, 7, 40, 13, "R");
  hline(map, 8, 48, 14, "R");
  vline(map, 27, 5, 29, "R");
  hline(map, 11, 45, 9, "R");
  hline(map, 11, 45, 19, "R");

  Object.keys(WORLD_ROUTES.inflatopolis).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 10, 8, 6, 4, "A");
  rect(map, 18, 8, 6, 4, "B");
  rect(map, 31, 8, 6, 4, "H");
  rect(map, 40, 8, 6, 4, "A");
  rect(map, 11, 16, 6, 4, "U");
  rect(map, 21, 16, 6, 4, "U");
  rect(map, 35, 23, 7, 3, "P");

  map[11][13] = "O";
  map[11][21] = "O";
  map[11][34] = "O";
  map[11][43] = "O";
  map[19][14] = "O";
  map[19][24] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.inflatopolis).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildTariffMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 3, 4, 50, 25, "G");
  rect(map, 5, 23, 46, 5, "W");
  rect(map, 8, 18, 41, 5, "S");
  rect(map, 11, 8, 35, 10, "E");
  hline(map, 11, 46, 15, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 12, 44, 10, "R");
  rect(map, 33, 22, 10, 5, "R");

  Object.keys(WORLD_ROUTES.tariff).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 12, 9, 6, 4, "U");
  rect(map, 22, 9, 6, 4, "B");
  rect(map, 32, 9, 6, 4, "H");
  rect(map, 40, 9, 5, 4, "U");
  rect(map, 35, 23, 7, 3, "P");
  rect(map, 8, 16, 5, 4, "M");

  map[12][15] = "O";
  map[12][25] = "O";
  map[12][35] = "O";
  map[12][42] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.tariff).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildRagebaitMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 4, 4, 48, 25, "G");
  rect(map, 5, 22, 46, 5, "W");
  rect(map, 7, 18, 44, 4, "S");
  rect(map, 8, 7, 41, 11, "E");
  hline(map, 8, 49, 15, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 12, 44, 10, "R");
  rect(map, 34, 22, 9, 5, "R");

  Object.keys(WORLD_ROUTES.ragebait).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 10, 8, 6, 4, "U");
  rect(map, 18, 8, 6, 4, "B");
  rect(map, 31, 8, 6, 4, "H");
  rect(map, 40, 8, 6, 4, "A");
  rect(map, 35, 23, 7, 3, "P");
  rect(map, 15, 16, 9, 2, "M");

  map[11][13] = "O";
  map[11][21] = "O";
  map[11][34] = "O";
  map[11][43] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.ragebait).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

  return map;
};

const buildFactcheckMap = () => {
  const map = makeBlankMap(56, 34, "T");
  const roadLine = (start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
    const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(start.x + (end.x - start.x) * t);
      const y = Math.round(start.y + (end.y - start.y) * t);
      rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
    }
  };

  rect(map, 4, 4, 48, 25, "S");
  rect(map, 42, 5, 7, 22, "W");
  rect(map, 8, 8, 34, 17, "E");
  hline(map, 8, 42, 17, "R");
  vline(map, 27, 5, 30, "R");
  hline(map, 11, 40, 11, "R");
  hline(map, 11, 40, 23, "R");
  rect(map, 33, 23, 9, 4, "R");

  Object.keys(WORLD_ROUTES.factcheck).forEach(direction => {
    roadLine({ x: 27, y: 18 }, PORTAL_POS[direction as RouteDirection], 2);
  });

  rect(map, 10, 9, 7, 4, "A");
  rect(map, 22, 9, 7, 4, "H");
  rect(map, 33, 9, 7, 4, "B");
  rect(map, 11, 20, 7, 4, "U");
  rect(map, 35, 23, 7, 3, "P");
  rect(map, 23, 15, 8, 5, "I");

  map[12][13] = "O";
  map[12][25] = "O";
  map[12][36] = "O";
  map[23][14] = "O";
  map[25][36] = "O";
  map[25][37] = "O";

  Object.keys(WORLD_ROUTES.factcheck).forEach(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });

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

const routeObjectsFor = (theme: TownTheme) => Object.fromEntries(
  Object.keys(WORLD_ROUTES[theme.id]).map(direction => {
    const pos = PORTAL_POS[direction as RouteDirection];
    return [`${pos.x},${pos.y}`, `ARROW_${direction}`];
  }),
);

const routeInteractionsFor = (theme: TownTheme) => Object.fromEntries(
  Object.entries(WORLD_ROUTES[theme.id]).map(([direction, target]) => {
    const pos = PORTAL_POS[direction as RouteDirection];
    const entry = findEntryFrom(target!, theme.id);
    return [`${pos.x},${pos.y}`, {
      name: `${target ? TOWN_THEMES.find(town => town.id === target)?.name : "Route"} Route`,
      portal: { mapId: target!, x: entry.x, y: entry.y, facing: entry.facing },
      auto: true,
      lines: [],
    }];
  }),
);

type TownDoorConfig = {
  shop: string;
  healing: string;
  homes: string[];
  train: string[];
  save: string;
  sign: string;
};

const defaultDoorConfig: TownDoorConfig = {
  shop: "19,14",
  healing: "28,14",
  homes: ["37,14", "21,24"],
  train: ["34,24", "35,24", "34,25", "35,25"],
  save: "27,18",
  sign: "25,18",
};

const themedRowsFor = (theme: TownTheme) => {
  if (theme.id === "satiria") return buildSatiriaMap();
  if (theme.id === "brexiton") return buildBrexitonCityMap();
  if (theme.id === "promptford") return buildPromptfordCityMap();
  if (theme.id === "wokeshire") return buildWokeshireCityMap();
  if (theme.id === "cryptonia") return buildCryptoniaCityMap();
  if (theme.id === "surveillia") return buildSurveilliaCityMap();
  if (theme.id === "tweetsburg") return buildTweetsburgCityMap();
  if (theme.id === "inflatopolis") return buildInflatopolisCityMap();
  if (theme.id === "tariff") return buildTariffCityMap();
  if (theme.id === "ragebait") return buildRagebaitCityMap();
  if (theme.id === "factcheck") return buildFactcheckCityMap();
  return buildThemedTownMap(theme);
};

const doorConfigFor = (theme: TownTheme): TownDoorConfig => {
  if (theme.id === "satiria") {
    return {
      shop: "5,21",
      healing: "16,21",
      homes: ["11,9", "23,10", "33,11", "44,12"],
      train: ["41,21"],
      save: "26,19",
      sign: "24,18",
    };
  }
  if (theme.id === "brexiton") {
    return {
      shop: "12,14",
      healing: "27,14",
      homes: ["40,14", "20,9"],
      train: ["36,24", "37,24", "36,25", "37,25"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "promptford") {
    return {
      shop: "13,17",
      healing: "27,17",
      homes: ["42,17", "22,10"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "wokeshire") {
    return {
      shop: "22,15",
      healing: "33,15",
      homes: ["12,15", "17,15", "38,15", "43,15"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "cryptonia") {
    return {
      shop: "14,21",
      healing: "27,21",
      homes: ["35,21"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "surveillia") {
    return {
      shop: "15,19",
      healing: "27,19",
      homes: ["41,13"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "tweetsburg") {
    return {
      shop: "21,11",
      healing: "34,11",
      homes: ["13,11", "43,11", "15,23"],
      train: ["36,23", "37,23", "36,24", "37,24"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "inflatopolis") {
    return {
      shop: "21,11",
      healing: "34,11",
      homes: ["13,11", "43,11", "14,19", "24,19"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "tariff") {
    return {
      shop: "25,12",
      healing: "35,12",
      homes: ["15,12", "42,12"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "ragebait") {
    return {
      shop: "21,11",
      healing: "34,11",
      homes: ["13,11", "43,11"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  if (theme.id === "factcheck") {
    return {
      shop: "13,12",
      healing: "25,12",
      homes: ["36,12", "14,23"],
      train: ["36,25", "37,25", "36,26", "37,26"],
      save: "27,18",
      sign: "25,18",
    };
  }
  return defaultDoorConfig;
};

const specialObjectsFor = (theme: TownTheme): Record<string, string> => {
  if (theme.id === "satiria") {
    return {
      "28,18": "SATIRIA_FOUNTAIN",
      "9,23": "SATIRIA_POND_SIGN",
      "28,19": "SATIRIA_STATUE",
      "24,16": "SATIRIA_BENCH",
      "32,16": "SATIRIA_BENCH",
      "24,22": "SATIRIA_BENCH",
      "32,22": "SATIRIA_BENCH",
      "26,16": "SATIRIA_LAMP",
      "31,16": "SATIRIA_LAMP",
      "26,22": "SATIRIA_LAMP",
      "31,22": "SATIRIA_LAMP",
    };
  }
  if (theme.id === "brexiton") {
    return {
      "22,17": "LONDON_CLOCK",
      "15,19": "PARLIAMENT",
      "10,18": "PHONE_BOX",
      "18,18": "BLACK_CAB",
      "32,18": "DOUBLE_DECKER",
      "42,18": "LAMP_POST",
      "27,32": "VOTE_GATE",
    };
  }
  if (theme.id === "promptford") {
    return {
      "24,13": "EIFFEL_TOWER",
      "17,18": "PARIS_CAFE",
      "31,18": "BAGUETTE_STAND",
      "43,18": "METRO_SIGN",
      "20,21": "SEINE_BRIDGE",
      "36,21": "SEINE_BRIDGE",
      "29,13": "AI_ORACLE",
    };
  }
  if (theme.id === "wokeshire") {
    return {
      "17,9": "CANAL_BRIDGE",
      "35,9": "CANAL_BRIDGE",
      "17,20": "CANAL_BRIDGE",
      "35,20": "CANAL_BRIDGE",
      "24,14": "BICYCLE",
      "29,14": "TULIP_STAND",
      "47,22": "WINDMILL",
      "11,17": "CANAL_HOUSE",
    };
  }
  if (theme.id === "cryptonia") {
    return {
      "24,10": "BURJ_TOWER",
      "31,15": "PALM_ISLAND",
      "17,16": "LUXURY_CAR",
      "38,16": "CRYPTO_BILLBOARD",
      "43,21": "YACHT",
      "33,18": "GOLD_ATM",
    };
  }
  if (theme.id === "surveillia") {
    return {
      "25,10": "PEARL_TOWER",
      "18,15": "SHANGHAI_TOWER",
      "35,15": "NEON_SIGN",
      "42,20": "CAMERA_POLE",
      "20,23": "RIVER_FERRY",
      "31,20": "DATA_KIOSK",
    };
  }
  if (theme.id === "tweetsburg") {
    return {
      "26,13": "MOSCOW_CATHEDRAL",
      "18,16": "KREMLIN_WALL",
      "35,16": "KREMLIN_WALL",
      "22,21": "SNOW_STATUE",
      "31,21": "RUMOR_KIOSK",
      "43,18": "RED_STAR",
    };
  }
  if (theme.id === "inflatopolis") {
    return {
      "27,13": "OBELISCO",
      "16,14": "TANGO_STAGE",
      "37,14": "STEAK_GRILL",
      "20,22": "PESO_SIGN",
      "32,22": "PRICE_BOARD",
      "43,20": "BALCONY_HOUSE",
    };
  }
  if (theme.id === "tariff") {
    return {
      "11,16": "CHRIST_STATUE",
      "18,18": "SUGARLOAF",
      "26,18": "BEACH_UMBRELLA",
      "32,18": "CARNIVAL_DRUMS",
      "44,21": "RIO_BOAT",
      "38,15": "CABLE_CAR",
    };
  }
  if (theme.id === "ragebait") {
    return {
      "18,16": "GOLDEN_GATE",
      "24,16": "GOLDEN_GATE",
      "32,14": "TRAM_CAR",
      "42,15": "TECH_BILLBOARD",
      "16,10": "HILL_HOUSE",
      "45,10": "FOG_HORN",
    };
  }
  if (theme.id === "factcheck") {
    return {
      "27,15": "INDIA_GATE",
      "14,17": "TUKTUK",
      "35,17": "LOTUS_DOME",
      "45,18": "FACT_FOUNTAIN",
      "20,23": "MARKET_STALL",
      "31,23": "NEWS_STAND",
    };
  }
  return {};
};

const specialInteractionsFor = (theme: TownTheme): Record<string, Interaction> => {
  if (theme.id === "satiria") {
    return {
      "28,18": {
        name: "Town Fountain",
        lines: ["The fountain marks Satiria's central square.", "The water looks suspiciously well-balanced."],
      },
      "28,19": {
        name: "Founder Statue",
        lines: ["A heroic statue, carefully positioned where everyone must walk around it."],
      },
      "9,23": {
        name: "Pond Sign",
        lines: ["Satiria Pond", "Please do not debate the lily pads."],
      },
    };
  }
  if (theme.id === "brexiton") {
    return {
      "22,17": {
        name: "Clock Tower",
        lines: ["The clock insists it is always negotiation o'clock."],
      },
      "15,19": {
        name: "Parliament Queue",
        lines: ["A queue forms, debates itself, then queues again."],
      },
    };
  }
  if (theme.id === "promptford") {
    return {
      "24,13": {
        name: "Iron Oracle Tower",
        lines: ["The tower predicts your next prompt, then asks for clearer requirements."],
      },
      "17,18": {
        name: "Automation Cafe",
        lines: ["A tiny cafe where citizens outsource menu choices to very confident oracles."],
      },
    };
  }
  if (theme.id === "wokeshire") {
    return {
      "24,14": {
        name: "Canal Bicycle",
        lines: ["It has three locks, two stickers, and one strongly held opinion."],
      },
      "29,14": {
        name: "Tulip Notice Stand",
        lines: ["Every faction has approved a different acceptable tulip color."],
      },
    };
  }
  if (theme.id === "cryptonia") {
    return {
      "24,10": {
        name: "Needle Tower",
        lines: ["The elevator accepts only coins currently going up."],
      },
      "38,16": {
        name: "Speculation Billboard",
        lines: ["It says BUY THE DIP. The dip has filed for bankruptcy."],
      },
    };
  }
  if (theme.id === "surveillia") {
    return {
      "42,20": {
        name: "Camera Pole",
        lines: ["The camera politely confirms it saw you reading this."],
      },
      "31,20": {
        name: "Data Kiosk",
        lines: ["It recommends a route based on your last seven hesitations."],
      },
    };
  }
  if (theme.id === "tweetsburg") {
    return {
      "26,13": {
        name: "Cathedral of Hot Takes",
        lines: ["Every dome repeats a different version of the same rumor."],
      },
      "31,21": {
        name: "Rumor Kiosk",
        lines: ["The headline updates before the sentence finishes loading."],
      },
    };
  }
  if (theme.id === "inflatopolis") {
    return {
      "27,13": {
        name: "Obelisco of Adjusted Prices",
        lines: ["Every plaque has a newer price sticker over the previous sticker."],
      },
      "32,22": {
        name: "Price Board",
        lines: ["The numbers climb so quickly the chalk is out of breath."],
      },
    };
  }
  if (theme.id === "tariff") {
    return {
      "11,16": {
        name: "Hilltop Statue",
        lines: ["It watches over every tariff form with impressive patience."],
      },
      "32,18": {
        name: "Carnival Customs Desk",
        lines: ["Every drumbeat adds a small processing fee."],
      },
    };
  }
  if (theme.id === "ragebait") {
    return {
      "18,16": {
        name: "Suspension Bridge",
        lines: ["A perfect backdrop for dramatic entrances and sponsored exits."],
      },
      "42,15": {
        name: "Tech Billboard",
        lines: ["It says your outrage has been successfully optimized."],
      },
    };
  }
  if (theme.id === "factcheck") {
    return {
      "27,15": {
        name: "Verified Gate",
        lines: ["Three plaques disagree about who verified it first."],
      },
      "31,23": {
        name: "News Stand",
        lines: ["Every headline comes with a footnote and a louder counter-headline."],
      },
    };
  }
  return {};
};

const createThemedTownDef = (theme: TownTheme): GameMapDef => {
  const doors = doorConfigFor(theme);
  const rows = themedRowsFor(theme);
  const homeObjects = Object.fromEntries(doors.homes.map(coord => [coord, "DOOR_HOME"]));
  const trainObjects = Object.fromEntries(doors.train.slice(0, 2).map(coord => [coord, "TRAIN"]));
  const frontOfDoor = (coord: string) => {
    const [x, y] = coord.split(",").map(Number);
    return `${x},${y + 1}`;
  };
  const shopInteraction = {
    name: `${theme.name} Shop`,
    portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
    auto: true,
    lines: [],
  } satisfies Interaction;
  const healingInteraction = {
    name: `${theme.name} Healing Center`,
    portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
    auto: true,
    lines: [],
  } satisfies Interaction;
  const homeInteractions = Object.fromEntries(doors.homes.map((coord, index) => [coord, {
    name: index === 0 ? `${theme.name} House` : "Local House",
    portal: { mapId: "house", x: 6, y: 6, facing: "up" },
    auto: true,
    lines: [],
  } satisfies Interaction]));
  const frontDoorInteractions = {
    [frontOfDoor(doors.shop)]: shopInteraction,
    [frontOfDoor(doors.healing)]: healingInteraction,
    ...Object.fromEntries(doors.homes.map((coord) => [frontOfDoor(coord), homeInteractions[coord]])),
  };
  const trainInteractions = Object.fromEntries(doors.train.map(coord => [coord, {
    name: `${theme.name} Train Station`,
    train: true,
    lines: ["Choose a destination."],
  } satisfies Interaction]));
  const frontTrainInteractions = Object.fromEntries(doors.train.map(coord => [frontOfDoor(coord), trainInteractions[coord]]));

  return {
    id: theme.id,
    name: theme.name,
    width: rows[0]?.length ?? 56,
    height: rows.length,
    rows,
    spawn: { x: 27, y: 18 },
    objects: {
      ...routeObjectsFor(theme),
      [doors.shop]: "DOOR_SHOP",
      [doors.healing]: "DOOR_HEAL",
      ...homeObjects,
      ...trainObjects,
      [doors.save]: "★",
      [doors.sign]: "SIGN",
      ...specialObjectsFor(theme),
    },
    interactions: {
      ...routeInteractionsFor(theme),
      [doors.shop]: shopInteraction,
      [doors.healing]: healingInteraction,
      ...homeInteractions,
      ...trainInteractions,
      ...frontDoorInteractions,
      ...frontTrainInteractions,
      [doors.save]: {
        name: "Save Point",
        save: true,
        lines: ["★ PROGRESS SAVED ★", `${theme.name} - Lv. 15`, theme.hook],
      },
      [doors.sign]: {
        name: "Town Sign",
        lines: [...theme.sign, `Hook: ${theme.hook}`],
      },
      ...specialInteractionsFor(theme),
    },
  };
};

const GENERATED_TOWN_MAPS = Object.fromEntries(
  TOWN_THEMES.map(theme => [theme.id, createThemedTownDef(theme)]),
) as Record<TownMapId, GameMapDef>;

export const GAME_MAPS: Record<GameMapId, GameMapDef> = {
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
