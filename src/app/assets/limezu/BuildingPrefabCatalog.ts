export type BuildingCatalogLayer = "base" | "decor" | "collision";

export type BuildingCatalogTile = {
  x: number;
  y: number;
  layer: BuildingCatalogLayer;
  assetId?: string;
  src?: string;
  width?: number;
  height?: number;
  collision?: boolean;
};

export type BuildingCatalogPrefab = {
  id: string;
  name: string;
  kind: "house" | "shop" | "healing" | "station" | "hall";
  color: "default" | "purple" | "red" | "green" | "white" | "orange" | "blue" | "yellow";
  width: number;
  height: number;
  tiles: BuildingCatalogTile[];
  entrance: {
    x: number;
    y: number;
  };
  entrances?: Array<{
    x: number;
    y: number;
  }>;
  tags: string[];
};

export const BUILDING_PREFAB_CATALOG = [
  {
    "id": "building-healing",
    "name": "Healing",
    "kind": "healing",
    "color": "default",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 5,
        "y": 0,
        "layer": "decor",
        "assetId": "asset_tileset3_mv_00_06",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 0,
        "layer": "decor",
        "assetId": "asset_tileset3_mv_00_07",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_tileset3_mv_01_06",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_tileset3_mv_01_07",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 1,
        "layer": "base",
        "assetId": "asset_tileset3_mv_00_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_00_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 2,
        "layer": "decor",
        "assetId": "asset_tileset3_mv_04_06",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 2,
        "layer": "decor",
        "assetId": "asset_tileset3_mv_04_07",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_tileset3_mv_01_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_01_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_tileset3_mv_03_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_03_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_tileset3_mv_04_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_04_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_tileset3_mv_07_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_07_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "base",
        "assetId": "asset_tileset3_mv_08_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_08_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 7,
        "layer": "base",
        "assetId": "asset_tileset3_mv_09_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 8,
        "layer": "base",
        "assetId": "asset_tileset3_mv_10_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_05.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 5,
      "y": 7
    },
    "entrances": [
      {
        "x": 5,
        "y": 7
      },
      {
        "x": 6,
        "y": 7
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-shop",
    "name": "Shop",
    "kind": "shop",
    "color": "default",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_13_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_13_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_13_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "decor",
        "assetId": "asset_buildingset2_09_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "decor",
        "assetId": "asset_buildingset2_00_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_12_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_12_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_14_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset4_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset4_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_06.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 6,
      "y": 7
    },
    "entrances": [
      {
        "x": 6,
        "y": 7
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-station",
    "name": "Station",
    "kind": "station",
    "color": "default",
    "width": 20,
    "height": 10,
    "tiles": [
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_06_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_06_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_01_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_01_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_01_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_07_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_02_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_02_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_02_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_02_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_02_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_02_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_03_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_03_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_00_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_00_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_00_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_00_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_00_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_00_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_03_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_03_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_04_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_04_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_01_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_01_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_01_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_01_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_04_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_04_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_05_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_05_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_05_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_05_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_05_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_05_04.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 6,
      "y": 5
    },
    "entrances": [
      {
        "x": 6,
        "y": 5
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-treehouse",
    "name": "Treehouse",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 5,
        "y": 14,
        "layer": "base",
        "assetId": "asset_buildingset10_03_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 14,
        "layer": "base",
        "assetId": "asset_buildingset10_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 14,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 14,
        "layer": "base",
        "assetId": "asset_buildingset10_00_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 14,
        "layer": "base",
        "assetId": "asset_buildingset10_00_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 14,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 14,
        "layer": "base",
        "assetId": "asset_buildingset10_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 14,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 14,
        "layer": "base",
        "assetId": "asset_buildingset10_00_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_01_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_01_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 15,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 15,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 15,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 15,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 15,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 15,
        "layer": "base",
        "assetId": "asset_buildingset10_02_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_03_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 16,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 16,
        "layer": "base",
        "assetId": "asset_buildingset10_00_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_04_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 17,
        "layer": "base",
        "assetId": "asset_buildingset10_01_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_01_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 17,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_05_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 18,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 18,
        "layer": "base",
        "assetId": "asset_buildingset10_02_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 19,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 19,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 19,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 19,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 19,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 19,
        "layer": "base",
        "assetId": "asset_buildingset10_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 19,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 20,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 20,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 20,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 20,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 20,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 20,
        "layer": "base",
        "assetId": "asset_buildingset10_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 20,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 21,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 21,
        "layer": "base",
        "assetId": "asset_buildingset10_08_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 21,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 22,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 22,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 22,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 22,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 22,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 22,
        "layer": "base",
        "assetId": "asset_buildingset10_09_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 22,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 23,
        "layer": "base",
        "assetId": "asset_buildingset10_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 23,
        "layer": "base",
        "assetId": "asset_buildingset10_10_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 23,
        "layer": "base",
        "assetId": "asset_buildingset10_10_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 23,
        "layer": "base",
        "assetId": "asset_buildingset10_10_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 23,
        "layer": "base",
        "assetId": "asset_buildingset10_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 23,
        "layer": "base",
        "assetId": "asset_buildingset10_10_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_06.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 9,
      "y": 20
    },
    "entrances": [
      {
        "x": 9,
        "y": 20
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  }
] as const satisfies readonly BuildingCatalogPrefab[];
