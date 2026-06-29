#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const ASSET_CATALOG_PATH = path.join(ROOT, "src/app/components/editor/assets/AssetCatalog.ts");
const ASSET_CLASSIFICATION_PATH = path.join(ROOT, "src/app/components/editor/assets/AssetClassification.ts");

const VALID_CATEGORIES = new Set([
  "uncategorized",
  "terrain",
  "object",
  "building",
  "character",
  "npc",
  "effect",
  "ui",
  "ignore",
]);

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function normalizeAssetName(label) {
  return String(label ?? "")
    .toLowerCase()
    .replace(/\b\d+x\d+\b/g, "")
    .replace(/\b(16x16|32x32|48x48)\b/g, "")
    .replace(/\bcopy\b/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readStringProp(block, prop) {
  const match = block.match(new RegExp(`${prop}\\s*:\\s*"([^"]*)"`, "m"));
  return match?.[1] ?? "";
}

function readNumberProp(block, prop) {
  const match = block.match(new RegExp(`${prop}\\s*:\\s*(\\d+)`, "m"));
  return match ? Number(match[1]) : 0;
}

function parseCatalog(source) {
  const assets = [];
  const assetBlockRegex = /\{\s*id\s*:\s*"([^"]+)"[\s\S]*?\n\s*\}/g;

  let match;
  while ((match = assetBlockRegex.exec(source))) {
    const block = match[0];
    const id = match[1];

    const label = readStringProp(block, "label");
    const sourcePath = readStringProp(block, "source");
    const pack = readStringProp(block, "pack");
    const defaultCategory = readStringProp(block, "defaultCategory") || "uncategorized";
    const width = readNumberProp(block, "width");
    const height = readNumberProp(block, "height");

    if (!id || !label) continue;

    assets.push({
      id,
      label,
      source: sourcePath,
      pack,
      defaultCategory: VALID_CATEGORIES.has(defaultCategory) ? defaultCategory : "uncategorized",
      width,
      height,
    });
  }

  return assets;
}

function parseClassification(source) {
  const classification = {};
  const pairRegex = /([A-Za-z0-9_$]+)\s*:\s*"([^"]+)"/g;

  let match;
  while ((match = pairRegex.exec(source))) {
    const [, id, category] = match;
    if (VALID_CATEGORIES.has(category)) {
      classification[id] = category;
    }
  }

  return classification;
}

function categoryFor(asset, classification) {
  return classification[asset.id] ?? asset.defaultCategory ?? "uncategorized";
}

function duplicateKeyFor(asset, category) {
  // Only dedupe inside the same category.
  // Name + size prevents intentionally different size variants from being collapsed.
  return `${category}::${normalizeAssetName(asset.label)}::${asset.width}x${asset.height}`;
}

function chooseCanonical(group) {
  return [...group].sort((a, b) => {
    // Prefer non-OLD paths, then shorter paths, then stable source order.
    const aOld = /\bOLD\b|\/OLD\//i.test(a.source) ? 1 : 0;
    const bOld = /\bOLD\b|\/OLD\//i.test(b.source) ? 1 : 0;
    if (aOld !== bOld) return aOld - bOld;

    const lengthDiff = a.source.length - b.source.length;
    if (lengthDiff !== 0) return lengthDiff;

    return a.source.localeCompare(b.source) || a.id.localeCompare(b.id);
  })[0];
}

function buildOutput(classification) {
  const entries = Object.entries(classification)
    .filter(([, category]) => VALID_CATEGORIES.has(category))
    .sort(([a], [b]) => {
      const aNumber = Number(a.replace(/\D+/g, ""));
      const bNumber = Number(b.replace(/\D+/g, ""));

      if (Number.isFinite(aNumber) && Number.isFinite(bNumber) && aNumber !== bNumber) {
        return aNumber - bNumber;
      }

      return a.localeCompare(b);
    });

  const body = entries
    .map(([id, category]) => `  ${id}: "${category}",`)
    .join("\n");

  return `import type { LimeZuAssetClassification } from "./AssetCatalog";

/**
 * Permanent exported LimeZu asset classification.
 *
 * Generated/updated by:
 *   node scripts/dedupe-asset-classification.mjs
 */
export const ASSET_CLASSIFICATION = {
${body}
} as const satisfies LimeZuAssetClassification;
`;
}

function main() {
  const dryRun = process.argv.includes("--dry-run");

  const catalogSource = readFile(ASSET_CATALOG_PATH);
  const classificationSource = readFile(ASSET_CLASSIFICATION_PATH);

  const assets = parseCatalog(catalogSource);
  const classification = parseClassification(classificationSource);

  if (assets.length === 0) {
    throw new Error("No assets found in AssetCatalog.ts. The parser may need updating.");
  }

  const groups = new Map();

  for (const asset of assets) {
    const category = categoryFor(asset, classification);

    // Do not dedupe assets that are already ignored.
    if (category === "ignore") continue;

    const normalizedName = normalizeAssetName(asset.label);
    if (!normalizedName) continue;

    const key = duplicateKeyFor(asset, category);
    groups.set(key, [...(groups.get(key) ?? []), asset]);
  }

  const duplicateGroups = [...groups.values()].filter(group => group.length > 1);

  let ignoredCount = 0;
  const report = [];

  for (const group of duplicateGroups) {
    const canonical = chooseCanonical(group);
    const category = categoryFor(canonical, classification);

    const ignored = group
      .filter(asset => asset.id !== canonical.id)
      .sort((a, b) => a.source.localeCompare(b.source));

    for (const asset of ignored) {
      classification[asset.id] = "ignore";
      ignoredCount += 1;
    }

    report.push({
      category,
      name: normalizeAssetName(canonical.label),
      size: `${canonical.width}x${canonical.height}`,
      kept: canonical.id,
      keptSource: canonical.source,
      ignored: ignored.map(asset => `${asset.id} (${asset.source})`),
    });
  }

  console.log(`Catalog assets: ${assets.length}`);
  console.log(`Duplicate groups inside same category: ${duplicateGroups.length}`);
  console.log(`Assets changed to ignore: ${ignoredCount}`);

  if (report.length > 0) {
    console.log("\nDuplicate report:");
    for (const item of report.slice(0, 80)) {
      console.log(`\n[${item.category}] ${item.name} ${item.size}`);
      console.log(`  keep:   ${item.kept} ${item.keptSource}`);
      for (const ignored of item.ignored) {
        console.log(`  ignore: ${ignored}`);
      }
    }

    if (report.length > 80) {
      console.log(`\n... ${report.length - 80} more groups omitted from console output.`);
    }
  }

  if (dryRun) {
    console.log("\nDry run only. No files changed.");
    return;
  }

  const output = buildOutput(classification);
  fs.writeFileSync(ASSET_CLASSIFICATION_PATH, output, "utf8");

  console.log(`\nUpdated: ${path.relative(ROOT, ASSET_CLASSIFICATION_PATH)}`);
  console.log("Review the git diff, then commit if it looks correct.");
}

main();
