import type { CharacterAnimationName, CharacterFacing } from "./CharacterSheetRuntime";

const NPC_SHEET_STORAGE_KEY = "limezu.npcSheetAssignments.v1";

export type NpcSheetAssignment = {
  npcId: string;
  assetId: string;
  animation?: CharacterAnimationName;
  facing?: CharacterFacing;
};

export type NpcSheetAssignments = Record<string, NpcSheetAssignment>;

let cachedAssignments: NpcSheetAssignments = {};

export function readNpcSheetAssignments(): NpcSheetAssignments {
  if (typeof window === "undefined") return cachedAssignments;

  try {
    cachedAssignments = JSON.parse(window.localStorage.getItem(NPC_SHEET_STORAGE_KEY) ?? "{}");
  } catch {
    cachedAssignments = {};
  }

  return cachedAssignments;
}

export function writeNpcSheetAssignments(next: NpcSheetAssignments) {
  cachedAssignments = { ...next };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(NPC_SHEET_STORAGE_KEY, JSON.stringify(cachedAssignments));
    window.dispatchEvent(new CustomEvent("limezu:npc-sheet-assignments-changed"));
  }
}

export function assignNpcSheet(npcId: string, assetId: string) {
  writeNpcSheetAssignments({
    ...readNpcSheetAssignments(),
    [npcId]: {
      npcId,
      assetId,
      animation: "idle",
      facing: "down",
    },
  });
}

export function clearNpcSheet(npcId: string) {
  const next = { ...readNpcSheetAssignments() };
  delete next[npcId];
  writeNpcSheetAssignments(next);
}

export function getNpcSheetAssignment(npcId: string): NpcSheetAssignment | undefined {
  return readNpcSheetAssignments()[npcId];
}
