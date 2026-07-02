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
    "id": "building-house0",
    "name": "House0",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset5_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset5_00_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_00_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset5_00_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_00_04.png",
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
        "assetId": "asset_buildingset5_00_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_00_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset5_01_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset5_01_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset5_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset5_01_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_03.png",
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
        "assetId": "asset_buildingset5_01_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_04.png",
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
        "assetId": "asset_buildingset5_01_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_05.png",
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
        "assetId": "asset_buildingset5_01_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_06.png",
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
        "assetId": "asset_buildingset5_01_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_01_07.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset5_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset5_02_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset5_02_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset5_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_03.png",
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
        "assetId": "asset_buildingset5_02_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_04.png",
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
        "assetId": "asset_buildingset5_02_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_05.png",
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
        "assetId": "asset_buildingset5_02_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_06.png",
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
        "assetId": "asset_buildingset5_02_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_02_07.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset5_04_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset5_04_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset5_04_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset5_04_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_03.png",
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
        "assetId": "asset_buildingset5_04_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_04.png",
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
        "assetId": "asset_buildingset5_04_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_05.png",
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
        "assetId": "asset_buildingset5_04_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_06.png",
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
        "assetId": "asset_buildingset5_04_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_04_07.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset5_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset5_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset5_05_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset5_05_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_03.png",
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
        "assetId": "asset_buildingset5_05_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_04.png",
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
        "assetId": "asset_buildingset5_05_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_05.png",
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
        "assetId": "asset_buildingset5_05_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_06.png",
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
        "assetId": "asset_buildingset5_05_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_05_07.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset5_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset5_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset5_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset5_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_03.png",
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
        "assetId": "asset_buildingset5_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_04.png",
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
        "assetId": "asset_buildingset5_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_05.png",
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
        "assetId": "asset_buildingset5_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_06.png",
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
        "assetId": "asset_buildingset5_06_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_06_07.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset5_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset5_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset5_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset5_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_03.png",
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
        "assetId": "asset_buildingset5_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_04.png",
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
        "assetId": "asset_buildingset5_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_05.png",
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
        "assetId": "asset_buildingset5_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_06.png",
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
        "assetId": "asset_buildingset5_07_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_07_07.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset5_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset5_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset5_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset5_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_03.png",
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
        "assetId": "asset_buildingset5_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_04.png",
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
        "assetId": "asset_buildingset5_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_05.png",
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
        "assetId": "asset_buildingset5_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_06.png",
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
        "assetId": "asset_buildingset5_08_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_08_07.png",
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
        "x": 0,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset5_09_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_09_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset5_10_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_10_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset5_11_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_11_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset5_12_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset5_12_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 11,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 2,
      "y": 9
    },
    "entrances": [
      {
        "x": 2,
        "y": 9
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house1",
    "name": "House1",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_06_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_06_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_06_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_06_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_06_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_06_09.png",
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
        "assetId": "asset_buildingset3_06_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_06_13.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_08_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_08_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_08_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_08_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_08_11.png",
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
        "assetId": "asset_buildingset3_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_08_11.png",
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
        "assetId": "asset_buildingset3_08_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_08_13.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_09_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_09_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_09_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_09_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_09_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_09_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_09_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_09_11.png",
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
        "assetId": "asset_buildingset3_09_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_09_12.png",
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
        "assetId": "asset_buildingset3_09_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_09_13.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_10_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_10_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_10_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_10_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_10_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_10_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_10_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_10_11.png",
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
        "assetId": "asset_buildingset3_10_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_10_12.png",
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
        "assetId": "asset_buildingset3_10_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_10_13.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_11_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_11_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_11_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_11_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_11_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_11_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_11_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_11_11.png",
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
        "assetId": "asset_buildingset3_11_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_11_12.png",
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
        "assetId": "asset_buildingset3_11_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_11_13.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_12_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_12_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_12_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_12_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_12_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_12_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_12_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_12_11.png",
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
        "assetId": "asset_buildingset3_12_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_12_12.png",
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
        "assetId": "asset_buildingset3_12_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_12_13.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_13_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_13_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_13_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_13_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_11.png",
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
        "assetId": "asset_buildingset3_13_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_12.png",
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
        "assetId": "asset_buildingset3_13_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_13.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_14_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_14_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_14_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_14_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_11.png",
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
        "assetId": "asset_buildingset3_14_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_12.png",
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
        "assetId": "asset_buildingset3_14_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_13.png",
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
        "x": 0,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset3_15_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset3_15_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset3_15_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset3_15_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset3_15_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset3_15_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_13.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 2,
      "y": 8
    },
    "entrances": [
      {
        "x": 2,
        "y": 8
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house2",
    "name": "House2",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_13_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset3_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_03.png",
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
        "assetId": "asset_buildingset3_13_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_13_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_14_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_14_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_15_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_15_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset3_15_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_03.png",
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
        "assetId": "asset_buildingset3_15_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_03.png",
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
        "assetId": "asset_buildingset3_15_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_15_05.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_00_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_00_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_00_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_00_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_00_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset3_00_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_00_11.png",
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
        "assetId": "asset_buildingset3_00_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_00_12.png",
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
        "assetId": "asset_buildingset3_00_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_00_13.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_01_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_01_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_01_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_01_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_01_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_01_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset3_01_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_01_11.png",
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
        "assetId": "asset_buildingset3_01_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_01_12.png",
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
        "assetId": "asset_buildingset3_01_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_01_13.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_02_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_02_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_02_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_02_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_02_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_02_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset3_02_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_02_11.png",
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
        "assetId": "asset_buildingset3_02_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_02_12.png",
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
        "assetId": "asset_buildingset3_02_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_02_13.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_03_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_03_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_03_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_03_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_03_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_03_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset3_03_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_03_11.png",
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
        "assetId": "asset_buildingset3_03_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_03_12.png",
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
        "assetId": "asset_buildingset3_03_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_03_13.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_04_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_04_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_04_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_04_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_04_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_04_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset3_04_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_04_11.png",
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
        "assetId": "asset_buildingset3_04_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_04_12.png",
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
        "assetId": "asset_buildingset3_04_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_04_13.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_05_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_05_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_05_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_05_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_05_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_05_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_05_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_05_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_05_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_05_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset3_05_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset3_05_13.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 1,
      "y": 6
    },
    "entrances": [
      {
        "x": 1,
        "y": 6
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house3",
    "name": "House3",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset1_13_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_13_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset1_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset1_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset1_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset1_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_13_01.png",
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
        "assetId": "asset_buildingset1_13_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_13_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset1_14_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_14_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset1_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_14_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset1_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_14_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset1_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_14_01.png",
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
        "assetId": "asset_buildingset1_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_14_01.png",
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
        "assetId": "asset_buildingset1_14_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_14_05.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset1_00_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_00_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset1_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_00_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset1_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_00_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset1_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_00_09.png",
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
        "assetId": "asset_buildingset1_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_00_09.png",
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
        "assetId": "asset_buildingset1_00_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_00_13.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset1_03_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_03_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset1_03_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_03_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset1_03_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_03_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset1_03_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_03_11.png",
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
        "assetId": "asset_buildingset1_03_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_03_12.png",
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
        "assetId": "asset_buildingset1_03_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_03_13.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset1_04_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_04_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset1_04_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_04_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset1_04_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_04_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset1_04_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_04_11.png",
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
        "assetId": "asset_buildingset1_04_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_04_12.png",
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
        "assetId": "asset_buildingset1_04_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_04_13.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset1_05_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_05_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset1_05_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_05_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset1_05_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_05_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset1_05_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_05_11.png",
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
        "assetId": "asset_buildingset1_05_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_05_12.png",
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
        "assetId": "asset_buildingset1_05_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_05_13.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset1_06_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_06_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset1_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_06_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset1_06_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_06_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset1_06_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_06_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset1_06_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_06_12.png",
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
        "assetId": "asset_buildingset1_06_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_06_13.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset1_07_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_07_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset1_07_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_07_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset1_07_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_07_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset1_07_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_07_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset1_07_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_07_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset1_07_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset1_07_13.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 2,
      "y": 6
    },
    "entrances": [
      {
        "x": 2,
        "y": 6
      },
      {
        "x": 3,
        "y": 6
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house4",
    "name": "House4",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_04.png",
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
        "assetId": "asset_buildingset2_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
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
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
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
        "assetId": "asset_buildingset2_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_05.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
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
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
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
        "x": 4,
        "y": 2,
        "layer": "decor",
        "assetId": "asset_buildingset26_12_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset26_12_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_05.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
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
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
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
        "assetId": "asset_buildingset2_12_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_05.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_13.png",
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
        "assetId": "asset_buildingset2_00_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_14.png",
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
        "assetId": "asset_buildingset2_00_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_15.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_13.png",
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
        "assetId": "asset_buildingset2_01_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_14.png",
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
        "assetId": "asset_buildingset2_01_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_15.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_13.png",
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
        "assetId": "asset_buildingset2_02_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_14.png",
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
        "assetId": "asset_buildingset2_02_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 1,
      "y": 5
    },
    "entrances": [
      {
        "x": 1,
        "y": 5
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house5",
    "name": "House5",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_03_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_03_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_03_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_03_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_03_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_03_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_03_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_03_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_03_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_03_14.png",
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
        "assetId": "asset_buildingset2_03_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_03_15.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_04_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_04_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_04_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_04_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_buildingset19_11_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset19_11_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_04_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_04_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_04_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_04_12.png",
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
        "x": 3,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_buildingset19_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset19_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_04_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_04_12.png",
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
        "x": 4,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_buildingset19_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset19_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_04_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_04_15.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_06_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_06_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_06_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_06_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_06_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_06_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_06_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_06_13.png",
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
        "assetId": "asset_buildingset2_06_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_06_14.png",
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
        "assetId": "asset_buildingset2_06_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_06_15.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_07_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_07_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_07_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_07_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_13.png",
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
        "assetId": "asset_buildingset2_07_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_14.png",
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
        "assetId": "asset_buildingset2_07_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_15.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_08_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_08_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_08_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_13.png",
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
        "assetId": "asset_buildingset2_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_14.png",
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
        "assetId": "asset_buildingset2_08_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_15.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_07_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_07_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_07_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_07_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_13.png",
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
        "assetId": "asset_buildingset2_07_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_14.png",
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
        "assetId": "asset_buildingset2_07_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_15.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_08_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_14.png",
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
        "assetId": "asset_buildingset2_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_14.png",
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
        "assetId": "asset_buildingset2_08_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_08_15.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset2_07_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset2_07_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset2_07_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset2_07_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_13.png",
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
        "assetId": "asset_buildingset2_07_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_14.png",
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
        "assetId": "asset_buildingset2_07_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_07_15.png",
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
        "x": 0,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset2_10_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset2_10_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset2_10_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset2_10_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset2_10_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset2_10_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset2_11_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset2_11_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset2_11_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset2_11_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset2_11_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset2_11_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset2_12_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset2_12_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset2_12_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset2_12_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset2_12_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset2_12_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset2_13_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_13_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset2_13_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_13_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset2_13_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_13_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset2_13_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_13_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset2_13_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_13_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset2_13_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_13_15.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 10,
      "y": 17
    },
    "entrances": [
      {
        "x": 10,
        "y": 17
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house6",
    "name": "House6",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset2_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_04.png",
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
        "assetId": "asset_buildingset2_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
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
        "assetId": "asset_buildingset2_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_01.png",
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
        "assetId": "asset_buildingset2_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_10_05.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
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
        "assetId": "asset_buildingset2_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_01.png",
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
        "x": 4,
        "y": 2,
        "layer": "decor",
        "assetId": "asset_buildingset26_12_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset26_12_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset2_11_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_11_05.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
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
        "assetId": "asset_buildingset2_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_01.png",
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
        "assetId": "asset_buildingset2_12_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_12_05.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset2_00_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_13.png",
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
        "assetId": "asset_buildingset2_00_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_14.png",
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
        "assetId": "asset_buildingset2_00_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_15.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset2_01_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_13.png",
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
        "assetId": "asset_buildingset2_01_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_14.png",
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
        "assetId": "asset_buildingset2_01_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_01_15.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset2_02_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_13.png",
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
        "assetId": "asset_buildingset2_02_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_14.png",
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
        "assetId": "asset_buildingset2_02_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_02_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 6,
        "layer": "collision",
        "collision": true
      }
    ],
    "entrance": {
      "x": 1,
      "y": 5
    },
    "entrances": [
      {
        "x": 1,
        "y": 5
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house7",
    "name": "House7",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset6_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset6_00_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_00_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset6_00_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_00_04.png",
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
        "assetId": "asset_buildingset6_00_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_00_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_01_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_01_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_01_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_03.png",
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
        "assetId": "asset_buildingset6_01_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_04.png",
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
        "assetId": "asset_buildingset6_01_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_05.png",
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
        "assetId": "asset_buildingset6_01_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_06.png",
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
        "assetId": "asset_buildingset6_01_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_07.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_02_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_02_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_03.png",
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
        "assetId": "asset_buildingset6_02_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_04.png",
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
        "assetId": "asset_buildingset6_02_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_05.png",
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
        "assetId": "asset_buildingset6_02_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_06.png",
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
        "assetId": "asset_buildingset6_02_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_07.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_04_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_04_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_04_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_10_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_08.png",
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
        "assetId": "asset_buildingset6_10_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_09.png",
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
        "assetId": "asset_buildingset6_04_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_05.png",
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
        "assetId": "asset_buildingset6_04_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_06.png",
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
        "assetId": "asset_buildingset6_04_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_07.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_05_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_11_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_08.png",
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
        "assetId": "asset_buildingset6_11_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_09.png",
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
        "assetId": "asset_buildingset6_05_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_05.png",
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
        "assetId": "asset_buildingset6_05_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_06.png",
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
        "assetId": "asset_buildingset6_05_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_07.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_03.png",
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
        "assetId": "asset_buildingset6_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_04.png",
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
        "assetId": "asset_buildingset6_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_05.png",
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
        "assetId": "asset_buildingset6_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_06.png",
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
        "assetId": "asset_buildingset6_06_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_07.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_03.png",
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
        "assetId": "asset_buildingset6_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_04.png",
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
        "assetId": "asset_buildingset6_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_05.png",
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
        "assetId": "asset_buildingset6_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_06.png",
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
        "assetId": "asset_buildingset6_07_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_07.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_03.png",
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
        "assetId": "asset_buildingset6_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_04.png",
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
        "assetId": "asset_buildingset6_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_05.png",
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
        "assetId": "asset_buildingset6_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_06.png",
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
        "assetId": "asset_buildingset6_08_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_07.png",
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
        "x": 0,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_09_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_10_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_10_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_11_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_11_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_12_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_07.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 2,
      "y": 9
    },
    "entrances": [
      {
        "x": 2,
        "y": 9
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-house8",
    "name": "House8",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset6_13_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_13_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset6_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_13_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset6_13_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_13_04.png",
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
        "assetId": "asset_buildingset6_13_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_13_05.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_14_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_14_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset6_14_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_03.png",
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
        "assetId": "asset_buildingset6_14_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_04.png",
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
        "assetId": "asset_buildingset6_14_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_05.png",
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
        "assetId": "asset_buildingset6_14_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_06.png",
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
        "assetId": "asset_buildingset6_14_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_07.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_00_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_00_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_15_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_15_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset6_15_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_03.png",
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
        "assetId": "asset_buildingset6_15_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_04.png",
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
        "assetId": "asset_buildingset6_15_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_05.png",
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
        "assetId": "asset_buildingset6_15_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_06.png",
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
        "assetId": "asset_buildingset6_15_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_15_07.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_01_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_01_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_01_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset6_12_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_08.png",
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
        "assetId": "asset_buildingset6_12_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_12_09.png",
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
        "assetId": "asset_buildingset6_01_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_13.png",
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
        "assetId": "asset_buildingset6_01_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_14.png",
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
        "assetId": "asset_buildingset6_01_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_01_15.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_02_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_02_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_02_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset6_13_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_13_08.png",
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
        "assetId": "asset_buildingset6_13_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_13_09.png",
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
        "assetId": "asset_buildingset6_02_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_13.png",
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
        "assetId": "asset_buildingset6_02_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_14.png",
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
        "assetId": "asset_buildingset6_02_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_02_15.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_14_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_03_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_03_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_14_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_14_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset6_03_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_03_11.png",
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
        "assetId": "asset_buildingset6_03_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_03_12.png",
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
        "assetId": "asset_buildingset6_03_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_03_13.png",
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
        "assetId": "asset_buildingset6_03_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_03_14.png",
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
        "assetId": "asset_buildingset6_03_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_03_15.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_04_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_04_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_04_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset6_04_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_11.png",
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
        "assetId": "asset_buildingset6_04_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_12.png",
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
        "assetId": "asset_buildingset6_04_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_13.png",
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
        "assetId": "asset_buildingset6_04_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_14.png",
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
        "assetId": "asset_buildingset6_04_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_04_15.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_05_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_05_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_05_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset6_05_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_11.png",
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
        "assetId": "asset_buildingset6_05_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_12.png",
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
        "assetId": "asset_buildingset6_05_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_13.png",
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
        "assetId": "asset_buildingset6_05_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_14.png",
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
        "assetId": "asset_buildingset6_05_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_05_15.png",
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
        "x": 0,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset6_06_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_06_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset6_07_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_07_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset6_08_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_08_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset6_09_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset6_09_15.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 11,
      "y": 24
    },
    "entrances": [
      {
        "x": 11,
        "y": 24
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-mushroom",
    "name": "Mushroom",
    "kind": "station",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_08_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_08_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_08_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_08_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_08_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset8_08_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_08_12.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_09_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_09_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_09_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_09_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_09_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_09_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset8_09_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_09_11.png",
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
        "assetId": "asset_buildingset8_09_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_09_12.png",
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
        "assetId": "asset_buildingset8_09_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_09_13.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_10_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_10_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_10_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_10_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_10_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_10_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset8_10_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_10_11.png",
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
        "assetId": "asset_buildingset8_10_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_10_12.png",
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
        "assetId": "asset_buildingset8_10_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_10_13.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_11_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_11_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_11_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_11_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_11_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_11_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset8_11_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_11_11.png",
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
        "assetId": "asset_buildingset8_11_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_11_12.png",
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
        "assetId": "asset_buildingset8_11_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_11_13.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_12_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_12_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_12_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_12_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_12_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_12_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset8_12_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_12_11.png",
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
        "assetId": "asset_buildingset8_12_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_12_12.png",
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
        "assetId": "asset_buildingset8_12_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_12_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_13_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_13_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_13_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_13_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_13_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_13_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset8_13_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_13_11.png",
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
        "assetId": "asset_buildingset8_13_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_13_12.png",
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
        "assetId": "asset_buildingset8_13_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_13_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset8_14_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_14_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset8_14_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_14_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset8_14_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_14_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset8_14_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_14_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset8_14_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_14_12.png",
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
        "assetId": "asset_buildingset8_14_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_14_13.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset8_15_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_15_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset8_15_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset8_15_09.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 2,
      "y": 6
    },
    "entrances": [
      {
        "x": 2,
        "y": 6
      },
      {
        "x": 3,
        "y": 6
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  },
  {
    "id": "building-new-building",
    "name": "New Building",
    "kind": "house",
    "color": "default",
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
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
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
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
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
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
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
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
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
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
        "x": 9,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 0,
        "layer": "decor",
        "assetId": "asset_buildingset28_04_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset28_04_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 0,
        "layer": "decor",
        "assetId": "asset_buildingset28_04_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset28_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset13_00_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_00_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset12_15_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_15_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset12_15_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_15_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset12_15_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_15_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_buildingset28_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset28_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset12_15_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_15_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_buildingset28_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset28_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset13_01_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_01_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset13_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_02_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_00_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_00_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_00_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_00_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_00_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_00_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 2,
        "layer": "decor",
        "assetId": "asset_buildingset28_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset28_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_00_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_00_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 2,
        "layer": "decor",
        "assetId": "asset_buildingset28_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset28_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset13_02_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_02_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset13_02_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_02_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset13_02_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_02_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset12_00_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_00_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset13_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset13_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_03_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_03_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_03_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_03_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_04_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_04_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_04_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset12_02_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_02_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_05_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_05_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_05_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_04.png",
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
        "assetId": "asset_buildingset12_05_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_05.png",
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
        "assetId": "asset_buildingset12_05_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_06.png",
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
        "assetId": "asset_buildingset12_05_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_07.png",
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
        "assetId": "asset_buildingset12_03_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_08.png",
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
        "assetId": "asset_buildingset12_03_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_09.png",
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
        "x": 10,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_03_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_03_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_03_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_03_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_03_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset12_03_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_03_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_03.png",
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
        "assetId": "asset_buildingset12_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_04.png",
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
        "assetId": "asset_buildingset12_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_05.png",
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
        "assetId": "asset_buildingset12_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_06.png",
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
        "assetId": "asset_buildingset12_06_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_07.png",
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
        "assetId": "asset_buildingset12_04_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_08.png",
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
        "assetId": "asset_buildingset12_04_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_09.png",
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
        "x": 10,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_04_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_04_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_04_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_04_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_04_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset12_04_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_04_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_03.png",
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
        "assetId": "asset_buildingset12_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_04.png",
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
        "assetId": "asset_buildingset12_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_05.png",
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
        "assetId": "asset_buildingset12_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_06.png",
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
        "assetId": "asset_buildingset12_07_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_07.png",
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
        "assetId": "asset_buildingset12_05_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_08.png",
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
        "assetId": "asset_buildingset12_05_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_09.png",
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
        "x": 10,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_05_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_05_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_05_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_05_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_05_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset12_05_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_05_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_03.png",
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
        "assetId": "asset_buildingset12_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_04.png",
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
        "assetId": "asset_buildingset12_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_05.png",
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
        "assetId": "asset_buildingset12_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_06.png",
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
        "assetId": "asset_buildingset12_08_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_07.png",
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
        "assetId": "asset_buildingset12_06_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_08.png",
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
        "x": 9,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset12_06_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_06_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_09_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset12_07_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_07_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_10_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 13,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset12_08_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_08_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 9,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_11_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_11_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 8,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 9,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 10,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 11,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 12,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 14,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 15,
        "y": 10,
        "layer": "base",
        "assetId": "asset_buildingset12_09_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_09_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 10,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 0,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 11,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_12_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_12_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 8,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 9,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 10,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_10",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_10.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 11,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_11",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_11.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 12,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_12",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_12.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 13,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_13",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_13.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 14,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_14",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_14.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 15,
        "y": 11,
        "layer": "base",
        "assetId": "asset_buildingset12_10_15",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_10_15.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 12,
        "layer": "base",
        "assetId": "asset_buildingset12_13_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_13_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 12,
        "layer": "base",
        "assetId": "asset_buildingset12_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 12,
        "layer": "base",
        "assetId": "asset_buildingset12_13_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_13_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 12,
        "layer": "base",
        "assetId": "asset_buildingset12_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_13_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 12,
        "layer": "base",
        "assetId": "asset_buildingset12_13_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_13_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 12,
        "layer": "base",
        "assetId": "asset_buildingset12_13_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset12_13_05.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 2,
      "y": 11
    },
    "entrances": [
      {
        "x": 2,
        "y": 11
      },
      {
        "x": 3,
        "y": 11
      },
      {
        "x": 12,
        "y": 10
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
    "width": 25,
    "height": 25,
    "tiles": [
      {
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset4_09_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset4_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_01.png",
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
        "assetId": "asset_buildingset4_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_05.png",
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
        "assetId": "asset_buildingset4_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_09_06.png",
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
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset4_13_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset4_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset4_13_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset4_13_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_03.png",
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
        "assetId": "asset_buildingset4_13_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_04.png",
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
        "x": 4,
        "y": 1,
        "layer": "decor",
        "assetId": "asset_buildingset2_09_08",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_09_08.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset4_13_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_13_01.png",
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
        "assetId": "asset_buildingset2_00_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset2_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset4_12_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_12_06.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_14_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_14_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_14_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset4_14_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_03.png",
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
        "assetId": "asset_buildingset4_14_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_04.png",
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
        "assetId": "asset_buildingset4_14_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_05.png",
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
        "assetId": "asset_buildingset4_14_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_14_06.png",
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
        "x": 0,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset4_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_03.png",
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
        "assetId": "asset_buildingset4_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_04.png",
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
        "assetId": "asset_buildingset4_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_05.png",
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
        "assetId": "asset_buildingset4_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_06_06.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset4_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_04.png",
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
        "assetId": "asset_buildingset4_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_05.png",
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
        "assetId": "asset_buildingset4_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_07_06.png",
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
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset4_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset4_08_06.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 3,
      "y": 5
    },
    "entrances": [
      {
        "x": 3,
        "y": 5
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
        "x": 0,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset10_03_09",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_09.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset10_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset10_00_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset10_00_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 0,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 0,
        "layer": "base",
        "assetId": "asset_buildingset10_00_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_02.png",
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
        "assetId": "asset_buildingset10_00_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset10_02_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset10_02_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset10_02_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 1,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 1,
        "layer": "base",
        "assetId": "asset_buildingset10_02_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_03.png",
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
        "assetId": "asset_buildingset10_02_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_04.png",
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
        "assetId": "asset_buildingset10_02_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_05.png",
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
        "assetId": "asset_buildingset10_02_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_06.png",
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
        "x": 0,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset10_03_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset10_03_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset10_03_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 2,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 2,
        "layer": "base",
        "assetId": "asset_buildingset10_03_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_03.png",
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
        "assetId": "asset_buildingset10_03_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_04.png",
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
        "assetId": "asset_buildingset10_03_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_05.png",
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
        "assetId": "asset_buildingset10_03_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_06.png",
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
        "assetId": "asset_buildingset10_03_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_03_07.png",
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
        "assetId": "asset_buildingset10_00_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_00_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset10_04_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset10_04_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 3,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 3,
        "layer": "base",
        "assetId": "asset_buildingset10_04_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_03.png",
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
        "assetId": "asset_buildingset10_04_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_04.png",
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
        "assetId": "asset_buildingset10_04_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_05.png",
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
        "assetId": "asset_buildingset10_04_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_06.png",
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
        "assetId": "asset_buildingset10_04_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_04_07.png",
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
        "assetId": "asset_buildingset10_01_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_01_07.png",
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
        "x": 0,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset10_05_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset10_05_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset10_05_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 4,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 4,
        "layer": "base",
        "assetId": "asset_buildingset10_05_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_03.png",
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
        "assetId": "asset_buildingset10_05_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_04.png",
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
        "assetId": "asset_buildingset10_05_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_05.png",
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
        "assetId": "asset_buildingset10_05_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_06.png",
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
        "assetId": "asset_buildingset10_05_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_05_07.png",
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
        "assetId": "asset_buildingset10_02_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_02_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset10_06_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset10_06_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset10_06_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 5,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset10_06_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_03.png",
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
        "assetId": "asset_buildingset10_06_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 5,
        "layer": "base",
        "assetId": "asset_buildingset10_06_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_05.png",
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
        "assetId": "asset_buildingset10_06_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_06_06.png",
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
        "x": 0,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset10_07_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 0,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset10_07_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset10_07_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 6,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 3,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset10_07_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_03.png",
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
        "assetId": "asset_buildingset10_07_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 6,
        "layer": "base",
        "assetId": "asset_buildingset10_07_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_05.png",
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
        "assetId": "asset_buildingset10_07_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_07_06.png",
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
        "x": 0,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_00",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_00.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 7,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 7,
        "layer": "base",
        "assetId": "asset_buildingset10_08_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_08_07.png",
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
        "x": 1,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 1,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 2,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 4,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 5,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 6,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_06.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 7,
        "y": 8,
        "layer": "base",
        "assetId": "asset_buildingset10_09_07",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_09_07.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 7,
        "y": 8,
        "layer": "collision",
        "collision": true
      },
      {
        "x": 1,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset10_10_01",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_01.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 2,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset10_10_02",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_02.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 3,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset10_10_03",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_03.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 4,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset10_10_04",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_04.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 5,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset10_10_05",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_05.png",
        "width": 48,
        "height": 48
      },
      {
        "x": 6,
        "y": 9,
        "layer": "base",
        "assetId": "asset_buildingset10_10_06",
        "src": "/assets/limezu/asset-catalog/building_done_buildingset10_10_06.png",
        "width": 48,
        "height": 48
      }
    ],
    "entrance": {
      "x": 4,
      "y": 6
    },
    "entrances": [
      {
        "x": 4,
        "y": 6
      }
    ],
    "tags": [
      "custom",
      "building"
    ]
  }
] as const satisfies readonly BuildingCatalogPrefab[];
