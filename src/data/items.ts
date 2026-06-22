// ─── Item & shop data ─────────────────────────────────────────────────────────

export interface Item {
  name: string;
  type: string;
  icon: string;
  desc: string;
  qty: number;
  val: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Quest" | "Key";
}

export interface ShopItem {
  name: string;
  icon: string;
  buy: number;
  sell: number;
  desc: string;
}

export const INV_TABS = [
  "All",
  "Consumables",
  "Equipment",
  "Quest Items",
  "Keys",
  "Collectibles",
  "Crafting Materials",
  "Special Items",
] as const;

export const RARITY_COLORS: Record<string, string> = {
  Common: "#6b6b8e",
  Rare: "#4a9eff",
  Epic: "#c87aff",
  Legendary: "#f5c518",
  Quest: "#5de85d",
  Key: "#ff7a30",
};

export const ITEMS: Item[] = [
  {
    name: "Energy Drink",
    type: "Consumables",
    icon: "⚗️",
    desc: "Restores 50 HP. Causes mild existential crisis. Side effects may vary.",
    qty: 12,
    val: 45,
    rarity: "Common",
  },
  {
    name: "Motivation Pill",
    type: "Consumables",
    icon: "💊",
    desc: "Cures Exhausted status. May cause overconfidence and unsolicited advice.",
    qty: 3,
    val: 120,
    rarity: "Common",
  },
  {
    name: "Focus Crystal",
    type: "Consumables",
    icon: "💎",
    desc: "Boosts INT by 20 for 3 turns. Smells faintly of productivity.",
    qty: 1,
    val: 300,
    rarity: "Rare",
  },
  {
    name: "Anti-Anxiety Tea",
    type: "Consumables",
    icon: "🍵",
    desc: "Cures Triggered and Stressed status effects. Brewed in the breakroom.",
    qty: 2,
    val: 85,
    rarity: "Common",
  },
  {
    name: "Super Antidote",
    type: "Consumables",
    icon: "🧪",
    desc: "Cures all status effects at once. Tastes like regret and citrus.",
    qty: 1,
    val: 400,
    rarity: "Rare",
  },
  {
    name: "Lost Memo",
    type: "Quest Items",
    icon: "📄",
    desc: "A crumpled meeting note from 2019. Someone will want this.",
    qty: 1,
    val: 0,
    rarity: "Quest",
  },
  {
    name: "USB of Mystery",
    type: "Quest Items",
    icon: "💾",
    desc: "Unmarked. Probably important. Definitely cursed.",
    qty: 1,
    val: 0,
    rarity: "Quest",
  },
  {
    name: "Server Key",
    type: "Keys",
    icon: "🗝️",
    desc: "Opens Server Room B. Found in the janitor's secret desk drawer.",
    qty: 1,
    val: 0,
    rarity: "Key",
  },
  {
    name: "Dungeon Pass",
    type: "Keys",
    icon: "🎫",
    desc: "Grants entry to the Corporate Dungeon. Not transferable.",
    qty: 1,
    val: 0,
    rarity: "Key",
  },
  {
    name: "Pixel Shield",
    type: "Equipment",
    icon: "🛡️",
    desc: "DEF +22. Blocky but surprisingly effective against buzzwords.",
    qty: 1,
    val: 500,
    rarity: "Rare",
  },
  {
    name: "Retro Sword",
    type: "Equipment",
    icon: "⚔️",
    desc: "ATK +35. Forged in the era of 8-bit glory and reasonable rent.",
    qty: 1,
    val: 800,
    rarity: "Epic",
  },
  {
    name: "Irony Helmet",
    type: "Equipment",
    icon: "⛑️",
    desc: "DEF +15, Influence +8. Protects against Hot Takes.",
    qty: 1,
    val: 450,
    rarity: "Rare",
  },
  {
    name: "Badge of Irony",
    type: "Collectibles",
    icon: "🏅",
    desc: "Proof you endured the tutorial without crying. Probably.",
    qty: 1,
    val: 9999,
    rarity: "Legendary",
  },
  {
    name: "Glitched Coin",
    type: "Collectibles",
    icon: "🪙",
    desc: "Worth exactly ??? gold. The economy is a social construct anyway.",
    qty: 3,
    val: 999,
    rarity: "Rare",
  },
  {
    name: "Circuit Scrap",
    type: "Crafting Materials",
    icon: "🔩",
    desc: "Salvaged hardware. Smells like ambition and burnt plastic.",
    qty: 8,
    val: 30,
    rarity: "Common",
  },
  {
    name: "Concentrated Cringe",
    type: "Crafting Materials",
    icon: "💧",
    desc: "Distilled from 1000 bad LinkedIn posts. Handle with care.",
    qty: 4,
    val: 60,
    rarity: "Common",
  },
  {
    name: "Rare Error Log",
    type: "Special Items",
    icon: "📊",
    desc: "Corrupted data from a crashed production server. Priceless to the right buyer.",
    qty: 1,
    val: 2000,
    rarity: "Legendary",
  },
  {
    name: "Developer's Tears",
    type: "Special Items",
    icon: "😭",
    desc: "Bottled on-call anguish. Has mysterious properties.",
    qty: 1,
    val: 1500,
    rarity: "Epic",
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  { name: "Energy Drink",     icon: "⚗️", buy: 60,   sell: 30,  desc: "Restores 50 HP" },
  { name: "Motivation Pill",  icon: "💊", buy: 160,  sell: 80,  desc: "Cures Exhausted" },
  { name: "Anti-Anxiety Tea", icon: "🍵", buy: 110,  sell: 55,  desc: "Cures status effects" },
  { name: "Focus Crystal",    icon: "💎", buy: 400,  sell: 200, desc: "+INT for 3 turns" },
  { name: "Super Antidote",   icon: "🧪", buy: 520,  sell: 260, desc: "Cures all status effects" },
  { name: "Irony Helmet",     icon: "⛑️", buy: 580,  sell: 290, desc: "DEF +15, Influence +8" },
  { name: "Pixel Shield",     icon: "🛡️", buy: 650,  sell: 325, desc: "DEF +22" },
  { name: "Circuit Scrap",    icon: "🔩", buy: 40,   sell: 20,  desc: "Crafting material" },
  { name: "Retro Sword",      icon: "⚔️", buy: 1100, sell: 550, desc: "ATK +35" },
  { name: "Glitched Coin",    icon: "🪙", buy: 777,  sell: 388, desc: "Mysterious value" },
];
