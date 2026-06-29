import {
  NPC_CATALOG,
  type GlobalNpcCatalogEntry,
} from "./NpcCatalog";

const NPC_PREFAB_STORAGE_KEY = "satiria.editor.globalNpcs.v1";
const SELECTED_NPC_STORAGE_KEY = "satiria.editor.selectedGlobalNpc.v1";

export type GlobalNpcPrefab = GlobalNpcCatalogEntry & {
  createdAt?: number;
  updatedAt?: number;
};

export type GlobalNpcLibrary = Record<string, GlobalNpcPrefab>;

let cachedNpcs: GlobalNpcLibrary = {};
let selectedNpcId = "";

function catalogLibrary(): GlobalNpcLibrary {
  return Object.fromEntries(
    (NPC_CATALOG as readonly GlobalNpcCatalogEntry[]).map(npc => [npc.id, npc]),
  ) as GlobalNpcLibrary;
}

export function makeGlobalNpcId(name: string) {
  return `npc-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "global"}`;
}

export function readGlobalNpcs(): GlobalNpcLibrary {
  if (typeof window === "undefined") {
    return {
      ...catalogLibrary(),
      ...cachedNpcs,
    };
  }

  try {
    cachedNpcs = JSON.parse(window.localStorage.getItem(NPC_PREFAB_STORAGE_KEY) ?? "{}") as GlobalNpcLibrary;
  } catch {
    cachedNpcs = {};
  }

  return {
    ...catalogLibrary(),
    ...cachedNpcs,
  };
}

export function writeGlobalNpcs(next: GlobalNpcLibrary) {
  const catalogIds = new Set((NPC_CATALOG as readonly GlobalNpcCatalogEntry[]).map(npc => npc.id));

  cachedNpcs = Object.fromEntries(
    Object.entries(next).filter(([id]) => !catalogIds.has(id)),
  ) as GlobalNpcLibrary;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(NPC_PREFAB_STORAGE_KEY, JSON.stringify(cachedNpcs));
    window.dispatchEvent(new CustomEvent("satiria:global-npcs-changed"));
  }
}

export function upsertGlobalNpc(npc: GlobalNpcPrefab) {
  const current = readGlobalNpcs();
  const nextNpc: GlobalNpcPrefab = {
    ...npc,
    createdAt: npc.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };

  writeGlobalNpcs({
    ...current,
    [nextNpc.id]: nextNpc,
  });
  writeSelectedGlobalNpcId(nextNpc.id);

  return nextNpc;
}

export function deleteGlobalNpc(npcId: string) {
  const next = { ...readGlobalNpcs() };
  delete next[npcId];
  writeGlobalNpcs(next);

  if (readSelectedGlobalNpcId() === npcId) {
    writeSelectedGlobalNpcId("");
  }
}

export function readSelectedGlobalNpcId() {
  if (typeof window === "undefined") return selectedNpcId;
  selectedNpcId = window.localStorage.getItem(SELECTED_NPC_STORAGE_KEY) ?? "";
  return selectedNpcId;
}

export function writeSelectedGlobalNpcId(npcId: string) {
  selectedNpcId = npcId;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(SELECTED_NPC_STORAGE_KEY, npcId);
    window.dispatchEvent(new CustomEvent("satiria:global-npc-selection-changed"));
  }
}

export function selectedGlobalNpc() {
  const npcId = readSelectedGlobalNpcId();
  if (!npcId) return undefined;
  return readGlobalNpcs()[npcId];
}

export function globalNpcById(npcId: string | undefined) {
  if (!npcId) return undefined;
  return readGlobalNpcs()[npcId];
}

export function exportGlobalNpcCatalogTs() {
  const catalogIds = new Set((NPC_CATALOG as readonly GlobalNpcCatalogEntry[]).map(npc => npc.id));
  const npcs = Object.values(readGlobalNpcs())
    .filter(npc => !catalogIds.has(npc.id))
    .map(({ createdAt, updatedAt, ...npc }) => npc)
    .sort((a, b) => a.name.localeCompare(b.name));

  return `import type { GlobalNpcCatalogEntry } from "./NpcCatalog";

export const EXPORTED_GLOBAL_NPCS = ${JSON.stringify(npcs, null, 2)} as const satisfies readonly GlobalNpcCatalogEntry[];
`;
}

export function exportGlobalNpcCatalogEntry(npc: GlobalNpcCatalogEntry) {
  return JSON.stringify(npc, null, 2);
}
