// ─── Enemy & combat data ─────────────────────────────────────────────────────

export interface EnemyAttack {
  name: string;
  min: number;
  max: number;
}

export interface Enemy {
  name: string;
  emoji: string;
  type: string;
  level: number;
  maxHp: number;
  xp: number;
  gold: number;
  intro: string;
  attacks: EnemyAttack[];
}

export interface AttackCategory {
  key: string;
  label: string;
  emoji: string;
  color: string;
}

export interface StatusEffect {
  key: string;
  label: string;
  icon: string;
  color: string;
}

// ── Attack categories used in battle menus ───────────────────────────────────
export const ATTACK_CATEGORIES: AttackCategory[] = [
  { key: "politics",  label: "Politics",   emoji: "📢", color: "#c87aff" },
  { key: "tech",      label: "Technology", emoji: "💻", color: "#4a9eff" },
  { key: "finance",   label: "Finance",    emoji: "💰", color: "#f5c518" },
  { key: "media",     label: "Media",      emoji: "📺", color: "#ff7a30" },
  { key: "internet",  label: "Internet",   emoji: "🌐", color: "#5de85d" },
  { key: "influence", label: "Influence",  emoji: "✨", color: "#e84a4a" },
];

// ── Status effects ────────────────────────────────────────────────────────────
export const STATUS_EFFECTS: StatusEffect[] = [
  { key: "confused",   label: "Confused",   icon: "🌀", color: "#c87aff" },
  { key: "distracted", label: "Distracted", icon: "📱", color: "#4a9eff" },
  { key: "triggered",  label: "Triggered",  icon: "😤", color: "#e84a4a" },
  { key: "muted",      label: "Muted",      icon: "🔇", color: "#6b6b8e" },
  { key: "influenced", label: "Influenced", icon: "💫", color: "#f5c518" },
  { key: "frozen",     label: "Frozen",     icon: "❄️",  color: "#88ccff" },
  { key: "burned",     label: "Burned",     icon: "🔥", color: "#ff7a30" },
  { key: "exhausted",  label: "Exhausted",  icon: "😴", color: "#8b7355" },
  { key: "inspired",   label: "Inspired",   icon: "✨", color: "#5de85d" },
  { key: "lucky",      label: "Lucky",      icon: "🍀", color: "#5de85d" },
];

// ── Wild encounter pool ───────────────────────────────────────────────────────
export const WILD_ENEMIES: Enemy[] = [
  {
    name: "Influencer Blob",
    emoji: "🫧",
    type: "Internet",
    level: 8,
    maxHp: 55,
    xp: 120,
    gold: 30,
    intro: '"Rate this battle ⭐⭐⭐⭐⭐ for a chance to win!!"',
    attacks: [
      { name: "Hot Take", min: 6, max: 14 },
      { name: "Vague Post", min: 3, max: 9 },
    ],
  },
  {
    name: "Thought Leader",
    emoji: "🧠",
    type: "Media",
    level: 10,
    maxHp: 65,
    xp: 180,
    gold: 45,
    intro: '"I\'m not here to make friends. I\'m here to SCALE."',
    attacks: [
      { name: "Disruptive Insight", min: 8, max: 18 },
      { name: "LinkedInvasion", min: 5, max: 13 },
    ],
  },
  {
    name: "Crypto Bro",
    emoji: "🦇",
    type: "Finance",
    level: 12,
    maxHp: 72,
    xp: 210,
    gold: 88,
    intro: '"Have you heard of Web4? It\'s Web3 but somehow more confusing."',
    attacks: [
      { name: "Rug Pull", min: 12, max: 22 },
      { name: "Whitepaper Wall", min: 5, max: 12 },
    ],
  },
  {
    name: "Synergy Consultant",
    emoji: "💼",
    type: "Corporate",
    level: 14,
    maxHp: 80,
    xp: 250,
    gold: 60,
    intro: '"Let\'s circle back on deliverables and action items going forward."',
    attacks: [
      { name: "Buzzword Barrage", min: 10, max: 20 },
      { name: "Paradigm Shift", min: 8, max: 17 },
    ],
  },
  {
    name: "Disruptor",
    emoji: "🤖",
    type: "Technology",
    level: 16,
    maxHp: 92,
    xp: 300,
    gold: 75,
    intro: '"Move fast and break things. Like your HP bar."',
    attacks: [
      { name: "Pivot!", min: 14, max: 26 },
      { name: "Disruption Field", min: 10, max: 20 },
    ],
  },
  {
    name: "CEO Chad",
    emoji: "😈",
    type: "Finance",
    level: 42,
    maxHp: 100,
    xp: 800,
    gold: 500,
    intro: '"I have THREE LinkedIn recommendations. This ends now."',
    attacks: [
      { name: "Vague Threat", min: 12, max: 24 },
      { name: "Corporate Restructuring", min: 18, max: 32 },
      { name: "Synergy Overdrive", min: 8, max: 16 },
    ],
  },
  {
    name: "Viral Meme Ghost",
    emoji: "👻",
    type: "Internet",
    level: 9,
    maxHp: 48,
    xp: 140,
    gold: 25,
    intro: '"Nobody gets me. I\'m too avant-garde for this timeline."',
    attacks: [
      { name: "Cringe Aura", min: 5, max: 12 },
      { name: "Outdated Reference", min: 4, max: 10 },
    ],
  },
  {
    name: "Policy Goblin",
    emoji: "📋",
    type: "Politics",
    level: 11,
    maxHp: 60,
    xp: 160,
    gold: 40,
    intro: '"Have you read the terms and conditions? All 847 pages?"',
    attacks: [
      { name: "Red Tape", min: 7, max: 15 },
      { name: "Form 27-B Stroke 6", min: 6, max: 13 },
    ],
  },
];

// ── Encounter messages shown on wild battle trigger ───────────────────────────
export const ENCOUNTER_MSGS: string[] = [
  "A wild INFLUENCER appeared!",
  "A wild THOUGHT LEADER appeared!",
  "A wild CRYPTO BRO appeared!",
  "A wild SYNERGY CONSULTANT appeared!",
  "A wild DISRUPTOR appeared!",
  "A wild VIRAL MEME GHOST appeared!",
  "A wild POLICY GOBLIN appeared!",
];
