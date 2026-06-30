import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourceDir = "/Users/jordy/Desktop/Building_done";
const publicDir = path.join(root, "public/assets/limezu/asset-catalog");
const catalogPath = path.join(root, "src/app/components/editor/assets/AssetCatalog.ts");
const classificationPath = path.join(root, "src/app/components/editor/assets/AssetClassification.ts");
const metadataPath = path.join(root, "src/app/components/editor/assets/AssetMetadata.ts");
const tileSize = 48;
const gridSize = 16;
const firstSet = 1;
const lastSet = 16;

function readExportedValue(filePath, exportName, closeToken) {
  const source = fs.readFileSync(filePath, "utf8");
  const marker = `export const ${exportName}`;
  const exportStart = source.indexOf(marker);
  if (exportStart < 0) throw new Error(`Missing ${exportName} in ${filePath}`);
  const valueStart = source.indexOf("=", exportStart) + 1;
  const valueEnd = source.indexOf(closeToken, valueStart);
  if (valueEnd < 0) throw new Error(`Could not find end of ${exportName}`);
  const valueSource = source
    .slice(valueStart, valueEnd + closeToken.length)
    .trim()
    .replace(/\s+as const satisfies[^;]+;?$/, "")
    .replace(/;$/, "");
  return Function(`return (${valueSource});`)();
}

function replaceExportedValue(filePath, exportName, closeToken, nextValueSource) {
  const source = fs.readFileSync(filePath, "utf8");
  const marker = `export const ${exportName}`;
  const exportStart = source.indexOf(marker);
  if (exportStart < 0) throw new Error(`Missing ${exportName} in ${filePath}`);
  const valueStart = source.indexOf("=", exportStart) + 1;
  const valueEnd = source.indexOf(closeToken, valueStart);
  if (valueEnd < 0) throw new Error(`Could not find end of ${exportName}`);

  fs.writeFileSync(
    filePath,
    `${source.slice(0, valueStart)} ${nextValueSource}${source.slice(valueEnd + closeToken.length)}`,
  );
}

function rowCol(index) {
  return String(index).padStart(2, "0");
}

function ensureTileImage(setNumber, row, col) {
  const inputPath = path.join(sourceDir, `buildingset${setNumber}.png`);
  if (!fs.existsSync(inputPath)) throw new Error(`Missing ${inputPath}`);

  const filename = `building_done_buildingset${setNumber}_${rowCol(row)}_${rowCol(col)}.png`;
  const outputPath = path.join(publicDir, filename);
  execFileSync("sips", [
    "--cropToHeightWidth",
    String(tileSize),
    String(tileSize),
    "--cropOffset",
    String(row * tileSize),
    String(col * tileSize),
    inputPath,
    "--out",
    outputPath,
  ], { stdio: "ignore" });

  return {
    filename,
    src: `/assets/limezu/asset-catalog/${filename}`,
  };
}

fs.mkdirSync(publicDir, { recursive: true });

const newAssets = [];
const newClassification = {};
const newMetadata = {};

for (let setNumber = firstSet; setNumber <= lastSet; setNumber += 1) {
  for (let row = 0; row < gridSize; row += 1) {
    for (let col = 0; col < gridSize; col += 1) {
      const id = `asset_buildingset${setNumber}_${rowCol(row)}_${rowCol(col)}`;
      const { src } = ensureTileImage(setNumber, row, col);
      newAssets.push({
        id,
        label: `buildingset${setNumber} tile ${rowCol(row)} ${rowCol(col)}`,
        src,
        source: `${sourceDir}/buildingset${setNumber}.png#tile-${row}-${col}`,
        pack: "Building_done",
        width: tileSize,
        height: tileSize,
        tags: [
          "building",
          "outside",
          "building-done",
          "buildingset",
          `buildingset${setNumber}`,
          `row-${rowCol(row)}`,
          `col-${rowCol(col)}`,
        ],
        defaultCategory: "building",
      });
      newClassification[id] = "building";
      newMetadata[id] = { buildingPlacement: "outside" };
    }
  }
}

const catalog = readExportedValue(catalogPath, "LIMEZU_ASSET_CATALOG", "];");
const nextCatalog = [
  ...catalog.filter(asset => !asset.id.startsWith("asset_buildingset")),
  ...newAssets,
];
replaceExportedValue(
  catalogPath,
  "LIMEZU_ASSET_CATALOG",
  "];",
  `${JSON.stringify(nextCatalog, null, 2)};`,
);

const classification = readExportedValue(classificationPath, "LIMEZU_ASSET_CLASSIFICATION", "} as const satisfies Record<string, LimeZuAssetCategory>;");
const nextClassification = {
  ...Object.fromEntries(Object.entries(classification).filter(([id]) => !id.startsWith("asset_buildingset"))),
  ...newClassification,
};
replaceExportedValue(
  classificationPath,
  "LIMEZU_ASSET_CLASSIFICATION",
  "} as const satisfies Record<string, LimeZuAssetCategory>;",
  `${JSON.stringify(nextClassification, null, 2)} as const satisfies Record<string, LimeZuAssetCategory>;`,
);

const metadata = readExportedValue(metadataPath, "LIMEZU_ASSET_METADATA", "} as const satisfies LimeZuAssetMetadata;");
const nextMetadata = {
  ...Object.fromEntries(Object.entries(metadata).filter(([id]) => !id.startsWith("asset_buildingset"))),
  ...newMetadata,
};
replaceExportedValue(
  metadataPath,
  "LIMEZU_ASSET_METADATA",
  "} as const satisfies LimeZuAssetMetadata;",
  `${JSON.stringify(nextMetadata, null, 2)} as const satisfies LimeZuAssetMetadata;`,
);

console.log(`Imported ${newAssets.length} Building_done tiles as outside building assets.`);
