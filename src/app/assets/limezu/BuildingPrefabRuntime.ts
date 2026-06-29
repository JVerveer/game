import type { EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import { readSelectedBuildingAssetId, writeSelectedBuildingAssetId } from "./BuildingPlacementRuntime";

const PREFAB_STORAGE_KEY = "satiria.editor.buildingPrefabs.v1";
const SELECTED_PREFAB_STORAGE_KEY = "satiria.editor.selectedBuildingPrefab.v1";

export type BuildingPrefab = {
  id: string;
  name: string;
  kind: EditorBuildingKind;
  color: EditorBuildingColor;
  w: number;
  h: number;
  assetId?: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  entrance?: { x: number; y: number };
  interiorMapId?: string;
};

export type BuildingPrefabLibrary = Record<string, BuildingPrefab>;

let cachedPrefabs: BuildingPrefabLibrary = {};
let selectedPrefabId = "";

export function readBuildingPrefabs(): BuildingPrefabLibrary {
  if (typeof window === "undefined") return cachedPrefabs;

  try {
    cachedPrefabs = JSON.parse(window.localStorage.getItem(PREFAB_STORAGE_KEY) ?? "{}");
  } catch {
    cachedPrefabs = {};
  }

  return cachedPrefabs;
}

export function writeBuildingPrefabs(next: BuildingPrefabLibrary) {
  cachedPrefabs = { ...next };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(PREFAB_STORAGE_KEY, JSON.stringify(cachedPrefabs));
    window.dispatchEvent(new CustomEvent("satiria:building-prefabs-changed"));
  }
}

export function upsertBuildingPrefab(prefab: BuildingPrefab) {
  const current = readBuildingPrefabs();
  const nextPrefab: BuildingPrefab = {
    ...prefab,
    tags: prefab.tags ?? [],
    createdAt: prefab.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };

  writeBuildingPrefabs({ ...current, [nextPrefab.id]: nextPrefab });
  writeSelectedBuildingPrefabId(nextPrefab.id);

  if (nextPrefab.assetId) writeSelectedBuildingAssetId(nextPrefab.assetId);

  return nextPrefab;
}

export function deleteBuildingPrefab(prefabId: string) {
  const next = { ...readBuildingPrefabs() };
  delete next[prefabId];
  writeBuildingPrefabs(next);

  if (readSelectedBuildingPrefabId() === prefabId) writeSelectedBuildingPrefabId("");
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
  return prefabId ? readBuildingPrefabs()[prefabId] : undefined;
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
  if (prefab.assetId) writeSelectedBuildingAssetId(prefab.assetId);

  setEditorBuildingKind(prefab.kind);
  setEditorBuildingColor(prefab.color);
  setEditorBuildingW(prefab.w);
  setEditorBuildingH(prefab.h);
}

export function makeBuildingPrefabId(name: string) {
  return `building-prefab-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "prefab"}-${Date.now()}`;
}

export function currentBuildingAssetIdForPrefab() {
  return readSelectedBuildingAssetId();
}

export function exportBuildingPrefabsTs() {
  const prefabs = Object.values(readBuildingPrefabs()).sort((a, b) => a.name.localeCompare(b.name));

  return `import type { BuildingPrefab } from "./BuildingPrefabRuntime";

export const EXPORTED_BUILDING_PREFABS = ${JSON.stringify(prefabs, null, 2)} as const satisfies BuildingPrefab[];
`;
}
