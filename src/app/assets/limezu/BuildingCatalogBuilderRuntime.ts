import type { EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import {
  exportBuildingCatalogEntry,
  makeBuildingPrefabId,
  upsertBuildingPrefab,
  type BuildingPrefab,
  type BuildingCatalogLayer,
  type BuildingCatalogTile,
} from "./BuildingPrefabRuntime";

const BUILDER_STORAGE_KEY = "satiria.editor.buildingCatalogBuilderDraft.v1";
export const BUILDING_CATALOG_GRID_WIDTH = 25;
export const BUILDING_CATALOG_GRID_HEIGHT = 25;

export type BuildingBuilderTool = "brush" | "eraser" | "picker" | "fill";

export type BuildingCatalogBuilderDraft = {
  name: string;
  kind: EditorBuildingKind;
  color: EditorBuildingColor;
  width: typeof BUILDING_CATALOG_GRID_WIDTH;
  height: typeof BUILDING_CATALOG_GRID_HEIGHT;
  selectedAssetId: string;
  selectedLayer: BuildingCatalogLayer;
  tool: BuildingBuilderTool;
  tiles: BuildingCatalogTile[];
  entrance: {
    x: number;
    y: number;
  };
  entrances: Array<{
    x: number;
    y: number;
  }>;
  tags: string[];
};

export function createEmptyBuildingCatalogDraft(): BuildingCatalogBuilderDraft {
  return {
    name: "New Building",
    kind: "house",
    color: "default",
    width: BUILDING_CATALOG_GRID_WIDTH,
    height: BUILDING_CATALOG_GRID_HEIGHT,
    selectedAssetId: "",
    selectedLayer: "base",
    tool: "brush",
    tiles: [],
    entrance: {
      x: Math.floor(BUILDING_CATALOG_GRID_WIDTH / 2),
      y: BUILDING_CATALOG_GRID_HEIGHT - 1,
    },
    entrances: [{ x: Math.floor(BUILDING_CATALOG_GRID_WIDTH / 2), y: BUILDING_CATALOG_GRID_HEIGHT - 1 }],
    tags: ["custom", "building"],
  };
}

export function tileKey(x: number, y: number, layer: BuildingCatalogLayer) {
  return `${layer}:${x},${y}`;
}

export function readBuildingCatalogDraft(): BuildingCatalogBuilderDraft {
  if (typeof window === "undefined") return createEmptyBuildingCatalogDraft();

  try {
    const parsed = JSON.parse(window.localStorage.getItem(BUILDER_STORAGE_KEY) ?? "{}");
    const entrance = parsed.entrance ?? createEmptyBuildingCatalogDraft().entrance;
    const entrances = Array.isArray(parsed.entrances) && parsed.entrances.length ? parsed.entrances : [entrance];

    return {
      ...createEmptyBuildingCatalogDraft(),
      ...parsed,
      entrance,
      entrances,
      width: BUILDING_CATALOG_GRID_WIDTH,
      height: BUILDING_CATALOG_GRID_HEIGHT,
    };
  } catch {
    return createEmptyBuildingCatalogDraft();
  }
}

export function writeBuildingCatalogDraft(draft: BuildingCatalogBuilderDraft) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify({
      ...draft,
      width: BUILDING_CATALOG_GRID_WIDTH,
      height: BUILDING_CATALOG_GRID_HEIGHT,
    }));
  }
}

export function clearBuildingCatalogDraft() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(BUILDER_STORAGE_KEY);
  }
}

export function tileAt(
  draft: BuildingCatalogBuilderDraft,
  x: number,
  y: number,
  layer: BuildingCatalogLayer,
) {
  return draft.tiles.find(tile => tile.x === x && tile.y === y && tile.layer === layer);
}

export function setTile(
  draft: BuildingCatalogBuilderDraft,
  tile: BuildingCatalogTile,
): BuildingCatalogBuilderDraft {
  const key = tileKey(tile.x, tile.y, tile.layer);

  return {
    ...draft,
    tiles: [
      ...draft.tiles.filter(existing => tileKey(existing.x, existing.y, existing.layer) !== key),
      tile,
    ],
  };
}

export function removeTile(
  draft: BuildingCatalogBuilderDraft,
  x: number,
  y: number,
  layer: BuildingCatalogLayer,
): BuildingCatalogBuilderDraft {
  const key = tileKey(x, y, layer);

  return {
    ...draft,
    tiles: draft.tiles.filter(tile => tileKey(tile.x, tile.y, tile.layer) !== key),
  };
}

export function draftToPrefab(draft: BuildingCatalogBuilderDraft): BuildingPrefab {
  return {
    id: makeBuildingPrefabId(draft.name),
    name: draft.name.trim() || "New Building",
    kind: draft.kind,
    color: draft.color,
    width: BUILDING_CATALOG_GRID_WIDTH,
    height: BUILDING_CATALOG_GRID_HEIGHT,
    tiles: draft.tiles
      .filter(tile => tile.assetId || tile.src || tile.collision)
      .sort((a, b) => a.y - b.y || a.x - b.x || a.layer.localeCompare(b.layer)),
    entrance: draft.entrance,
    entrances: draft.entrances.length ? draft.entrances : [draft.entrance],
    tags: draft.tags,
    assetId: draft.tiles.find(tile => tile.assetId)?.assetId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function prefabToDraft(prefab: BuildingPrefab): BuildingCatalogBuilderDraft {
  return {
    name: prefab.name,
    kind: prefab.kind,
    color: prefab.color,
    width: BUILDING_CATALOG_GRID_WIDTH,
    height: BUILDING_CATALOG_GRID_HEIGHT,
    selectedAssetId: prefab.tiles.find(tile => tile.assetId)?.assetId ?? "",
    selectedLayer: "base",
    tool: "brush",
    tiles: prefab.tiles,
    entrance: prefab.entrance,
    entrances: prefab.entrances?.length ? [...prefab.entrances] : [prefab.entrance],
    tags: prefab.tags,
  };
}

export function saveDraftToBrowserPrefab(draft: BuildingCatalogBuilderDraft) {
  return upsertBuildingPrefab(draftToPrefab(draft));
}

export function exportDraftAsCatalogEntry(draft: BuildingCatalogBuilderDraft) {
  return exportBuildingCatalogEntry(draftToPrefab(draft));
}
