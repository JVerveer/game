// ─── Map data ─────────────────────────────────────────────────────────────────
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
};

export const WALKABLE_TILES = new Set(["G", "R", "S", "X", "Q", "V", "N", "O", "L", "E"]);

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
  if (theme.id === "brexiton") return buildBrexitonMap();
  if (theme.id === "promptford") return buildPromptfordMap();
  if (theme.id === "wokeshire") return buildWokeshireMap();
  return buildThemedTownMap(theme);
};

const doorConfigFor = (theme: TownTheme): TownDoorConfig => {
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
  return defaultDoorConfig;
};

const specialObjectsFor = (theme: TownTheme): Record<string, string> => {
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
  return {};
};

const specialInteractionsFor = (theme: TownTheme): Record<string, Interaction> => {
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
  return {};
};

const createThemedTownDef = (theme: TownTheme): GameMapDef => {
  const doors = doorConfigFor(theme);
  const homeObjects = Object.fromEntries(doors.homes.map(coord => [coord, "DOOR_HOME"]));
  const trainObjects = Object.fromEntries(doors.train.slice(0, 2).map(coord => [coord, "TRAIN"]));
  const trainInteractions = Object.fromEntries(doors.train.map(coord => [coord, {
    name: `${theme.name} Train Station`,
    train: true,
    lines: ["Choose a destination."],
  } satisfies Interaction]));

  return {
    id: theme.id,
    name: theme.name,
    width: 56,
    height: 34,
    rows: themedRowsFor(theme),
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
      [doors.shop]: {
        name: `${theme.name} Shop`,
        portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
        auto: true,
        lines: [],
      },
      [doors.healing]: {
        name: `${theme.name} Healing Center`,
        portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
        auto: true,
        lines: [],
      },
      ...Object.fromEntries(doors.homes.map((coord, index) => [coord, {
        name: index === 0 ? `${theme.name} House` : "Local House",
        portal: { mapId: "house", x: 6, y: 6, facing: "up" },
        auto: true,
        lines: [],
      } satisfies Interaction])),
      ...trainInteractions,
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
