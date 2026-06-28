export const LAYER_Z = {
  terrain: 0,
  legacyObjects: 25,
  runtimeObjects: 35,
  buildings: 40,
  npcs: 60,
  hero: 80,
  effects: 120,
  editorOverlay: 2000,
} as const;

export type RenderLayerName = keyof typeof LAYER_Z;
