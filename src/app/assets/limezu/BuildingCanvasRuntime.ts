import type { EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import {
  makeBuildingPrefabId,
  upsertBuildingPrefab,
} from "./BuildingPrefabRuntime";

const BUILDER_STORAGE_KEY = "satiria.editor.buildingBuilderDraft.v1";

export type BuildingCanvasTool = "brush" | "eraser" | "picker" | "fill";

export type BuildingCanvasLayer = "base" | "decor" | "collision";

export type BuildingCanvasTile = {
  x: number;
  y: number;
  layer: BuildingCanvasLayer;
  assetId?: string;
  collision?: boolean;
};

export type BuildingCanvasDraft = {
  name: string;
  kind: EditorBuildingKind;
  color: EditorBuildingColor;
  width: number;
  height: number;
  selectedAssetId: string;
  selectedLayer: BuildingCanvasLayer;
  tool: BuildingCanvasTool;
  tiles: BuildingCanvasTile[];
  entrance: {
    x: number;
    y: number;
  };
};

export function createEmptyBuildingDraft(): BuildingCanvasDraft {
  return {
    name: "New Building",
    kind: "house",
    color: "purple",
    width: 7,
    height: 5,
    selectedAssetId: "",
    selectedLayer: "base",
    tool: "brush",
    tiles: [],
    entrance: {
      x: 3,
      y: 4,
    },
  };
}

export function tileKey(x: number, y: number, layer: BuildingCanvasLayer) {
  return `${layer}:${x},${y}`;
}

export function readBuildingCanvasDraft(): BuildingCanvasDraft {
  if (typeof window === "undefined") return createEmptyBuildingDraft();

  try {
    return {
      ...createEmptyBuildingDraft(),
      ...JSON.parse(window.localStorage.getItem(BUILDER_STORAGE_KEY) ?? "{}"),
    };
  } catch {
    return createEmptyBuildingDraft();
  }
}

export function writeBuildingCanvasDraft(draft: BuildingCanvasDraft) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(draft));
    window.dispatchEvent(new CustomEvent("satiria:building-builder-draft-changed"));
  }
}

export function clearBuildingCanvasDraft() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(BUILDER_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("satiria:building-builder-draft-changed"));
  }
}

export function setBuildingCanvasTile(
  draft: BuildingCanvasDraft,
  tile: BuildingCanvasTile,
): BuildingCanvasDraft {
  const key = tileKey(tile.x, tile.y, tile.layer);

  return {
    ...draft,
    tiles: [
      ...draft.tiles.filter(existing => tileKey(existing.x, existing.y, existing.layer) !== key),
      tile,
    ],
  };
}

export function removeBuildingCanvasTile(
  draft: BuildingCanvasDraft,
  x: number,
  y: number,
  layer: BuildingCanvasLayer,
): BuildingCanvasDraft {
  const key = tileKey(x, y, layer);

  return {
    ...draft,
    tiles: draft.tiles.filter(tile => tileKey(tile.x, tile.y, tile.layer) !== key),
  };
}

export function tileAt(
  draft: BuildingCanvasDraft,
  x: number,
  y: number,
  layer: BuildingCanvasLayer,
) {
  return draft.tiles.find(tile => tile.x === x && tile.y === y && tile.layer === layer);
}

export function resizeBuildingCanvasDraft(
  draft: BuildingCanvasDraft,
  width: number,
  height: number,
): BuildingCanvasDraft {
  const safeWidth = Math.max(1, Math.min(32, width));
  const safeHeight = Math.max(1, Math.min(24, height));

  return {
    ...draft,
    width: safeWidth,
    height: safeHeight,
    entrance: {
      x: Math.max(0, Math.min(safeWidth - 1, draft.entrance.x)),
      y: Math.max(0, Math.min(safeHeight - 1, draft.entrance.y)),
    },
    tiles: draft.tiles.filter(tile => tile.x < safeWidth && tile.y < safeHeight),
  };
}

export function saveBuildingCanvasAsPrefab(draft: BuildingCanvasDraft) {
  const baseTiles = draft.tiles
    .filter(tile => tile.layer !== "collision" && tile.assetId)
    .sort((a, b) => a.y - b.y || a.x - b.x || a.layer.localeCompare(b.layer));

  const assetId = baseTiles[0]?.assetId;

  return upsertBuildingPrefab({
    id: makeBuildingPrefabId(draft.name),
    name: draft.name.trim() || "New Building",
    kind: draft.kind,
    color: draft.color,
    width: draft.width,
    height: draft.height,
    tiles: draft.tiles,
    assetId,
    tags: [
      draft.kind,
      draft.color,
      "canvas",
      "prefab",
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    entrance: draft.entrance,
  });
}

export function exportBuildingCanvasDraftTs(draft: BuildingCanvasDraft) {
  return `import type { BuildingCanvasDraft } from "./BuildingCanvasRuntime";

export const EXPORTED_BUILDING_CANVAS_DRAFT = ${JSON.stringify(draft, null, 2)} as const satisfies BuildingCanvasDraft;
`;
}
