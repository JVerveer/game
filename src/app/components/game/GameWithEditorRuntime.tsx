import { lazy, Suspense, useMemo, useState, useEffect, useRef } from "react";
import { ThemeProvider } from "../../../context/ThemeContext";
import {
  WILD_ENEMIES,
  type Enemy,
} from "../../../data/enemies";
import {
  GAME_TILE_COLORS,
  WALKABLE_TILES as WALK,
  GAME_MAPS,
  MAIN_TOWN_IDS,
  OPPOSITE_ROUTE_DIRECTION,
  TOWN_THEMES,
  WORLD_ROUTES,
  routeEntryForMap,
  type GameMapId,
  type Portal,
  type Interaction,
  type RouteDirection,
  type TownMapId,
  getLocationName as LOCATION_FOR,
} from "../../../data/maps";
import { INITIAL_NPCS, type MovingNpc } from "../../../data/npcs";
import { pixelBuildingsFor } from "../../../data/cityMaps/pixelSceneData";
import { citySceneObjectsFor } from "../../../data/cityMaps/scenes";
import { PixelMapScene } from "../../pixelTiles";
import { objectClassFor, tileShapeClassFor } from "../../mapRenderHelpers";
import { ACTIVE_MAP_OBJECT_DEFS, objectLabelForId } from "../../../data/objectRegistry";
import type { EditorNpcAsset, EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../../../data/cityMaps/mapAsset";
import { applyBuildingsToRows, buildingCrestForKind, buildingTileForKind, doorForBuildingAsset } from "../../../data/cityMaps/mapAsset";
import { InGameBattle } from "./InGameBattle";
import { useEditorState } from "../editor/hooks/useEditorState";
import { createMapAssetExport } from "../editor/export/exportHelpers";
import { useBuildingMovement } from "../editor/buildings/useBuildingMovement";
import { useBuildingResize } from "../editor/buildings/useBuildingResize";
import { useBuildingPlacement } from "../editor/buildings/useBuildingPlacement";
import { useBuildingDeletion } from "../editor/buildings/useBuildingDeletion";
import { useObjectEditor } from "../editor/objects/useObjectEditor";
import { useNpcEditor } from "../editor/npcs/useNpcEditor";
import { useTerrainPainter } from "../editor/terrain/useTerrainPainter";
import { useRuntimeEffects } from "./useRuntimeEffects";
import { HeroEditorOverlay } from "../editor/hero/HeroEditorOverlay";
import { CharacterRenderer } from "../editor/hero/CharacterRenderer";
import { CharacterSheetRenderer } from "../../rendering/characters/CharacterSheetRenderer";
import { limeZuTileStyle } from "../../../world/limeZuTileStyle";
import {
  DEFAULT_HERO_APPEARANCE,
  type HeroAppearance,
} from "../editor/hero/heroAppearance";
import {
  buildingAtCoord,
  clearBuildingFootprintFromRows,
  clearBuildingFootprintsFromRows,
  colorForEditorBuildingKind,
  inferBuildingsFromRowsForEditor,
} from "../editor/buildings/buildingHelpers";


const TerrainEditorOverlay = lazy(() =>
  import("../editor/TerrainEditorOverlay").then(module => ({
    default: module.TerrainEditorOverlay,
  })),
);

type EditorMode = "select" | "terrain" | "buildings" | "objects" | "npcs";
type ObjectEditAction = "place" | "erase";
type NpcEditorAction = "create" | "edit" | "delete";

type EditorSelection =
  | { kind: "npc"; id: string }
  | { kind: "building"; id: string }
  | { kind: "object"; coord: string }
  | { kind: "tile"; x: number; y: number }
  | null;

type NpcVisualCategory =
  | "Generic"
  | "Wokeshire"
  | "Special"
  | "Cryptonia"
  | "Surveillia";


// ─── Font helpers ────────────────────────────────────────────────────────────
const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

// ─── GAME SCREEN ─────────────────────────────────────────────────────────────


// ── In-game battle component ──────────────────────────────────────────────────
const TS = 48; // tile size in px

const TILE_TYPES = [
  { id: "G", name: "Grass", description: "Default walkable ground" },
  { id: "R", name: "Road / Bike Path", description: "Main walkable path" },
  { id: "W", name: "Water / Canal", description: "Canals, rivers, lakes" },
  { id: "T", name: "Trees / Forest", description: "Tree border or forest block" },
  { id: "E", name: "Plaza / Stone", description: "Town square or paved area" },
  { id: "Y", name: "Tulips / Flowers", description: "Flower beds and tulip fields" },
  { id: "S", name: "Sand / Beach", description: "Beach or desert terrain" },
  { id: "X", name: "Encounter Grass", description: "Wild battle zone" },
  { id: "D", name: "Dungeon Floor", description: "Dark indoor or dungeon tile" },
  { id: "C", name: "Cave", description: "Cave entrance or rocky area" },
  { id: "M", name: "Mountain", description: "Rocky mountain terrain" },
  { id: "J", name: "Wooden Dock", description: "Dock, pier, boardwalk" },
  { id: "F", name: "Fence", description: "Fence or barrier decoration" },
  { id: "L", name: "Flower Patch", description: "Decorative flowers / garden" },
  { id: "Q", name: "Quest Marker", description: "Quest/NPC marker tile" },
  { id: "V", name: "Save Point", description: "Save marker tile" },
  { id: "N", name: "NPC Tile", description: "NPC marker tile" },
] as const;

const tileTypeFor = (id: string) => TILE_TYPES.find(tile => tile.id === id);

const OBJECT_EDITOR_CATEGORIES = [
  "Core",
  "Wokeshire",
  "Satiria",
  "Brexiton",
  "Promptford",
  "Cryptonia",
  "Surveillia",
  "Tweetsburg",
  "Inflatopolis",
  "Tariff",
  "Ragebait",
  "Factcheck",
  "Interior",
  "Custom",
] as const;



















const EDITOR_TILE_COLORS: Record<string, string> = {
  G: "#56b447",
  R: "#d4a15f",
  W: "#2f9bd2",
  T: "#185c2b",
  E: "#9a9a9a",
  Y: "#ff4fa3",
  L: "#ffcf33",
  S: "#f0d079",
  X: "#2f8d3a",
  B: "#d94b36",
  H: "#3f7ee8",
  P: "#e07a28",
  U: "#8a4bd6",
  A: "#3fbf6f",
  I: "#52b7b0",
  O: "#3b2417",
  D: "#29213f",
  C: "#65412b",
  M: "#676767",
  J: "#9b5b2b",
  F: "#8b4f25",
  Q: "#f6d746",
  V: "#ffd84d",
  N: "#c87aff",
};


const D_PAD_BTN: React.CSSProperties = {
  height: 38, width: 38, border: "1px solid rgba(255,255,255,0.18)",
  backgroundColor: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.7)",
  cursor: "pointer", fontSize: "1rem", display: "flex",
  alignItems: "center", justifyContent: "center",
};

const isTownMap = (id: GameMapId): id is TownMapId => MAIN_TOWN_IDS.includes(id as TownMapId);

const BUILDING_TILE_IDS = new Set(["A", "B", "H", "P", "U", "I", "O"]);


const BUILDING_TYPES = [
  { kind: "house" as const, label: "House", defaultColor: "purple" as const, defaultW: 5, defaultH: 4, description: "Normal enterable house" },
  { kind: "shop" as const, label: "Shop", defaultColor: "green" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to shop interior" },
  { kind: "healing" as const, label: "Healing Center", defaultColor: "blue" as const, defaultW: 5, defaultH: 4, description: "Auto-connects to healing center" },
  { kind: "station" as const, label: "Train Station", defaultColor: "red" as const, defaultW: 7, defaultH: 4, description: "Auto-opens train menu" },
  { kind: "hall" as const, label: "Hall / Institution", defaultColor: "purple" as const, defaultW: 6, defaultH: 5, description: "Large civic building" },
];

const BUILDING_COLORS = ["red", "blue", "purple", "green"] as const;

const BUILDING_KIND_LABEL = {
  house: "House",
  shop: "Shop",
  healing: "Healing Center",
  station: "Train Station",
  hall: "Hall / Institution",
} as const;

const UNIQUE_BUILDING_KINDS = new Set(["shop", "healing", "station"]);

const NPC_VISUAL_CATEGORIES = [
  "Generic",
  "Wokeshire",
  "Special",
  "Cryptonia",
  "Surveillia",
] as const;

const NPC_VISUAL_PRESETS = [
  { id: "generic-young-man-0", label: "Young Man 1", variant: 0, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-woman-1", label: "Young Woman 1", variant: 1, styleRole: "young-woman", category: "Generic" },
  { id: "generic-older-woman-2", label: "Older Woman 1", variant: 2, styleRole: "older-woman", category: "Generic" },
  { id: "generic-older-man-3", label: "Older Man 1", variant: 3, styleRole: "older-man", category: "Generic" },
  { id: "generic-guide-4", label: "Guide", variant: 4, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-man-5", label: "Young Man 2", variant: 5, styleRole: "young-man", category: "Generic" },
  { id: "generic-young-woman-6", label: "Young Woman 2", variant: 6, styleRole: "young-woman", category: "Generic" },
  { id: "generic-older-man-7", label: "Older Man 2", variant: 7, styleRole: "older-man", category: "Generic" },
  { id: "generic-official-8", label: "Official", variant: 8, styleRole: "older-man", category: "Generic" },
  { id: "generic-local-9", label: "Local 9", variant: 9, styleRole: "young-woman", category: "Generic" },

  { id: "woke-consensus-ranger", label: "Consensus Ranger", variant: 6, styleRole: "young-woman", category: "Wokeshire" },
  { id: "woke-tulip-mediator", label: "Tulip Mediator", variant: 1, styleRole: "older-woman", category: "Wokeshire" },
  { id: "woke-canal-cyclist", label: "Canal Cyclist", variant: 3, styleRole: "young-man", category: "Wokeshire" },
  { id: "woke-bike-activist", label: "Bike Activist", variant: 5, styleRole: "young-woman", category: "Wokeshire" },
  { id: "woke-canal-elder", label: "Canal Elder", variant: 7, styleRole: "older-man", category: "Wokeshire" },
  { id: "woke-tulip-kid", label: "Tulip Kid", variant: 0, styleRole: "young-man", category: "Wokeshire" },

  { id: "special-robot-8", label: "Robot", variant: 8, styleRole: "robot", category: "Special" },
  { id: "special-robot-4", label: "Robot Guard", variant: 4, styleRole: "robot", category: "Special" },
  { id: "special-clerk", label: "Clerk-Like", variant: 2, styleRole: "older-man", category: "Special" },
  { id: "special-nurse", label: "Nurse-Like", variant: 1, styleRole: "young-woman", category: "Special" },

  { id: "crypto-bro-5", label: "Crypto Bro", variant: 5, styleRole: "crypto-bro", category: "Cryptonia" },
  { id: "crypto-sister-6", label: "Crypto Sister", variant: 6, styleRole: "crypto-sister", category: "Cryptonia" },
  { id: "crypto-baron", label: "Token Baron", variant: 5, styleRole: "older-man", category: "Cryptonia" },
  { id: "crypto-analyst", label: "Yacht Analyst", variant: 2, styleRole: "young-man", category: "Cryptonia" },

  { id: "surv-camera-guard", label: "Camera Guard", variant: 4, styleRole: "older-man", category: "Surveillia" },
  { id: "surv-data-minder", label: "Data Minder", variant: 7, styleRole: "young-woman", category: "Surveillia" },
  { id: "surv-neon-patrol", label: "Neon Patrol", variant: 1, styleRole: "young-man", category: "Surveillia" },
  { id: "surv-robot", label: "Surveillance Bot", variant: 8, styleRole: "robot", category: "Surveillia" },
] as const;




const isSelectEditorMode = (mode: EditorMode) => mode === "select";


function GameScreen({ onExit }: { onExit: () => void }) {
  const [mapId, setMapId] = useState<GameMapId>("satiria");
  const [pos, setPos] = useState(GAME_MAPS.satiria.spawn);
  const [facing, setFacing] = useState<"up" | "down" | "left" | "right">("down");
  const [dlg, setDlg] = useState<{ name: string; lines: string[]; idx: number } | null>(null);
  const [hp, setHp] = useState({ cur: 82, max: 100 });
  const [steps, setSteps] = useState(0);
  const [paused, setPaused] = useState(false);
  const [flash, setFlash] = useState(false);
  const [battleEnemy, setBattleEnemy] = useState<Enemy | null>(null);
  const [location, setLocation] = useState("Satiria Town");
  const [isWalking, setIsWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);
  const [npcs, setNpcs] = useState<MovingNpc[]>(INITIAL_NPCS);
  const [trainOpen, setTrainOpen] = useState(false);
  const [trainIndex, setTrainIndex] = useState(0);
  const [heroEditorOpen, setHeroEditorOpen] = useState(false);
  const [heroName, setHeroName] = useState("Hero");
  const [heroAppearance, setHeroAppearance] = useState<HeroAppearance>(DEFAULT_HERO_APPEARANCE);
  const {
    editorMode,
    setEditorMode,
    editorSelection,
    setEditorSelection,
    editorTile,
    setEditorTile,
    editorBuildingKind,
    setEditorBuildingKind,
    editorBuildingColor,
    setEditorBuildingColor,
    editorBuildingW,
    setEditorBuildingW,
    editorBuildingH,
    setEditorBuildingH,
    objectEditAction,
    setObjectEditAction,
    editorObjectId,
    setEditorObjectId,
    npcEditAction,
    setNpcEditAction,
    npcEditorAction,
    setNpcEditorAction,
    editorNpcName,
    setEditorNpcName,
    editorNpcPresetId,
    setEditorNpcPresetId,
    editorNpcCategory,
    setEditorNpcCategory,
    editorNpcSearch,
    setEditorNpcSearch,
    editorNpcWalking,
    setEditorNpcWalking,
    editorNpcLines,
    setEditorNpcLines,
    draggedNpcId,
    setDraggedNpcId,
    draggedBuildingId,
    setDraggedBuildingId,
    draggedObjectCoord,
    setDraggedObjectCoord,
    resizeBuildingId,
    setResizeBuildingId,
    terrainEditorOpen,
    setTerrainEditorOpen,
    saveMsg,
    setSaveMsg,
    isEditorDragging,
    setIsEditorDragging,
    editedRowsByMap,
    setEditedRowsByMap,
    editedObjectsByMap,
    setEditedObjectsByMap,
    editedBuildingsByMap,
    setEditedBuildingsByMap,
    editedNpcsByMap,
    setEditedNpcsByMap,
    removedBuildingIdsByMap,
    setRemovedBuildingIdsByMap,
  } = useEditorState();

  const viewRef = useRef<HTMLDivElement>(null);
  const [viewSize, setViewSize] = useState({ w: 900, h: 600 });
  const currentMap = GAME_MAPS[mapId];
  const editedRows = editedRowsByMap[mapId];
  const displayRows = editedRows ?? currentMap.rows;
  const editedObjects = editedObjectsByMap[mapId];
  const displayObjects = editedObjects ?? currentMap.objects;
  const removedBuildingIds = removedBuildingIdsByMap[mapId] ?? new Set<string>();
  const inferredBuildings = useMemo(
    () => inferBuildingsFromRowsForEditor(displayRows).filter(building => !removedBuildingIds.has(building.id)),
    [displayRows, removedBuildingIds],
  );
  const editedBuildings = editedBuildingsByMap[mapId];
  const displayBuildings = editedBuildings ?? inferredBuildings;
  const displayRowsWithBuildings = useMemo(() => {
    const baseRowsWithoutBuildingTiles = displayRows.map(row => row.map(tile => BUILDING_TILE_IDS.has(tile) ? "G" : tile));
    return applyBuildingsToRows(baseRowsWithoutBuildingTiles, displayBuildings);
  }, [displayRows, displayBuildings]);
  const editedNpcs = editedNpcsByMap[mapId];
  void editedNpcs;
  const displayEditorNpcs = useMemo(
    () => npcs
      .filter(npc => npc.mapId === mapId)
      .map(npc => ({ id: npc.id, x: npc.x, y: npc.y, homeX: npc.homeX, homeY: npc.homeY, name: npc.name, lines: npc.lines, variant: npc.variant, style: npc.style, walking: npc.walking, sheetAssetId: npc.sheetAssetId })),
    [npcs, mapId],
  );
  const currentTown = useMemo(
    () => isTownMap(mapId) ? TOWN_THEMES.find(town => town.id === mapId) : null,
    [mapId],
  );

  // Mutable refs so event handler closure stays fresh
  const mapIdRef = useRef(mapId);
  const posRef = useRef(pos);
  const facingRef = useRef(facing);
  const dlgRef = useRef(dlg);
  const pausedRef = useRef(paused);
  const battleRef = useRef(battleEnemy);
  const npcsRef = useRef(npcs);
  const initialNpcsRef = useRef(npcs);
  const trainOpenRef = useRef(trainOpen);
  const trainIndexRef = useRef(trainIndex);
  const terrainEditorOpenRef = useRef(terrainEditorOpen);
  const editedRowsByMapRef = useRef(editedRowsByMap);
  const editedObjectsByMapRef = useRef(editedObjectsByMap);
  const editedBuildingsByMapRef = useRef(editedBuildingsByMap);
  const removedBuildingIdsByMapRef = useRef(removedBuildingIdsByMap);
  const editedNpcsByMapRef = useRef(editedNpcsByMap);
  const editorModeRef = useRef<EditorMode>(editorMode);
  const editorSelectionRef = useRef<EditorSelection>(editorSelection);
  const draggedNpcIdRef = useRef<string | null>(draggedNpcId);
  const draggedBuildingIdRef = useRef<string | null>(draggedBuildingId);
  const draggedObjectCoordRef = useRef<string | null>(draggedObjectCoord);
  const resizeBuildingIdRef = useRef<string | null>(resizeBuildingId);
  const objectEditActionRef = useRef<ObjectEditAction>(objectEditAction);
  const editorObjectIdRef = useRef(editorObjectId);
  const editorBuildingKindRef = useRef<EditorBuildingKind>(editorBuildingKind);
  const editorBuildingColorRef = useRef<EditorBuildingColor>(editorBuildingColor);
  const editorBuildingWRef = useRef(editorBuildingW);
  const editorBuildingHRef = useRef(editorBuildingH);
  const npcEditActionRef = useRef<ObjectEditAction>(npcEditAction);
  const npcEditorActionRef = useRef<NpcEditorAction>(npcEditorAction);
  const editorNpcNameRef = useRef(editorNpcName);
  const editorNpcPresetIdRef = useRef(editorNpcPresetId);
  const editorNpcWalkingRef = useRef(editorNpcWalking);
  const editorNpcLinesRef = useRef(editorNpcLines);
  const editorTileRef = useRef(editorTile);
  const isEditorDraggingRef = useRef(false);
  const pendingPortalRef = useRef<Portal | null>(null);
  const returnPortalRef = useRef<Portal>({ mapId: "satiria", x: 31, y: 17, facing: "down" });
  const lastMove = useRef(0);
  mapIdRef.current = mapId;
  posRef.current = pos;
  facingRef.current = facing;
  dlgRef.current = dlg;
  pausedRef.current = paused;
  battleRef.current = battleEnemy;
  npcsRef.current = npcs;
  trainOpenRef.current = trainOpen;
  trainIndexRef.current = trainIndex;
  terrainEditorOpenRef.current = terrainEditorOpen;
  editedRowsByMapRef.current = editedRowsByMap;
  editedObjectsByMapRef.current = editedObjectsByMap;
  editedBuildingsByMapRef.current = editedBuildingsByMap;
  removedBuildingIdsByMapRef.current = removedBuildingIdsByMap;
  editedNpcsByMapRef.current = editedNpcsByMap;
  editorModeRef.current = editorMode;
  editorSelectionRef.current = editorSelection;
  draggedNpcIdRef.current = draggedNpcId;
  draggedBuildingIdRef.current = draggedBuildingId;
  draggedObjectCoordRef.current = draggedObjectCoord;
  resizeBuildingIdRef.current = resizeBuildingId;
  objectEditActionRef.current = objectEditAction;
  editorObjectIdRef.current = editorObjectId;
  editorBuildingKindRef.current = editorBuildingKind;
  editorBuildingColorRef.current = editorBuildingColor;
  editorBuildingWRef.current = editorBuildingW;
  editorBuildingHRef.current = editorBuildingH;
  npcEditActionRef.current = npcEditAction;
  npcEditorActionRef.current = npcEditorAction;
  editorNpcNameRef.current = editorNpcName;
  editorNpcPresetIdRef.current = editorNpcPresetId;
  editorNpcWalkingRef.current = editorNpcWalking;
  editorNpcLinesRef.current = editorNpcLines;
  editorTileRef.current = editorTile;

  const isIndoor = (id: GameMapId) => id === "shop" || id === "house" || id === "healing";

  const rowsForMap = (id: GameMapId) => applyBuildingsToRows(editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows, editedBuildingsByMapRef.current[id] ?? []);
  const objectsForMap = (id: GameMapId) => editedObjectsByMapRef.current[id] ?? GAME_MAPS[id].objects;
  const buildingsForMap = (id: GameMapId) => {
    const removed = removedBuildingIdsByMapRef.current[id] ?? new Set<string>();
    return editedBuildingsByMapRef.current[id] ?? inferBuildingsFromRowsForEditor(editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows).filter(building => !removed.has(building.id));
  };
  const npcsForMap = (id: GameMapId) => editedNpcsByMapRef.current[id] ?? npcsRef.current.filter(npc => npc.mapId === id).map(npc => ({ id: npc.id, x: npc.x, y: npc.y, homeX: npc.homeX, homeY: npc.homeY, name: npc.name, lines: npc.lines, variant: npc.variant, style: npc.style, walking: npc.walking, sheetAssetId: npc.sheetAssetId }));

  const selectedNpc = editorSelection?.kind === "npc"
    ? displayEditorNpcs.find(npc => npc.id === editorSelection.id)
    : null;

  const selectedBuilding = editorSelection?.kind === "building"
    ? displayBuildings.find(building => building.id === editorSelection.id)
    : null;

  const warpTo = (portal: Portal) => {
    const fromMapId = mapIdRef.current;
    const cur = posRef.current;
    const destination = isIndoor(fromMapId) && portal.mapId === "satiria"
      ? returnPortalRef.current
      : portal;

    if (!isIndoor(fromMapId) && isIndoor(portal.mapId)) {
      returnPortalRef.current = { mapId: fromMapId, x: cur.x, y: cur.y, facing: "down" };
    }

    const nextMap = GAME_MAPS[destination.mapId];
    const nextRows = rowsForMap(destination.mapId);
    const nextTile = nextRows[destination.y]?.[destination.x] ?? "G";
    setMapId(destination.mapId);
    setPos({ x: destination.x, y: destination.y });
    setFacing(destination.facing ?? "down");
    setLocation(LOCATION_FOR(destination.mapId, destination.x, destination.y, nextTile));
  };

  const tile = (x: number, y: number) => {
    const id = mapIdRef.current;
    const rows = rowsForMap(id);
    return y >= 0 && y < GAME_MAPS[id].height && x >= 0 && x < GAME_MAPS[id].width
      ? (rows[y]?.[x] ?? "T")
      : "T";
  };

  const townMapId = (id: GameMapId): TownMapId | null =>
    MAIN_TOWN_IDS.includes(id as TownMapId) ? id as TownMapId : null;

  const edgeDirectionFor = (x: number, y: number): RouteDirection | null => {
    const current = GAME_MAPS[mapIdRef.current];
    if (y < 0) return "N";
    if (y >= current.height) return "S";
    if (x < 0) return "W";
    if (x >= current.width) return "E";
    return null;
  };

  const moveAcrossMapEdge = (x: number, y: number) => {
    const fromTown = townMapId(mapIdRef.current);
    const exitDirection = edgeDirectionFor(x, y);
    if (!fromTown || !exitDirection) return false;

    const targetTown = WORLD_ROUTES[fromTown][exitDirection];
    if (!targetTown) return true;

    const entryDirection = OPPOSITE_ROUTE_DIRECTION[exitDirection];
    const targetMap = GAME_MAPS[targetTown];
    const entry = routeEntryForMap(targetMap, entryDirection);
    const destination = {
      mapId: targetTown,
      x: Math.max(0, Math.min(targetMap.width - 1, entry.x)),
      y: Math.max(0, Math.min(targetMap.height - 1, entry.y)),
      facing: entry.facing,
    };
    warpTo(destination);
    setIsWalking(true);
    setWalkFrame(frame => frame + 1);
    setTimeout(() => setIsWalking(false), 180);
    return true;
  };

  const npcAt = (id: GameMapId, x: number, y: number) =>
    npcsRef.current.find(npc => npc.mapId === id && npc.x === x && npc.y === y);

  const generatedNpcAt = (id: GameMapId, x: number, y: number) => {
    const tileName = rowsForMap(id)[y]?.[x];
    if (tileName !== "N" && tileName !== "Q") return null;
    return {
      name: tileName === "Q" ? "Quest NPC" : "Local NPC",
      lines: tileName === "Q"
        ? [
            '"I was painted into existence by the map editor."',
            '"Give me a proper quest later and I will pretend this was always planned."',
          ]
        : [
            '"Hello there!"',
            '"I am an editor-placed NPC. Surprisingly affordable."',
          ],
    };
  };

  const blockingNpcAt = (id: GameMapId, x: number, y: number) =>
    npcAt(id, x, y) || generatedNpcAt(id, x, y);

  const buildingTileNearDoor = (id: GameMapId, x: number, y: number) => {
    const rows = rowsForMap(id);
    const candidates = [
      rows[y - 1]?.[x],
      rows[y]?.[x - 1],
      rows[y]?.[x + 1],
      rows[y - 1]?.[x - 1],
      rows[y - 1]?.[x + 1],
    ];
    return candidates.find(tile => tile === "A" || tile === "B" || tile === "H" || tile === "I" || tile === "P" || tile === "U") ?? null;
  };

  const dynamicDoorActionFor = (id: GameMapId, x: number, y: number): Interaction | null => {
    if (rowsForMap(id)[y]?.[x] !== "O") return null;
    const buildingTile = buildingTileNearDoor(id, x, y);
    if (!buildingTile) return null;

    if (buildingTile === "P") {
      return { name: `${GAME_MAPS[id].name} Train Station`, train: true, lines: ["Choose a destination."] };
    }

    if (buildingTile === "A") {
      return {
        name: `${GAME_MAPS[id].name} Shop`,
        portal: { mapId: "shop", x: 7, y: 7, facing: "up" },
        auto: true,
        lines: [],
      };
    }

    if (buildingTile === "H") {
      return {
        name: `${GAME_MAPS[id].name} Healing Center`,
        portal: { mapId: "healing", x: 7, y: 7, facing: "up" },
        auto: true,
        lines: [],
      };
    }

    return {
      name: `${GAME_MAPS[id].name} House`,
      portal: { mapId: "house", x: 6, y: 6, facing: "up" },
      auto: true,
      lines: [],
    };
  };

  const trainDestinations = () => TOWN_THEMES.filter(town => town.id !== mapIdRef.current);

  const safeArrivalFor = (townId: TownMapId, preferred: { x: number; y: number }) => {
    const map = GAME_MAPS[townId];
    const rings = Array.from({ length: 9 }, (_, radius) => radius);
    for (const radius of rings) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) continue;
          const x = preferred.x + dx;
          const y = preferred.y + dy;
          const rows = rowsForMap(townId);
          const tileName = rows[y]?.[x];
          if (!tileName || !WALK.has(tileName) || tileName === "O") continue;
          if (blockingNpcAt(townId, x, y)) continue;
          return { x, y };
        }
      }
    }
    return preferred;
  };

  const travelByTrain = (townId: TownMapId) => {
    setTrainOpen(false);
    setTrainIndex(0);
    const spawn = GAME_MAPS[townId].spawn;
    const arrival = safeArrivalFor(townId, spawn);
    warpTo({ mapId: townId, x: arrival.x, y: arrival.y, facing: "down" });
    setSaveMsg(`Arrived: ${TOWN_THEMES.find(town => town.id === townId)?.name ?? townId}`);
    window.setTimeout(() => setSaveMsg(null), 2200);
  };

  const handleTrainKey = (key: string) => {
    const destinations = trainDestinations();
    if (key === "Escape" || key === "q" || key === "Q" || key === "z" || key === "Z") {
      setTrainOpen(false);
      return;
    }
    if (key === "ArrowUp" || key === "w" || key === "W") {
      setTrainIndex(i => (i - 1 + destinations.length) % destinations.length);
      return;
    }
    if (key === "ArrowDown" || key === "s" || key === "S") {
      setTrainIndex(i => (i + 1) % destinations.length);
      return;
    }
    if (key === " " || key === "Enter") {
      const selected = destinations[trainIndexRef.current] ?? destinations[0];
      if (selected) travelByTrain(selected.id);
    }
  };

  const doMove = (dx: number, dy: number, dir: "up" | "down" | "left" | "right", isRepeat = false) => {
    if (dlgRef.current || pausedRef.current || battleRef.current || trainOpenRef.current) return;
    const now = Date.now();
    if (now - lastMove.current < 155) return;
    lastMove.current = now;

    setFacing(dir);
    const cur = posRef.current;
    const nx = cur.x + dx;
    const ny = cur.y + dy;
    if (moveAcrossMapEdge(nx, ny)) return;

    const t = tile(nx, ny);
    const staticTargetInteraction = GAME_MAPS[mapIdRef.current].interactions[`${nx},${ny}`];
    const dynamicTargetInteraction = dynamicDoorActionFor(mapIdRef.current, nx, ny);
    const liveTargetTile = rowsForMap(mapIdRef.current)[ny]?.[nx];
    const liveTargetObject = objectsForMap(mapIdRef.current)[`${nx},${ny}`];
    const targetInteraction = dynamicTargetInteraction ?? (
      liveTargetTile === "O" || (liveTargetTile === "V" && staticTargetInteraction?.save) || liveTargetObject
        ? staticTargetInteraction
        : undefined
    );

    // Door tiles are walkable entry triggers: moving onto one enters.
    if (targetInteraction?.portal && targetInteraction.auto) {
      warpTo(targetInteraction.portal);
      return;
    }
    if (targetInteraction?.train) {
      setTrainIndex(0);
      setTrainOpen(true);
      return;
    }

    if (!WALK.has(t)) return;
    if (blockingNpcAt(mapIdRef.current, nx, ny)) return;

    setPos({ x: nx, y: ny });
    setIsWalking(true);
    setWalkFrame(frame => frame + 1);
    setTimeout(() => setIsWalking(false), 180);
    setSteps(s => s + 1);
    setLocation(LOCATION_FOR(mapIdRef.current, nx, ny, t));

    if (t === "X" && Math.random() < 0.13) {
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
      // Pick a random enemy weighted toward lower-level ones in starting area
      const pool = WILD_ENEMIES.slice(0, 3 + Math.floor(Math.random() * 2));
      const enemy = pool[Math.floor(Math.random() * pool.length)];
      setTimeout(() => setBattleEnemy(enemy), 600);
    }
  };

  const doInteract = () => {
    if (pausedRef.current) return;
    if (trainOpenRef.current) return;
    const d = dlgRef.current;
    if (d) {
      if (d.idx < d.lines.length - 1) {
        setDlg({ ...d, idx: d.idx + 1 });
      } else {
        setDlg(null);
        if (pendingPortalRef.current) {
          const portal = pendingPortalRef.current;
          pendingPortalRef.current = null;
          warpTo(portal);
        }
      }
      return;
    }

    const cur = posRef.current;
    const off: Record<string, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const [ox, oy] = off[facingRef.current];

    // Check adjacent then current tile. Auto doors only trigger from the
    // current tile so buildings cannot be entered from a step too far away.
    for (const [cx, cy] of [[cur.x + ox, cur.y + oy], [cur.x, cur.y]]) {
      const key = `${cx},${cy}`;
      const isCurrentTile = cx === cur.x && cy === cur.y;
      const npc = npcAt(mapIdRef.current, cx, cy);
      if (npc) {
        setDlg({ name: npc.name, lines: npc.lines, idx: 0 });
        return;
      }
      const generatedNpc = generatedNpcAt(mapIdRef.current, cx, cy);
      if (generatedNpc) {
        setDlg({ name: generatedNpc.name, lines: generatedNpc.lines, idx: 0 });
        return;
      }
      const staticInteraction = GAME_MAPS[mapIdRef.current].interactions[key];
      const dynamicInteraction = dynamicDoorActionFor(mapIdRef.current, cx, cy);
      const tileAtInteraction = rowsForMap(mapIdRef.current)[cy]?.[cx];
      const liveObjectAtInteraction = objectsForMap(mapIdRef.current)[key];
      const intr = dynamicInteraction ?? (
        tileAtInteraction === "O" || (tileAtInteraction === "V" && staticInteraction?.save) || liveObjectAtInteraction
          ? staticInteraction
          : undefined
      );
      if (intr) {
        if (intr.heal) setHp(h => ({ ...h, cur: h.max }));
        if (intr.save) { setSaveMsg("★ Saved!"); setTimeout(() => setSaveMsg(null), 2500); }
        if (intr.shop) { setSaveMsg("SHOP OPEN"); setTimeout(() => setSaveMsg(null), 1800); }
        if (intr.train) {
          setTrainIndex(0);
          setTrainOpen(true);
          return;
        }
        if (intr.portal && intr.auto && isCurrentTile) {
          warpTo(intr.portal);
          return;
        }
        if (intr.portal && intr.auto) continue;
        if (intr.portal) pendingPortalRef.current = intr.portal;
        setDlg({ name: intr.name, lines: intr.lines, idx: 0 });
        return;
      }
    }
  };

 // reads from refs — no deps needed










  // Camera: centre on player, clamped to map bounds
  const mapPxW = currentMap.width * TS;
  const mapPxH = currentMap.height * TS;
  const rawCamX = viewSize.w / 2 - (pos.x + 0.5) * TS;
  const rawCamY = viewSize.h / 2 - (pos.y + 0.5) * TS;
  const camX = mapPxW <= viewSize.w ? (viewSize.w - mapPxW) / 2 : Math.min(0, Math.max(rawCamX, viewSize.w - mapPxW));
  const camY = mapPxH <= viewSize.h ? (viewSize.h - mapPxH) / 2 : Math.min(0, Math.max(rawCamY, viewSize.h - mapPxH));

  const hpPct = (hp.cur / hp.max) * 100;
  const hpColor = hpPct > 50 ? "#5de85d" : hpPct > 25 ? "#f5c518" : "#e84a4a";

  const openTerrainEditor = () => {
    setTerrainEditorOpen(true);
    setEditedRowsByMap(prev => ({
      ...prev,
      [mapIdRef.current]: prev[mapIdRef.current] ?? rowsForMap(mapIdRef.current).map(row => [...row]),
    }));
    setEditedObjectsByMap(prev => ({
      ...prev,
      [mapIdRef.current]: prev[mapIdRef.current] ?? { ...objectsForMap(mapIdRef.current) },
    }));
    setEditedBuildingsByMap(prev => ({
      ...prev,
      [mapIdRef.current]: prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current).map(building => ({ ...building })),
    }));
    setEditedNpcsByMap(prev => ({
      ...prev,
      [mapIdRef.current]: prev[mapIdRef.current] ?? npcsForMap(mapIdRef.current).map(npc => ({ ...npc, lines: [...npc.lines] })),
    }));
  };

  const clearEditorDragState = () => {
    isEditorDraggingRef.current = false;
    setIsEditorDragging(false);
    setDraggedNpcId(null);
    setDraggedBuildingId(null);
    setDraggedObjectCoord(null);
    setResizeBuildingId(null);
    draggedNpcIdRef.current = null;
    draggedBuildingIdRef.current = null;
    draggedObjectCoordRef.current = null;
    resizeBuildingIdRef.current = null;
  };

  const {
    clearBuildingFromEditedRows: clearBuildingRowsForMovement,
    moveEditorBuildingTo,
  } = useBuildingMovement({
    mapIdRef,
    editedRowsByMapRef,
    editedBuildingsByMapRef,
    setEditedRowsByMap,
    setEditedBuildingsByMap,
    buildingsForMap,
  });

  const {
    resizeEditorBuildingTo,
  } = useBuildingResize({
    mapIdRef,
    editedRowsByMapRef,
    editedBuildingsByMapRef,
    setEditedRowsByMap,
    setEditedBuildingsByMap,
    buildingsForMap,
  });

  const {
    duplicateSelectedBuilding,
    placeEditorBuilding,
  } = useBuildingPlacement({
    mapIdRef,
    editedRowsByMapRef,
    editedBuildingsByMapRef,
    editorBuildingKindRef,
    editorBuildingColorRef,
    editorBuildingWRef,
    editorBuildingHRef,
    setEditedRowsByMap,
    setEditedBuildingsByMap,
    setEditorSelection,
    buildingsForMap,
  });

  const {
    removeEditorBuilding,
  } = useBuildingDeletion({
    mapIdRef,
    removedBuildingIdsByMapRef,
    editedBuildingsByMapRef,
    setRemovedBuildingIdsByMap,
    setEditedBuildingsByMap,
    setEditorSelection,
    clearBuildingFromEditedRows: clearBuildingRowsForMovement,
    buildingsForMap,
  });

  const {
    deleteSelectedObject,
    duplicateSelectedObject,
    moveEditorObjectTo,
  } = useObjectEditor({
    mapIdRef,
    editedObjectsByMapRef,
    setEditedObjectsByMap,
    setDraggedObjectCoord,
    setEditorSelection,
    objectsForMap,
    draggedObjectCoordRef,
  });

  const {
    deleteSelectedNpc,
    duplicateSelectedNpc,
    moveSelectedNpcTo,
    paintNpcEditorTile,
    upsertEditedNpcsForMap,
  } = useNpcEditor({
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
    npcVisualPresets: NPC_VISUAL_PRESETS,
  });

  const {
    paintEditorTile,
    transformDragTo,
  } = useTerrainPainter({
    mapIdRef,
    editorModeRef,
    isEditorDraggingRef,
    resizeBuildingIdRef,
    draggedBuildingIdRef,
    draggedObjectCoordRef,
    draggedNpcIdRef,
    objectEditActionRef,
    editorObjectIdRef,
    editorTileRef,
    npcsRef,
    setEditorSelection,
    setDraggedNpcId,
    setDraggedObjectCoord,
    setDraggedBuildingId,
    setResizeBuildingId,
    buildingsForMap,
    objectsForMap,
    rowsForMap,
    buildingAtCoord,
    resizeEditorBuildingTo,
    moveEditorBuildingTo,
    moveEditorObjectTo,
    moveSelectedNpcTo,
    paintNpcEditorTile,
    placeEditorBuilding,
    setEditedObjectsByMap,
    setEditedRowsByMap,
  });

useRuntimeEffects({
    trainOpenRef,
    handleTrainKey,
    terrainEditorOpenRef,
    editorSelectionRef,
    buildingsForMap,
    mapIdRef,
    duplicateSelectedBuilding,
    duplicateSelectedObject,
    duplicateSelectedNpc,
    removeEditorBuilding,
    deleteSelectedObject,
    deleteSelectedNpc,
    setTerrainEditorOpen,
    openTerrainEditor,
    setHeroEditorOpen,
    setPaused,
    doInteract,
    doMove,
    dlgRef,
    pausedRef,
    battleRef,
    setNpcs,
    rowsForMap,
    generatedNpcAt,
    posRef,
    viewRef,
    setViewSize,
    isEditorDraggingRef,
    setIsEditorDragging,
    draggedNpcIdRef,
    draggedBuildingIdRef,
    draggedObjectCoordRef,
    resizeBuildingIdRef,
    setDraggedNpcId,
    setDraggedBuildingId,
    setDraggedObjectCoord,
    setResizeBuildingId,
  });

  const resetEditedTerrain = () => {
    const id = mapIdRef.current;
    setEditedRowsByMap(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setEditedObjectsByMap(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setEditedBuildingsByMap(prev => {
      const next = { ...prev };
      delete next[id];
      editedBuildingsByMapRef.current = next;
      return next;
    });
    setRemovedBuildingIdsByMap(prev => {
      const next = { ...prev };
      delete next[id];
      removedBuildingIdsByMapRef.current = next;
      return next;
    });
    setEditedNpcsByMap(prev => {
      const next = { ...prev };
      delete next[id];
      editedNpcsByMapRef.current = next;
      return next;
    });
    setNpcs(prev => [
      ...prev.filter(npc => npc.mapId !== id),
      ...initialNpcsRef.current.filter(npc => npc.mapId === id),
    ]);
  };

  const exportEditedRows = () => {
    const id = mapIdRef.current;
    const rawRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows;
    const rows = rawRows.map(row => row.map(tile => BUILDING_TILE_IDS.has(tile) ? "G" : tile));
    const buildings = editedBuildingsByMapRef.current[id] ?? buildingsForMap(id);
    const objects = editedObjectsByMapRef.current[id] ?? GAME_MAPS[id].objects;
    const npcs = editedNpcsByMapRef.current[id] ?? npcsForMap(id);
    const map = GAME_MAPS[id];

    return createMapAssetExport({
      id,
      name: map.name,
      rows,
      objects,
      buildings,
      npcs,
      spawn: map.spawn,
    });
  };

  const copyEditedRows = async () => {
    const text = exportEditedRows();
    try {
      await navigator.clipboard.writeText(text);
      setSaveMsg("Map asset export copied! Paste into this city’s MapAsset file, then refresh/reset editor.");
    } catch {
      setSaveMsg("Could not copy export");
    }
    window.setTimeout(() => setSaveMsg(null), 2200);
  };

  return (
    <div className="gameboy-shell">
      <div ref={viewRef} className={`gameboy-screen screen-${mapId}`}>
        <style>
          {`
            .map-layer .map-tile::before,
            .map-layer .map-tile::after {
              display: none !important;
              opacity: 0 !important;
              background: transparent !important;
              content: none !important;
            }
          `}
        </style>

      {/* White battle flash */}
      {flash && (
        <div style={{ position: "absolute", inset: 0, zIndex: 60, backgroundColor: "rgba(255,255,255,0.55)", pointerEvents: "none" }} />
      )}

      {/* ── MAP ── */}
      <div style={{
        position: "absolute",
        transform: `translate(${camX}px,${camY}px)`,
        transition: "transform 0.1s linear",
        width: mapPxW, height: mapPxH,
      }} className={`map-layer map-${mapId}`}>
        {isTownMap(mapId) && (
            <PixelMapScene
              rows={displayRowsWithBuildings}
              buildings={pixelBuildingsFor(mapId, displayRowsWithBuildings)}
              objects={isTownMap(mapId) ? citySceneObjectsFor(mapId) : []}
              legacyObjects={displayObjects}
            />
        )}

        {!isTownMap(mapId) && Object.entries(displayObjects)
          .filter(([, obj]) => obj !== "NPC")
          .map(([coord, obj]) => {
            const [x, y] = coord.split(",").map(Number);
            return (
              <div
                key={`visible-${obj}-${coord}`}
                style={{
                  position: "absolute",
                  left: x * TS,
                  top: y * TS,
                  width: TS,
                  height: TS,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 44 + y,
                  pointerEvents: "none",
                }}
              >
                <div className={objectClassFor(obj)} />
              </div>
            );
          })}

        {/* Tiles rendered as flex rows */}
        {!isTownMap(mapId) && (<div className="" style={{ display: "flex", flexDirection: "column" }}>
          {displayRowsWithBuildings.map((row, ry) => (
            <div key={ry} style={{ display: "flex" }}>
              {row.map((t, cx) => {
                const obj = displayObjects[`${cx},${ry}`];
                const tileShapeClass = tileShapeClassFor(displayRowsWithBuildings, cx, ry, t);
                return (
                  <div
                    key={cx}
                    className={`map-tile tile-${t} ${tileShapeClass}`}
                    style={{
                      width: TS, height: TS, flexShrink: 0,
                      ...limeZuTileStyle(t, cx, ry, TS),
                      boxShadow: "inset 0 0 0 1px rgba(37,32,24,0.10)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: TS * 0.62, lineHeight: 1, userSelect: "none",
                    }}
                  >
                    {!isTownMap(mapId) && obj && obj !== "NPC" && <div className={objectClassFor(obj)} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>)}

        {displayEditorNpcs.map(npc => (
          <div
            key={npc.id}
            style={{
              position: "absolute",
              left: npc.x * TS,
              top: npc.y * TS,
              width: TS,
              height: TS,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9,
              pointerEvents: "none",
              transition: "left 0.28s linear, top 0.28s linear",
            }}
          >
            {npc.sheetAssetId ? (
              <CharacterSheetRenderer
                assetId={npc.sheetAssetId}
                animation={npc.walking ? "walk" : "idle"}
                facing="down"
                pixelSize={1}
                playing
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  transform: "translateX(-50%)",
                }}
              />
            ) : (
              <div className={`npc-sprite npc-variant-${npc.variant ?? 0} ${npc.style ?? ""} ${npc.walking ? "walking" : ""}`} />
            )}
          </div>
        ))}

        {displayRows.flatMap((row, y) =>
          row.map((tileName, x) => ({ tileName, x, y }))
            .filter(({ tileName }) => tileName === "N" || tileName === "Q")
            .filter(({ x, y }) => !npcAt(mapId, x, y))
        ).map(({ tileName, x, y }) => (
          <div
            key={`generated-npc-${x}-${y}`}
            style={{
              position: "absolute",
              left: x * TS,
              top: y * TS,
              width: TS,
              height: TS,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9,
              pointerEvents: "none",
            }}
          >
            <div className={`npc-sprite npc-variant-${tileName === "Q" ? 2 : 1}`} />
          </div>
        ))}

        {/* Player sprite — absolutely overlaid on the map */}
        <div style={{
          position: "absolute",
          left: pos.x * TS, top: pos.y * TS,
          width: TS, height: TS,
          display: "flex", alignItems: "center", justifyContent: "center",
          filter: "drop-shadow(0 3px 2px rgba(37,32,24,0.28))",
          zIndex: 80 + pos.y, pointerEvents: "none",
          transition: "left 0.15s linear, top 0.15s linear",
        }}>
          <div
            title={heroName}
            style={{
              width: TS,
              height: TS,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              transformOrigin: "center bottom",
              translate: "0 0",
              overflow: "visible",
            }}
          >
            <CharacterRenderer
              appearance={heroAppearance}
              facing={facing}
              animation={isWalking ? "walk" : "idle"}
              pixelSize={1}
              showShadow
            />
          </div>
        </div>
      </div>

      {/* ── HUD TOP ── */}
      <div style={{
        position: "fixed", top: 12, left: 12, right: 12, zIndex: 1000,
        padding: "10px 14px",
        border: "4px solid #252018",
        background: "#fff8c8",
        boxShadow: "inset 0 0 0 3px #ffffff, inset 0 0 0 6px #ffef93, 0 5px 0 rgba(90,60,34,0.55)",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        pointerEvents: "none",
      }}>
        {/* Player stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ ...PX, fontSize: "0.45rem", color: "#252018" }}>HERO · LV.15</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...RJ, fontSize: "0.75rem", color: "#e84a4a", fontWeight: 700 }}>HP</span>
            <div style={{ width: 120, height: 10, backgroundColor: "#252018", border: "1px solid #252018" }}>
              <div style={{ height: "100%", width: `${hpPct}%`, backgroundColor: hpColor, transition: "width 0.4s" }} />
            </div>
            <span style={{ ...RJ, fontSize: "0.75rem", color: "#252018", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
              {hp.cur}/{hp.max}
            </span>
          </div>
        </div>

        {/* Location */}
        <div style={{ textAlign: "center" }}>
          <div className="pixel-window px-4 py-1" style={{ ...VT, fontSize: "1.35rem" }}>{location}</div>
          <div style={{ ...RJ, fontSize: "0.7rem", color: "#66512c", fontWeight: 700 }}>Steps: {steps}</div>
        </div>

        {/* Currency + pause hint */}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ ...VT, fontSize: "1.2rem", color: "#252018" }}>1,240 G</div>
          <div style={{ ...RJ, fontSize: "0.65rem", color: "#66512c", fontWeight: 700 }}>ESC to pause</div>
        </div>
      </div>

      {/* ── IN-GAME BATTLE ── */}
      {battleEnemy && (
        <InGameBattle
          enemy={battleEnemy}
          playerHp={hp.cur}
          playerMaxHp={hp.max}
          onEnd={(result, newHp) => {
            setBattleEnemy(null);
            setHp(prev => ({ ...prev, cur: newHp }));
            if (result === "defeat") {
              setMapId("satiria");
              setPos(GAME_MAPS.satiria.spawn);
              setLocation("Satiria Town");
            }
          }}
        />
      )}

      {/* ── TERRAIN EDITOR ── */}
      {terrainEditorOpen && (
        <Suspense fallback={<div style={{ position: "fixed", inset: 0, zIndex: 5600, display: "grid", placeItems: "center", background: "rgba(37,32,24,0.85)", color: "#fff8c8", fontWeight: 900 }}>Loading editor...</div>}>
        <TerrainEditorOverlay
          mapId={mapId}
          displayRows={displayRows}
          displayObjects={displayObjects}
          displayBuildings={displayBuildings}
          displayEditorNpcs={displayEditorNpcs}
          selectedBuilding={selectedBuilding}
          selectedNpc={selectedNpc}
          editorMode={editorMode}
          setEditorMode={setEditorMode}
          editorTile={editorTile}
          setEditorTile={setEditorTile}
          editorBuildingKind={editorBuildingKind}
          setEditorBuildingKind={setEditorBuildingKind}
          editorBuildingColor={editorBuildingColor}
          setEditorBuildingColor={setEditorBuildingColor}
          editorBuildingW={editorBuildingW}
          setEditorBuildingW={setEditorBuildingW}
          editorBuildingH={editorBuildingH}
          setEditorBuildingH={setEditorBuildingH}
          objectEditAction={objectEditAction}
          setObjectEditAction={setObjectEditAction}
          editorObjectId={editorObjectId}
          setEditorObjectId={setEditorObjectId}
          npcEditAction={npcEditAction}
          npcEditorAction={npcEditorAction}
          setNpcEditorAction={setNpcEditorAction}
          editorNpcCategory={editorNpcCategory}
          setEditorNpcCategory={setEditorNpcCategory}
          editorNpcSearch={editorNpcSearch}
          setEditorNpcSearch={setEditorNpcSearch}
          editorNpcPresetId={editorNpcPresetId}
          setEditorNpcPresetId={setEditorNpcPresetId}
          editorNpcName={editorNpcName}
          setEditorNpcName={setEditorNpcName}
          editorNpcWalking={editorNpcWalking}
          setEditorNpcWalking={setEditorNpcWalking}
          editorNpcLines={editorNpcLines}
          setEditorNpcLines={setEditorNpcLines}
          editorSelection={editorSelection}
          mapIdRef={mapIdRef}
          rowsForMap={rowsForMap}
          tileTypeFor={tileTypeFor}
          setEditedBuildingsByMap={setEditedBuildingsByMap}
          editedBuildingsByMapRef={editedBuildingsByMapRef}
          buildingsForMap={buildingsForMap}
          setEditedObjectsByMap={setEditedObjectsByMap}
          editedObjectsByMapRef={editedObjectsByMapRef}
          objectsForMap={objectsForMap}
          setEditorSelection={setEditorSelection}
          duplicateSelectedBuilding={duplicateSelectedBuilding}
          removeEditorBuilding={removeEditorBuilding}
          moveEditorBuildingTo={(building, x, y) => moveEditorBuildingTo(building.id, x, y)}
          duplicateSelectedObject={duplicateSelectedObject}
          upsertEditedNpcsForMap={upsertEditedNpcsForMap}
          isTownMap={isTownMap}
          exportText={exportEditedRows()}
          onCopyExport={copyEditedRows}
          onReset={resetEditedTerrain}
          onClose={() => setTerrainEditorOpen(false)}
          clearEditorDragState={clearEditorDragState}
          isEditorDraggingRef={isEditorDraggingRef}
          setIsEditorDragging={setIsEditorDragging}
          paintEditorTile={paintEditorTile}
          transformDragTo={transformDragTo}
        />
        </Suspense>
      )}

      {/* ── HERO EDITOR ── */}
      {heroEditorOpen && (
        <HeroEditorOverlay
          heroName={heroName}
          setHeroName={setHeroName}
          heroAppearance={heroAppearance}
          setHeroAppearance={setHeroAppearance}
          facing={facing}
          onClose={() => setHeroEditorOpen(false)}
        />
      )}

      {/* ── SAVE MESSAGE ── */}
      {saveMsg && (
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          zIndex: 1100, border: "2px solid rgba(245,197,24,0.7)",
          backgroundColor: "rgba(30,20,0,0.95)", padding: "12px 28px",
          ...VT, fontSize: "1.5rem", color: "#f5c518",
        }}>
          {saveMsg}
        </div>
      )}

      {/* ── TRAIN STATION MENU ── */}
      {trainOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(37,32,24,0.38)",
          }}
        >
          <div
            className="pixel-window"
            style={{
              width: "min(520px, calc(100vw - 56px))",
              padding: "24px 28px",
              backgroundColor: "#fff8c8",
            }}
          >
            <div style={{ ...PX, fontSize: "0.85rem", color: "#ca4b36", marginBottom: 14 }}>
              TRAIN STATION
            </div>
            <div style={{ ...VT, fontSize: "1.25rem", color: "#315f2a", marginBottom: 12 }}>
              Departing: {currentTown?.name ?? currentMap.name}
            </div>
            <div style={{ height: 3, backgroundColor: "#252018", marginBottom: 12 }} />
            <div style={{ display: "grid", gap: 4 }}>
              {trainDestinations().map((town, index) => (
                <button
                  key={town.id}
                  type="button"
                  onClick={() => travelByTrain(town.id)}
                  onMouseEnter={() => setTrainIndex(index)}
                  style={{
                    border: index === trainIndex ? "2px solid #252018" : "2px solid transparent",
                    backgroundColor: index === trainIndex ? "#ca4b36" : "transparent",
                    color: index === trainIndex ? "#fff3a8" : "#252018",
                    padding: "5px 10px",
                    textAlign: "left",
                    cursor: "pointer",
                    ...VT,
                    fontSize: "1.35rem",
                  }}
                >
                  {index === trainIndex ? "▶ " : "  "}{town.name}
                </button>
              ))}
            </div>
            <div style={{ minHeight: 42, marginTop: 12, ...VT, fontSize: "1rem", color: "#66512c", lineHeight: 1.15 }}>
              {trainDestinations()[trainIndex]?.hook}
            </div>
            <div style={{ ...RJ, fontSize: "0.72rem", color: "#315f2a", marginTop: 8, fontWeight: 700 }}>
              UP/DOWN choose · SPACE depart · Z / ESC cancel
            </div>
          </div>
        </div>
      )}

      {/* ── DIALOGUE BOX ── */}
      {dlg && (
        <div
          onClick={doInteract}
          style={{
            position: "fixed", bottom: 80, left: 12, right: 12, zIndex: 1100,
            border: "4px solid #252018",
            backgroundColor: "#fff8c8",
            padding: "16px 20px", cursor: "pointer",
            boxShadow: "inset 0 0 0 4px #ffffff, 0 -8px 40px rgba(37,32,24,0.45)",
          }}
        >
          <div style={{ ...PX, fontSize: "0.45rem", color: "#b6422c", marginBottom: 10 }}>{dlg.name}</div>
          <div style={{ ...VT, fontSize: "1.7rem", color: "#252018", lineHeight: 1.35, minHeight: "3.2rem" }}>
            {dlg.lines[dlg.idx]}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ ...RJ, fontSize: "0.7rem", color: "rgba(37,32,24,0.45)" }}>
              {dlg.idx + 1} / {dlg.lines.length}
            </span>
            <span style={{ ...PX, fontSize: "0.38rem", color: "#252018" }} className="animate-bounce">
              ▼ SPACE / CLICK
            </span>
          </div>
        </div>
      )}

      {/* ── BOTTOM HINT ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
        padding: "8px 16px",
        background: "linear-gradient(to top, rgba(37,32,24,0.8) 0%, transparent 100%)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        pointerEvents: "none",
      }}>
        <span style={{ ...RJ, fontSize: "0.75rem", color: "rgba(255,248,200,0.8)" }}>
          WASD / Arrows: Move · Space/Z: Interact · H: Hero · Esc: Pause
        </span>
      </div>

      {/* ── ON-SCREEN D-PAD ── */}
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000, display: "grid", gridTemplateColumns: "repeat(3,38px)", gap: 3, width: 120 }}>
        <div /><button style={D_PAD_BTN} onClick={() => doMove(0,-1,"up")}>▲</button><div />
        <button style={D_PAD_BTN} onClick={() => doMove(-1,0,"left")}>◀</button>
        <button style={{ ...D_PAD_BTN, color: "#f5c518", borderColor: "rgba(245,197,24,0.3)" }} onClick={doInteract}>Z</button>
        <button style={D_PAD_BTN} onClick={() => doMove(1,0,"right")}>▶</button>
        <div /><button style={D_PAD_BTN} onClick={() => doMove(0,1,"down")}>▼</button><div />
      </div>

      {/* ── PAUSE MENU ── */}
      {paused && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.85)" }}>
          <div style={{ border: "2px solid rgba(245,197,24,0.55)", backgroundColor: "#0d0d1e", padding: "40px 48px", textAlign: "center", minWidth: 260 }}>
            <div style={{ ...PX, fontSize: "0.8rem", color: "#f5c518", marginBottom: 28 }}>PAUSED</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Resume", action: () => setPaused(false), color: "#5de85d" },
              ].map(btn => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  style={{
                    padding: "10px 24px", border: `2px solid ${btn.color}55`,
                    backgroundColor: `${btn.color}18`, color: btn.color,
                    ...PX, fontSize: "0.55rem", cursor: "pointer",
                    transition: "filter 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.25)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "none")}
                >
                  ▶ {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
function AppInner() {
  return <GameScreen onExit={() => undefined} />;
}







export default function GameWithEditorRuntime() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
