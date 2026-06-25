import type { EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import type { BuildingTypeOption, EditorMode, NpcVisualCategory, NpcVisualPreset } from "./editorTypes";

export const EDITOR_MODES: EditorMode[] = ["select", "terrain", "buildings", "objects", "npcs"];

export const NPC_VISUAL_CATEGORIES: NpcVisualCategory[] = [
  "Generic",
  "Wokeshire",
  "Special",
  "Cryptonia",
  "Surveillia",
];

export const NPC_VISUAL_PRESETS: NpcVisualPreset[] = [
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
];

export const BUILDING_TILE_IDS = new Set(["A", "B", "H", "P", "U", "I", "O"]);

export const BUILDING_TYPES: BuildingTypeOption[] = [
  { kind: "house", label: "House", defaultColor: "purple", defaultW: 5, defaultH: 4, description: "Normal enterable house" },
  { kind: "shop", label: "Shop", defaultColor: "green", defaultW: 5, defaultH: 4, description: "Auto-connects to shop interior" },
  { kind: "healing", label: "Healing Center", defaultColor: "blue", defaultW: 5, defaultH: 4, description: "Auto-connects to healing center" },
  { kind: "station", label: "Train Station", defaultColor: "red", defaultW: 7, defaultH: 4, description: "Auto-opens train menu" },
  { kind: "hall", label: "Hall / Institution", defaultColor: "purple", defaultW: 6, defaultH: 5, description: "Large civic building" },
];

export const BUILDING_COLORS: EditorBuildingColor[] = ["red", "blue", "purple", "green"];

export const BUILDING_KIND_LABEL: Record<EditorBuildingKind, string> = {
  house: "House",
  shop: "Shop",
  healing: "Healing Center",
  station: "Train Station",
  hall: "Hall / Institution",
};

export const UNIQUE_BUILDING_KINDS = new Set<EditorBuildingKind>(["shop", "healing", "station"]);

export const isSelectEditorMode = (mode: EditorMode) => mode === "select";
