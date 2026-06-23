// ─── Quest data ───────────────────────────────────────────────────────────────

export type QuestStatus = "active" | "completed" | "failed";

export interface Quest {
  title: string;
  type: string;
  lv: number;
  status: QuestStatus;
  reward: string;
  icon: string;
  desc: string;
  difficulty: string;
  npc: string;
  objectives?: string[];
}

export const QUEST_TABS = [
  "Main Story",
  "Side Quests",
  "Daily",
  "Completed",
  "Failed",
] as const;

export const STATUS_COLORS: Record<QuestStatus, string> = {
  active: "#f5c518",
  completed: "#5de85d",
  failed: "#e84a4a",
};

export const QUESTS: Quest[] = [
  {
    title: "The Tutorial Nobody Asked For",
    type: "Main Story",
    lv: 1,
    status: "completed",
    reward: "500 XP",
    icon: "📜",
    difficulty: "Trivial",
    npc: "Grep the Wizard",
    desc: "Learn the basics. Talk to the Old Man. Try not to sigh too hard.",
    objectives: ["Talk to Grep the Wizard", "Walk 10 steps", "Survive one encounter"],
  },
  {
    title: "The Missing Quarterly Report",
    type: "Main Story",
    lv: 10,
    status: "active",
    reward: "1200 XP + Rare Item + 300G",
    icon: "📊",
    difficulty: "Normal",
    npc: "Quest Board",
    desc: "Recover the mysteriously deleted spreadsheet from Server Room B. Someone's job depends on it. Possibly yours.",
    objectives: [
      "✓ Find a clue in Satiria Town",
      "Obtain the Server Key",
      "Reach Server Room B",
      "Defeat the Guardian of Spreadsheets",
    ],
  },
  {
    title: "Silence the Notification Bell",
    type: "Side Quests",
    lv: 5,
    status: "active",
    reward: "400 XP + 100G",
    icon: "🔔",
    difficulty: "Easy",
    npc: "Frazzled Intern",
    desc: "Defeat 10 Inbox Demons before they multiply and consume what remains of your sanity.",
    objectives: ["Defeat Inbox Demons (6/10)"],
  },
  {
    title: "Office Plant Therapy",
    type: "Side Quests",
    lv: 3,
    status: "completed",
    reward: "150 XP + Motivation Pill",
    icon: "🌱",
    difficulty: "Trivial",
    npc: "Anxious Accountant",
    desc: "Water the office plants. Just... water the plants. That's it. That's the whole quest.",
    objectives: ["Water all 3 plants ✓"],
  },
  {
    title: "The LinkedIn Apocalypse",
    type: "Daily",
    lv: 8,
    status: "active",
    reward: "250 XP + 80G",
    icon: "💼",
    difficulty: "Normal",
    npc: "Daily Board",
    desc: "Ignore 25 'thought leader' posts without engaging. Willpower check required.",
    objectives: ["Ignore cringe posts (17/25)"],
  },
  {
    title: "Daily Grind",
    type: "Daily",
    lv: 1,
    status: "active",
    reward: "100 XP + 50G",
    icon: "☕",
    difficulty: "Trivial",
    npc: "Daily Board",
    desc: "Survive a Monday morning meeting without visible eye-rolling. A true test of character.",
    objectives: ["Attend morning meeting", "Keep a straight face"],
  },
  {
    title: "Scavenger's Fortune",
    type: "Daily",
    lv: 5,
    status: "completed",
    reward: "180 XP + Circuit Scrap ×3",
    icon: "🔍",
    difficulty: "Easy",
    npc: "Daily Board",
    desc: "Collect 5 pieces of Circuit Scrap from the wild areas.",
    objectives: ["Collect Circuit Scrap (5/5) ✓"],
  },
  {
    title: "First Encounter",
    type: "Completed",
    lv: 1,
    status: "completed",
    reward: "200 XP",
    icon: "⚔️",
    difficulty: "Trivial",
    npc: "Auto",
    desc: "Win your first battle. Everyone starts somewhere.",
    objectives: ["Win 1 battle ✓"],
  },
  {
    title: "The Collector Begins",
    type: "Completed",
    lv: 4,
    status: "completed",
    reward: "350 XP + Badge of Irony",
    icon: "🏅",
    difficulty: "Easy",
    npc: "Museum Curator",
    desc: "Obtain your first collectible item. The hoarder within awakens.",
    objectives: ["Collect 1 unique item ✓"],
  },
  {
    title: "Tried and Failed (Cave Run)",
    type: "Failed",
    lv: 12,
    status: "failed",
    reward: "—",
    icon: "💀",
    difficulty: "Hard",
    npc: "Reckless Adventurer",
    desc: "You perished in the cave. The bat was not impressed by your strategy.",
    objectives: ["Reach Cave Depths (0/3)", "Survive 5 minutes (FAILED)"],
  },
  {
    title: "Speed Dating with Danger",
    type: "Failed",
    lv: 9,
    status: "failed",
    reward: "—",
    icon: "🏃",
    difficulty: "Normal",
    npc: "Overconfident Duelist",
    desc: "You tried to fight CEO Chad at level 9. Bold choice. Wrong choice.",
    objectives: ["Defeat CEO Chad (FAILED — Lv. gap too large)"],
  },
];
