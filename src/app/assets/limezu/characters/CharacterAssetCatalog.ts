export type CharacterAssetCategory = "uncategorized" | "body" | "eyes" | "hair" | "beard" | "outfit" | "hat" | "weapon" | "accessory" | "fullCharacter" | "npc" | "monster" | "portrait" | "effect" | "ignore";

export type CharacterAsset = {
  id: string;
  label: string;
  src: string;
  source: string;
  width: number;
  height: number;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  defaultCategory: CharacterAssetCategory;
  layerOrder: number;
  tags: string[];
};

export type CharacterAssetClassification = Record<string, CharacterAssetCategory>;

export const CHARACTER_ASSET_CATALOG: CharacterAsset[] = [
  {
    "id": "character_asset_0",
    "label": "modernexteriors win 1 21 Beach 16x16 Ship Bar Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_1.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_1",
    "label": "modernexteriors win 1 21 Beach 16x16 Ship Bar Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_1_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_2",
    "label": "modernexteriors win 1 21 Beach 16x16 Ship Bar Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_3",
    "label": "modernexteriors win 1 21 Beach 16x16 Ship Bar Chair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_16x16_Ship_Bar_Chair_2_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_4",
    "label": "modernexteriors win 1 21 Beach 32x32 Ship Bar Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_1.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_5",
    "label": "modernexteriors win 1 21 Beach 32x32 Ship Bar Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_1_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_6",
    "label": "modernexteriors win 1 21 Beach 32x32 Ship Bar Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_7",
    "label": "modernexteriors win 1 21 Beach 32x32 Ship Bar Chair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_32x32_Ship_Bar_Chair_2_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_8",
    "label": "modernexteriors win 1 21 Beach 48x48 Ship Bar Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_1.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_9",
    "label": "modernexteriors win 1 21 Beach 48x48 Ship Bar Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_1_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_10",
    "label": "modernexteriors win 1 21 Beach 48x48 Ship Bar Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_11",
    "label": "modernexteriors win 1 21 Beach 48x48 Ship Bar Chair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_21_Beach_48x48_Ship_Bar_Chair_2_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_12",
    "label": "modernexteriors win 1 23 MIlitary Base 16x16 Military Tent Table With Chair",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Military_Tent_Table_With_Chair.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Military_Tent_Table_With_Chair.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_13",
    "label": "modernexteriors win 1 23 MIlitary Base 16x16 Military Tent Table With Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Military_Tent_Table_With_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Military_Tent_Table_With_Chair_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_14",
    "label": "modernexteriors win 1 23 MIlitary Base 16x16 Soldier Helmet",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Soldier_Helmet.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Soldier_Helmet.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_15",
    "label": "modernexteriors win 1 23 MIlitary Base 16x16 Soldier Helmet 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Soldier_Helmet_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_16x16_Soldier_Helmet_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_16",
    "label": "modernexteriors win 1 23 MIlitary Base 32x32 Soldier Helmet",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_32x32_Soldier_Helmet.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_32x32_Soldier_Helmet.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_17",
    "label": "modernexteriors win 1 23 MIlitary Base 32x32 Soldier Helmet 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_32x32_Soldier_Helmet_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_32x32_Soldier_Helmet_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_18",
    "label": "modernexteriors win 1 23 MIlitary Base 48x48 Military Tent Table With Chair",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Military_Tent_Table_With_Chair.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Military_Tent_Table_With_Chair.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_19",
    "label": "modernexteriors win 1 23 MIlitary Base 48x48 Military Tent Table With Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Military_Tent_Table_With_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Military_Tent_Table_With_Chair_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_20",
    "label": "modernexteriors win 1 23 MIlitary Base 48x48 Soldier Helmet",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Soldier_Helmet.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Soldier_Helmet.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_21",
    "label": "modernexteriors win 1 23 MIlitary Base 48x48 Soldier Helmet 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Soldier_Helmet_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_23_MIlitary_Base_48x48_Soldier_Helmet_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_22",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair Grey 16x16",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_16x16.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_16x16.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_23",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair Grey 16x16 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_16x16_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_16x16_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_24",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair Grey 48x48",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_48x48.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_48x48.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_25",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair Grey 48x48 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_48x48_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_Grey_48x48_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_26",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair White 16x16",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_16x16.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_16x16.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_27",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair White 16x16 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_16x16_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_16x16_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_28",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair White 48x48",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_48x48.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_48x48.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_29",
    "label": "modernexteriors win 1 24 Additional Houses Modern House Deck Chair White 48x48 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_48x48_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_24_Additional_Houses_Modern_House_Deck_Chair_White_48x48_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_30",
    "label": "modernexteriors win 1 ME Singles Camping 16x16 Pier Clothes 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_1.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_31",
    "label": "modernexteriors win 1 ME Singles Camping 16x16 Pier Clothes 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_1_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_32",
    "label": "modernexteriors win 1 ME Singles Camping 16x16 Pier Clothes 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_33",
    "label": "modernexteriors win 1 ME Singles Camping 16x16 Pier Clothes 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_2_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_34",
    "label": "modernexteriors win 1 ME Singles Camping 16x16 Pier Clothes 3",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_3.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_3.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_35",
    "label": "modernexteriors win 1 ME Singles Camping 16x16 Pier Clothes 3 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_3_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_16x16_Pier_Clothes_3_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_36",
    "label": "modernexteriors win 1 ME Singles Camping 32x32 Pier Clothes 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_1.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_37",
    "label": "modernexteriors win 1 ME Singles Camping 32x32 Pier Clothes 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_1_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_38",
    "label": "modernexteriors win 1 ME Singles Camping 32x32 Pier Clothes 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_39",
    "label": "modernexteriors win 1 ME Singles Camping 32x32 Pier Clothes 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_2_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_40",
    "label": "modernexteriors win 1 ME Singles Camping 32x32 Pier Clothes 3",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_3.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_3.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_41",
    "label": "modernexteriors win 1 ME Singles Camping 32x32 Pier Clothes 3 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_3_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_32x32_Pier_Clothes_3_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_42",
    "label": "modernexteriors win 1 ME Singles Camping 48x48 Pier Clothes 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_1.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_43",
    "label": "modernexteriors win 1 ME Singles Camping 48x48 Pier Clothes 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_1_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_44",
    "label": "modernexteriors win 1 ME Singles Camping 48x48 Pier Clothes 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_45",
    "label": "modernexteriors win 1 ME Singles Camping 48x48 Pier Clothes 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_2_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_46",
    "label": "modernexteriors win 1 ME Singles Camping 48x48 Pier Clothes 3",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_3.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_3.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_47",
    "label": "modernexteriors win 1 ME Singles Camping 48x48 Pier Clothes 3 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_3_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Camping_48x48_Pier_Clothes_3_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_48",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 16x16 Lifeguard Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_1.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_49",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 16x16 Lifeguard Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_1_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_50",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 16x16 Lifeguard Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_51",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 16x16 Lifeguard Chair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_16x16_Lifeguard_Chair_2_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_52",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 32x32 Lifeguard Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_1.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_53",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 32x32 Lifeguard Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_1_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_54",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 32x32 Lifeguard Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_55",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 32x32 Lifeguard Chair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_32x32_Lifeguard_Chair_2_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_56",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 48x48 Lifeguard Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_1.png",
    "width": 144,
    "height": 144,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 3,
    "rows": 3,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_57",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 48x48 Lifeguard Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_1_2.png",
    "width": 144,
    "height": 144,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 3,
    "rows": 3,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_58",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 48x48 Lifeguard Chair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_2.png",
    "width": 144,
    "height": 144,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 3,
    "rows": 3,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_59",
    "label": "modernexteriors win 1 ME Singles Swimming Pool 48x48 Lifeguard Chair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Swimming_Pool_48x48_Lifeguard_Chair_2_2.png",
    "width": 144,
    "height": 144,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 3,
    "rows": 3,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "guard",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_60",
    "label": "modernexteriors win 1 ME Singles Vehicles 16x16 Street Food Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_16x16_Street_Food_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_16x16_Street_Food_Chair_1.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_61",
    "label": "modernexteriors win 1 ME Singles Vehicles 16x16 Street Food Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_16x16_Street_Food_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_16x16_Street_Food_Chair_1_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_62",
    "label": "modernexteriors win 1 ME Singles Vehicles 32x32 Street Food Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_32x32_Street_Food_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_32x32_Street_Food_Chair_1.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_63",
    "label": "modernexteriors win 1 ME Singles Vehicles 32x32 Street Food Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_32x32_Street_Food_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_32x32_Street_Food_Chair_1_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_64",
    "label": "modernexteriors win 1 ME Singles Vehicles 48x48 Street Food Chair 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_48x48_Street_Food_Chair_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_48x48_Street_Food_Chair_1.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_65",
    "label": "modernexteriors win 1 ME Singles Vehicles 48x48 Street Food Chair 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_48x48_Street_Food_Chair_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Vehicles_48x48_Street_Food_Chair_1_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_66",
    "label": "modernexteriors win 1 ME Singles Villas 16x16 Armchair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_16x16_Armchair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_16x16_Armchair_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_67",
    "label": "modernexteriors win 1 ME Singles Villas 16x16 Armchair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_16x16_Armchair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_16x16_Armchair_2_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_68",
    "label": "modernexteriors win 1 ME Singles Villas 48x48 Armchair 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_48x48_Armchair_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_48x48_Armchair_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_69",
    "label": "modernexteriors win 1 ME Singles Villas 48x48 Armchair 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_48x48_Armchair_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Villas_48x48_Armchair_2_2.png",
    "width": 96,
    "height": 96,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 2,
    "rows": 2,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_70",
    "label": "modernexteriors win 1 ME Singles Worksite 16x16 Helmet 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_1.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_71",
    "label": "modernexteriors win 1 ME Singles Worksite 16x16 Helmet 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_1_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_72",
    "label": "modernexteriors win 1 ME Singles Worksite 16x16 Helmet 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_73",
    "label": "modernexteriors win 1 ME Singles Worksite 16x16 Helmet 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_16x16_Helmet_2_2.png",
    "width": 16,
    "height": 16,
    "frameWidth": 16,
    "frameHeight": 16,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_74",
    "label": "modernexteriors win 1 ME Singles Worksite 32x32 Helmet 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_1.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_75",
    "label": "modernexteriors win 1 ME Singles Worksite 32x32 Helmet 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_1_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_76",
    "label": "modernexteriors win 1 ME Singles Worksite 32x32 Helmet 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_77",
    "label": "modernexteriors win 1 ME Singles Worksite 32x32 Helmet 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_32x32_Helmet_2_2.png",
    "width": 32,
    "height": 32,
    "frameWidth": 32,
    "frameHeight": 32,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_78",
    "label": "modernexteriors win 1 ME Singles Worksite 48x48 Helmet 1",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_1.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_1.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_79",
    "label": "modernexteriors win 1 ME Singles Worksite 48x48 Helmet 1 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_1_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_1_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_80",
    "label": "modernexteriors win 1 ME Singles Worksite 48x48 Helmet 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_81",
    "label": "modernexteriors win 1 ME Singles Worksite 48x48 Helmet 2 2",
    "src": "/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_2_2.png",
    "source": "public/assets/limezu/asset-catalog/modernexteriors_win_1_ME_Singles_Worksite_48x48_Helmet_2_2.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hat",
    "layerOrder": 50,
    "tags": [
      "helmet",
      "modern",
      "limezu"
    ]
  },
  {
    "id": "character_asset_82",
    "label": "accessory 01 ladybug 48x48 01",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_83",
    "label": "accessory 01 ladybug 48x48 02",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_84",
    "label": "accessory 01 ladybug 48x48 03",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_85",
    "label": "accessory 01 ladybug 48x48 04",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_01_ladybug_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_86",
    "label": "accessory 02 bee 48x48 01",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_87",
    "label": "accessory 02 bee 48x48 02",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_88",
    "label": "accessory 02 bee 48x48 03",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_02_bee_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_89",
    "label": "accessory 03 backpack 48x48 01",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_90",
    "label": "accessory 03 backpack 48x48 02",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_91",
    "label": "accessory 03 backpack 48x48 03",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_92",
    "label": "accessory 03 backpack 48x48 04",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_93",
    "label": "accessory 03 backpack 48x48 05",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_05.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_94",
    "label": "accessory 03 backpack 48x48 06",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_06.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_95",
    "label": "accessory 03 backpack 48x48 07",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_07.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_96",
    "label": "accessory 03 backpack 48x48 08",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_08.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_08.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_97",
    "label": "accessory 03 backpack 48x48 09",
    "src": "/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_09.png",
    "source": "public/assets/limezu/characters/atlases/accessory/accessory_03_backpack_48x48_09.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_98",
    "label": "none",
    "src": "/assets/limezu/characters/atlases/accessory/none.png",
    "source": "public/assets/limezu/characters/atlases/accessory/none.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "accessory",
    "layerOrder": 70,
    "tags": [
      "accessory",
      "limezu"
    ]
  },
  {
    "id": "character_asset_99",
    "label": "body 48x48 01",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_01.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_100",
    "label": "body 48x48 02",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_02.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_101",
    "label": "body 48x48 03",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_03.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_102",
    "label": "body 48x48 04",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_04.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_103",
    "label": "body 48x48 05",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_05.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_104",
    "label": "body 48x48 06",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_06.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_105",
    "label": "body 48x48 07",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_07.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_106",
    "label": "body 48x48 08",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_08.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_08.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_107",
    "label": "body 48x48 09",
    "src": "/assets/limezu/characters/atlases/body/body_48x48_09.png",
    "source": "public/assets/limezu/characters/atlases/body/body_48x48_09.png",
    "width": 2781,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 57,
    "rows": 41,
    "defaultCategory": "body",
    "layerOrder": 10,
    "tags": [
      "body",
      "limezu"
    ]
  },
  {
    "id": "character_asset_108",
    "label": "eyes 48x48 01",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_109",
    "label": "eyes 48x48 02",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_110",
    "label": "eyes 48x48 03",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_111",
    "label": "eyes 48x48 04",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_112",
    "label": "eyes 48x48 05",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_05.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_113",
    "label": "eyes 48x48 06",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_06.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_114",
    "label": "eyes 48x48 07",
    "src": "/assets/limezu/characters/atlases/eyes/eyes_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/eyes/eyes_48x48_07.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_115",
    "label": "none",
    "src": "/assets/limezu/characters/atlases/eyes/none.png",
    "source": "public/assets/limezu/characters/atlases/eyes/none.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "eyes",
    "layerOrder": 20,
    "tags": [
      "eyes",
      "limezu"
    ]
  },
  {
    "id": "character_asset_116",
    "label": "hairstyle 01 48x48 01",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_117",
    "label": "hairstyle 01 48x48 02",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_118",
    "label": "hairstyle 01 48x48 03",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_119",
    "label": "hairstyle 01 48x48 04",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_120",
    "label": "hairstyle 01 48x48 05",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_05.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_121",
    "label": "hairstyle 01 48x48 06",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_06.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_122",
    "label": "hairstyle 01 48x48 07",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_01_48x48_07.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_123",
    "label": "hairstyle 02 48x48 01",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_124",
    "label": "hairstyle 02 48x48 02",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_125",
    "label": "hairstyle 02 48x48 03",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_126",
    "label": "hairstyle 02 48x48 04",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_127",
    "label": "hairstyle 02 48x48 05",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_05.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_128",
    "label": "hairstyle 02 48x48 06",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_06.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_129",
    "label": "hairstyle 02 48x48 07",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_02_48x48_07.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_130",
    "label": "hairstyle 03 48x48 01",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_131",
    "label": "hairstyle 03 48x48 02",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_132",
    "label": "hairstyle 03 48x48 03",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_133",
    "label": "hairstyle 03 48x48 04",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_134",
    "label": "hairstyle 03 48x48 05",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_05.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_135",
    "label": "hairstyle 03 48x48 06",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_06.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_136",
    "label": "hairstyle 03 48x48 07",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_03_48x48_07.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_137",
    "label": "hairstyle 04 48x48 01",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_138",
    "label": "hairstyle 04 48x48 02",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_139",
    "label": "hairstyle 04 48x48 03",
    "src": "/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/hair/hairstyle_04_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_140",
    "label": "none",
    "src": "/assets/limezu/characters/atlases/hair/none.png",
    "source": "public/assets/limezu/characters/atlases/hair/none.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "hair",
    "layerOrder": 30,
    "tags": [
      "hair",
      "limezu"
    ]
  },
  {
    "id": "character_asset_141",
    "label": "none",
    "src": "/assets/limezu/characters/atlases/outfit/none.png",
    "source": "public/assets/limezu/characters/atlases/outfit/none.png",
    "width": 48,
    "height": 48,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 1,
    "rows": 1,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_142",
    "label": "outfit 01 48x48 01",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_143",
    "label": "outfit 01 48x48 02",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_144",
    "label": "outfit 01 48x48 03",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_145",
    "label": "outfit 01 48x48 04",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_146",
    "label": "outfit 01 48x48 05",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_05.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_05.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_147",
    "label": "outfit 01 48x48 06",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_06.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_06.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_148",
    "label": "outfit 01 48x48 07",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_07.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_07.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_149",
    "label": "outfit 01 48x48 08",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_08.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_08.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_150",
    "label": "outfit 01 48x48 09",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_09.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_09.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_151",
    "label": "outfit 01 48x48 10",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_01_48x48_10.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_01_48x48_10.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_152",
    "label": "outfit 02 48x48 01",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_02_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_153",
    "label": "outfit 02 48x48 02",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_02_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_154",
    "label": "outfit 02 48x48 03",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_02_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_155",
    "label": "outfit 02 48x48 04",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_02_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_02_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_156",
    "label": "outfit 03 48x48 01",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_03_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_157",
    "label": "outfit 03 48x48 02",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_03_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_158",
    "label": "outfit 03 48x48 03",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_03_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_159",
    "label": "outfit 03 48x48 04",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_03_48x48_04.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_03_48x48_04.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_160",
    "label": "outfit 04 48x48 01",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_04_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_04_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_161",
    "label": "outfit 04 48x48 02",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_04_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_04_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_162",
    "label": "outfit 04 48x48 03",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_04_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_04_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_163",
    "label": "outfit 05 48x48 01",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_05_48x48_01.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_05_48x48_01.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_164",
    "label": "outfit 05 48x48 02",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_05_48x48_02.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_05_48x48_02.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  },
  {
    "id": "character_asset_165",
    "label": "outfit 05 48x48 03",
    "src": "/assets/limezu/characters/atlases/outfit/outfit_05_48x48_03.png",
    "source": "public/assets/limezu/characters/atlases/outfit/outfit_05_48x48_03.png",
    "width": 2688,
    "height": 1968,
    "frameWidth": 48,
    "frameHeight": 48,
    "columns": 56,
    "rows": 41,
    "defaultCategory": "outfit",
    "layerOrder": 40,
    "tags": [
      "outfit",
      "limezu"
    ]
  }
];
