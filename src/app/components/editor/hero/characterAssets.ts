import type {
  CharacterAppearance,
  CharacterAssetManifest,
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
  "hair",
  "outfit",
  "accessory",
];

export const DEFAULT_CHARACTER_APPEARANCE: CharacterAppearance = {
  body: CHARACTER_ASSET_MANIFEST.body[0]?.id ?? "body_48x48_01",
  eyes: CHARACTER_ASSET_MANIFEST.eyes.find(option => option.id !== "none")?.id ?? "none",
  hair: CHARACTER_ASSET_MANIFEST.hair.find(option => option.id !== "none")?.id ?? "none",
  outfit: CHARACTER_ASSET_MANIFEST.outfit.find(option => option.id !== "none")?.id ?? "none",
  accessory: "none",
};

export function optionFor(category: CharacterLayerCategory, id: string) {
  return CHARACTER_ASSET_MANIFEST[category].find(option => option.id === id)
    ?? CHARACTER_ASSET_MANIFEST[category][0];
}
