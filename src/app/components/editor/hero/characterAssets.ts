import { ACCESSORY_ASSETS } from "./characterAssetManifest.accessory";
import { BODY_ASSETS } from "./characterAssetManifest.body";
import { EYES_ASSETS } from "./characterAssetManifest.eyes";
import { HAIR_ASSETS } from "./characterAssetManifest.hair";
import { OUTFIT_ASSETS } from "./characterAssetManifest.outfit";
import type {
  CharacterAppearance,
  CharacterAssetManifest,
  CharacterColorCategory,
  CharacterColorManifest,
  CharacterLayerCategory,
} from "./characterTypes";

export const CHARACTER_TILE_SIZE = 48;

export const CHARACTER_ASSET_MANIFEST = {
  body: BODY_ASSETS,
  eyes: EYES_ASSETS,
  hair: HAIR_ASSETS,
  outfit: OUTFIT_ASSETS,
  accessory: ACCESSORY_ASSETS,
} as const satisfies CharacterAssetManifest;

export const CHARACTER_LAYER_ORDER: CharacterLayerCategory[] = [
  "body",
  "eyes",
  "outfit",
  "hair",
  "accessory",
];

export const DEFAULT_CHARACTER_APPEARANCE: CharacterAppearance = {
  body: CHARACTER_ASSET_MANIFEST.body[0]?.id ?? "body_48x48_01",
  eyes: CHARACTER_ASSET_MANIFEST.eyes.find(option => option.id !== "none")?.id ?? "none",
  hair: CHARACTER_ASSET_MANIFEST.hair.find(option => option.id !== "none")?.id ?? "none",
  outfit: CHARACTER_ASSET_MANIFEST.outfit.find(option => option.id !== "none")?.id ?? "none",
  accessory: "none",
  skinColor: "default",
  hairColor: "default",
  outfitColor: "default",
};

export function optionFor(category: CharacterLayerCategory, id: string) {
  return CHARACTER_ASSET_MANIFEST[category].find(option => option.id === id)
    ?? CHARACTER_ASSET_MANIFEST[category][0];
}


export const CHARACTER_CATEGORIES = [
  {
    id: "body",
    label: "Body",
    description: "Choose the base body / skin tone.",
    kind: "asset",
  },
  {
    id: "skinColor",
    label: "Skin Tint",
    description: "Apply a subtle body color variation.",
    kind: "color",
  },
  {
    id: "eyes",
    label: "Eyes",
    description: "Choose the eye style.",
    kind: "asset",
  },
  {
    id: "hair",
    label: "Hair",
    description: "Choose the hairstyle.",
    kind: "asset",
  },
  {
    id: "hairColor",
    label: "Hair Color",
    description: "Apply a hair color preset.",
    kind: "color",
  },
  {
    id: "outfit",
    label: "Outfit",
    description: "Choose clothing.",
    kind: "asset",
  },
  {
    id: "outfitColor",
    label: "Outfit Color",
    description: "Apply a clothing color preset.",
    kind: "color",
  },
  {
    id: "accessory",
    label: "Accessory",
    description: "Choose extras, hats, effects, or overlays.",
    kind: "asset",
  },
] as const;


export const CHARACTER_COLOR_MANIFEST = {
  skinColor: [
    { id: "default", label: "Default", color: "#f2c49b", filter: "none", opacity: 0 },
    { id: "warm", label: "Warm", color: "#d89468", filter: "sepia(0.18) saturate(1.18) brightness(0.98)", opacity: 0 },
    { id: "tan", label: "Tan", color: "#c9875f", filter: "sepia(0.28) saturate(1.2) brightness(0.9)", opacity: 0 },
    { id: "brown", label: "Brown", color: "#7a4a32", filter: "sepia(0.48) saturate(1.25) brightness(0.72)", opacity: 0 },
    { id: "pale", label: "Pale", color: "#ffd8b4", filter: "saturate(0.82) brightness(1.12)", opacity: 0 },
  ],
  hairColor: [
    { id: "default", label: "Default", color: "#3b2230", filter: "none", opacity: 0 },
    { id: "black", label: "Black", color: "#161319", filter: "saturate(0.55) brightness(0.55)", opacity: 0 },
    { id: "brown", label: "Brown", color: "#5a321d", filter: "sepia(0.35) saturate(1.15) brightness(0.82)", opacity: 0 },
    { id: "blonde", label: "Blonde", color: "#d9a441", filter: "sepia(0.5) saturate(1.5) brightness(1.18)", opacity: 0 },
    { id: "red", label: "Red", color: "#a9432c", filter: "sepia(0.45) saturate(1.7) hue-rotate(-18deg) brightness(0.9)", opacity: 0 },
    { id: "white", label: "White", color: "#e8e1d8", filter: "saturate(0.2) brightness(1.45)", opacity: 0 },
    { id: "blue", label: "Blue", color: "#315fbd", filter: "sepia(0.25) saturate(1.8) hue-rotate(170deg) brightness(0.85)", opacity: 0 },
    { id: "purple", label: "Purple", color: "#7b4db5", filter: "sepia(0.25) saturate(1.7) hue-rotate(230deg) brightness(0.9)", opacity: 0 },
  ],
  outfitColor: [
    { id: "default", label: "Default", color: "#4c3e8f", filter: "none", opacity: 0 },
    { id: "red", label: "Red", color: "#ca4b36", filter: "sepia(0.3) saturate(1.45) hue-rotate(-22deg) brightness(0.95)", opacity: 0 },
    { id: "blue", label: "Blue", color: "#2f63b7", filter: "sepia(0.2) saturate(1.55) hue-rotate(170deg) brightness(0.9)", opacity: 0 },
    { id: "green", label: "Green", color: "#315f2a", filter: "sepia(0.4) saturate(1.25) hue-rotate(70deg) brightness(0.78)", opacity: 0 },
    { id: "yellow", label: "Yellow", color: "#e0a92f", filter: "sepia(0.48) saturate(1.65) brightness(1.16)", opacity: 0 },
    { id: "black", label: "Black", color: "#252018", filter: "saturate(0.55) brightness(0.52)", opacity: 0 },
    { id: "white", label: "White", color: "#fffef0", filter: "saturate(0.22) brightness(1.45)", opacity: 0 },
    { id: "purple", label: "Purple", color: "#7b4db5", filter: "sepia(0.25) saturate(1.65) hue-rotate(230deg) brightness(0.9)", opacity: 0 },
  ],
} as const satisfies CharacterColorManifest;

export function colorOptionFor(category: CharacterColorCategory, id: string) {
  return CHARACTER_COLOR_MANIFEST[category].find(option => option.id === id)
    ?? CHARACTER_COLOR_MANIFEST[category][0];
}

export function nextColorId(category: CharacterColorCategory, currentId: string, direction: 1 | -1) {
  const options = CHARACTER_COLOR_MANIFEST[category];
  const currentIndex = Math.max(0, options.findIndex(option => option.id === currentId));
  const nextIndex = (currentIndex + direction + options.length) % options.length;
  return options[nextIndex]?.id ?? currentId;
}

export function nextOptionId(category: CharacterLayerCategory, currentId: string, direction: 1 | -1) {
  const options = curatedOptionsFor(category);
  const currentIndex = Math.max(0, options.findIndex(option => option.id === currentId));
  const nextIndex = (currentIndex + direction + options.length) % options.length;
  return options[nextIndex]?.id ?? currentId;
}

export function randomCharacterAppearance(): CharacterAppearance {
  const pick = (category: CharacterLayerCategory) => {
    const options = curatedOptionsFor(category);
    const usable = category === "body"
      ? options
      : options.filter(option => option.id !== "none");

    return (usable[Math.floor(Math.random() * usable.length)] ?? options[0])?.id ?? "none";
  };

  const pickColor = (category: CharacterColorCategory) => {
    const options = CHARACTER_COLOR_MANIFEST[category];
    return (options[Math.floor(Math.random() * options.length)] ?? options[0])?.id ?? "default";
  };

  return {
    body: pick("body"),
    eyes: pick("eyes"),
    hair: pick("hair"),
    outfit: pick("outfit"),
    accessory: Math.random() > 0.65 ? pick("accessory") : "none",
    skinColor: pickColor("skinColor"),
    hairColor: pickColor("hairColor"),
    outfitColor: pickColor("outfitColor"),
  };
}


function prettyOptionLabel(id: string, fallback: string) {
  if (id === "none") return "None";
  const hairMatch = id.match(/^hairstyle_(\d+)_48x48_\d+$/);
  if (hairMatch) return `Hairstyle ${Number(hairMatch[1])}`;
  const outfitMatch = id.match(/^outfit_(\d+)_48x48_\d+$/);
  if (outfitMatch) return `Outfit ${Number(outfitMatch[1])}`;

  const normalized = id
    .replace(/_48x48/g, "")
    .replace(/^body_/, "Body ")
    .replace(/^eyes_/, "Eyes ")
    .replace(/^hairstyle_/, "Hairstyle ")
    .replace(/^outfit_/, "Outfit ")
    .replace(/^accessory_/, "Accessory ")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace(/\b0+(\d+)/g, "$1");
}

export function displayLabelFor(category: CharacterLayerCategory, id: string) {
  const option = optionFor(category, id);
  return prettyOptionLabel(id, option?.label ?? id);
}

export function displayColorLabelFor(category: CharacterColorCategory, id: string) {
  return colorOptionFor(category, id)?.label ?? id;
}

export function curatedOptionsFor(category: CharacterLayerCategory) {
  const options = CHARACTER_ASSET_MANIFEST[category];

  if (category === "body") return [...options];

  const none = options.filter(option => option.id === "none");
  const rest = options.filter(option => option.id !== "none");

  if (category === "hair" || category === "outfit") {
    const seen = new Set<string>();
    const shapeOptions = rest.filter(option => {
      const key = option.id.replace(/_\d+$/, "");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return [
      ...none,
      ...shapeOptions,
    ];
  }

  return [
    ...none,
    ...rest,
  ];
}

export function optionIndexFor(category: CharacterLayerCategory, id: string) {
  const options = curatedOptionsFor(category);
  return Math.max(0, options.findIndex(option => option.id === id));
}

export function colorIndexFor(category: CharacterColorCategory, id: string) {
  const options = CHARACTER_COLOR_MANIFEST[category];
  return Math.max(0, options.findIndex(option => option.id === id));
}

export function categoryOptionCount(category: CharacterLayerCategory | CharacterColorCategory) {
  if (category === "skinColor" || category === "hairColor" || category === "outfitColor") {
    return CHARACTER_COLOR_MANIFEST[category].length;
  }

  return curatedOptionsFor(category).length;
}

export const CHARACTER_PRESETS = [
  {
    id: "classic",
    label: "Classic Hero",
    appearance: DEFAULT_CHARACTER_APPEARANCE,
  },
  {
    id: "dark",
    label: "Dark Outfit",
    appearance: {
      ...DEFAULT_CHARACTER_APPEARANCE,
      hairColor: "black",
      outfitColor: "black",
    },
  },
  {
    id: "bright",
    label: "Bright Hero",
    appearance: {
      ...DEFAULT_CHARACTER_APPEARANCE,
      hairColor: "blonde",
      outfitColor: "yellow",
    },
  },
  {
    id: "cool",
    label: "Cool Blue",
    appearance: {
      ...DEFAULT_CHARACTER_APPEARANCE,
      hairColor: "blue",
      outfitColor: "blue",
    },
  },
  {
    id: "forest",
    label: "Forest Green",
    appearance: {
      ...DEFAULT_CHARACTER_APPEARANCE,
      hairColor: "brown",
      outfitColor: "green",
    },
  },
] as const;
