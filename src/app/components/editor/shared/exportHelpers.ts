import type { EditorBuildingAsset, EditorNpcAsset } from "../../../../data/cityMaps/mapAsset";
import { BUILDING_TILE_IDS } from "./editorConstants";

export const cleanRowsForMapAssetExport = (rows: string[][]) =>
  rows.map(row => row.map(tile => BUILDING_TILE_IDS.has(tile) ? "G" : tile));

export const createMapAssetExport = ({
  id,
  name,
  rows,
  objects,
  buildings,
  npcs,
  spawn,
}: {
  id: string;
  name: string;
  rows: string[][];
  objects: Record<string, string>;
  buildings: EditorBuildingAsset[];
  npcs: EditorNpcAsset[];
  spawn: { x: number; y: number };
}) => `import type { EditorMapAsset } from "./mapAsset";

// Paste this whole block into src/data/cityMaps/${id}MapAsset.ts.
export const ${String(id).toUpperCase()}_MAP_ASSET: EditorMapAsset = {
  id: "${id}",
  name: "${name}",
  rows: ${JSON.stringify(cleanRowsForMapAssetExport(rows).map(row => row.join("")), null, 2)},
  objects: ${JSON.stringify(objects, null, 2)},
  interactions: {},
  buildings: ${JSON.stringify(buildings, null, 2)},
  npcs: ${JSON.stringify(npcs, null, 2)},
  spawn: ${JSON.stringify(spawn, null, 2)},
};`;
