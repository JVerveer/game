import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import {
  ATTACK_CATEGORIES, WILD_ENEMIES,
  type Enemy,
} from "../data/enemies";
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
} from "../data/maps";
import { INITIAL_NPCS, type MovingNpc } from "../data/npcs";
import { pixelBuildingsFor } from "../data/cityMaps/pixelSceneData";
import { citySceneObjectsFor } from "../data/cityMaps/scenes";
import { PixelMapScene } from "./pixelTiles";
import { objectClassFor, tileShapeClassFor } from "./mapRenderHelpers";

// ─── Font helpers ────────────────────────────────────────────────────────────
const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

// ─── GAME SCREEN ─────────────────────────────────────────────────────────────


// ── In-game battle component ──────────────────────────────────────────────────
type IGPhase = "intro" | "action" | "cat" | "animating" | "victory" | "defeat";

function InGameBattle({ enemy, playerHp, playerMaxHp, onEnd }: {
  enemy: Enemy;
  playerHp: number;
  playerMaxHp: number;
  onEnd: (result: "victory" | "defeat" | "escape", newHp: number) => void;
}) {
  const [phase, setPhase] = useState<IGPhase>("intro");
  const [pHp, setPHp] = useState(playerHp);
  const [eHp, setEHp] = useState(enemy.maxHp);
  const [msg, setMsg] = useState(`A wild ${enemy.name.toUpperCase()} appeared!`);
  const [sub, setSub] = useState(enemy.intro);
  const [dmg, setDmg] = useState<{ who: "p" | "e"; val: number; crit?: boolean } | null>(null);
  const [shake, setShake] = useState<"p" | "e" | null>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (e: string) => setLog(prev => [e, ...prev].slice(0, 5));

  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => { setMsg("What will you do?"); setSub(""); setPhase("action"); }, 2400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const flash = (who: "p" | "e", val: number, crit = false) => {
    setDmg({ who, val, crit }); setShake(who);
    setTimeout(() => { setDmg(null); setShake(null); }, 480);
  };

  const enemyTurn = (currentPHp: number) => {
    setTimeout(() => {
      const atk = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
      const raw = Math.floor(Math.random() * (atk.max - atk.min + 1)) + atk.min;
      const eDmg = Math.max(1, raw - 3);
      const newPHp = Math.max(0, currentPHp - eDmg);
      flash("p", eDmg);
      setPHp(newPHp);
      setMsg(`${enemy.name} used ${atk.name}!`);
      setSub(`You took ${eDmg} damage!`);
      addLog(`${enemy.name} → You: -${eDmg}`);
      if (newPHp <= 0) {
        setTimeout(() => { setMsg("You fainted!"); setSub("...try harder next time."); setPhase("defeat"); }, 900);
      } else {
        setTimeout(() => { setMsg("What will you do?"); setSub(""); setPhase("action"); }, 1700);
      }
    }, 1350);
  };

  const doAttack = (catLabel: string) => {
    const raw = Math.floor(Math.random() * 22) + 8;
    const crit = Math.random() < 0.12;
    const finalDmg = crit ? Math.floor(raw * 1.65) : raw;
    const newEHp = Math.max(0, eHp - finalDmg);
    flash("e", finalDmg, crit);
    setEHp(newEHp);
    setPhase("animating");
    setMsg(`You used ${catLabel}!${crit ? " ✦ CRITICAL HIT!" : ""}`);
    setSub(`Dealt ${finalDmg} damage!`);
    addLog(`You → ${enemy.name}: -${finalDmg}${crit ? " CRIT!" : ""}`);
    if (newEHp <= 0) {
      setTimeout(() => { setMsg(`${enemy.name} fainted!`); setSub(`+${enemy.xp} XP  ·  +${enemy.gold} G`); setPhase("victory"); }, 900);
    } else {
      enemyTurn(pHp);
    }
  };

  const doItem = () => {
    const heal = 30;
    const newPHp = Math.min(playerMaxHp, pHp + heal);
    setPHp(newPHp);
    flash("p", -heal);
    setMsg("Used Energy Drink!");
    setSub(`Restored ${heal} HP.`);
    addLog(`You used Energy Drink: +${heal} HP`);
    setPhase("animating");
    enemyTurn(newPHp);
  };

  const doRun = () => {
    if (Math.random() < 0.55) {
      setMsg("Got away safely!");
      setSub("Discretion is the better part of valour.");
      setPhase("animating");
      setTimeout(() => onEnd("escape", pHp), 1200);
    } else {
      setMsg("Can't escape!"); setSub(`${enemy.name} blocks the way!`);
      setPhase("animating");
      enemyTurn(pHp);
    }
  };

  const pPct = (pHp / playerMaxHp) * 100;
  const ePct = (eHp / enemy.maxHp) * 100;
  const barCol = (pct: number) => pct > 50 ? "#5de85d" : pct > 25 ? "#f5c518" : "#e84a4a";

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 40,
      display: "flex", flexDirection: "column",
      background: "linear-gradient(180deg,#8db45a 0%,#e6c768 58%,#b78d50 100%)",
    }}>
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(37,32,24,0.08) 5px,rgba(37,32,24,0.08) 6px)" }} />

      {/* Arena header */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 20px",
        borderBottom: "4px solid #252018", background: "#fff8c8", zIndex: 2 }}>
        <span style={{ ...PX, fontSize: "0.38rem", color: "#b6422c" }}>BATTLE ARENA</span>
        <span style={{ ...VT, fontSize: "1rem", color: "#66512c" }}>SATIRIA FIELDS - WILD ENCOUNTER</span>
        <span style={{ ...PX, fontSize: "0.38rem", color: "#b6422c" }}>TURN-BASED</span>
      </div>

      {/* Combat arena */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", padding: "12px 24px", gap: 16, zIndex: 2, minHeight: 0 }}>
        {/* Enemy */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="pixel-window" style={{ padding: "10px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span style={{ ...PX, fontSize: "0.52rem", color: "#b6422c" }}>{enemy.name.toUpperCase()}</span>
              <span style={{ ...RJ, fontSize: "0.75rem", color: "#66512c" }}>Lv.{enemy.level}</span>
            </div>
            <div style={{ ...RJ, fontSize: "0.72rem", color: "#66512c", marginBottom: 6 }}>{enemy.type} Type</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", color: "#e84a4a", fontWeight: 700 }}>HP</span>
              <div style={{ flex: 1, height: 10, backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ height: "100%", width: `${ePct}%`, backgroundColor: barCol(ePct), transition: "width 0.4s" }} />
              </div>
              <span style={{ ...RJ, fontSize: "0.7rem", color: "#66512c", fontVariantNumeric: "tabular-nums" }}>{eHp}/{enemy.maxHp}</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {dmg?.who === "e" && (
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                ...PX, fontSize: "0.72rem", color: dmg.crit ? "#f5c518" : "#e84a4a", zIndex: 5, whiteSpace: "nowrap" }}>
                {dmg.crit ? "✦ " : ""}-{dmg.val}
              </div>
            )}
            <div className="monster-sprite" style={{
              filter: dmg?.who === "e" ? "brightness(4) saturate(0.2)" : "drop-shadow(0 8px 24px rgba(0,0,0,0.9))",
              transform: shake === "e" ? "translateX(-14px) scale(0.88)" : "scale(1)",
              transition: "transform 0.1s, filter 0.1s", userSelect: "none" }} />
          </div>
        </div>

        {/* Player */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="pixel-window" style={{ padding: "10px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span style={{ ...PX, fontSize: "0.52rem", color: "#315f2a" }}>HERO</span>
              <span style={{ ...RJ, fontSize: "0.75rem", color: "#66512c" }}>Lv.15</span>
            </div>
            <div style={{ ...RJ, fontSize: "0.72rem", color: "#66512c", marginBottom: 6 }}>Satirist Type</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", color: "#5de85d", fontWeight: 700 }}>HP</span>
              <div style={{ flex: 1, height: 12, backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ height: "100%", width: `${pPct}%`, backgroundColor: barCol(pPct), transition: "width 0.4s" }} />
              </div>
              <span style={{ ...RJ, fontSize: "0.7rem", color: "#66512c", fontVariantNumeric: "tabular-nums" }}>{pHp}/{playerMaxHp}</span>
            </div>
            <div style={{ height: 4, backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ height: "100%", width: "68%", backgroundColor: "#4a9eff" }} />
            </div>
            <div style={{ ...RJ, fontSize: "0.62rem", color: "#66512c", marginTop: 2 }}>XP 340 / 500</div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {dmg?.who === "p" && (
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                ...PX, fontSize: "0.72rem", color: dmg.val < 0 ? "#5de85d" : "#e84a4a", zIndex: 5 }}>
                {dmg.val < 0 ? `+${Math.abs(dmg.val)}` : `-${dmg.val}`}
              </div>
            )}
            <div className="trainer-sprite" style={{
              filter: dmg?.who === "p" && (dmg.val ?? 0) > 0 ? "brightness(4) saturate(0.1)" : "drop-shadow(0 8px 24px rgba(0,0,0,0.9))",
              transform: shake === "p" ? "translateX(14px) scale(1.7)" : "scale(1.7)",
              transition: "transform 0.1s, filter 0.1s", userSelect: "none" }} />
          </div>
        </div>
      </div>

      {/* Battle text box */}
      <div className="pixel-window" style={{ margin: "0 16px 8px", padding: "12px 16px", zIndex: 2, minHeight: 68 }}>
        <div style={{ ...VT, fontSize: "1.55rem", color: "#252018", lineHeight: 1.3 }}>{msg}</div>
        {sub && <div style={{ ...VT, fontSize: "1.15rem", color: "#66512c", marginTop: 3 }}>{sub}</div>}
      </div>

      {/* Action area */}
      <div style={{ margin: "0 16px 14px", zIndex: 2 }}>
        {phase === "action" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            {([
              { label: "⚔ FIGHT",   color: "#e84a4a", action: () => setPhase("cat") },
              { label: "⚗ ITEM",    color: "#4a9eff", action: doItem },
              { label: "🛡 DEFEND",  color: "#5de85d", action: () => {
                setMsg("You brace yourself!"); setSub("DEF +1 this turn."); setPhase("animating");
                enemyTurn(pHp);
              }},
              { label: "🔄 SWITCH",  color: "#c87aff", action: () => {
                setMsg("No allies available!"); setSub(""); setPhase("animating");
                enemyTurn(pHp);
              }},
              { label: "★ SPECIAL", color: "#f5c518", action: () => {
                setMsg("No SP remaining!"); setSub("Out of special energy."); setPhase("animating");
                enemyTurn(pHp);
              }},
              { label: "🚪 RUN",     color: "#6b6b8e", action: doRun },
            ] as const).map((b: { label: string; color: string; action: () => void }) => (
              <button key={b.label} onClick={b.action} style={{
                padding: "10px 8px", border: `2px solid ${b.color}50`,
                backgroundColor: `${b.color}12`, color: b.color,
                ...RJ, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", textAlign: "left",
              }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${b.color}28`)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = `${b.color}12`)}
              >{b.label}</button>
            ))}
          </div>
        )}

        {phase === "cat" && (
          <div>
            <div style={{ ...VT, fontSize: "1.1rem", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Choose attack category:</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
              {ATTACK_CATEGORIES.map(cat => (
                <button key={cat.key} onClick={() => doAttack(cat.label)} style={{
                  padding: "10px 8px", border: `2px solid ${cat.color}50`,
                  backgroundColor: `${cat.color}10`, color: cat.color,
                  ...RJ, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${cat.color}28`)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = `${cat.color}10`)}
                >{cat.emoji} {cat.label}</button>
              ))}
              <button onClick={() => setPhase("action")} style={{
                padding: "10px", border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "transparent", color: "rgba(255,255,255,0.4)",
                ...RJ, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", gridColumn: "span 3",
              }}>← Back</button>
            </div>
          </div>
        )}

        {phase === "victory" && (
          <div style={{ textAlign: "center", padding: "6px 0" }}>
            <div style={{ ...VT, fontSize: "1.6rem", color: "#5de85d", marginBottom: 10 }}>
              ✦ +{enemy.xp} XP  ·  +{enemy.gold} G
            </div>
            <button onClick={() => onEnd("victory", pHp)} style={{
              padding: "12px 48px", border: "2px solid #f5c518",
              backgroundColor: "rgba(245,197,24,0.15)", color: "#f5c518",
              ...PX, fontSize: "0.55rem", cursor: "pointer",
            }}>▶ CONTINUE</button>
          </div>
        )}

        {phase === "defeat" && (
          <div style={{ textAlign: "center", padding: "6px 0" }}>
            <div style={{ ...VT, fontSize: "1.3rem", color: "#e84a4a", marginBottom: 10 }}>
              You were carried back to town.
            </div>
            <button onClick={() => onEnd("defeat", Math.floor(playerMaxHp * 0.3))} style={{
              padding: "12px 48px", border: "2px solid #e84a4a",
              backgroundColor: "rgba(232,74,74,0.15)", color: "#e84a4a",
              ...PX, fontSize: "0.55rem", cursor: "pointer",
            }}>▶ REVIVE</button>
          </div>
        )}

        {log.length > 0 && phase !== "victory" && phase !== "defeat" && (
          <div style={{ marginTop: 6, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 4 }}>
            {log.slice(0, 3).map((entry, i) => (
              <div key={i} style={{ ...VT, fontSize: "0.85rem", color: "rgba(255,255,255,0.28)" }}>{entry}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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
  { id: "B", name: "Shop Building", description: "Building body for shops" },
  { id: "H", name: "Healing Center", description: "Building body for healing center" },
  { id: "P", name: "Train Station", description: "Train station building" },
  { id: "U", name: "House / Urban Building", description: "Homes and canal houses" },
  { id: "A", name: "Special Building", description: "Museum, forum, landmark building" },
  { id: "I", name: "Institution", description: "Government, university, official building" },
  { id: "O", name: "Door / Portal", description: "Walkable entrance trigger" },
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
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [npcs, setNpcs] = useState<MovingNpc[]>(INITIAL_NPCS);
  const [trainOpen, setTrainOpen] = useState(false);
  const [trainIndex, setTrainIndex] = useState(0);
  const [terrainEditorOpen, setTerrainEditorOpen] = useState(false);
  const [editorTile, setEditorTile] = useState("G");
  const [isEditorDragging, setIsEditorDragging] = useState(false);
  const [editedRowsByMap, setEditedRowsByMap] = useState<Partial<Record<GameMapId, string[][]>>>({});
  const viewRef = useRef<HTMLDivElement>(null);
  const [viewSize, setViewSize] = useState({ w: 900, h: 600 });
  const currentMap = GAME_MAPS[mapId];
  const editedRows = editedRowsByMap[mapId];
  const displayRows = editedRows ?? currentMap.rows;
  const currentTown = isTownMap(mapId) ? TOWN_THEMES.find(town => town.id === mapId) : null;

  // Mutable refs so event handler closure stays fresh
  const mapIdRef = useRef(mapId);
  const posRef = useRef(pos);
  const facingRef = useRef(facing);
  const dlgRef = useRef(dlg);
  const pausedRef = useRef(paused);
  const battleRef = useRef(battleEnemy);
  const npcsRef = useRef(npcs);
  const trainOpenRef = useRef(trainOpen);
  const trainIndexRef = useRef(trainIndex);
  const terrainEditorOpenRef = useRef(terrainEditorOpen);
  const editedRowsByMapRef = useRef(editedRowsByMap);
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
  editorTileRef.current = editorTile;

  const isIndoor = (id: GameMapId) => id === "shop" || id === "house" || id === "healing";

  const rowsForMap = (id: GameMapId) => editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows;

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
    const targetInteraction = GAME_MAPS[mapIdRef.current].interactions[`${nx},${ny}`] ?? dynamicDoorActionFor(mapIdRef.current, nx, ny);

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
      const intr = GAME_MAPS[mapIdRef.current].interactions[key] ?? dynamicDoorActionFor(mapIdRef.current, cx, cy);
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (trainOpenRef.current) {
        e.preventDefault();
        handleTrainKey(e.key);
        return;
      }
      if (terrainEditorOpenRef.current) {
        if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
          e.preventDefault();
          setTerrainEditorOpen(false);
        }
        return;
      }
      if (e.key === "q" || e.key === "Q") {
        e.preventDefault();
        openTerrainEditor();
        return;
      }
      if (e.key === "Escape") { setPaused(p => !p); return; }
      if (e.key === " " || e.key === "z" || e.key === "Z" || e.key === "Enter") {
        e.preventDefault(); doInteract(); return;
      }
      if (e.key === "ArrowUp"    || e.key === "w" || e.key === "W") { e.preventDefault(); doMove(0, -1, "up", e.repeat); }
      if (e.key === "ArrowDown"  || e.key === "s" || e.key === "S") { e.preventDefault(); doMove(0, 1, "down", e.repeat); }
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") { e.preventDefault(); doMove(-1, 0, "left", e.repeat); }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { e.preventDefault(); doMove(1, 0, "right", e.repeat); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // reads from refs — no deps needed

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (dlgRef.current || pausedRef.current || battleRef.current || trainOpenRef.current) return;
      setNpcs(prev => prev.map(npc => {
        if (Math.random() > 0.45) return { ...npc, walking: false };
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;
        const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
        const nx = npc.x + dx;
        const ny = npc.y + dy;
        const map = GAME_MAPS[npc.mapId];
        const rows = rowsForMap(npc.mapId);
        const t = rows[ny]?.[nx] ?? "T";
        const nearHome = Math.abs(nx - npc.homeX) + Math.abs(ny - npc.homeY) <= 4;
        const blockedByPlayer = mapIdRef.current === npc.mapId && posRef.current.x === nx && posRef.current.y === ny;
        const blockedByNpc = prev.some(other => other.id !== npc.id && other.mapId === npc.mapId && other.x === nx && other.y === ny) || Boolean(generatedNpcAt(npc.mapId, nx, ny));
        if (!nearHome || !WALK.has(t) || t === "O" || blockedByPlayer || blockedByNpc) return { ...npc, walking: false };
        return { ...npc, x: nx, y: ny, walking: true };
      }));
      window.setTimeout(() => setNpcs(prev => prev.map(npc => ({ ...npc, walking: false }))), 280);
    }, 1300);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const upd = () => {
      if (viewRef.current) setViewSize({ w: viewRef.current.clientWidth, h: viewRef.current.clientHeight });
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);


  useEffect(() => {
    const stopPainting = () => {
      isEditorDraggingRef.current = false;
      setIsEditorDragging(false);
    };
    window.addEventListener("pointerup", stopPainting);
    window.addEventListener("pointercancel", stopPainting);
    return () => {
      window.removeEventListener("pointerup", stopPainting);
      window.removeEventListener("pointercancel", stopPainting);
    };
  }, []);

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
  };

  const paintEditorTile = (x: number, y: number) => {
    const id = mapIdRef.current;
    setEditedRowsByMap(prev => {
      const base = prev[id] ?? rowsForMap(id).map(row => [...row]);
      const next = base.map(row => [...row]);
      if (next[y]?.[x] !== undefined) next[y][x] = editorTileRef.current;
      return { ...prev, [id]: next };
    });
  };

  const resetEditedTerrain = () => {
    const id = mapIdRef.current;
    setEditedRowsByMap(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const exportEditedRows = () => {
    const id = mapIdRef.current;
    const rows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows;
    const constantName = `${String(id).toUpperCase()}_ROWS`;
    return `export const ${constantName}: string[] = ${JSON.stringify(rows.map(row => row.join("")), null, 2)};`;
  };

  const copyEditedRows = async () => {
    const text = exportEditedRows();
    try {
      await navigator.clipboard.writeText(text);
      setSaveMsg("Terrain export copied!");
    } catch {
      setSaveMsg("Could not copy export");
    }
    window.setTimeout(() => setSaveMsg(null), 2200);
  };

  return (
    <div className="gameboy-shell">
      <div ref={viewRef} className={`gameboy-screen screen-${mapId}`}>

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
              rows={displayRows}
              buildings={pixelBuildingsFor(mapId, displayRows)}
              objects={isTownMap(mapId) ? citySceneObjectsFor(mapId) : []}
            />
        )}

        {isTownMap(mapId) && Object.entries(currentMap.objects)
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
        <div className={isTownMap(mapId) ? "pixel-game-grid" : ""} style={{ display: "flex", flexDirection: "column" }}>
          {displayRows.map((row, ry) => (
            <div key={ry} style={{ display: "flex" }}>
              {row.map((t, cx) => {
                const obj = currentMap.objects[`${cx},${ry}`];
                const tileShapeClass = tileShapeClassFor(displayRows, cx, ry, t);
                return (
                  <div
                    key={cx}
                    className={`map-tile tile-${t} ${tileShapeClass}`}
                    style={{
                      width: TS, height: TS, flexShrink: 0,
                      backgroundColor: GAME_TILE_COLORS[t] ?? GAME_TILE_COLORS.G,
                      boxShadow: "inset 0 0 0 1px rgba(37,32,24,0.2)",
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
        </div>

        {npcs.filter(npc => npc.mapId === mapId).map(npc => (
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
            <div className={`npc-sprite npc-variant-${npc.variant ?? 0} ${npc.style ?? ""} ${npc.walking ? "walking" : ""}`} />
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
          zIndex: 10, pointerEvents: "none",
          transition: "left 0.18s steps(3, end), top 0.18s steps(3, end)",
        }}>
          <div className={`trainer-sprite facing-${facing} ${isWalking ? "walking" : ""}`} />
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
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            background: "rgba(37,32,24,0.94)",
            padding: 24,
            overflow: "auto",
          }}
        >
          <div className="pixel-window" style={{ padding: 18, marginBottom: 12 }}>
            <div style={{ ...PX, fontSize: "0.65rem", color: "#b6422c", marginBottom: 12 }}>
              TERRAIN EDITOR · {String(mapId).toUpperCase()}
            </div>

            <div style={{ ...VT, fontSize: "1.1rem", color: "#252018", marginBottom: 10 }}>
              Select a tile, then click or drag to paint. Your normal pixel-art map stays active. This editor is an overlay; changes feed into the normal map preview, collision, and export.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8, marginBottom: 12 }}>
              {TILE_TYPES.map(tile => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => setEditorTile(tile.id)}
                  title={`${tile.id} · ${tile.description}`}
                  style={{
                    minHeight: 56,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 9px",
                    border: editorTile === tile.id ? "4px solid #ca4b36" : "2px solid #252018",
                    background: editorTile === tile.id ? "#ffef93" : "#fff8c8",
                    color: "#252018",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 28,
                      height: 28,
                      flex: "0 0 auto",
                      background: EDITOR_TILE_COLORS[tile.id] ?? GAME_TILE_COLORS[tile.id] ?? GAME_TILE_COLORS.G,
                      border: "3px solid #252018",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
                    }}
                  />
                  <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ ...VT, fontSize: "1.1rem", lineHeight: 1 }}>{tile.name}</span>
                    <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>{tile.id} · {tile.description}</span>
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" onClick={copyEditedRows} style={{ padding: "8px 12px", cursor: "pointer" }}>
                Copy Export
              </button>
              <button type="button" onClick={resetEditedTerrain} style={{ padding: "8px 12px", cursor: "pointer" }}>
                Reset This Map
              </button>
              <button type="button" onClick={() => setTerrainEditorOpen(false)} style={{ padding: "8px 12px", cursor: "pointer" }}>
                Close
              </button>
            </div>

            <textarea
              readOnly
              value={exportEditedRows()}
              style={{
                width: "100%",
                minHeight: 110,
                marginTop: 12,
                padding: 10,
                border: "3px solid #252018",
                background: "#fff8c8",
                color: "#252018",
                fontFamily: "monospace",
                fontSize: 12,
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${displayRows[0]?.length ?? 1}, 18px)`,
              gap: 1,
              background: "#252018",
              width: "fit-content",
              padding: 4,
              border: "4px solid #fff8c8",
              touchAction: "none",
              userSelect: "none",
            }}
            onPointerUp={() => { isEditorDraggingRef.current = false; setIsEditorDragging(false); }}
            onPointerLeave={() => { isEditorDraggingRef.current = false; setIsEditorDragging(false); }}
          >
            {displayRows.map((row, y) =>
              row.map((tile, x) => (
                <button
                  key={`${x},${y}`}
                  type="button"
                  title={`${x},${y}: ${tileTypeFor(tile)?.name ?? tile} (${tile})`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    isEditorDraggingRef.current = true;
                    setIsEditorDragging(true);
                    paintEditorTile(x, y);
                  }}
                  onPointerEnter={() => {
                    if (isEditorDraggingRef.current) paintEditorTile(x, y);
                  }}
                  style={{
                    width: 18,
                    height: 18,
                    padding: 0,
                    border: "0",
                    background: EDITOR_TILE_COLORS[tile] ?? GAME_TILE_COLORS[tile] ?? GAME_TILE_COLORS.G,
                    cursor: "pointer",
                  }}
                />
              ))
            )}
          </div>
        </div>
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
          WASD / Arrows: Move · Space/Z: Interact · Esc: Pause
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

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
