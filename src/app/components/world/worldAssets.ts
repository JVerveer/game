import type { WorldAtlas, WorldMap } from "./worldTypes";

export const WORLD_TILE_SIZE = 48;

export const WORLD_ATLASES = {
  terrain: [
  {
    "id": "fallback_tiles",
    "label": "Fallback Tiles",
    "src": "/assets/limezu/world/terrain/fallback_tiles.png",
    "atlasWidth": 192,
    "atlasHeight": 192
  }
],
  objects: [
  {
    "id": "animated_amplifier_48x48",
    "label": "Animated Amplifier 48X48",
    "src": "/assets/limezu/world/objects/animated_amplifier_48x48.png",
    "atlasWidth": 144,
    "atlasHeight": 96
  },
  {
    "id": "animated_amplifier_big_48x48",
    "label": "Animated Amplifier Big 48X48",
    "src": "/assets/limezu/world/objects/animated_amplifier_big_48x48.png",
    "atlasWidth": 144,
    "atlasHeight": 144
  },
  {
    "id": "animated_bathroom_cabinet_blue_empty_48x48",
    "label": "Animated Bathroom Cabinet Blue Empty 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_cabinet_blue_empty_48x48.png",
    "atlasWidth": 480,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_cabinet_blue_full_48x48",
    "label": "Animated Bathroom Cabinet Blue Full 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_cabinet_blue_full_48x48.png",
    "atlasWidth": 480,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_cabinet_whiteblue_empty_48x48",
    "label": "Animated Bathroom Cabinet Whiteblue Empty 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_cabinet_whiteblue_empty_48x48.png",
    "atlasWidth": 480,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_cabinet_whiteblue_full_48x48",
    "label": "Animated Bathroom Cabinet Whiteblue Full 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_cabinet_whiteblue_full_48x48.png",
    "atlasWidth": 480,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_cabinet_white_empty_48x48",
    "label": "Animated Bathroom Cabinet White Empty 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_cabinet_white_empty_48x48.png",
    "atlasWidth": 480,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_cabinet_white_full_48x48",
    "label": "Animated Bathroom Cabinet White Full 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_cabinet_white_full_48x48.png",
    "atlasWidth": 480,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_sink_2_new_3_10_loop_48x48",
    "label": "Animated Bathroom Sink 2 New 3-10 Loop 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_sink_2_new_3_10_loop_48x48.png",
    "atlasWidth": 1344,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathroom_sink_new_3_10_loop_48x48",
    "label": "Animated Bathroom Sink New 3-10 Loop 48X48",
    "src": "/assets/limezu/world/objects/animated_bathroom_sink_new_3_10_loop_48x48.png",
    "atlasWidth": 1344,
    "atlasHeight": 96
  },
  {
    "id": "animated_bathtub_2_48x48",
    "label": "Animated Bathtub 2 48X48",
    "src": "/assets/limezu/world/objects/animated_bathtub_2_48x48.png",
    "atlasWidth": 384,
    "atlasHeight": 144
  },
  {
    "id": "animated_bathtub_2_new_1_4_7_loop_48x48",
    "label": "Animated Bathtub 2 New 1 4-7 Loop 48X48",
    "src": "/assets/limezu/world/objects/animated_bathtub_2_new_1_4_7_loop_48x48.png",
    "atlasWidth": 1152,
    "atlasHeight": 192
  }
],
  buildings: [],
} as const;

export function getWorldAtlas(id: string): WorldAtlas | undefined {
  const all = [
    ...WORLD_ATLASES.terrain,
    ...WORLD_ATLASES.objects,
    ...WORLD_ATLASES.buildings,
  ];

  const atlas = all.find(item => item.id === id);
  if (!atlas) return undefined;

  return {
    ...atlas,
    tileSize: WORLD_TILE_SIZE,
  };
}

const DEFAULT_TERRAIN_ATLAS = WORLD_ATLASES.terrain[0]?.id ?? "fallback_tiles";

export const STARTER_LIMEZU_WORLD_MAP: WorldMap = {
  width: 18,
  height: 12,
  tileSize: WORLD_TILE_SIZE,
  terrain: [
    "GGGGGGGGGGGGGGGGGG",
    "GGGGGGGGGGGGGGGGGG",
    "GGGTTTGGGGGGGTTTGG",
    "GGGTTTGGGGGGGTTTGG",
    "GGGGGGGGPPGGGGGGGG",
    "GGGGGGGGPPGGGGGGGG",
    "GGGGGPPPPPPPPGGGGG",
    "GGGGGPPPPPPPPGGGGG",
    "GGGGGGGGPPGGGGGGGG",
    "GGGGGGGGPPGGGGGGGG",
    "GGGGGGGGGGGGGGGGGG",
    "GGGGGGGGGGGGGGGGGG",
  ],
  terrainLegend: {
    G: { atlas: DEFAULT_TERRAIN_ATLAS, col: 0, row: 0, walkable: true },
    T: { atlas: DEFAULT_TERRAIN_ATLAS, col: 1, row: 0, walkable: true },
    P: { atlas: DEFAULT_TERRAIN_ATLAS, col: 2, row: 0, walkable: true },
    W: { atlas: DEFAULT_TERRAIN_ATLAS, col: 3, row: 0, walkable: false },
  },
  objects: [
    { id: "tree-a", atlas: DEFAULT_TERRAIN_ATLAS, col: 0, row: 1, x: 3, y: 2, z: 20, walkable: false },
    { id: "tree-b", atlas: DEFAULT_TERRAIN_ATLAS, col: 1, row: 1, x: 14, y: 2, z: 20, walkable: false },
    { id: "sign", atlas: DEFAULT_TERRAIN_ATLAS, col: 2, row: 1, x: 8, y: 5, z: 30, walkable: false },
    { id: "well", atlas: DEFAULT_TERRAIN_ATLAS, col: 3, row: 1, x: 11, y: 7, z: 30, walkable: false },
  ],
  npcs: [
    { id: "npc-alex", name: "Alex", x: 6, y: 7, facing: "down" },
    { id: "npc-amelia", name: "Amelia", x: 13, y: 6, facing: "left" },
  ],
};
