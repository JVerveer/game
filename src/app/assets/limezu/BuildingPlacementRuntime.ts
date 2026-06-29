import { getBuildingAssets } from "./BuildingLibrary";
import { buildingPrefabById } from "./BuildingPrefabRuntime";

const SELECTED_BUILDING_STORAGE_KEY = "satiria.editor.selectedBuildingAsset.v1";
const BUILDING_ASSIGNMENTS_STORAGE_KEY = "satiria.editor.buildingAssetAssignments.v2";

export type BuildingAssetAssignment = {
  buildingId: string;
  assetId?: string;
  prefabId?: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type BuildingAssetAssignments = Record<string, BuildingAssetAssignment>;

let selectedBuildingAssetId = "";
let cachedAssignments: BuildingAssetAssignments = {};

export function getBuildingAsset(assetId: string | null | undefined) {
  if (!assetId) return undefined;
  return getBuildingAssets().find(asset => asset.id === assetId);
}

export function defaultBuildingAssetId() {
  const assets = getBuildingAssets();
  return assets.find(asset => asset.width >= 96 && asset.height >= 96)?.id
    ?? assets[0]?.id
    ?? "";
}

export function readSelectedBuildingAssetId() {
  if (typeof window === "undefined") return selectedBuildingAssetId || defaultBuildingAssetId();

  selectedBuildingAssetId = window.localStorage.getItem(SELECTED_BUILDING_STORAGE_KEY) || defaultBuildingAssetId();
  return selectedBuildingAssetId;
}

export function writeSelectedBuildingAssetId(assetId: string) {
  selectedBuildingAssetId = assetId;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_BUILDING_STORAGE_KEY, assetId);
    window.dispatchEvent(new CustomEvent("satiria:building-asset-selection-changed"));
  }
}

export function readBuildingAssetAssignments(): BuildingAssetAssignments {
  if (typeof window === "undefined") return cachedAssignments;

  try {
    cachedAssignments = JSON.parse(window.localStorage.getItem(BUILDING_ASSIGNMENTS_STORAGE_KEY) ?? "{}");
  } catch {
    cachedAssignments = {};
  }

  return cachedAssignments;
}

export function writeBuildingAssetAssignments(next: BuildingAssetAssignments) {
  cachedAssignments = { ...next };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(BUILDING_ASSIGNMENTS_STORAGE_KEY, JSON.stringify(cachedAssignments));
    window.dispatchEvent(new CustomEvent("satiria:building-assets-changed"));
  }
}

export function assignBuildingAsset(assignment: BuildingAssetAssignment) {
  writeBuildingAssetAssignments({
    ...readBuildingAssetAssignments(),
    [assignment.buildingId]: assignment,
  });
}

export function removeBuildingAssetAssignment(buildingId: string) {
  const next = { ...readBuildingAssetAssignments() };
  delete next[buildingId];
  writeBuildingAssetAssignments(next);
}

export function buildingAssignmentForBuilding({
  id,
  x,
  y,
}: {
  id?: string;
  x: number;
  y: number;
}) {
  const assignments = readBuildingAssetAssignments();
  const byId = id ? assignments[id] : undefined;
  const byCoord = Object.values(assignments).find(item => item.x === x && item.y === y);
  return byId ?? byCoord;
}

export function buildingAssetForBuilding({
  id,
  x,
  y,
}: {
  id?: string;
  x: number;
  y: number;
}) {
  const assignment = buildingAssignmentForBuilding({ id, x, y });
  if (!assignment) return undefined;

  if (assignment.assetId) return getBuildingAsset(assignment.assetId);

  const prefab = buildingPrefabById(assignment.prefabId);
  const firstAssetId = prefab?.tiles.find(tile => tile.assetId)?.assetId;
  return getBuildingAsset(firstAssetId);
}

export function buildingPrefabForBuilding({
  id,
  x,
  y,
}: {
  id?: string;
  x: number;
  y: number;
}) {
  const assignment = buildingAssignmentForBuilding({ id, x, y });
  return buildingPrefabById(assignment?.prefabId);
}

export function humanBuildingAssetLabel(label: string) {
  return label
    .replace(/\b\d+x\d+\b/gi, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
