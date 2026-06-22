// ─── Hero / player data ───────────────────────────────────────────────────────

export interface HeroStat {
  label: string;
  val: number;
  max: number;
  icon: string;
}

export interface ReputationCategory {
  label: string;
  val: number;
  color: string;
}

export interface Ally {
  name: string;
  type: string;
  lv: number;
  icon: string;
  rare: "Common" | "Rare" | "Epic" | "Legendary";
  hp: [number, number]; // [current, max]
  bio?: string;
}

export interface HeroProfile {
  name: string;
  title: string;
  emoji: string;
  level: number;
  hp: { cur: number; max: number };
  xp: { cur: number; max: number };
  energy: { cur: number; max: number };
  gold: number;
  playTime: string;
  achievements: { unlocked: number; total: number };
}

// ── Starting hero state ───────────────────────────────────────────────────────
export const INITIAL_HERO: HeroProfile = {
  name: "Protagonist",
  title: "The Chosen Ironic One",
  emoji: "🧙",
  level: 15,
  hp: { cur: 82, max: 100 },
  xp: { cur: 340, max: 500 },
  energy: { cur: 73, max: 90 },
  gold: 1240,
  playTime: "14:22:08",
  achievements: { unlocked: 23, total: 120 },
};

// ── Core stats ────────────────────────────────────────────────────────────────
export const HERO_STATS: HeroStat[] = [
  { label: "Attack",       val: 74, max: 100, icon: "⚔" },
  { label: "Defense",      val: 52, max: 100, icon: "🛡" },
  { label: "Speed",        val: 88, max: 100, icon: "💨" },
  { label: "Influence",    val: 61, max: 100, icon: "💫" },
  { label: "Intelligence", val: 95, max: 100, icon: "🧠" },
  { label: "Luck",         val: 34, max: 100, icon: "🍀" },
  { label: "Charisma",     val: 77, max: 100, icon: "💬" },
];

// ── Reputation categories ─────────────────────────────────────────────────────
export const REPUTATION_CATEGORIES: ReputationCategory[] = [
  { label: "Politics",   val: 42, color: "#c87aff" },
  { label: "Media",      val: 78, color: "#ff7a30" },
  { label: "Technology", val: 91, color: "#4a9eff" },
  { label: "Business",   val: 55, color: "#f5c518" },
  { label: "Internet",   val: 88, color: "#5de85d" },
  { label: "Community",  val: 33, color: "#e84a4a" },
];

// ── Ally / creature collection ────────────────────────────────────────────────
export const ALLIES: Ally[] = [
  {
    name: "Memo-Saur",
    type: "Corporate",
    lv: 22,
    icon: "🦕",
    rare: "Rare",
    hp: [68, 90],
    bio: "A prehistoric creature who survived 1000 redundant meetings.",
  },
  {
    name: "Spin Doctor",
    type: "Media",
    lv: 18,
    icon: "🌀",
    rare: "Common",
    hp: [45, 60],
    bio: "Can reframe any defeat as a 'learning opportunity'.",
  },
  {
    name: "Crypto-Bat",
    type: "Finance",
    lv: 31,
    icon: "🦇",
    rare: "Epic",
    hp: [88, 120],
    bio: "Echolocates only in blockchain frequencies. Very annoying at parties.",
  },
  {
    name: "Influencer Blob",
    type: "Internet",
    lv: 14,
    icon: "🟣",
    rare: "Common",
    hp: [52, 70],
    bio: "Gained sentience from too many algorithm updates. Mostly harmless.",
  },
  {
    name: "Bug Report",
    type: "Technology",
    lv: 25,
    icon: "🐛",
    rare: "Rare",
    hp: [70, 95],
    bio: "Lives in production. Has never been successfully reproduced.",
  },
  {
    name: "Meme Lord",
    type: "Internet",
    lv: 19,
    icon: "😂",
    rare: "Epic",
    hp: [60, 80],
    bio: "Peak power was 2016. Still relevant in certain niche communities.",
  },
];

// ── Rarity display colours ────────────────────────────────────────────────────
export const RARITY_COLORS: Record<string, string> = {
  Common: "#6b6b8e",
  Rare: "#4a9eff",
  Epic: "#c87aff",
  Legendary: "#f5c518",
};
