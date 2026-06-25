import type { EditorNpcAsset } from "../../../../data/cityMaps/mapAsset";

export const npcAtCoord = (npcs: EditorNpcAsset[], x: number, y: number) =>
  npcs.find(npc => npc.x === x && npc.y === y);
