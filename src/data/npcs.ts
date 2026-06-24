import { GAME_MAPS, TOWN_THEMES, WALKABLE_TILES, type GameMapId, type TownMapId } from "./maps";

export type MovingNpc = {
  id: string;
  mapId: GameMapId;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  lines: string[];
  name: string;
  walking?: boolean;
  variant?: number;
};

const fallbackTownNpcSpots = (mapId: TownMapId, count: number) => {
  const preferred = [
    { x: 27, y: 15 },
    { x: 28, y: 15 },
    { x: 26, y: 16 },
    { x: 29, y: 16 },
    { x: 24, y: 18 },
    { x: 31, y: 18 },
    { x: 20, y: 20 },
    { x: 35, y: 20 },
    { x: 22, y: 24 },
    { x: 39, y: 24 },
  ];
  const rows = GAME_MAPS[mapId].rows;
  const spots: Array<{ x: number; y: number }> = [];
  const candidates = [
    ...preferred,
    ...rows.flatMap((row, y) => row.map((_, x) => ({ x, y }))),
  ];

  candidates.forEach(({ x, y }) => {
    const tile = rows[y]?.[x];
    const key = `${x},${y}`;
    if (spots.length >= count) return;
    if (!WALKABLE_TILES.has(tile) || tile === "O") return;
    if (spots.some((spot) => `${spot.x},${spot.y}` === key)) return;
    spots.push({ x, y });
  });

  return spots;
};

const INFLATOPOLIS_NPCS: MovingNpc[] = [
  {
    id: "inflatopolis-number-ten",
    mapId: "inflatopolis",
    x: 24,
    y: 16,
    homeX: 24,
    homeY: 16,
    name: "Rosario Number Ten",
    lines: ['"I dribble through price hikes like cones."', '"The ball is round, but the currency chart is not."'],
    variant: 5,
  },
  {
    id: "inflatopolis-balcony-icon",
    mapId: "inflatopolis",
    x: 32,
    y: 16,
    homeX: 32,
    homeY: 16,
    name: "Balcony Icon",
    lines: ['"From this plaza, every speech becomes a song."', '"Do not cry for the exchange rate. It already cried first."'],
    variant: 6,
  },
  {
    id: "inflatopolis-tango-maestro",
    mapId: "inflatopolis",
    x: 13,
    y: 20,
    homeX: 13,
    homeY: 20,
    name: "Tango Maestro",
    lines: ['"Two steps forward, one devaluation back."', '"That is not panic. That is rhythm."'],
    variant: 7,
  },
  {
    id: "inflatopolis-story-elder",
    mapId: "inflatopolis",
    x: 43,
    y: 20,
    homeX: 43,
    homeY: 20,
    name: "Story Elder",
    lines: ['"I once wrote a maze where every path led to a new price tag."', '"Naturally, readers called it realism."'],
    variant: 8,
  },
  {
    id: "inflatopolis-price-sprinter",
    mapId: "inflatopolis",
    x: 26,
    y: 27,
    homeX: 26,
    homeY: 27,
    name: "Price Sprinter",
    lines: ['"I saved up for bread. Now I can afford a receipt."', '"The shop sign updates faster than my legs."'],
    variant: 0,
  },
  {
    id: "inflatopolis-cafe-economist",
    mapId: "inflatopolis",
    x: 10,
    y: 19,
    homeX: 10,
    homeY: 19,
    name: "Cafe Economist",
    lines: ['"My espresso costs one chart and two opinions."', '"Sit down. I can explain inflation badly for hours."'],
    variant: 2,
  },
  {
    id: "inflatopolis-market-singer",
    mapId: "inflatopolis",
    x: 45,
    y: 19,
    homeX: 45,
    homeY: 19,
    name: "Market Singer",
    lines: ['"I sing the specials before they change."', '"The chorus is just everyone checking their wallets."'],
    variant: 3,
  },
  {
    id: "inflatopolis-station-broker",
    mapId: "inflatopolis",
    x: 34,
    y: 24,
    homeX: 34,
    homeY: 24,
    name: "Station Broker",
    lines: ['"Train tickets are stable. This is considered suspicious."', '"Cryptonia is east if you enjoy financial weather."'],
    variant: 4,
  },
];

export const INITIAL_NPCS: MovingNpc[] = [
  {
    id: "satiria-guide",
    mapId: "satiria",
    x: 42,
    y: 22,
    homeX: 42,
    homeY: 22,
    name: "Route Guide",
    lines: ['"The east road is open now."', '"Follow the path and keep an eye on the tall grass."'],
    variant: 0,
  },
  {
    id: "satiria-kid",
    mapId: "satiria",
    x: 12,
    y: 13,
    homeX: 12,
    homeY: 13,
    name: "Town Kid",
    lines: ['"I saw the shop clerk polish one potion for six hours."', '"That means it is probably rare."'],
    variant: 1,
  },
  {
    id: "satiria-gardener",
    mapId: "satiria",
    x: 16,
    y: 12,
    homeX: 16,
    homeY: 12,
    name: "Garden Keeper",
    lines: ['"The flowers are placed by permit now."', '"No petals on the roads. We learned."'],
    variant: 2,
  },
  {
    id: "satiria-fisher",
    mapId: "satiria",
    x: 9,
    y: 24,
    homeX: 9,
    homeY: 24,
    name: "Pond Fisher",
    lines: ['"The pond is square because the town planner loves grids."', '"The fish seem undecided."'],
    variant: 3,
  },
  {
    id: "satiria-baker",
    mapId: "satiria",
    x: 6,
    y: 23,
    homeX: 6,
    homeY: 23,
    name: "Early Baker",
    lines: ['"Fresh bread, old jokes, same oven."', '"Try not to battle near the baguettes."'],
    variant: 4,
  },
  {
    id: "satiria-runner",
    mapId: "satiria",
    x: 28,
    y: 8,
    homeX: 28,
    homeY: 8,
    name: "Town Runner",
    lines: ['"I deliver mail between houses that are eight tiles apart."', '"It is honest cardio."'],
    variant: 2,
  },
  {
    id: "satiria-bench-critic",
    mapId: "satiria",
    x: 33,
    y: 22,
    homeX: 33,
    homeY: 22,
    name: "Bench Critic",
    lines: ['"This bench has excellent sitting energy."', '"Four stars. Needs fewer speeches."'],
    variant: 3,
  },
  {
    id: "satiria-lamp-lighter",
    mapId: "satiria",
    x: 31,
    y: 13,
    homeX: 31,
    homeY: 13,
    name: "Lamp Lighter",
    lines: ['"I keep the plaza lit and the rumors dim."', '"Usually."'],
    variant: 4,
  },
  {
    id: "satiria-station-aide",
    mapId: "satiria",
    x: 41,
    y: 24,
    homeX: 41,
    homeY: 24,
    name: "Station Aide",
    lines: ['"The train doors are standardized now."', '"A tiny miracle of municipal design."'],
    variant: 1,
  },
  {
    id: "satiria-history-buff",
    mapId: "satiria",
    x: 48,
    y: 14,
    homeX: 48,
    homeY: 14,
    name: "History Buff",
    lines: ['"The old plaza monument was moved for future polishing."', '"Very historic. Very municipal."'],
    variant: 2,
  },
  {
    id: "satiria-tree-watcher",
    mapId: "satiria",
    x: 21,
    y: 28,
    homeX: 21,
    homeY: 28,
    name: "Tree Watcher",
    lines: ['"Trees belong on grass, not rooftops."', '"I am glad someone finally said it."'],
    variant: 3,
  },
  {
    id: "satiria-path-sweeper",
    mapId: "satiria",
    x: 25,
    y: 24,
    homeX: 25,
    homeY: 24,
    name: "Path Sweeper",
    lines: ['"I sweep the roads so no invisible pebbles stop heroes."', '"You are welcome, probably."'],
    variant: 4,
  },
  ...INFLATOPOLIS_NPCS,
  ...TOWN_THEMES.slice(1).flatMap((theme, townIndex) =>
    theme.id === "inflatopolis" ? [] :
    fallbackTownNpcSpots(theme.id, 3).map((spot, npcIndex) => ({
      id: `${theme.id}-local-${npcIndex + 1}`,
      mapId: theme.id,
      x: spot.x,
      y: spot.y,
      homeX: spot.x,
      homeY: spot.y,
      name: npcIndex === 0 ? theme.npcName : npcIndex === 1 ? "Station Regular" : "Local Wanderer",
      lines: npcIndex === 0
        ? theme.npcLines
        : npcIndex === 1
          ? ['"The train station is the only way out now."', '"Honestly, simpler."']
          : [`"Welcome to ${theme.name}."`, `"Every town has its own rules, but the same useful shops."`],
      variant: (townIndex + npcIndex + 2) % 5,
    })),
  ),
];
