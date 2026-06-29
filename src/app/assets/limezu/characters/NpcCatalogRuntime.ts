import {
  NPC_CATALOG,
  type GlobalNpcCatalogEntry,
} from "./NpcCatalog";

const NPC_PREFAB_STORAGE_KEY = "satiria.editor.globalNpcs.v1";
const NPC_DELETED_STORAGE_KEY = "satiria.editor.deletedGlobalNpcs.v1";
const SELECTED_NPC_STORAGE_KEY = "satiria.editor.selectedGlobalNpc.v1";

export type GlobalNpcPrefab = GlobalNpcCatalogEntry & {
  createdAt?: number;
  updatedAt?: number;
};

export type GlobalNpcLibrary = Record<string, GlobalNpcPrefab>;

let cachedNpcs: GlobalNpcLibrary = {};
let cachedDeletedNpcIds: string[] = [];
let selectedNpcId = "";

function catalogLibrary(): GlobalNpcLibrary {
  return Object.fromEntries(
    (NPC_CATALOG as readonly GlobalNpcCatalogEntry[]).map(npc => [npc.id, npc]),
  ) as GlobalNpcLibrary;
}

function stripRuntimeFields(npc: GlobalNpcPrefab): GlobalNpcCatalogEntry {
  const { createdAt, updatedAt, ...catalogNpc } = npc;
  return catalogNpc;
}

function sameCatalogEntry(left: GlobalNpcPrefab, right: GlobalNpcPrefab) {
  return JSON.stringify(stripRuntimeFields(left)) === JSON.stringify(stripRuntimeFields(right));
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

  try {
    cachedDeletedNpcIds = JSON.parse(window.localStorage.getItem(NPC_DELETED_STORAGE_KEY) ?? "[]") as string[];
  } catch {
    cachedDeletedNpcIds = [];
  }

  const deletedIds = new Set(cachedDeletedNpcIds);
  const visibleCatalog = Object.fromEntries(
    Object.entries(catalogLibrary()).filter(([id]) => !deletedIds.has(id)),
  ) as GlobalNpcLibrary;

  return {
    ...visibleCatalog,
    ...cachedNpcs,
  };
}

export function writeGlobalNpcs(next: GlobalNpcLibrary) {
  const sourceCatalog = catalogLibrary();
  const catalogIds = new Set(Object.keys(sourceCatalog));
  cachedDeletedNpcIds = [...catalogIds].filter(id => !next[id]);

  cachedNpcs = Object.fromEntries(
    Object.entries(next).filter(([id, npc]) => {
      if (!catalogIds.has(id)) return true;
      return !sameCatalogEntry(npc, sourceCatalog[id]);
    }),
  ) as GlobalNpcLibrary;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(NPC_PREFAB_STORAGE_KEY, JSON.stringify(cachedNpcs));
    window.localStorage.setItem(NPC_DELETED_STORAGE_KEY, JSON.stringify(cachedDeletedNpcIds));
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

export function exportGlobalNpcCatalogFile(npcs: readonly GlobalNpcCatalogEntry[]) {
  const sortedNpcs = [...npcs].sort((a, b) => a.name.localeCompare(b.name));

  return `import type {
  CharacterAnimation,
  CharacterAppearance,
  CharacterFacing,
} from "../../../components/editor/hero/characterTypes";

export type GlobalNpcCatalogEntry = {
  id: string;
  name: string;
  appearance: CharacterAppearance;
  lines: string[];
  walking?: boolean;
  animation?: CharacterAnimation;
  facing?: CharacterFacing;
  sheetAssetId?: string;
  tags?: string[];
};

export const NPC_CATALOG = ${JSON.stringify(sortedNpcs, null, 2)} as const satisfies readonly GlobalNpcCatalogEntry[];
`;
}

export function exportGlobalNpcCatalogEntry(npc: GlobalNpcCatalogEntry) {
  return JSON.stringify(npc, null, 2);
}
