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

const PUBLIC_DIR = path.join(ROOT, "public");

const BACKUP_ROOT = path.join(
  ROOT,
  "asset-cleanup-backups",
  new Date().toISOString().replace(/[:.]/g, "-"),
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

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readStringProp(block, prop) {
  const quoted = block.match(new RegExp(`["']${prop}["']\\s*:\\s*["']([^"']*)["']`, "m"));
  if (quoted?.[1] !== undefined) return quoted[1];

  const unquoted = block.match(new RegExp(`\\b${prop}\\s*:\\s*["']([^"']*)["']`, "m"));
  return unquoted?.[1] ?? "";
}

function extractCatalogArrayBounds(source) {
  const markerIndex = source.indexOf("LIMEZU_ASSET_CATALOG");
  if (markerIndex < 0) {
    throw new Error("Could not find LIMEZU_ASSET_CATALOG in AssetCatalog.ts");
  }

  const equalsIndex = source.indexOf("=", markerIndex);
  if (equalsIndex < 0) {
    throw new Error("Could not find equals sign after LIMEZU_ASSET_CATALOG.");
  }

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
      return {
        start: arrayStart,
        end: i + 1,
        arraySource: source.slice(arrayStart, i + 1),
      };
    }
  }

  throw new Error("Could not find asset catalog array end.");
}

function splitTopLevelObjectsWithText(arraySource) {
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
        let end = i + 1;

        while (end < arraySource.length && /\s/.test(arraySource[end])) end += 1;
        if (arraySource[end] === ",") end += 1;

        const text = arraySource.slice(start, end);
        const block = arraySource.slice(start, i + 1);

        objects.push({
          block,
          text,
          id: readStringProp(block, "id"),
          src: readStringProp(block, "src"),
          source: readStringProp(block, "source"),
          label: readStringProp(block, "label"),
        });

        start = -1;
      }
    }
  }

  return objects;
}

function parseClassification(source) {
  const classification = {};
  const objectMatch = source.match(/LIMEZU_ASSET_CLASSIFICATION\s*=\s*\{([\s\S]*?)\}\s*as const/s)
    ?? source.match(/ASSET_CLASSIFICATION\s*=\s*\{([\s\S]*?)\}\s*as const/s);

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

function assetNumber(id) {
  const match = id.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function buildClassificationOutput(classification) {
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
 * Ignored assets were removed by:
 *   node scripts/remove-ignored-assets.mjs --apply
 */
export const LIMEZU_ASSET_CLASSIFICATION = {
${body}
} as const satisfies LimeZuAssetClassification;
`;
}

function publicPathFromSrc(src) {
  if (!src) return undefined;

  if (src.startsWith("/")) {
    return path.join(PUBLIC_DIR, src.slice(1));
  }

  return path.join(PUBLIC_DIR, src);
}

function safeRelative(filePath) {
  const relative = path.relative(ROOT, filePath);
  if (relative.startsWith("..")) {
    throw new Error(`Unsafe path outside project root: ${filePath}`);
  }
  return relative;
}

function moveFileToBackup(filePath) {
  if (!fs.existsSync(filePath)) return false;

  const relative = path.relative(ROOT, filePath);
  if (relative.startsWith("..")) {
    throw new Error(`Refusing to move file outside project root: ${filePath}`);
  }

  const backupPath = path.join(BACKUP_ROOT, relative);
  ensureDir(path.dirname(backupPath));
  fs.renameSync(filePath, backupPath);
  return true;
}

function removeEmptyDirsUpward(startDir, stopDir) {
  let current = startDir;

  while (current.startsWith(stopDir) && current !== stopDir) {
    if (!fs.existsSync(current)) return;

    const entries = fs.readdirSync(current);
    if (entries.length > 0) return;

    fs.rmdirSync(current);
    current = path.dirname(current);
  }
}

function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply;

  console.log(`Using catalog: ${path.relative(ROOT, ASSET_CATALOG_PATH)}`);
  console.log(`Using classification: ${path.relative(ROOT, ASSET_CLASSIFICATION_PATH)}`);
  console.log(dryRun ? "Mode: dry run. No files will change." : "Mode: APPLY. Files will change.");

  const catalogSource = readFile(ASSET_CATALOG_PATH);
  const classificationSource = readFile(ASSET_CLASSIFICATION_PATH);

  const classification = parseClassification(classificationSource);
  const ignoredIds = new Set(
    Object.entries(classification)
      .filter(([, category]) => category === "ignore")
      .map(([id]) => id),
  );

  const bounds = extractCatalogArrayBounds(catalogSource);
  const catalogObjects = splitTopLevelObjectsWithText(bounds.arraySource);

  if (catalogObjects.length === 0) {
    throw new Error("No catalog assets found. Parser may need updating.");
  }

  const ignoredCatalogObjects = catalogObjects.filter(asset => ignoredIds.has(asset.id));
  const keptCatalogObjects = catalogObjects.filter(asset => !ignoredIds.has(asset.id));

  const filesToMove = [];
  const missingFiles = [];
  const duplicateFileRefs = new Map();

  for (const asset of ignoredCatalogObjects) {
    const filePath = publicPathFromSrc(asset.src);
    if (!filePath) continue;

    const key = path.normalize(filePath);
    duplicateFileRefs.set(key, [...(duplicateFileRefs.get(key) ?? []), asset.id]);
  }

  for (const [filePath, ids] of duplicateFileRefs.entries()) {
    if (fs.existsSync(filePath)) {
      filesToMove.push({ filePath, ids });
    } else {
      missingFiles.push({ filePath, ids });
    }
  }

  console.log(`Catalog assets total: ${catalogObjects.length}`);
  console.log(`Ignored classifications: ${ignoredIds.size}`);
  console.log(`Catalog entries to remove: ${ignoredCatalogObjects.length}`);
  console.log(`Unique public files to move to backup: ${filesToMove.length}`);
  console.log(`Missing files referenced by ignored assets: ${missingFiles.length}`);

  console.log("\nSample removals:");
  for (const asset of ignoredCatalogObjects.slice(0, 40)) {
    console.log(`  ${asset.id}: ${asset.label} -> ${asset.src}`);
  }
  if (ignoredCatalogObjects.length > 40) {
    console.log(`  ... ${ignoredCatalogObjects.length - 40} more omitted from console output.`);
  }

  if (missingFiles.length > 0) {
    console.log("\nSample missing files:");
    for (const item of missingFiles.slice(0, 20)) {
      console.log(`  ${safeRelative(item.filePath)} (${item.ids.join(", ")})`);
    }
  }

  if (dryRun) {
    console.log("\nDry run only. To apply changes, run:");
    console.log("  node scripts/remove-ignored-assets.mjs --apply");
    return;
  }

  ensureDir(BACKUP_ROOT);

  ensureDir(path.join(BACKUP_ROOT, "typescript-backup"));
  fs.copyFileSync(
    ASSET_CATALOG_PATH,
    path.join(BACKUP_ROOT, "typescript-backup", "AssetCatalog.ts"),
  );
  fs.copyFileSync(
    ASSET_CLASSIFICATION_PATH,
    path.join(BACKUP_ROOT, "typescript-backup", "AssetClassification.ts"),
  );

  let movedCount = 0;

  for (const item of filesToMove) {
    if (moveFileToBackup(item.filePath)) {
      movedCount += 1;
      removeEmptyDirsUpward(path.dirname(item.filePath), PUBLIC_DIR);
    }
  }

  const nextClassification = { ...classification };
  for (const id of ignoredIds) {
    delete nextClassification[id];
  }

  const nextArray = `[
${keptCatalogObjects.map(item => item.block).join(",\n")}
]`;

  const nextCatalogSource =
    catalogSource.slice(0, bounds.start) +
    nextArray +
    catalogSource.slice(bounds.end);

  writeFile(ASSET_CATALOG_PATH, nextCatalogSource);
  writeFile(ASSET_CLASSIFICATION_PATH, buildClassificationOutput(nextClassification));

  console.log(`\nMoved files to backup: ${movedCount}`);
  console.log(`Backup folder: ${path.relative(ROOT, BACKUP_ROOT)}`);
  console.log(`Updated: ${path.relative(ROOT, ASSET_CATALOG_PATH)}`);
  console.log(`Updated: ${path.relative(ROOT, ASSET_CLASSIFICATION_PATH)}`);
  console.log("\nNow run:");
  console.log("  npm run build");
  console.log("  git diff --stat");
}

main();
