import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { GameMapId, TownMapId } from "../../../../data/maps";
import type { MovingNpc } from "../../../../data/npcs";
import type { EditorNpcAsset } from "../../../../data/cityMaps/mapAsset";
import type {
  EditedNpcsByMap,
  EditorSelection,
  NpcEditorAction,
  ObjectEditAction,
} from "../hooks/useEditorState";
import { CHARACTER_ASSET_CATALOG } from "../../../assets/limezu/characters/CharacterAssetCatalog";
import { assignNpcSheet } from "../../../rendering/characters/NpcSheetRuntime";

type NpcVisualPreset = {
  id: string;
  label: string;
  variant: number;
  styleRole: string;
  category: string;
};

function characterAssetForPresetId(presetId: string) {
  return CHARACTER_ASSET_CATALOG.find(asset => asset.id === presetId);
}

function readableNameFromAssetId(assetId: string) {
  const asset = characterAssetForPresetId(assetId);
  return asset?.label?.replace(/\s+/g, " ").trim() || assetId;
}

export function useNpcEditor({
  mapIdRef,
  npcsRef,
  editedNpcsByMapRef,
  draggedNpcIdRef,
  editorSelectionRef,
  npcEditActionRef,
  npcEditorActionRef,
  editorNpcNameRef,
  editorNpcPresetIdRef,
  editorNpcWalkingRef,
  editorNpcLinesRef,
  setEditedNpcsByMap,
  setNpcs,
  setEditorSelection,
  npcsForMap,
  isTownMap,
  npcVisualPresets,
}: {
  mapIdRef: MutableRefObject<GameMapId>;
  npcsRef: MutableRefObject<MovingNpc[]>;
  editedNpcsByMapRef: MutableRefObject<EditedNpcsByMap>;
  draggedNpcIdRef: MutableRefObject<string | null>;
  editorSelectionRef: MutableRefObject<EditorSelection>;
  npcEditActionRef: MutableRefObject<ObjectEditAction>;
  npcEditorActionRef: MutableRefObject<NpcEditorAction>;
  editorNpcNameRef: MutableRefObject<string>;
  editorNpcPresetIdRef: MutableRefObject<string>;
  editorNpcWalkingRef: MutableRefObject<boolean>;
  editorNpcLinesRef: MutableRefObject<string>;
  setEditedNpcsByMap: Dispatch<SetStateAction<EditedNpcsByMap>>;
  setNpcs: Dispatch<SetStateAction<MovingNpc[]>>;
  setEditorSelection: (selection: EditorSelection) => void;
  npcsForMap: (id: GameMapId) => EditorNpcAsset[];
  isTownMap: (id: GameMapId) => id is TownMapId;
  npcVisualPresets: readonly NpcVisualPreset[];
}) {
  const movingNpcFromEditorAsset = (id: GameMapId, npc: EditorNpcAsset): MovingNpc => ({
    id: npc.id,
    mapId: id,
    x: npc.x,
    y: npc.y,
    homeX: npc.homeX ?? npc.x,
    homeY: npc.homeY ?? npc.y,
    name: npc.name,
    lines: npc.lines,
    variant: npc.variant,
    style: npc.style,
    walking: npc.walking,
  });

  const syncRuntimeNpcsForMap = (id: GameMapId, editorNpcs: EditorNpcAsset[]) => {
    setNpcs(prev => [
      ...prev.filter(npc => npc.mapId !== id),
      ...editorNpcs.map(npc => movingNpcFromEditorAsset(id, npc)),
    ]);
  };

  const upsertEditedNpcsForMap = (id: GameMapId, updater: (current: EditorNpcAsset[]) => EditorNpcAsset[]) => {
    const base = editedNpcsByMapRef.current[id] ?? npcsRef.current
      .filter(npc => npc.mapId === id)
      .map(npc => ({
        id: npc.id,
        x: npc.x,
        y: npc.y,
        homeX: npc.homeX,
        homeY: npc.homeY,
        name: npc.name,
        lines: [...npc.lines],
        variant: npc.variant,
        style: npc.style,
        walking: npc.walking,
      }));

    const nextForMap = updater(base.map(npc => ({ ...npc, lines: [...npc.lines] })));

    editedNpcsByMapRef.current = {
      ...editedNpcsByMapRef.current,
      [id]: nextForMap,
    };
    setEditedNpcsByMap(prev => ({ ...prev, [id]: nextForMap }));
    syncRuntimeNpcsForMap(id, nextForMap);
    return nextForMap;
  };

  const moveSelectedNpcTo = (x: number, y: number) => {
    const id = mapIdRef.current;
    const npcId = draggedNpcIdRef.current;
    if (!npcId) return;
    const next = upsertEditedNpcsForMap(id, current => current.map(npc =>
      npc.id === npcId ? { ...npc, x, y, homeX: x, homeY: y } : npc
    ));
    if (next.some(npc => npc.id === npcId)) setEditorSelection({ kind: "npc", id: npcId });
  };

  const deleteSelectedNpc = (npcId: string) => {
    upsertEditedNpcsForMap(mapIdRef.current, current => current.filter(npc => npc.id !== npcId));
    if (editorSelectionRef.current?.kind === "npc" && editorSelectionRef.current.id === npcId) {
      setEditorSelection(null);
    }
    if (draggedNpcIdRef.current === npcId) {
      draggedNpcIdRef.current = null;
    }
  };

  const duplicateSelectedNpc = (npcId: string) => {
    const npc = npcsForMap(mapIdRef.current).find(item => item.id === npcId);
    if (!npc) return;

    const clone: EditorNpcAsset = {
      ...npc,
      id: `${mapIdRef.current}-editor-npc-${Date.now()}-copy`,
      x: npc.x + 1,
      homeX: npc.x + 1,
      y: npc.y,
      homeY: npc.y,
      lines: [...npc.lines],
    };

    upsertEditedNpcsForMap(mapIdRef.current, current => [...current, clone]);
    setEditorSelection({ kind: "npc", id: clone.id });
  };

  const paintNpcEditorTile = (x: number, y: number) => {
    const id = mapIdRef.current;
    const clickedNpc = npcsRef.current.find(item => item.mapId === id && item.x === x && item.y === y);

    if (npcEditorActionRef.current === "delete" || npcEditActionRef.current === "erase") {
      if (clickedNpc) {
        deleteSelectedNpc(clickedNpc.id);
      }
      return;
    }

    const selectedCharacterAsset = characterAssetForPresetId(editorNpcPresetIdRef.current);

    const next = upsertEditedNpcsForMap(id, current => {
      const fallbackPreset = npcVisualPresets.find(item => item.id === editorNpcPresetIdRef.current) ?? npcVisualPresets[0];
      const npcNumber = current.length + 1;
      const npcId = `${id}-editor-npc-${Date.now()}-${npcNumber}`;

      const newNpc: EditorNpcAsset = {
        id: npcId,
        x,
        y,
        homeX: x,
        homeY: y,
        name: editorNpcNameRef.current.trim()
          || selectedCharacterAsset?.label
          || fallbackPreset?.label
          || readableNameFromAssetId(editorNpcPresetIdRef.current),
        lines: editorNpcLinesRef.current.split("\n").map(line => line.trim()).filter(Boolean),
        variant: selectedCharacterAsset ? 0 : fallbackPreset.variant,
        style: selectedCharacterAsset
          ? "npc-role-character-sheet"
          : isTownMap(id)
            ? `npc-town-${id} npc-role-${fallbackPreset.styleRole}`
            : `npc-role-${fallbackPreset.styleRole}`,
        walking: editorNpcWalkingRef.current,
      };

      if (selectedCharacterAsset) {
        window.setTimeout(() => {
          assignNpcSheet(npcId, selectedCharacterAsset.id);
        }, 0);
      }

      return [...current, newNpc];
    });

    const placed = next.find(npc => npc.x === x && npc.y === y);
    if (placed) setEditorSelection({ kind: "npc", id: placed.id });
  };

  return {
    deleteSelectedNpc,
    duplicateSelectedNpc,
    moveSelectedNpcTo,
    paintNpcEditorTile,
    upsertEditedNpcsForMap,
  };
}
