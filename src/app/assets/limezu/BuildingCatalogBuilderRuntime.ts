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

export type BuildingBuilderTool = "brush" | "eraser" | "picker" | "fill";

export type BuildingCatalogBuilderDraft = {
  name: string;
  kind: EditorBuildingKind;
  color: EditorBuildingColor;
  width: 20;
  height: 10;
  selectedAssetId: string;
  selectedLayer: BuildingCatalogLayer;
  tool: BuildingBuilderTool;
  tiles: BuildingCatalogTile[];
  entrance: {
    x: number;
    y: number;
  };
  tags: string[];
};

export function createEmptyBuildingCatalogDraft(): BuildingCatalogBuilderDraft {
  return {
    name: "New Building",
    kind: "house",
    color: "purple",
    width: 20,
    height: 10,
    selectedAssetId: "",
    selectedLayer: "base",
    tool: "brush",
    tiles: [],
    entrance: {
      x: 10,
      y: 9,
    },
    tags: ["custom", "building"],
  };
}

export function tileKey(x: number, y: number, layer: BuildingCatalogLayer) {
  return `${layer}:${x},${y}`;
}

export function readBuildingCatalogDraft(): BuildingCatalogBuilderDraft {
  if (typeof window === "undefined") return createEmptyBuildingCatalogDraft();

  try {
    return {
      ...createEmptyBuildingCatalogDraft(),
      ...JSON.parse(window.localStorage.getItem(BUILDER_STORAGE_KEY) ?? "{}"),
      width: 20,
      height: 10,
    };
  } catch {
    return createEmptyBuildingCatalogDraft();
  }
}

export function writeBuildingCatalogDraft(draft: BuildingCatalogBuilderDraft) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify({ ...draft, width: 20, height: 10 }));
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
    width: 20,
    height: 10,
    tiles: draft.tiles
      .filter(tile => tile.assetId || tile.src || tile.collision)
      .sort((a, b) => a.y - b.y || a.x - b.x || a.layer.localeCompare(b.layer)),
    entrance: draft.entrance,
    tags: draft.tags,
    assetId: draft.tiles.find(tile => tile.assetId)?.assetId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function saveDraftToBrowserPrefab(draft: BuildingCatalogBuilderDraft) {
  return upsertBuildingPrefab(draftToPrefab(draft));
}

export function exportDraftAsCatalogEntry(draft: BuildingCatalogBuilderDraft) {
  return exportBuildingCatalogEntry(draftToPrefab(draft));
}
