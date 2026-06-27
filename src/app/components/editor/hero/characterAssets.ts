import type {
  CharacterAppearance,
  CharacterAssetManifest,
  CharacterColorCategory,
  CharacterColorManifest,
  CharacterLayerCategory,
} from "./characterTypes";

export const CHARACTER_TILE_SIZE = 48;

export const CHARACTER_ASSET_MANIFEST = {
  "body": [
    {
      "id": "body_48x48_01",
      "label": "Body 48x48 01",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_01.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_02",
      "label": "Body 48x48 02",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_02.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_03",
      "label": "Body 48x48 03",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_03.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_04",
      "label": "Body 48x48 04",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_04.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_05",
      "label": "Body 48x48 05",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_05.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_06",
      "label": "Body 48x48 06",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_06.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_07",
      "label": "Body 48x48 07",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_07.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_08",
      "label": "Body 48x48 08",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_08.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    },
    {
      "id": "body_48x48_09",
      "label": "Body 48x48 09",
      "src": "/assets/limezu/characters/atlases/body/body_48x48_09.png",
      "atlasWidth": 2781,
      "atlasHeight": 1968
    }
  ],
  "eyes": [
    {
      "id": "none",
      "label": "None",
      "src": "/assets/limezu/characters/atlases/eyes/none.png",
      "atlasWidth": 48,
      "atlasHeight": 48
    },
    {
      "id": "eyes_48x48_01",
      "label": "Eyes 48x48 01",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "eyes_48x48_02",
      "label": "Eyes 48x48 02",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "eyes_48x48_03",
      "label": "Eyes 48x48 03",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "eyes_48x48_04",
      "label": "Eyes 48x48 04",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "eyes_48x48_05",
      "label": "Eyes 48x48 05",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_05.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "eyes_48x48_06",
      "label": "Eyes 48x48 06",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_06.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "eyes_48x48_07",
      "label": "Eyes 48x48 07",
      "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_07.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    }
  ],
  "hair": [
    {
      "id": "none",
      "label": "None",
      "src": "/assets/limezu/characters/atlases/hair/none.png",
      "atlasWidth": 48,
      "atlasHeight": 48
    },
    {
      "id": "hairstyle_01_48x48_01",
      "label": "Hairstyle 01 48x48 01",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_01_48x48_02",
      "label": "Hairstyle 01 48x48 02",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_01_48x48_03",
      "label": "Hairstyle 01 48x48 03",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_01_48x48_04",
      "label": "Hairstyle 01 48x48 04",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_01_48x48_05",
      "label": "Hairstyle 01 48x48 05",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_05.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_01_48x48_06",
      "label": "Hairstyle 01 48x48 06",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_06.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_01_48x48_07",
      "label": "Hairstyle 01 48x48 07",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_07.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_01",
      "label": "Hairstyle 02 48x48 01",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_02",
      "label": "Hairstyle 02 48x48 02",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_03",
      "label": "Hairstyle 02 48x48 03",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_04",
      "label": "Hairstyle 02 48x48 04",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_05",
      "label": "Hairstyle 02 48x48 05",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_05.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_06",
      "label": "Hairstyle 02 48x48 06",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_06.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_02_48x48_07",
      "label": "Hairstyle 02 48x48 07",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_07.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_01",
      "label": "Hairstyle 03 48x48 01",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_02",
      "label": "Hairstyle 03 48x48 02",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_03",
      "label": "Hairstyle 03 48x48 03",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_04",
      "label": "Hairstyle 03 48x48 04",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_05",
      "label": "Hairstyle 03 48x48 05",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_05.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_06",
      "label": "Hairstyle 03 48x48 06",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_06.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_03_48x48_07",
      "label": "Hairstyle 03 48x48 07",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_07.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_04_48x48_01",
      "label": "Hairstyle 04 48x48 01",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_04_48x48_02",
      "label": "Hairstyle 04 48x48 02",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "hairstyle_04_48x48_03",
      "label": "Hairstyle 04 48x48 03",
      "src": "/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    }
  ],
  "outfit": [
    {
      "id": "none",
      "label": "None",
      "src": "/assets/limezu/characters/atlases/outfit/none.png",
      "atlasWidth": 48,
      "atlasHeight": 48
    },
    {
      "id": "outfit_01_48x48_01",
      "label": "Outfit 01 48x48 01",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_02",
      "label": "Outfit 01 48x48 02",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_03",
      "label": "Outfit 01 48x48 03",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_04",
      "label": "Outfit 01 48x48 04",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_05",
      "label": "Outfit 01 48x48 05",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_05.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_06",
      "label": "Outfit 01 48x48 06",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_06.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_07",
      "label": "Outfit 01 48x48 07",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_07.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_08",
      "label": "Outfit 01 48x48 08",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_08.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_09",
      "label": "Outfit 01 48x48 09",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_09.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_01_48x48_10",
      "label": "Outfit 01 48x48 10",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_10.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_02_48x48_01",
      "label": "Outfit 02 48x48 01",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_02_48x48_02",
      "label": "Outfit 02 48x48 02",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_02_48x48_03",
      "label": "Outfit 02 48x48 03",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_02_48x48_04",
      "label": "Outfit 02 48x48 04",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_03_48x48_01",
      "label": "Outfit 03 48x48 01",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_03_48x48_02",
      "label": "Outfit 03 48x48 02",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_03_48x48_03",
      "label": "Outfit 03 48x48 03",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_03_48x48_04",
      "label": "Outfit 03 48x48 04",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_04_48x48_01",
      "label": "Outfit 04 48x48 01",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_04_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_04_48x48_02",
      "label": "Outfit 04 48x48 02",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_04_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_04_48x48_03",
      "label": "Outfit 04 48x48 03",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_04_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_05_48x48_01",
      "label": "Outfit 05 48x48 01",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_05_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_05_48x48_02",
      "label": "Outfit 05 48x48 02",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_05_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "outfit_05_48x48_03",
      "label": "Outfit 05 48x48 03",
      "src": "/assets/limezu/characters/atlases/outfit/outfit_05_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    }
  ],
  "accessory": [
    {
      "id": "none",
      "label": "None",
      "src": "/assets/limezu/characters/atlases/accessory/none.png",
      "atlasWidth": 48,
      "atlasHeight": 48
    },
    {
      "id": "accessory_01_ladybug_48x48_01",
      "label": "Accessory 01 Ladybug 48x48 01",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_01_ladybug_48x48_02",
      "label": "Accessory 01 Ladybug 48x48 02",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_01_ladybug_48x48_03",
      "label": "Accessory 01 Ladybug 48x48 03",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_01_ladybug_48x48_04",
      "label": "Accessory 01 Ladybug 48x48 04",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_02_bee_48x48_01",
      "label": "Accessory 02 Bee 48x48 01",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_02_bee_48x48_02",
      "label": "Accessory 02 Bee 48x48 02",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_02_bee_48x48_03",
      "label": "Accessory 02 Bee 48x48 03",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_01",
      "label": "Accessory 03 Backpack 48x48 01",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_01.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_02",
      "label": "Accessory 03 Backpack 48x48 02",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_02.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_03",
      "label": "Accessory 03 Backpack 48x48 03",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_03.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_04",
      "label": "Accessory 03 Backpack 48x48 04",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_04.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_05",
      "label": "Accessory 03 Backpack 48x48 05",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_05.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_06",
      "label": "Accessory 03 Backpack 48x48 06",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_06.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_07",
      "label": "Accessory 03 Backpack 48x48 07",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_07.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_08",
      "label": "Accessory 03 Backpack 48x48 08",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_08.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    },
    {
      "id": "accessory_03_backpack_48x48_09",
      "label": "Accessory 03 Backpack 48x48 09",
      "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_09.png",
      "atlasWidth": 2688,
      "atlasHeight": 1968
    }
  ]
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
  const options = CHARACTER_ASSET_MANIFEST[category];
  const currentIndex = Math.max(0, options.findIndex(option => option.id === currentId));
  const nextIndex = (currentIndex + direction + options.length) % options.length;
  return options[nextIndex]?.id ?? currentId;
}

export function randomCharacterAppearance(): CharacterAppearance {
  const pick = (category: CharacterLayerCategory) => {
    const options = CHARACTER_ASSET_MANIFEST[category];
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
