export const HERO_PRESETS = [
  {
    id: "classic",
    label: "Classic Trainer",
    spriteClass: "hero-classic",
    description: "Original trainer look.",
  },
  {
    id: "red",
    label: "Red Jacket",
    spriteClass: "hero-red",
    description: "A bolder red outfit for the main hero.",
  },
  {
    id: "blue",
    label: "Blue Jacket",
    spriteClass: "hero-blue",
    description: "A cooler blue outfit.",
  },
  {
    id: "green",
    label: "Green Explorer",
    spriteClass: "hero-green",
    description: "Adventure-ready green outfit.",
  },
  {
    id: "dark",
    label: "Dark Mode Hero",
    spriteClass: "hero-dark",
    description: "A darker rival-style look.",
  },
] as const;

export type HeroPresetId = typeof HERO_PRESETS[number]["id"];
