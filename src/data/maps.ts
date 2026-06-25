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
import { WOKESHIRE_MAP_ASSET } from "./cityMaps/wokeshireMapAsset";
import { SATIRIA_ENTRANCES, SATIRIA_OBJECT_MARKERS, coord } from "./cityMaps/satiriaLayout";
import { cityCoreOffsetFor } from "./cityMaps/sizeTiers";
import { makeBlankMap, rect } from "./cityMaps/utils";
import {
  ENTRY_POS,
  TOWN_THEMES,
  WORLD_ROUTES,
  type RouteDirection,
  type TownTheme,
} from "./towns";

export {
  ENTRY_POS,
  MAIN_TOWN_IDS,
  OPPOSITE_ROUTE_DIRECTION,
  TOWN_THEMES,
  TOWN_WORLD_POSITIONS,
  WORLD_ROUTES,
} from "./towns";
export type { RouteDirection, TownTheme } from "./towns";

// Tile key legend:
//   T = Trees/Forest   G = Grass       W = Water      R = Road/Path/Floor
//   B = Building       H = Healing Ctr Q = Quest NPC  X = Encounter Zone
//   C = Cave           D = Dungeon     S = Sand/Beach M = Mountain
//   V = Save Point     N = NPC         O = Door/Portal P = Train Station
//   J = Wooden Dock

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
  T: "#182e0a",
  G: "#265424",
  W: "#0f4466",
  R: "#5a4830",

  B: "#32325a",
  H: "#1e3880",
  Q: "#5a3e08",
  X: "#1e4020",

  C: "#2e1c08",
  D: "#08081a",
  S: "#7a6030",
  M: "#282838",

  V: "#3c2e00",
  N: "#3a2460",
  O: "#5a4830",
  P: "#5a4830",
  J: "#7b4d2a",

  A: "#b9a06d",
  I: "#927947",
  U: "#713224",
  E: "#4a4a4a",

  // Extra editor terrain
  F: "#8b6138", // Fence
  Y: "#d85a7f", // Tulips / flower field
  L: "#d85a7f", // Flowers
};

export const WALKABLE_TILES = new Set(["G", "R", "S", "X", "Q", "V", "N", "O", "L", "E", "J"]);

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

export const routeEntryForMap = (
  map: Pick<GameMapDef, "width" | "height">,
  direction: RouteDirection,
): { x: number; y: number; facing: "up" | "down" | "left" | "right" } => {
  const centerX = Math.floor(map.width / 2) - 1;
  const centerY = Math.floor(map.height / 2);
  if (direction === "N") return { x: centerX, y: 2, facing: "down" };
  if (direction === "S") return { x: centerX, y: Math.max(2, map.height - 3), facing: "up" };
  if (direction === "W") return { x: 2, y: centerY, facing: "right" };
  if (direction === "E") return { x: Math.max(2, map.width - 3), y: centerY, facing: "left" };
  return ENTRY_POS[direction];
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

const routeObjectsFor = (_theme: TownTheme): Record<string, string> => ({});

const routeInteractionsFor = (_theme: TownTheme): Record<string, Interaction> => ({});

const TOWN_THEME_BY_ID = Object.fromEntries(TOWN_THEMES.map(theme => [theme.id, theme])) as Record<TownMapId, TownTheme>;

const parseCoord = (coord: string) => {
  const [x, y] = coord.split(",").map(Number);
  return { x, y };
};

const keyFor = (x: number, y: number) => `${x},${y}`;

const MAP_BUILDING_TILES = new Set(["A", "B", "H", "P", "U", "O"]);

const townSignLines = (theme: TownTheme) => [
  `★ ${theme.name.toUpperCase()} ★`,
  `Motto: "${theme.motto}"`,
  `Population: ${theme.population.toLocaleString()}`,
  theme.satire,
];

const routeSignBase = (direction: RouteDirection, rows: string[][]) => {
  const height = rows.length;
  const width = rows[0]?.length ?? 56;
  const centerX = Math.floor(width / 2) - 1;
  const centerY = Math.floor(height / 2);
  if (direction === "N") return { x: centerX + 2, y: 4 };
  if (direction === "S") return { x: centerX + 2, y: Math.max(0, height - 5) };
  if (direction === "W") return { x: 4, y: centerY - 2 };
  if (direction === "E") return { x: Math.max(0, width - 5), y: centerY - 2 };
  return { x: centerX, y: centerY };
};

const nearestSignCoord = (rows: string[][], preferred: { x: number; y: number }, reserved: Set<string>) => {
  const height = rows.length;
  const width = rows[0]?.length ?? 0;
  const offsets = Array.from({ length: 15 }, (_, radius) => radius).flatMap((radius) => {
    if (radius === 0) return [[0, 0]];
    const ring: number[][] = [];
    for (let dx = -radius; dx <= radius; dx++) {
      ring.push([dx, -radius], [dx, radius]);
    }
    for (let dy = -radius + 1; dy <= radius - 1; dy++) {
      ring.push([-radius, dy], [radius, dy]);
    }
    return ring;
  });
  const fallback = keyFor(Math.max(0, Math.min(width - 1, preferred.x)), Math.max(0, Math.min(height - 1, preferred.y)));

  for (const [dx, dy] of offsets) {
    const x = preferred.x + dx;
    const y = preferred.y + dy;
    const key = keyFor(x, y);
    const tile = rows[y]?.[x];
    if (x < 0 || y < 0 || x >= width || y >= height || reserved.has(key)) continue;
    if (!tile || MAP_BUILDING_TILES.has(tile) || tile === "W" || tile === "T" || tile === "Y") continue;
    if (!WALKABLE_TILES.has(tile)) continue;
    reserved.add(key);
    return key;
  }

  reserved.add(fallback);
  return fallback;
};

const buildingSignName = (theme: TownTheme, kind: "shop" | "healing" | "home" | "train", index = 0) => {
  if (kind === "shop") return `${theme.name} Shop`;
  if (kind === "healing") return `${theme.name} Healing Center`;
  if (kind === "train") return `${theme.name} Train Station`;
  return index === 0 ? `${theme.name} House` : `Local House ${index + 1}`;
};

const buildingSignLines = (name: string, kind: "shop" | "healing" | "home" | "train") => {
  if (kind === "shop") return [name, "Supplies, snacks, and economic optimism sold here."];
  if (kind === "healing") return [name, "Rest, recover, and pretend the last battle was research."];
  if (kind === "train") return [name, "Town-to-town travel boards here."];
  return [name, "Private residence. Knock with plot relevance."];
};

const buildSignageFor = (
  theme: TownTheme,
  rows: string[][],
  doors: TownDoorConfig,
  reserved: Set<string>,
) => {
  const objects: Record<string, string> = {};
  const interactions: Record<string, Interaction> = {};
  const addSign = (preferred: { x: number; y: number }, name: string, lines: string[]) => {
    const coord = nearestSignCoord(rows, preferred, reserved);
    objects[coord] = "SIGN";
    interactions[coord] = { name, lines };
  };

  const center = { x: Math.floor((rows[0]?.length ?? 56) / 2) - 1, y: Math.floor(rows.length / 2) };
  addSign({ x: center.x - 4, y: center.y - 7 }, `${theme.name} Town Sign`, townSignLines(theme));

  Object.entries(WORLD_ROUTES[theme.id]).forEach(([direction, target]) => {
    if (!target) return;
    const targetTheme = TOWN_THEME_BY_ID[target];
    addSign(routeSignBase(direction as RouteDirection, rows), `Route Sign: ${targetTheme.name}`, [
      `To ${targetTheme.name}`,
      `Motto: "${targetTheme.motto}"`,
      `Population: ${targetTheme.population.toLocaleString()}`,
    ]);
  });

  const doorSpecs = [
    { coord: doors.shop, kind: "shop" as const, index: 0 },
    { coord: doors.healing, kind: "healing" as const, index: 0 },
    ...doors.homes.map((coord, index) => ({ coord, kind: "home" as const, index })),
    ...doors.train.map((coord, index) => ({ coord, kind: "train" as const, index })),
  ];

  doorSpecs.forEach(({ coord, kind, index }) => {
    const door = parseCoord(coord);
    const name = buildingSignName(theme, kind, index);
    const side = index % 2 === 0 ? -1 : 1;
    addSign({ x: door.x + side, y: door.y + 1 }, `${name} Sign`, buildingSignLines(name, kind));
  });

  return { objects, interactions };
};

const offsetCoord = (coord: string, offset: { x: number; y: number }) => {
  const { x, y } = parseCoord(coord);
  return keyFor(x + offset.x, y + offset.y);
};

const offsetRecord = <T,>(record: Record<string, T>, offset: { x: number; y: number }) =>
  Object.fromEntries(Object.entries(record).map(([coord, value]) => [offsetCoord(coord, offset), value])) as Record<string, T>;

const centralSpawnFor = (rows: string[][]) => {
  const center = {
    x: Math.floor((rows[0]?.length ?? 56) / 2) - 1,
    y: Math.floor(rows.length / 2),
  };
  const offsets = [
    [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1],
    [2, 0], [-2, 0], [1, 1], [-1, 1], [1, -1], [-1, -1],
  ];
  for (const [dx, dy] of offsets) {
    const x = center.x + dx;
    const y = center.y + dy;
    const tile = rows[y]?.[x];
    if (tile && WALKABLE_TILES.has(tile) && tile !== "O") return { x, y };
  }
  return center;
};

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

const TOWN_ROW_BUILDERS: Record<TownMapId, () => string[][]> = {
  satiria: buildSatiriaMap,
  brexiton: buildBrexitonCityMap,
  promptford: buildPromptfordCityMap,
  wokeshire: buildWokeshireCityMap,
  cryptonia: buildCryptoniaCityMap,
  surveillia: buildSurveilliaCityMap,
  tweetsburg: buildTweetsburgCityMap,
  inflatopolis: buildInflatopolisCityMap,
  tariff: buildTariffCityMap,
  ragebait: buildRagebaitCityMap,
  factcheck: buildFactcheckCityMap,
};

const EDITOR_NATIVE_TOWN_ASSETS = {
  wokeshire: WOKESHIRE_MAP_ASSET,
} as const satisfies Partial<Record<TownMapId, { objects?: Record<string, string>; interactions?: Record<string, Interaction>; spawn?: { x: number; y: number } }>>;

const editorNativeAssetFor = (townId: TownMapId) => EDITOR_NATIVE_TOWN_ASSETS[townId as keyof typeof EDITOR_NATIVE_TOWN_ASSETS];

const themedRowsFor = (theme: TownTheme) => TOWN_ROW_BUILDERS[theme.id]();

const doorConfigFor = (theme: TownTheme): TownDoorConfig => {
  if (theme.id === "satiria") {
    const byType = (type: "shop" | "healing" | "house" | "train") =>
      SATIRIA_ENTRANCES.filter(entrance => entrance.type === type).map(entrance => coord(entrance.door));
    return {
      shop: byType("shop")[0],
      healing: byType("healing")[0],
      homes: byType("house"),
      train: byType("train"),
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
      shop: "23,14",
      healing: "32,14",
      homes: ["10,14", "19,14", "36,14", "45,14"],
      train: ["36,25", "37,25"],
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
    return SATIRIA_OBJECT_MARKERS;
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
      "14,14": "CANAL_BRIDGE",
      "40,14": "CANAL_BRIDGE",
      "27,8": "CANAL_BRIDGE",
      "27,20": "CANAL_BRIDGE",

      "24,13": "BICYCLE",
      "25,13": "BICYCLE",
      "26,13": "BICYCLE",

      "10,24": "TULIP_STAND",
      "13,24": "TULIP_STAND",
      "16,24": "TULIP_STAND",

      "47,22": "WINDMILL",
      "11,11": "CANAL_HOUSE",
      "44,11": "CANAL_HOUSE",
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

const doorConfigFromRows = (theme: TownTheme, rows: string[][]): TownDoorConfig => {
  const fallback = doorConfigFor(theme);
  if (theme.id === "satiria") return fallback;

  const byType: Record<string, string[]> = { A: [], B: [], H: [], P: [], U: [] };
  rows.forEach((row, y) => row.forEach((tile, x) => {
    if (tile !== "O") return;
    const buildingTile = rows[y - 1]?.[x] ?? rows[y]?.[x - 1] ?? rows[y]?.[x + 1];
    if (buildingTile && byType[buildingTile]) byType[buildingTile].push(`${x},${y}`);
  }));

  const shop = byType.A[0] ?? fallback.shop;
  const healing = byType.H[0] ?? fallback.healing;
  const used = new Set([shop, healing, ...byType.P]);
  return {
    ...fallback,
    shop,
    healing,
    homes: [...byType.B, ...byType.U, ...byType.A.slice(1), ...byType.H.slice(1)].filter(coord => !used.has(coord)),
    train: byType.P.length > 0 ? byType.P : fallback.train,
  };
};

const createThemedTownDef = (theme: TownTheme): GameMapDef => {
  const nativeAsset = editorNativeAssetFor(theme.id);
  const rows = themedRowsFor(theme);
  const doors = doorConfigFromRows(theme, rows);
  const homeObjects: Record<string, string> = Object.fromEntries(doors.homes.map(coord => [coord, "DOOR_HOME"]));
  const trainObjects: Record<string, string> = Object.fromEntries(doors.train.slice(0, 2).map(coord => [coord, "TRAIN"]));
  const coreOffset = theme.id === "satiria" ? { x: 0, y: 0 } : cityCoreOffsetFor(theme.id);
  const specialObjects =
    theme.id === "wokeshire"
      ? specialObjectsFor(theme)
      : offsetRecord(specialObjectsFor(theme), coreOffset);
  const specialInteractions =
    theme.id === "wokeshire"
      ? specialInteractionsFor(theme)
      : offsetRecord(specialInteractionsFor(theme), coreOffset);
  const assetObjects = nativeAsset?.objects ?? {};
  const assetInteractions = nativeAsset?.interactions ?? {};
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
  const homeInteractions: Record<string, Interaction> = Object.fromEntries(doors.homes.map((coord, index) => [coord, {
    name: index === 0 ? `${theme.name} House` : "Local House",
    portal: { mapId: "house", x: 6, y: 6, facing: "up" },
    auto: true,
    lines: [],
  } satisfies Interaction]));
  const trainInteractions: Record<string, Interaction> = Object.fromEntries(doors.train.map(coord => [coord, {
    name: `${theme.name} Train Station`,
    train: true,
    lines: ["Choose a destination."],
  } satisfies Interaction]));
  const showGenericSave = theme.id !== "satiria";
  const entryDoorCoords = new Set([doors.shop, doors.healing, ...doors.homes, ...doors.train]);
  const genericObjects: Record<string, string> = {};
  const genericInteractions: Record<string, Interaction> = {};
  if (showGenericSave && !entryDoorCoords.has(doors.save)) {
    genericObjects[doors.save] = "★";
    genericInteractions[doors.save] = {
      name: "Save Point",
      save: true,
      lines: ["★ PROGRESS SAVED ★", `${theme.name} - Lv. 15`, theme.hook],
    };
  }
  const isEditorNativeTown = Boolean(nativeAsset);

  const signReserved = new Set([
    ...entryDoorCoords,
    ...Object.keys(genericObjects),
    ...Object.keys(specialObjects),
    ...Object.keys(specialInteractions),
  ]);
  const signage = isEditorNativeTown
    ? { objects: {}, interactions: {} }
    : buildSignageFor(theme, rows, doors, signReserved);

  const generatedObjects = isEditorNativeTown
    ? {}
    : {
        ...routeObjectsFor(theme),
        [doors.shop]: "DOOR_SHOP",
        [doors.healing]: "DOOR_HEAL",
        ...homeObjects,
        ...trainObjects,
        ...genericObjects,
        ...signage.objects,
        ...specialObjects,
      };

  const generatedInteractions = {
    ...routeInteractionsFor(theme),
    [doors.shop]: shopInteraction,
    [doors.healing]: healingInteraction,
    ...homeInteractions,
    ...trainInteractions,
    ...genericInteractions,
    ...signage.interactions,
    ...(isEditorNativeTown ? {} : specialInteractions),
  };

  return {
    id: theme.id,
    name: theme.name,
    width: rows[0]?.length ?? 56,
    height: rows.length,
    rows,
    spawn: nativeAsset?.spawn ?? centralSpawnFor(rows),
    objects: {
      ...generatedObjects,
      ...assetObjects,
    },
    interactions: {
      ...generatedInteractions,
      ...assetInteractions,
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
