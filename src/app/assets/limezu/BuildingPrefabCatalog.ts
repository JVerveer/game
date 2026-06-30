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
    "color": "orange",
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
        "x": 2,
        "y": 7,
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
        "x": 9,
        "y": 7,
        "layer": "collision",
        "collision": true
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
        "assetId": "asset_tileset3_mv_10_00",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_00.png",
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
        "assetId": "asset_tileset3_mv_10_01",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_01.png",
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
        "assetId": "asset_tileset3_mv_10_02",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_02.png",
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
        "assetId": "asset_tileset3_mv_10_03",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_03.png",
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
        "assetId": "asset_tileset3_mv_10_04",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_04.png",
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
        "assetId": "asset_tileset3_mv_10_05",
        "src": "/assets/limezu/asset-catalog/modern_exteriors_rpg_maker_mv_tileset_3_mv_10_05.png",
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
        "layer": "collision",
        "collision": true
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
  }
] as const satisfies readonly BuildingCatalogPrefab[];
