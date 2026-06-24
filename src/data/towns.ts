import type { TownMapId } from "./maps";

export type TownTheme = {
  id: TownMapId;
  name: string;
  visual: string;
  satire: string;
  hook: string;
  accent: "water" | "sand" | "mountain" | "forest" | "port" | "city";
  motto: string;
  population: number;
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
    motto: "Every quest starts with a smaller errand.",
    population: 421,
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
    motto: "Out means out, pending clarification.",
    population: 12043,
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
    motto: "Post first, verify eventually.",
    population: 8808,
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
    motto: "Tomorrow is priced in until lunch.",
    population: 17776,
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
    motto: "Read the room, then read the footnotes.",
    population: 6402,
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
    motto: "Nothing passes without a stamp.",
    population: 15110,
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
    motto: "Trust, but bring citations.",
    population: 5309,
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
    motto: "Keep calm, but louder.",
    population: 9961,
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
    motto: "For your safety, we already know.",
    population: 22001,
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
    motto: "Ask clearly, automate carefully.",
    population: 7337,
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
    motto: "Spend now, regret at market close.",
    population: 14192,
    sign: ["★ INFLATOPOLIS ★", "Read prices quickly.", "Yesterday's bargain is today's museum exhibit."],
    npcName: "Price Sprinter",
    npcLines: ['"I saved up for bread. Now I can afford a receipt."', '"The shop sign updates faster than my legs."'],
    world: { x: 32, y: 50 },
  },
];

export const MAIN_TOWN_IDS = TOWN_THEMES.map(town => town.id);
export const TOWN_WORLD_POSITIONS = Object.fromEntries(TOWN_THEMES.map(town => [town.id, town.world])) as Record<TownMapId, { x: number; y: number }>;

export type RouteDirection = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";

export const WORLD_ROUTES: Record<TownMapId, Partial<Record<RouteDirection, TownMapId>>> = {
  satiria: { N: "inflatopolis", E: "wokeshire" },
  factcheck: { N: "wokeshire", W: "tweetsburg" },
  ragebait: { N: "tariff", S: "surveillia" },
  tweetsburg: { E: "factcheck" },
  promptford: { S: "tariff", E: "brexiton" },
  inflatopolis: { S: "satiria", E: "cryptonia" },
  cryptonia: { W: "inflatopolis" },
  wokeshire: { W: "satiria", E: "tariff", S: "factcheck" },
  tariff: { W: "wokeshire", N: "promptford", S: "ragebait" },
  surveillia: { N: "ragebait" },
  brexiton: { W: "promptford" },
};

export const ENTRY_POS: Record<RouteDirection, { x: number; y: number; facing: "up" | "down" | "left" | "right" }> = {
  N: { x: 27, y: 2, facing: "down" },
  S: { x: 27, y: 31, facing: "up" },
  W: { x: 2, y: 18, facing: "right" },
  E: { x: 53, y: 18, facing: "left" },
  NE: { x: 53, y: 7, facing: "left" },
  NW: { x: 2, y: 7, facing: "right" },
  SE: { x: 53, y: 28, facing: "left" },
  SW: { x: 2, y: 28, facing: "right" },
};

export const OPPOSITE_ROUTE_DIRECTION: Record<RouteDirection, RouteDirection> = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
  NE: "SW",
  NW: "SE",
  SE: "NW",
  SW: "NE",
};
