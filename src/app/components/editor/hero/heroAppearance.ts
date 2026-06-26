export const HERO_APPEARANCE_OPTIONS = {
  skin: [
    { id: "light", label: "Light", color: "#f2c49b" },
    { id: "tan", label: "Tan", color: "#c9875f" },
    { id: "brown", label: "Brown", color: "#7a4a32" },
    { id: "dark", label: "Dark", color: "#4a2d22" },
  ],
  hair: [
    { id: "messy-brown", label: "Messy Brown", color: "#5a321d", style: "messy" },
    { id: "messy-black", label: "Messy Black", color: "#171411", style: "messy" },
    { id: "spiky-blonde", label: "Spiky Blonde", color: "#d9a441", style: "spiky" },
    { id: "short-red", label: "Short Red", color: "#a9432c", style: "short" },
    { id: "none", label: "None", color: "transparent", style: "none" },
  ],
  facialHair: [
    { id: "none", label: "None", color: "transparent" },
    { id: "mustache", label: "Mustache", color: "#252018" },
    { id: "beard", label: "Beard", color: "#252018" },
  ],
  sunglasses: [
    { id: "none", label: "None", color: "transparent" },
    { id: "black", label: "Black Shades", color: "#111111" },
  ],
  hat: [
    { id: "none", label: "None", color: "transparent" },
    { id: "red-cap", label: "Red Cap", color: "#ca4b36" },
    { id: "blue-cap", label: "Blue Cap", color: "#2f63b7" },
    { id: "green-cap", label: "Green Cap", color: "#315f2a" },
  ],
  shirt: [
    { id: "red-jacket", label: "Red Jacket", color: "#ca4b36" },
    { id: "blue-jacket", label: "Blue Jacket", color: "#2f63b7" },
    { id: "green-hoodie", label: "Green Hoodie", color: "#315f2a" },
    { id: "yellow-tee", label: "Yellow Tee", color: "#e0a92f" },
    { id: "black-coat", label: "Black Coat", color: "#252018" },
  ],
  pants: [
    { id: "jeans", label: "Jeans", color: "#315f8f" },
    { id: "brown", label: "Brown", color: "#66512c" },
    { id: "black", label: "Black", color: "#252018" },
    { id: "green", label: "Green", color: "#315f2a" },
  ],
  shoes: [
    { id: "black", label: "Black", color: "#252018" },
    { id: "brown", label: "Brown", color: "#66512c" },
    { id: "red", label: "Red", color: "#ca4b36" },
    { id: "white", label: "White", color: "#fffef0" },
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
  hair: "messy-brown",
  facialHair: "none",
  sunglasses: "none",
  hat: "red-cap",
  shirt: "red-jacket",
  pants: "jeans",
  shoes: "black",
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

export function getHeroOption<K extends HeroAppearanceKey>(
  category: K,
  id: HeroAppearance[K],
) {
  const options = HERO_APPEARANCE_OPTIONS[category];
  return options.find(option => option.id === id) ?? options[0];
}
