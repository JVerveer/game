#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const ASSET_CATALOG_PATH = path.join(
  ROOT,
  "src/app/components/editor/assets/AssetCatalog.ts",
);

const ASSET_CLASSIFICATION_PATH = path.join(
  ROOT,
  "src/app/components/editor/assets/AssetClassification.ts",
);

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
    throw new Error(`Missing file: ${path.relative(ROOT, filePath)}`);
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
  const quoted = block.match(new RegExp(`["']${prop}["']\\s*:\\s*["']([^"']*)["']`, "m"));
  if (quoted?.[1] !== undefined) return quoted[1];

  const unquoted = block.match(new RegExp(`\\b${prop}\\s*:\\s*["']([^"']*)["']`, "m"));
  return unquoted?.[1] ?? "";
}

function readNumberProp(block, prop) {
  const quoted = block.match(new RegExp(`["']${prop}["']\\s*:\\s*(\\d+)`, "m"));
  if (quoted?.[1] !== undefined) return Number(quoted[1]);

  const unquoted = block.match(new RegExp(`\\b${prop}\\s*:\\s*(\\d+)`, "m"));
  return unquoted ? Number(unquoted[1]) : 0;
}

function extractCatalogArray(source) {
  const markerIndex = source.indexOf("LIMEZU_ASSET_CATALOG");
  if (markerIndex < 0) {
    throw new Error("Could not find LIMEZU_ASSET_CATALOG in AssetCatalog.ts");
  }

  const equalsIndex = source.indexOf("=", markerIndex);
  if (equalsIndex < 0) {
    throw new Error("Could not find equals sign after LIMEZU_ASSET_CATALOG.");
  }

  // Important: search after "=" so we do not accidentally pick the [] in LimeZuCatalogAsset[].
  const arrayStart = source.indexOf("[", equalsIndex);
  if (arrayStart < 0) {
    throw new Error("Could not find asset catalog array start.");
  }

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = arrayStart; i < source.length; i += 1) {
    const char = source[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) inString = false;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;

    if (depth === 0) {
      return source.slice(arrayStart, i + 1);
    }
  }

  throw new Error("Could not find asset catalog array end.");
}

function splitTopLevelObjects(arraySource) {
  const objects = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = 0; i < arraySource.length; i += 1) {
    const char = arraySource[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) inString = false;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        objects.push(arraySource.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return objects;
}

function parseCatalog(source) {
  const arraySource = extractCatalogArray(source);
  const blocks = splitTopLevelObjects(arraySource);

  const assets = [];

  for (const block of blocks) {
    const id = readStringProp(block, "id");
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
  const objectMatch = source.match(/ASSET_CLASSIFICATION\s*=\s*\{([\s\S]*?)\}\s*as const/s);
  const body = objectMatch?.[1] ?? source;

  const pairRegex = /["']?([A-Za-z0-9_$]+)["']?\s*:\s*["']([^"']+)["']/g;

  let match;
  while ((match = pairRegex.exec(body))) {
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
  return `${category}::${normalizeAssetName(asset.label)}::${asset.width}x${asset.height}`;
}

function chooseCanonical(group) {
  return [...group].sort((a, b) => {
    const aOld = /\bOLD\b|\/OLD\//i.test(a.source) ? 1 : 0;
    const bOld = /\bOLD\b|\/OLD\//i.test(b.source) ? 1 : 0;
    if (aOld !== bOld) return aOld - bOld;

    const lengthDiff = a.source.length - b.source.length;
    if (lengthDiff !== 0) return lengthDiff;

    return a.source.localeCompare(b.source) || a.id.localeCompare(b.id);
  })[0];
}

function assetNumber(id) {
  const match = id.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function buildOutput(classification) {
  const entries = Object.entries(classification)
    .filter(([, category]) => VALID_CATEGORIES.has(category))
    .sort(([a], [b]) => {
      const diff = assetNumber(a) - assetNumber(b);
      return diff || a.localeCompare(b);
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

  console.log(`Using catalog: ${path.relative(ROOT, ASSET_CATALOG_PATH)}`);
  console.log(`Using classification: ${path.relative(ROOT, ASSET_CLASSIFICATION_PATH)}`);

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

  fs.writeFileSync(ASSET_CLASSIFICATION_PATH, buildOutput(classification), "utf8");

  console.log(`\nUpdated: ${path.relative(ROOT, ASSET_CLASSIFICATION_PATH)}`);
  console.log("Review the git diff, then commit if it looks correct.");
}

main();