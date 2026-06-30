import type {
  EditorBuildingColor,
  EditorBuildingKind,
} from "../../../data/cityMaps/mapAsset";
import {
  readSelectedBuildingAssetId,
  writeSelectedBuildingAssetId,
} from "./BuildingPlacementRuntime";
import {
  BUILDING_PREFAB_CATALOG,
  type BuildingCatalogPrefab,
  type BuildingCatalogLayer,
  type BuildingCatalogTile,
} from "./BuildingPrefabCatalog";

const PREFAB_STORAGE_KEY = "satiria.editor.buildingPrefabs.v3";
const DELETED_PREFAB_STORAGE_KEY = "satiria.editor.deletedBuildingPrefabs.v3";
const SELECTED_PREFAB_STORAGE_KEY = "satiria.editor.selectedBuildingPrefab.v3";
const HEALING_DEFAULT_COLOR_MIGRATION_KEY = "satiria.editor.healingDefaultColorMigrated.v1";

export type BuildingPrefab = BuildingCatalogPrefab & {
  createdAt?: number;
  updatedAt?: number;
  assetId?: string;
  interiorMapId?: string;
};

export type BuildingPrefabLibrary = Record<string, BuildingPrefab>;

export type BuildingPrefabFootprint = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  entranceX: number;
  entranceY: number;
};

function primaryEntrance(prefab: Pick<BuildingCatalogPrefab, "entrance" | "entrances">) {
  return prefab.entrances?.[0] ?? prefab.entrance;
}

let cachedPrefabs: BuildingPrefabLibrary = {};
let cachedDeletedPrefabIds: string[] = [];
let selectedPrefabId = "";

export function firstAssetIdFromPrefab(prefab: Pick<BuildingCatalogPrefab, "tiles">) {
  return prefab.tiles.find(tile => tile.assetId)?.assetId;
}

export function firstAssetMetaFromPrefab(prefab: Pick<BuildingCatalogPrefab, "tiles">) {
  const tile = prefab.tiles.find(item => item.src);
  if (!tile?.src) return undefined;

  return {
    id: tile.assetId,
    src: tile.src,
    width: tile.width,
    height: tile.height,
  };
}

export function effectiveBuildingPrefabFootprint(
  prefab: Pick<BuildingCatalogPrefab, "width" | "height" | "tiles" | "entrance" | "entrances">,
): BuildingPrefabFootprint {
  const visualTiles = prefab.tiles.filter(tile => tile.layer !== "collision" && (tile.assetId || tile.src));

  if (visualTiles.length === 0) {
    return {
      minX: 0,
      minY: 0,
      maxX: Math.max(0, prefab.width - 1),
      maxY: Math.max(0, prefab.height - 1),
      width: Math.max(1, prefab.width),
      height: Math.max(1, prefab.height),
      entranceX: Math.max(0, Math.min(prefab.width - 1, primaryEntrance(prefab).x)),
      entranceY: Math.max(0, Math.min(prefab.height - 1, primaryEntrance(prefab).y)),
    };
  }

  const minX = Math.min(...visualTiles.map(tile => tile.x));
  const minY = Math.min(...visualTiles.map(tile => tile.y));
  const maxX = Math.max(...visualTiles.map(tile => tile.x));
  const maxY = Math.max(...visualTiles.map(tile => tile.y));
  const width = Math.max(1, maxX - minX + 1);
  const height = Math.max(1, maxY - minY + 1);

  return {
    minX,
    minY,
    maxX,
    maxY,
    width,
    height,
    entranceX: Math.max(0, Math.min(width - 1, primaryEntrance(prefab).x - minX)),
    entranceY: Math.max(0, Math.min(height - 1, primaryEntrance(prefab).y - minY)),
  };
}

function toRuntimePrefab(prefab: BuildingCatalogPrefab): BuildingPrefab {
  return {
    ...prefab,
    assetId: firstAssetIdFromPrefab(prefab),
  };
}

function catalogLibrary(): BuildingPrefabLibrary {
  const catalog = BUILDING_PREFAB_CATALOG as readonly BuildingCatalogPrefab[];

  return Object.fromEntries(
    catalog.map(prefab => [prefab.id, toRuntimePrefab(prefab)]),
  ) as BuildingPrefabLibrary;
}

function stripRuntimeFields(prefab: BuildingPrefab): BuildingCatalogPrefab {
  const { createdAt, updatedAt, assetId, interiorMapId, ...catalogPrefab } = prefab;
  return catalogPrefab;
}

function sameCatalogPrefab(left: BuildingPrefab, right: BuildingPrefab) {
  return JSON.stringify(stripRuntimeFields(left)) === JSON.stringify(stripRuntimeFields(right));
}

export function readBuildingPrefabs(): BuildingPrefabLibrary {
  if (typeof window === "undefined") {
    return {
      ...catalogLibrary(),
      ...cachedPrefabs,
    };
  }

  try {
    cachedPrefabs = JSON.parse(
      window.localStorage.getItem(PREFAB_STORAGE_KEY) ?? "{}",
    ) as BuildingPrefabLibrary;
  } catch {
    cachedPrefabs = {};
  }

  const healingDefaultColorMigrated = window.localStorage.getItem(HEALING_DEFAULT_COLOR_MIGRATION_KEY) === "true";
  if (!healingDefaultColorMigrated && cachedPrefabs["building-healing"]) {
    cachedPrefabs = {
      ...cachedPrefabs,
      "building-healing": {
        ...cachedPrefabs["building-healing"],
        color: "default",
      },
    };
    window.localStorage.setItem(PREFAB_STORAGE_KEY, JSON.stringify(cachedPrefabs));
  }
  if (!healingDefaultColorMigrated) {
    window.localStorage.setItem(HEALING_DEFAULT_COLOR_MIGRATION_KEY, "true");
  }

  try {
    cachedDeletedPrefabIds = JSON.parse(
      window.localStorage.getItem(DELETED_PREFAB_STORAGE_KEY) ?? "[]",
    ) as string[];
  } catch {
    cachedDeletedPrefabIds = [];
  }

  const deletedIds = new Set(cachedDeletedPrefabIds);
  const visibleCatalog = Object.fromEntries(
    Object.entries(catalogLibrary()).filter(([id]) => !deletedIds.has(id)),
  ) as BuildingPrefabLibrary;

  return {
    ...visibleCatalog,
    ...cachedPrefabs,
  };
}

export function writeBuildingPrefabs(next: BuildingPrefabLibrary) {
  const sourceCatalog = catalogLibrary();
  const catalogIds = new Set(Object.keys(sourceCatalog));
  cachedDeletedPrefabIds = [...catalogIds].filter(id => !next[id]);

  cachedPrefabs = Object.fromEntries(
    Object.entries(next).filter(([id, prefab]) => {
      if (!catalogIds.has(id)) return true;
      return !sameCatalogPrefab(prefab, sourceCatalog[id]);
    }),
  ) as BuildingPrefabLibrary;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(PREFAB_STORAGE_KEY, JSON.stringify(cachedPrefabs));
    window.localStorage.setItem(DELETED_PREFAB_STORAGE_KEY, JSON.stringify(cachedDeletedPrefabIds));
    window.dispatchEvent(new CustomEvent("satiria:building-prefabs-changed"));
  }
}

export function upsertBuildingPrefab(prefab: BuildingPrefab) {
  const current = readBuildingPrefabs();
  const nextPrefab: BuildingPrefab = {
    ...prefab,
    assetId: prefab.assetId ?? firstAssetIdFromPrefab(prefab),
    createdAt: prefab.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };

  writeBuildingPrefabs({
    ...current,
    [nextPrefab.id]: nextPrefab,
  });

  writeSelectedBuildingPrefabId(nextPrefab.id);

  if (nextPrefab.assetId) {
    writeSelectedBuildingAssetId(nextPrefab.assetId);
  }

  return nextPrefab;
}

export function deleteBuildingPrefab(prefabId: string) {
  const next = { ...readBuildingPrefabs() };
  delete next[prefabId];
  writeBuildingPrefabs(next);

  if (readSelectedBuildingPrefabId() === prefabId) {
    writeSelectedBuildingPrefabId("");
  }
}

export function readSelectedBuildingPrefabId() {
  if (typeof window === "undefined") return selectedPrefabId;
  selectedPrefabId = window.localStorage.getItem(SELECTED_PREFAB_STORAGE_KEY) ?? "";
  return selectedPrefabId;
}

export function writeSelectedBuildingPrefabId(prefabId: string) {
  selectedPrefabId = prefabId;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_PREFAB_STORAGE_KEY, prefabId);
    window.dispatchEvent(new CustomEvent("satiria:building-prefab-selection-changed"));
  }
}

export function selectedBuildingPrefab() {
  const prefabId = readSelectedBuildingPrefabId();
  if (!prefabId) return undefined;
  return readBuildingPrefabs()[prefabId];
}

export function buildingPrefabById(prefabId: string | undefined) {
  if (!prefabId) return undefined;
  return readBuildingPrefabs()[prefabId];
}

export function applyBuildingPrefabToEditor({
  prefab,
  setEditorBuildingKind,
  setEditorBuildingColor,
  setEditorBuildingW,
  setEditorBuildingH,
}: {
  prefab: BuildingPrefab;
  setEditorBuildingKind: (kind: EditorBuildingKind) => void;
  setEditorBuildingColor: (color: EditorBuildingColor) => void;
  setEditorBuildingW: (width: number) => void;
  setEditorBuildingH: (height: number) => void;
}) {
  writeSelectedBuildingPrefabId(prefab.id);

  const firstAssetId = firstAssetIdFromPrefab(prefab);
  const footprint = effectiveBuildingPrefabFootprint(prefab);
  if (firstAssetId) {
    writeSelectedBuildingAssetId(firstAssetId);
  }

  setEditorBuildingKind(prefab.kind);
  setEditorBuildingColor(prefab.color);
  setEditorBuildingW(footprint.width);
  setEditorBuildingH(footprint.height);
}

export function makeBuildingPrefabId(name: string) {
  return `building-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "prefab"}`;
}

export function currentBuildingAssetIdForPrefab() {
  return readSelectedBuildingAssetId();
}

export function exportBuildingCatalogEntry(prefab: BuildingPrefab) {
  const stablePrefab: BuildingCatalogPrefab = {
    id: prefab.id,
    name: prefab.name,
    kind: prefab.kind,
    color: prefab.color,
    width: prefab.width,
    height: prefab.height,
    tiles: prefab.tiles
      .filter(tile => tile.assetId || tile.src || tile.collision)
      .sort((a, b) => a.y - b.y || a.x - b.x || a.layer.localeCompare(b.layer)),
    entrance: prefab.entrance,
    entrances: prefab.entrances?.length ? prefab.entrances : [prefab.entrance],
    tags: prefab.tags,
  };

  return JSON.stringify(stablePrefab, null, 2);
}

export function exportBuildingPrefabsTs() {
  const prefabs: BuildingCatalogPrefab[] = Object.values(readBuildingPrefabs())
    .map(prefab => ({
      id: prefab.id,
      name: prefab.name,
      kind: prefab.kind,
      color: prefab.color,
      width: prefab.width,
      height: prefab.height,
      tiles: prefab.tiles
        .filter(tile => tile.assetId || tile.src || tile.collision)
        .sort((a, b) => a.y - b.y || a.x - b.x || a.layer.localeCompare(b.layer)),
      entrance: prefab.entrance,
      entrances: prefab.entrances?.length ? prefab.entrances : [prefab.entrance],
      tags: prefab.tags,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return `import type { BuildingCatalogPrefab } from "./BuildingPrefabCatalog";

export const EXPORTED_BUILDING_PREFABS = ${JSON.stringify(prefabs, null, 2)} as const satisfies BuildingCatalogPrefab[];
`;
}

export function exportBuildingPrefabCatalogFile(prefabs: readonly BuildingCatalogPrefab[]) {
  const sortedPrefabs = [...prefabs].sort((a, b) => a.name.localeCompare(b.name));

  return `export type BuildingCatalogLayer = "base" | "decor" | "collision";

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

export const BUILDING_PREFAB_CATALOG = ${JSON.stringify(sortedPrefabs, null, 2)} as const satisfies readonly BuildingCatalogPrefab[];
`;
}

export type { BuildingCatalogPrefab, BuildingCatalogTile, BuildingCatalogLayer };
