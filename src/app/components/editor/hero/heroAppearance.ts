export const HERO_APPEARANCE_OPTIONS = {
  skin: [
    { id: "light", label: "Light", color: "#f2c49b" },
    { id: "tan", label: "Tan", color: "#c9875f" },
    { id: "brown", label: "Brown", color: "#7a4a32" },
    { id: "dark", label: "Dark", color: "#4a2d22" },
  ],
  hair: [
    { id: "wizard-default", label: "Wizard Hair", color: "#2d1622" },
  ],
  facialHair: [
    { id: "none", label: "None", color: "transparent" },
  ],
  sunglasses: [
    { id: "none", label: "None", color: "transparent" },
  ],
  hat: [
    { id: "none", label: "None", color: "transparent" },
  ],
  shirt: [
    { id: "wizard-robe", label: "Wizard Robe", color: "#12292d" },
  ],
  pants: [
    { id: "wizard-pants", label: "Wizard Pants", color: "#14233a" },
  ],
  shoes: [
    { id: "wizard-boots", label: "Wizard Boots", color: "#101015" },
  ],
} as const;

export type HeroAppearance = {
  skin: typeof HERO_APPEARANCE_OPTIONS.skin[number]["id"];
  hair: typeof HERO_APPEARANCE_OPTIONS.hair[number]["id"];
  facialHair: typeof HERO_APPEARANCE_OPTIONS.facialHair[number]["id"];
  sunglasses: typeof HERO_APPEARANCE_OPTIONS.sunglasses[number]["id"];
  hat: typeof HERO_APPEARANCE_OPTIONS.hat[number]["id"];
  shirt: typeof HERO_APPEARANCE_OPTIONS.shirt[number]["id"];
  pants: typeof HERO_APPEARANCE_OPTIONS.pants[number]["id"];
  shoes: typeof HERO_APPEARANCE_OPTIONS.shoes[number]["id"];
};

export type HeroAppearanceKey = keyof HeroAppearance;

export const DEFAULT_HERO_APPEARANCE: HeroAppearance = {
  skin: "light",
  hair: "wizard-default",
  facialHair: "none",
  sunglasses: "none",
  hat: "none",
  shirt: "wizard-robe",
  pants: "wizard-pants",
  shoes: "wizard-boots",
};

export function getHeroOptionColor<K extends HeroAppearanceKey>(
  category: K,
  id: HeroAppearance[K],
): string {
  const options = HERO_APPEARANCE_OPTIONS[category] as readonly {
    id: string;
    color?: string;
  }[];

  const option = options.find(option => option.id === id);
  return option?.color ?? "transparent";
}
