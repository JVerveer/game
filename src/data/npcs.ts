import { GAME_MAPS, TOWN_THEMES, WALKABLE_TILES, type GameMapId, type TownMapId } from "./maps";
import { cityNpcCountFor } from "./cityMaps/sizeTiers";
import { WOKESHIRE_MAP_ASSET } from "./cityMaps/wokeshireMapAsset";
import type { EditorNpcAsset } from "./cityMaps/mapAsset";

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
  style?: string;
  sheetAssetId?: string;
};


const movingNpcFromAsset = (mapId: TownMapId, npc: EditorNpcAsset): MovingNpc => ({
  id: npc.id,
  mapId,
  x: npc.x,
  y: npc.y,
  homeX: npc.homeX ?? npc.x,
  homeY: npc.homeY ?? npc.y,
  name: npc.name,
  lines: npc.lines,
  variant: npc.variant,
  style: npc.style,
  walking: npc.walking,
  sheetAssetId: npc.sheetAssetId,
});

const EDITOR_NATIVE_NPCS: Partial<Record<TownMapId, MovingNpc[]>> = {
  wokeshire: (WOKESHIRE_MAP_ASSET.npcs ?? []).map((npc) => movingNpcFromAsset("wokeshire", npc)),
};

const isEditorNativeNpcTown = (mapId: TownMapId) => Boolean(EDITOR_NATIVE_NPCS[mapId]);

const fallbackTownNpcSpots = (mapId: TownMapId, count: number) => {
  const map = GAME_MAPS[mapId];
  const center = { x: Math.floor(map.width / 2) - 1, y: Math.floor(map.height / 2) };
  const preferred = [
    { x: center.x - 12, y: center.y - 8 },
    { x: center.x + 12, y: center.y - 8 },
    { x: center.x - 13, y: center.y + 8 },
    { x: center.x + 13, y: center.y + 8 },
    { x: center.x - 20, y: center.y },
    { x: center.x + 20, y: center.y },
    { x: center.x, y: center.y - 13 },
    { x: center.x, y: center.y + 13 },
    { x: 10, y: 10 },
    { x: map.width - 12, y: 10 },
    { x: 11, y: map.height - 12 },
    { x: map.width - 13, y: map.height - 12 },
    { x: 24, y: 14 },
    { x: map.width - 25, y: 14 },
    { x: 24, y: map.height - 16 },
    { x: map.width - 25, y: map.height - 16 },
  ];
  const rows = map.rows;
  const spots: Array<{ x: number; y: number }> = [];
  const candidates = [
    ...preferred,
    ...rows.flatMap((row, y) => row.map((_, x) => ({ x, y }))),
  ];

  candidates.forEach(({ x, y }) => {
    const tile = rows[y]?.[x];
    const key = `${x},${y}`;
    if (spots.length >= count) return;
    if (Math.abs(x - center.x) <= 8 && Math.abs(y - center.y) <= 5) return;
    if (!WALKABLE_TILES.has(tile) || tile === "O") return;
    if (spots.some((spot) => `${spot.x},${spot.y}` === key)) return;
    spots.push({ x, y });
  });

  return spots;
};

const townStyleFor = (mapId: TownMapId, index: number) => {
  const roles = ["older-man", "older-woman", "young-man", "young-woman"];
  const specialRoles: Partial<Record<TownMapId, string[]>> = {
    cryptonia: ["older-man", "older-woman", "young-man", "young-woman", "crypto-bro", "crypto-sister"],
    surveillia: ["older-man", "older-woman", "young-man", "young-woman", "robot"],
  };
  const roleList = specialRoles[mapId] ?? roles;
  const role = roleList[index % roleList.length];
  return `npc-town-${mapId} npc-role-${role}`;
};

const townNpcProfile = (mapId: TownMapId, index: number, fallbackName: string, fallbackLines: string[]) => {
  const profiles: Partial<Record<TownMapId, Array<{ name: string; lines: string[]; variant: number }>>> = {
    brexiton: [
      { name: "Queue Minister", lines: ['"The bridge vote passed, then immediately entered review."', '"Please form an orderly line for disorder."'], variant: 1 },
      { name: "Cab Driver", lines: ['"I can take you anywhere, assuming the street has not resigned."', '"Mind the fare gap."'], variant: 4 },
      { name: "Tea Debater", lines: ['"The town motto was amended twice before breakfast."', '"Milk first is technically a policy platform."'], variant: 6 },
    ],
    promptford: [
      { name: "Oracle Intern", lines: ['"The oracle suggests a bridge east, confidence 0.61."', '"It also suggests renaming the bridge Bridge v2."'], variant: 2 },
      { name: "Prompt Baker", lines: ['"I asked for bread and received a product roadmap."', '"Still crusty, somehow."'], variant: 7 },
      { name: "Canal Founder", lines: ['"Our startup automates indecision."', '"The demo mostly works near water."'], variant: 5 },
    ],
    ragebait: [
      { name: "Reaction Producer", lines: ['"Can you enter that shop more dramatically?"', '"The south road performs well with a gasp."'], variant: 3 },
      { name: "Headline Surfer", lines: ['"Small wave? Huge controversy."', '"I brought three thumbnails."'], variant: 5 },
      { name: "Studio Runner", lines: ['"The bay rewards commitment to the bit."', '"Subtlety is still loading."'], variant: 1 },
    ],
    tariff: [
      { name: "Dock Broker", lines: ['"Your shoes may count as imports."', '"Let me check the surprise-fee table."'], variant: 4 },
      { name: "Customs Drummer", lines: ['"Every beat needs a stamp."', '"The east water is tariff-exempt for now."'], variant: 7 },
      { name: "Port Clerk", lines: ['"North to Promptford, south to Ragebait, west after paperwork."', '"I adore a clean form."'], variant: 2 },
    ],
    wokeshire: [
      { name: "Consensus Ranger", lines: ['"This path is approved by one canal and challenged by two bicycles."', '"Please use compassionate walking."'], variant: 6 },
      { name: "Tulip Mediator", lines: ['"The flowers reached a temporary coalition."', '"The canals remain neutral."'], variant: 1 },
      { name: "Canal Cyclist", lines: ['"I can ring my bell in seven acceptable tones."', '"Eight is discourse."'], variant: 3 },
    ],
    cryptonia: [
      { name: "Token Baron", lines: ['"My skyline is up. My wallet is down."', '"Both are technically vertical."'], variant: 5 },
      { name: "Yacht Analyst", lines: ['"The marina is real. The yield is vibes."', '"Do not stand too close to the crash."'], variant: 2 },
      { name: "Gold ATM Clerk", lines: ['"Withdraw confidence. Deposit consequences."', '"Fees fluctuate with moonlight."'], variant: 8 },
    ],
    surveillia: [
      { name: "Camera Guard", lines: ['"You are currently standing exactly there."', '"I admire your commitment to observable movement."'], variant: 4 },
      { name: "Data Kiosk Minder", lines: ['"The kiosk predicted this conversation."', '"It rated your hesitation: tasteful."'], variant: 7 },
      { name: "Neon Patrol", lines: ['"The north road sees everything."', '"Mostly because it is a road."'], variant: 1 },
    ],
    tweetsburg: [
      { name: "Trend Watcher", lines: ['"The east route is trending with mixed sentiment."', '"Do not read the replies without armor."'], variant: 3 },
      { name: "Rumor Kiosk Fan", lines: ['"I heard Factcheck moved west. Then I verified it by walking."', '"Exhausting but effective."'], variant: 6 },
      { name: "Red Square Poster", lines: ['"Every announcement echoes through the plaza."', '"Some echoes have opinions."'], variant: 8 },
    ],
    factcheck: [
      { name: "Citation Clerk", lines: ['"The north route is verified, provisionally."', '"The west route has three sources and one typo."'], variant: 2 },
      { name: "Footnote Vendor", lines: ['"Every snack includes context."', '"The context costs extra."'], variant: 7 },
      { name: "Narrative Auditor", lines: ['"I checked the center square. It is refreshingly empty."', '"Suspiciously empty, perhaps."'], variant: 4 },
    ],
  };
  const list = profiles[mapId] ?? [];
  const profile = list[index % Math.max(1, list.length)];
  if (!profile) {
    return { name: fallbackName, lines: fallbackLines, variant: index % 5, style: townStyleFor(mapId, index) };
  }
  return {
    name: index === 0 ? fallbackName : profile.name,
    lines: index === 0 ? fallbackLines : profile.lines,
    variant: profile.variant,
    style: townStyleFor(mapId, index),
  };
};

const INFLATOPOLIS_NPCS: MovingNpc[] = [
  {
    id: "inflatopolis-number-ten",
    mapId: "inflatopolis",
    x: 14,
    y: 20,
    homeX: 14,
    homeY: 20,
    name: "Rosario Number Ten",
    lines: ['"I dribble through price hikes like cones."', '"The ball is round, but the currency chart is not."'],
    variant: 5,
    style: "npc-town-inflatopolis npc-role-young-man",
  },
  {
    id: "inflatopolis-balcony-icon",
    mapId: "inflatopolis",
    x: 42,
    y: 20,
    homeX: 42,
    homeY: 20,
    name: "Balcony Icon",
    lines: ['"From this plaza, every speech becomes a song."', '"Do not cry for the exchange rate. It already cried first."'],
    variant: 6,
    style: "npc-town-inflatopolis npc-role-young-woman",
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
    style: "npc-town-inflatopolis npc-role-older-man",
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
    style: "npc-town-inflatopolis npc-role-older-woman",
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
    style: "npc-town-inflatopolis npc-role-young-man",
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
    style: "npc-town-inflatopolis npc-role-older-man",
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
    style: "npc-town-inflatopolis npc-role-young-woman",
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
    style: "npc-town-inflatopolis npc-role-older-woman",
  },
];

const INITIAL_NPCS_WITH_SATIRIA: MovingNpc[] = [
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
    style: "npc-town-satiria npc-role-young-man",
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
    style: "npc-town-satiria npc-role-young-woman",
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
    style: "npc-town-satiria npc-role-older-woman",
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
    style: "npc-town-satiria npc-role-older-man",
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
    style: "npc-town-satiria npc-role-older-woman",
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
    style: "npc-town-satiria npc-role-young-man",
  },
  {
    id: "satiria-bench-critic",
    mapId: "satiria",
    x: 39,
    y: 22,
    homeX: 39,
    homeY: 22,
    name: "Bench Critic",
    lines: ['"This bench has excellent sitting energy."', '"Four stars. Needs fewer speeches."'],
    variant: 3,
    style: "npc-town-satiria npc-role-older-man",
  },
  {
    id: "satiria-lamp-lighter",
    mapId: "satiria",
    x: 38,
    y: 13,
    homeX: 38,
    homeY: 13,
    name: "Lamp Lighter",
    lines: ['"I keep the plaza lit and the rumors dim."', '"Usually."'],
    variant: 4,
    style: "npc-town-satiria npc-role-young-woman",
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
    style: "npc-town-satiria npc-role-young-woman",
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
    style: "npc-town-satiria npc-role-older-man",
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
    style: "npc-town-satiria npc-role-older-woman",
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
    style: "npc-town-satiria npc-role-young-man",
  },
  ...INFLATOPOLIS_NPCS,
  ...(EDITOR_NATIVE_NPCS.wokeshire ?? []),
  ...TOWN_THEMES.slice(1).flatMap((theme, townIndex) =>
    theme.id === "inflatopolis" || isEditorNativeNpcTown(theme.id) ? [] :
    fallbackTownNpcSpots(theme.id, cityNpcCountFor(theme.id)).map((spot, npcIndex) => {
      const profile = townNpcProfile(
        theme.id,
        npcIndex,
        npcIndex === 0 ? theme.npcName : npcIndex === 1 ? "Station Regular" : "Local Wanderer",
        npcIndex === 0
          ? theme.npcLines
          : npcIndex === 1
            ? ['"The train station is still the quickest way across the whole region."', '"Walking routes are better for gossip."']
            : [`"Welcome to ${theme.name}."`, `"The town got bigger, so the errands did too."`],
      );
      return {
        id: `${theme.id}-local-${npcIndex + 1}`,
        mapId: theme.id,
        x: spot.x,
        y: spot.y,
        homeX: spot.x,
        homeY: spot.y,
        name: profile.name,
        lines: profile.lines,
        variant: profile.variant ?? (townIndex + npcIndex + 2) % 5,
        style: profile.style ?? townStyleFor(theme.id, npcIndex),
      };
    }),
  ),
];

export const INITIAL_NPCS: MovingNpc[] = INITIAL_NPCS_WITH_SATIRIA.filter(npc => npc.mapId !== "satiria");
