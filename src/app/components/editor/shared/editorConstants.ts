import type { EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import type { BuildingTypeOption, NpcVisualCategory, NpcVisualPreset } from "./editorTypes";

export const TILE_TYPES = [
  { id: "G", name: "Grass", description: "Default walkable ground" },
  { id: "R", name: "Road / Bike Path", description: "Main walkable path" },
  { id: "W", name: "Water / Canal", description: "Canals, rivers, lakes" },
  { id: "T", name: "Trees / Forest", description: "Tree border or forest block" },
  { id: "E", name: "Plaza / Stone", description: "Town square or paved area" },
  { id: "Y", name: "Tulips / Flowers", description: "Flower beds and tulip fields" },
  { id: "S", name: "Sand / Beach", description: "Beach or desert terrain" },
  { id: "X", name: "Encounter Grass", description: "Wild battle zone" },
  { id: "D", name: "Dungeon Floor", description: "Dark indoor or dungeon tile" },
  { id: "C", name: "Cave", description: "Cave entrance or rocky area" },
  { id: "M", name: "Mountain", description: "Rocky mountain terrain" },
  { id: "J", name: "Wooden Dock", description: "Dock, pier, boardwalk" },
  { id: "F", name: "Fence", description: "Fence or barrier decoration" },
  { id: "L", name: "Flower Patch", description: "Decorative flowers / garden" },
  { id: "Q", name: "Quest Marker", description: "Quest/NPC marker tile" },
  { id: "V", name: "Save Point", description: "Save marker tile" },
  { id: "N", name: "NPC Tile", description: "NPC marker tile" },
] as const;

export const OBJECT_EDITOR_CATEGORIES = [
  "Core",
  "Wokeshire",
  "Satiria",
  "Brexiton",
  "Promptford",
  "Cryptonia",
  "Surveillia",
  "Tweetsburg",
  "Inflatopolis",
  "Tariff",
  "Ragebait",
  "Factcheck",
  "Interior",
  "Custom",
] as const;

export const BUILDING_TILE_IDS = new Set(["A", "B", "H", "P", "U", "I", "O"]);

export const BUILDING_TYPES = [
  { kind: "house" as const, label: "House", defaultColor: "purple" as const, defaultW: 5, defaultH: 4, description: "Normal enterable house" },
  { kind: "shop" as const, label: "Shop", defaultColor: "green" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to shop interior" },
  { kind: "healing" as const, label: "Healing Center", defaultColor: "blue" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to healing center" },
  { kind: "station" as const, label: "Train Station", defaultColor: "red" as const, defaultW: 7, defaultH: 4, description: "Auto-opens train menu" },
  { kind: "hall" as const, label: "Hall / Institution", defaultColor: "purple" as const, defaultW: 6, defaultH: 5, description: "Large civic building" },
];

export const BUILDING_COLORS = ["red", "blue", "purple", "green"] as const;

export const BUILDING_KIND_LABEL = {
  house: "House",
  shop: "Shop",
  healing: "Healing Center",
  station: "Train Station",
  hall: "Hall / Institution",
} as const;

export const UNIQUE_BUILDING_KINDS = new Set(["shop", "healing", "station"]);

export const NPC_VISUAL_CATEGORIES = [
  "Generic",
  "Wokeshire",
  "Special",
  "Cryptonia",
  "Surveillia",
] as const;

export const NPC_VISUAL_PRESETS = [
  { id: "generic-young-man-0", label: "Young Man 1", variant: 0, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-woman-1", label: "Young Woman 1", variant: 1, styleRole: "young-woman", category: "Generic" },
  { id: "generic-older-woman-2", label: "Older Woman 1", variant: 2, styleRole: "older-woman", category: "Generic" },
  { id: "generic-older-man-3", label: "Older Man 1", variant: 3, styleRole: "older-man", category: "Generic" },
  { id: "generic-guide-4", label: "Guide", variant: 4, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-man-5", label: "Young Man 2", variant: 5, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-woman-6", label: "Young Woman 2", variant: 6, styleRole: "young-woman", category: "Generic" },
  { id: "generic-older-man-7", label: "Older Man 2", variant: 7, styleRole: "older-man", category: "Generic" },
  { id: "generic-official-8", label: "Official", variant: 8, styleRole: "older-man", category: "Generic" },
  { id: "generic-local-9", label: "Local 9", variant: 9, styleRole: "young-woman", category: "Generic" },

  { id: "woke-consensus-ranger", label: "Consensus Ranger", variant: 6, styleRole: "young-woman", category: "Wokeshire" },
  { id: "woke-tulip-mediator", label: "Tulip Mediator", variant: 1, styleRole: "older-woman", category: "Wokeshire" },
  { id: "woke-canal-cyclist", label: "Canal Cyclist", variant: 3, styleRole: "young-man", category: "Wokeshire" },
  { id: "woke-bike-activist", label: "Bike Activist", variant: 5, styleRole: "young-woman", category: "Wokeshire" },
  { id: "woke-canal-elder", label: "Canal Elder", variant: 7, styleRole: "older-man", category: "Wokeshire" },
  { id: "woke-tulip-kid", label: "Tulip Kid", variant: 0, styleRole: "young-man", category: "Wokeshire" },

  { id: "special-robot-8", label: "Robot", variant: 8, styleRole: "robot", category: "Special" },
  { id: "special-robot-4", label: "Robot Guard", variant: 4, styleRole: "robot", category: "Special" },
  { id: "special-clerk", label: "Clerk-Like", variant: 2, styleRole: "older-man", category: "Special" },
  { id: "special-nurse", label: "Nurse-Like", variant: 1, styleRole: "young-woman", category: "Special" },

  { id: "crypto-bro-5", label: "Crypto Bro", variant: 5, styleRole: "crypto-bro", category: "Cryptonia" },
  { id: "crypto-sister-6", label: "Crypto Sister", variant: 6, styleRole: "crypto-sister", category: "Cryptonia" },
  { id: "crypto-baron", label: "Token Baron", variant: 5, styleRole: "older-man", category: "Cryptonia" },
  { id: "crypto-analyst", label: "Yacht Analyst", variant: 2, styleRole: "young-man", category: "Cryptonia" },

  { id: "surv-camera-guard", label: "Camera Guard", variant: 4, styleRole: "older-man", category: "Surveillia" },
  { id: "surv-data-minder", label: "Data Minder", variant: 7, styleRole: "young-woman", category: "Surveillia" },
  { id: "surv-neon-patrol", label: "Neon Patrol", variant: 1, styleRole: "young-man", category: "Surveillia" },
  { id: "surv-robot", label: "Surveillance Bot", variant: 8, styleRole: "robot", category: "Surveillia" },
] as const;

export const tileTypeFor = (id: string) => TILE_TYPES.find(tile => tile.id === id);
export const isSelectEditorMode = (mode: import("./editorTypes").EditorMode) => mode === "select";


export const EDITOR_TILE_COLORS: Record<string, string> = {
  G: "#56b447",
  R: "#d4a15f",
  W: "#2f9bd2",
  T: "#185c2b",
  E: "#9a9a9a",
  Y: "#ff4fa3",
  L: "#ffcf33",
  S: "#f0d079",
  X: "#2f8d3a",
  B: "#d94b36",
  H: "#3f7ee8",
  P: "#e07a28",
  U: "#8a4bd6",
  A: "#3fbf6f",
  I: "#52b7b0",
  O: "#3b2417",
  D: "#29213f",
  C: "#65412b",
  M: "#676767",
  J: "#9b5b2b",
  F: "#8b4f25",
  Q: "#f6d746",
  V: "#ffd84d",
  N: "#c87aff",
};
