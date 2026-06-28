import {
  CHARACTER_ASSET_CATALOG,
  type CharacterAsset,
  type CharacterAssetCategory,
  type CharacterAssetClassification,
} from "./CharacterAssetCatalog";
import { CHARACTER_ASSET_CLASSIFICATION } from "./CharacterAssetClassification";
import { CHARACTER_ASSET_METADATA } from "./CharacterAssetMetadata";

const DRAFT_STORAGE_KEY = "limezu.characterAssetClassificationDraft.v1";
let cachedDraft: CharacterAssetClassification = {};
const sourceClassification = CHARACTER_ASSET_CLASSIFICATION as Record<string, CharacterAssetCategory>;

export function defaultCharacterAssetClassification(): CharacterAssetClassification {
  return Object.fromEntries(CHARACTER_ASSET_CATALOG.map(asset => [asset.id, sourceClassification[asset.id] ?? asset.defaultCategory]));
}
export function readCharacterAssetDraft(): CharacterAssetClassification {
  if (typeof window === "undefined") return cachedDraft;
  try { cachedDraft = JSON.parse(window.localStorage.getItem(DRAFT_STORAGE_KEY) ?? "{}"); } catch { cachedDraft = {}; }
  return cachedDraft;
}
export function readCharacterAssetClassification(): CharacterAssetClassification {
  return { ...defaultCharacterAssetClassification(), ...readCharacterAssetDraft() };
}
export function writeCharacterAssetClassification(next: CharacterAssetClassification) {
  const defaults = defaultCharacterAssetClassification();
  const draft: CharacterAssetClassification = {};
  for (const [assetId, category] of Object.entries(next)) if (defaults[assetId] !== category) draft[assetId] = category;
  cachedDraft = draft;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(cachedDraft));
    window.dispatchEvent(new CustomEvent("limezu:character-asset-classification-changed"));
  }
}
export function classifyCharacterAsset(assetId: string, category: CharacterAssetCategory) {
  writeCharacterAssetClassification({ ...readCharacterAssetClassification(), [assetId]: category });
}
export function classifyCharacterAssets(assetIds: string[], category: CharacterAssetCategory) {
  const next = { ...readCharacterAssetClassification() };
  for (const id of assetIds) next[id] = category;
  writeCharacterAssetClassification(next);
}
export function characterAssetsForCategory(category: CharacterAssetCategory): CharacterAsset[] {
  const classification = readCharacterAssetClassification();
  return CHARACTER_ASSET_CATALOG.filter(asset => (classification[asset.id] ?? asset.defaultCategory) === category);
}
export function getCharacterAsset(id: string | undefined): CharacterAsset {
  return CHARACTER_ASSET_CATALOG.find(asset => asset.id === id) ?? CHARACTER_ASSET_CATALOG[0];
}
export function characterAssetWithMetadata(asset: CharacterAsset): CharacterAsset {
  const meta = CHARACTER_ASSET_METADATA[asset.id as keyof typeof CHARACTER_ASSET_METADATA];
  if (!meta) return asset;
  return { ...asset, frameWidth: meta.frameWidth, frameHeight: meta.frameHeight, layerOrder: meta.layerOrder, tags: [...meta.tags] };
}
export function resetCharacterAssetDraft() {
  cachedDraft = {};
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("limezu:character-asset-classification-changed"));
  }
}
export function characterAssetStats() {
  const classification = readCharacterAssetClassification();
  const categories: CharacterAssetCategory[] = ["uncategorized","body","eyes","hair","beard","outfit","hat","weapon","accessory","fullCharacter","npc","monster","portrait","effect","ignore"];
  const counts = Object.fromEntries(categories.map(category => [category, 0])) as Record<CharacterAssetCategory, number>;
  for (const asset of CHARACTER_ASSET_CATALOG) {
    const category = classification[asset.id] ?? asset.defaultCategory;
    counts[category] = (counts[category] ?? 0) + 1;
  }
  return { total: CHARACTER_ASSET_CATALOG.length, counts };
}
export function exportCharacterAssetClassificationTs(): string {
  const current = readCharacterAssetClassification();
  const ordered = Object.fromEntries(CHARACTER_ASSET_CATALOG.map(asset => [asset.id, current[asset.id] ?? asset.defaultCategory]));
  return `import type { CharacterAssetCategory } from "./CharacterAssetCatalog";\n\nexport const CHARACTER_ASSET_CLASSIFICATION = ${JSON.stringify(ordered, null, 2)} as const satisfies Record<string, CharacterAssetCategory>;\n`;
}
