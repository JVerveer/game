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
import { ACTIVE_MAP_OBJECT_DEFS, objectLabelForId } from "../data/objectRegistry";
import type { EditorNpcAsset, EditorBuildingAsset, EditorBuildingColor, EditorBuildingKind } from "../data/cityMaps/mapAsset";
import { applyBuildingsToRows, buildingCrestForKind, buildingTileForKind, doorForBuildingAsset } from "../data/cityMaps/mapAsset";


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


const tileKindForEditorBuilding = (tile: string): EditorBuildingKind | null => {
  if (tile === "A" || tile === "B") return tile === "A" ? "shop" : "house";
  if (tile === "H") return "healing";
  if (tile === "P") return "station";
  if (tile === "I") return "hall";
  if (tile === "U") return "house";
  return null;
};

const colorForEditorBuildingKind = (kind: EditorBuildingKind): EditorBuildingColor => {
  if (kind === "shop") return "green";
  if (kind === "healing") return "blue";
  if (kind === "station") return "red";
  return "purple";
};

const inferBuildingsFromRowsForEditor = (rows: string[][]): EditorBuildingAsset[] => {
  const seen = new Set<string>();
  const buildings: EditorBuildingAsset[] = [];
  const height = rows.length;
  const width = rows[0]?.length ?? 0;
  const buildingTiles = new Set(["A", "B", "H", "I", "P", "U"]);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = rows[y]?.[x];
      if (!tile || !buildingTiles.has(tile) || seen.has(`${x},${y}`)) continue;

      const queue = [{ x, y }];
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      seen.add(`${x},${y}`);

      for (let i = 0; i < queue.length; i++) {
        const cur = queue[i];
        minX = Math.min(minX, cur.x);
        maxX = Math.max(maxX, cur.x);
        minY = Math.min(minY, cur.y);
        maxY = Math.max(maxY, cur.y);

        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = cur.x + dx;
          const ny = cur.y + dy;
          const key = `${nx},${ny}`;
          if (seen.has(key) || rows[ny]?.[nx] !== tile) return;
          seen.add(key);
          queue.push({ x: nx, y: ny });
        });
      }

      const kind = tileKindForEditorBuilding(tile);
      if (!kind) continue;
      buildings.push({
        id: `legacy-building-${minX}-${minY}-${tile}`,
        x: minX,
        y: minY,
        w: maxX - minX + 1,
        h: maxY - minY + 1,
        kind,
        color: colorForEditorBuildingKind(kind),
        crest: buildingCrestForKind(kind),
      });
    }
  }

  return buildings;
};

const buildingAtCoord = (buildings: EditorBuildingAsset[], x: number, y: number) =>
  buildings.find(building =>
    x >= building.x &&
    x < building.x + building.w &&
    y >= building.y &&
    y < building.y + building.h
  );

const clearBuildingFootprintFromRows = (rows: string[][], building: EditorBuildingAsset) => {
  const next = rows.map(row => [...row]);
  const door = doorForBuildingAsset(building);

  const clearAt = (x: number, y: number) => {
    if (next[y]?.[x] !== undefined) next[y][x] = "G";
  };

  // Clear the known rectangle.
  for (let y = building.y; y < building.y + building.h; y++) {
    for (let x = building.x; x < building.x + building.w; x++) clearAt(x, y);
  }

  // Clear the door and the usual tile in front of it.
  clearAt(door.x, door.y);
  if (BUILDING_TILE_IDS.has(next[door.y + 1]?.[door.x] ?? "")) clearAt(door.x, door.y + 1);

  // Legacy/procedural buildings sometimes infer oddly when doors split the blob.
  // Flood clear any connected building/door tiles around the rectangle.
  const seeds = [
    { x: building.x, y: building.y },
    { x: building.x + building.w - 1, y: building.y },
    { x: building.x, y: building.y + building.h - 1 },
    { x: building.x + building.w - 1, y: building.y + building.h - 1 },
    door,
  ];
  const seen = new Set<string>();
  const queue = seeds.filter(seed => BUILDING_TILE_IDS.has(rows[seed.y]?.[seed.x] ?? "") || rows[seed.y]?.[seed.x] === "O");

  for (let i = 0; i < queue.length; i++) {
    const cur = queue[i];
    const key = `${cur.x},${cur.y}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const originalTile = rows[cur.y]?.[cur.x];
    if (!BUILDING_TILE_IDS.has(originalTile ?? "") && originalTile !== "O") continue;
    clearAt(cur.x, cur.y);

    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      const nextKey = `${nx},${ny}`;
      if (seen.has(nextKey)) return;
      const tile = rows[ny]?.[nx];
      if (BUILDING_TILE_IDS.has(tile ?? "") || tile === "O") queue.push({ x: nx, y: ny });
    });
  }

  return next;
};

const clearBuildingFootprintsFromRows = (rows: string[][], buildings: EditorBuildingAsset[]) =>
  buildings.reduce((current, building) => clearBuildingFootprintFromRows(current, building), rows);






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
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [npcs, setNpcs] = useState<MovingNpc[]>(INITIAL_NPCS);
  const [trainOpen, setTrainOpen] = useState(false);
  const [trainIndex, setTrainIndex] = useState(0);
  const [terrainEditorOpen, setTerrainEditorOpen] = useState(false);
  const [editorTile, setEditorTile] = useState("G");
  const [isEditorDragging, setIsEditorDragging] = useState(false);
  const [editedRowsByMap, setEditedRowsByMap] = useState<Partial<Record<GameMapId, string[][]>>>({});
  const [editedObjectsByMap, setEditedObjectsByMap] = useState<Partial<Record<GameMapId, Record<string, string>>>>({});
  const [editedBuildingsByMap, setEditedBuildingsByMap] = useState<Partial<Record<GameMapId, EditorBuildingAsset[]>>>({});
  const [removedBuildingIdsByMap, setRemovedBuildingIdsByMap] = useState<Partial<Record<GameMapId, Set<string>>>>({});
  const [editedNpcsByMap, setEditedNpcsByMap] = useState<Partial<Record<GameMapId, EditorNpcAsset[]>>>({});
  const [editorMode, setEditorMode] = useState<EditorMode>("select");
  const [editorSelection, setEditorSelection] = useState<EditorSelection>(null);
  const [draggedNpcId, setDraggedNpcId] = useState<string | null>(null);
  const [draggedBuildingId, setDraggedBuildingId] = useState<string | null>(null);
  const [draggedObjectCoord, setDraggedObjectCoord] = useState<string | null>(null);
  const [resizeBuildingId, setResizeBuildingId] = useState<string | null>(null);
  const [objectEditAction, setObjectEditAction] = useState<ObjectEditAction>("place");
  const [editorObjectId, setEditorObjectId] = useState("SIGN");
  const [editorBuildingKind, setEditorBuildingKind] = useState<EditorBuildingKind>("house");
  const [editorBuildingColor, setEditorBuildingColor] = useState<EditorBuildingColor>("purple");
  const [editorBuildingW, setEditorBuildingW] = useState(5);
  const [editorBuildingH, setEditorBuildingH] = useState(4);
  const [npcEditAction, setNpcEditAction] = useState<ObjectEditAction>("place");
  const [npcEditorAction, setNpcEditorAction] = useState<NpcEditorAction>("create");
  const [editorNpcName, setEditorNpcName] = useState("Local NPC");
  const [editorNpcPresetId, setEditorNpcPresetId] = useState("generic-young-man-0");
  const [editorNpcCategory, setEditorNpcCategory] = useState<NpcVisualCategory>("Generic");
  const [editorNpcSearch, setEditorNpcSearch] = useState("");
  const [editorNpcWalking, setEditorNpcWalking] = useState(true);
  const [editorNpcLines, setEditorNpcLines] = useState("Hello there!\nI was placed in the editor.");
  const viewRef = useRef<HTMLDivElement>(null);
  const [viewSize, setViewSize] = useState({ w: 900, h: 600 });
  const currentMap = GAME_MAPS[mapId];
  const editedRows = editedRowsByMap[mapId];
  const displayRows = editedRows ?? currentMap.rows;
  const editedObjects = editedObjectsByMap[mapId];
  const displayObjects = editedObjects ?? currentMap.objects;
  const removedBuildingIds = removedBuildingIdsByMap[mapId] ?? new Set<string>();
  const inferredBuildings = inferBuildingsFromRowsForEditor(displayRows).filter(building => !removedBuildingIds.has(building.id));
  const editedBuildings = editedBuildingsByMap[mapId];
  const displayBuildings = editedBuildings ?? inferredBuildings;
  const baseRowsWithoutBuildingTiles = displayRows.map(row => row.map(tile => BUILDING_TILE_IDS.has(tile) ? "G" : tile));
  const displayRowsWithBuildings = applyBuildingsToRows(baseRowsWithoutBuildingTiles, displayBuildings);
  const editedNpcs = editedNpcsByMap[mapId];
  const mapAssetNpcs = npcs.filter(npc => npc.mapId === mapId).map(npc => ({ id: npc.id, x: npc.x, y: npc.y, homeX: npc.homeX, homeY: npc.homeY, name: npc.name, lines: npc.lines, variant: npc.variant, style: npc.style, walking: npc.walking }));
  const displayEditorNpcs = mapAssetNpcs;
  const currentTown = isTownMap(mapId) ? TOWN_THEMES.find(town => town.id === mapId) : null;

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
  const npcsForMap = (id: GameMapId) => editedNpcsByMapRef.current[id] ?? npcsRef.current.filter(npc => npc.mapId === id).map(npc => ({ id: npc.id, x: npc.x, y: npc.y, homeX: npc.homeX, homeY: npc.homeY, name: npc.name, lines: npc.lines, variant: npc.variant, style: npc.style, walking: npc.walking }));

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
    // Compute synchronously first. Do not rely on React's async state callback
    // before syncing runtime NPCs, otherwise the runtime list can be replaced
    // with an empty array.
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (trainOpenRef.current) {
        e.preventDefault();
        handleTrainKey(e.key);
        return;
      }
      if (terrainEditorOpenRef.current) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
          e.preventDefault();
          const selection = editorSelectionRef.current;
          if (selection?.kind === "building") {
            const building = buildingsForMap(mapIdRef.current).find(item => item.id === selection.id);
            if (building) duplicateSelectedBuilding(building);
          }
          if (selection?.kind === "object") duplicateSelectedObject(selection.coord);
          if (selection?.kind === "npc") {
            const npc = npcsForMap(mapIdRef.current).find(item => item.id === selection.id);
            if (npc) {
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
            }
          }
          return;
        }
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          const selection = editorSelectionRef.current;
          if (selection?.kind === "building") {
            const building = buildingsForMap(mapIdRef.current).find(item => item.id === selection.id);
            if (building) removeEditorBuilding(building);
          }
          if (selection?.kind === "object") {
            const id = mapIdRef.current;
            setEditedObjectsByMap(prev => {
              const base = prev[id] ?? { ...objectsForMap(id) };
              const next = { ...base };
              delete next[selection.coord];
              editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
              return { ...prev, [id]: next };
            });
            setEditorSelection(null);
          }
          if (selection?.kind === "npc") {
            upsertEditedNpcsForMap(mapIdRef.current, current => current.filter(npc => npc.id !== selection.id));
            setEditorSelection(null);
          }
          return;
        }
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
      draggedNpcIdRef.current = null;
      draggedBuildingIdRef.current = null;
      draggedObjectCoordRef.current = null;
      resizeBuildingIdRef.current = null;
      setDraggedNpcId(null);
      setDraggedBuildingId(null);
      setDraggedObjectCoord(null);
      setResizeBuildingId(null);
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

  const moveSelectedNpcTo = (x: number, y: number) => {
    const id = mapIdRef.current;
    const npcId = draggedNpcIdRef.current;
    if (!npcId) return;
    const next = upsertEditedNpcsForMap(id, current => current.map(npc =>
      npc.id === npcId ? { ...npc, x, y, homeX: x, homeY: y } : npc
    ));
    if (next.some(npc => npc.id === npcId)) setEditorSelection({ kind: "npc", id: npcId });
  };

  const clearBuildingFromEditedRows = (id: GameMapId, building: EditorBuildingAsset) => {
    const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
    const nextRows = clearBuildingFootprintFromRows(baseRows, building);
    editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: nextRows };
    setEditedRowsByMap(prev => ({ ...prev, [id]: nextRows }));
    return nextRows;
  };

  const removeEditorBuilding = (building: EditorBuildingAsset) => {
    const id = mapIdRef.current;

    clearBuildingFromEditedRows(id, building);

    setRemovedBuildingIdsByMap(prev => {
      const nextSet = new Set(prev[id] ?? []);
      nextSet.add(building.id);
      const next = { ...prev, [id]: nextSet };
      removedBuildingIdsByMapRef.current = next;
      return next;
    });

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const nextBuildings = current.filter(item => item.id !== building.id);
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: nextBuildings };
      return { ...prev, [id]: nextBuildings };
    });

    setEditorSelection(null);
  };

  const moveEditorBuildingTo = (buildingId: string, x: number, y: number) => {
    const id = mapIdRef.current;

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const currentBuilding = current.find(building => building.id === buildingId);
      if (!currentBuilding) return prev;

      // Moving a legacy/procedural building must also clean its old terrain
      // footprint. Otherwise the old blue/red/purple building tiles remain
      // blocked and can still look like terrain.
      const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
      const cleanedRows = clearBuildingFootprintFromRows(baseRows, currentBuilding);
      editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: cleanedRows };
      setEditedRowsByMap(rowsPrev => ({ ...rowsPrev, [id]: cleanedRows }));

      const movedBuilding = { ...currentBuilding, x, y };
      const next = current.map(building => building.id === buildingId ? movedBuilding : building);

      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });
  };

  const resizeEditorBuildingTo = (buildingId: string, x: number, y: number) => {
    const id = mapIdRef.current;
    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const currentBuilding = current.find(building => building.id === buildingId);
      if (!currentBuilding) return prev;

      // Clear old footprint first, then re-apply the resized building through
      // displayRowsWithBuildings / rowsForMap. This prevents stale blocked tiles
      // when the building is made smaller.
      const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
      const cleanedRows = clearBuildingFootprintFromRows(baseRows, currentBuilding);
      editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: cleanedRows };
      setEditedRowsByMap(rowsPrev => ({ ...rowsPrev, [id]: cleanedRows }));

      const nextW = Math.max(3, x - currentBuilding.x + 1);
      const nextH = Math.max(3, y - currentBuilding.y + 1);
      const next = current.map(building => building.id === buildingId ? { ...building, w: nextW, h: nextH } : building);

      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });
  };

  const moveEditorObjectTo = (fromCoord: string, x: number, y: number) => {
    const id = mapIdRef.current;
    const toCoord = `${x},${y}`;
    if (fromCoord === toCoord) return;

    setEditedObjectsByMap(prev => {
      const base = prev[id] ?? { ...objectsForMap(id) };
      const obj = base[fromCoord];
      if (!obj) return prev;

      const next = { ...base };
      delete next[fromCoord];
      next[toCoord] = obj;
      editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    setDraggedObjectCoord(toCoord);
    draggedObjectCoordRef.current = toCoord;
    setEditorSelection({ kind: "object", coord: toCoord });
  };

  const duplicateSelectedBuilding = (building: EditorBuildingAsset) => {
    const id = mapIdRef.current;
    const clone: EditorBuildingAsset = {
      ...building,
      id: `${id}-building-${Date.now()}-copy`,
      x: building.x + 1,
      y: building.y + 1,
    };

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id);
      const withoutUnique = UNIQUE_BUILDING_KINDS.has(clone.kind)
        ? current.filter(item => item.kind !== clone.kind)
        : current;
      const next = [...withoutUnique, clone];
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    setEditorSelection({ kind: "building", id: clone.id });
  };

  const duplicateSelectedObject = (coord: string) => {
    const id = mapIdRef.current;
    const [x, y] = coord.split(",").map(Number);
    const nextCoord = `${x + 1},${y}`;

    setEditedObjectsByMap(prev => {
      const base = prev[id] ?? { ...objectsForMap(id) };
      const obj = base[coord];
      if (!obj) return prev;
      const next = { ...base, [nextCoord]: obj };
      editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });

    setEditorSelection({ kind: "object", coord: nextCoord });
  };

  const placeEditorBuilding = (x: number, y: number) => {
    const id = mapIdRef.current;
    const kind = editorBuildingKindRef.current;
    const building: EditorBuildingAsset = {
      id: `${id}-building-${Date.now()}`,
      x,
      y,
      w: Math.max(3, editorBuildingWRef.current),
      h: Math.max(3, editorBuildingHRef.current),
      kind,
      color: editorBuildingColorRef.current,
      crest: buildingCrestForKind(kind),
    };

    setEditedBuildingsByMap(prev => {
      const current = prev[id] ?? buildingsForMap(id).map(item => ({ ...item }));
      const door = doorForBuildingAsset(building);
      const removedBuildings: EditorBuildingAsset[] = [];
      const withoutOverlap = current.filter(item => {
        const itemDoor = doorForBuildingAsset(item);
        const overlaps =
          building.x < item.x + item.w &&
          building.x + building.w > item.x &&
          building.y < item.y + item.h &&
          building.y + building.h > item.y;
        const sameUniqueKind = UNIQUE_BUILDING_KINDS.has(kind) && item.kind === kind;
        const shouldRemove = overlaps || sameUniqueKind || (itemDoor.x === door.x && itemDoor.y === door.y);
        if (shouldRemove) removedBuildings.push(item);
        return !shouldRemove;
      });
      if (removedBuildings.length > 0) {
        const baseRows = editedRowsByMapRef.current[id] ?? GAME_MAPS[id].rows.map(row => [...row]);
        const nextRows = clearBuildingFootprintsFromRows(baseRows, removedBuildings);
        editedRowsByMapRef.current = { ...editedRowsByMapRef.current, [id]: nextRows };
        setEditedRowsByMap(rowsPrev => ({ ...rowsPrev, [id]: nextRows }));
      }
      const next = [...withoutOverlap, building];
      editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [id]: next };
      return { ...prev, [id]: next };
    });
  };

  const transformDragTo = (x: number, y: number) => {
    if (!isSelectEditorMode(editorModeRef.current)) return false;

    if (resizeBuildingIdRef.current) {
      resizeEditorBuildingTo(resizeBuildingIdRef.current, x, y);
      return true;
    }

    if (draggedBuildingIdRef.current) {
      moveEditorBuildingTo(draggedBuildingIdRef.current, x, y);
      return true;
    }

    if (draggedObjectCoordRef.current) {
      moveEditorObjectTo(draggedObjectCoordRef.current, x, y);
      return true;
    }

    if (draggedNpcIdRef.current) {
      moveSelectedNpcTo(x, y);
      return true;
    }

    return false;
  };

  const paintEditorTile = (x: number, y: number) => {
    const id = mapIdRef.current;
    const coord = `${x},${y}`;

    if (isSelectEditorMode(editorModeRef.current) && isEditorDraggingRef.current && transformDragTo(x, y)) {
      return;
    }

    if (isSelectEditorMode(editorModeRef.current)) {
      const npc = npcsRef.current.find(item => item.mapId === id && item.x === x && item.y === y);
      if (npc) {
        setEditorSelection({ kind: "npc", id: npc.id });
        setDraggedNpcId(npc.id);
        draggedNpcIdRef.current = npc.id;
        return;
      }

      // Objects are only 1 tile, so they should win over large building
      // footprints when an object sits on/near a building.
      if (objectsForMap(id)[coord]) {
        setEditorSelection({ kind: "object", coord });
        setDraggedObjectCoord(coord);
        draggedObjectCoordRef.current = coord;
        return;
      }

      const building = buildingAtCoord(buildingsForMap(id), x, y);
      if (building) {
        const isResizeHandle = x === building.x + building.w - 1 && y === building.y + building.h - 1;
        setEditorSelection({ kind: "building", id: building.id });
        setDraggedBuildingId(null);
        draggedBuildingIdRef.current = null;
        setResizeBuildingId(null);
        resizeBuildingIdRef.current = null;

        if (isResizeHandle) {
          setResizeBuildingId(building.id);
          resizeBuildingIdRef.current = building.id;
        } else {
          setDraggedBuildingId(building.id);
          draggedBuildingIdRef.current = building.id;
        }
        return;
      }

      setEditorSelection({ kind: "tile", x, y });
      return;
    }

    if (editorModeRef.current === "npcs") {
      const clickedNpc = npcsRef.current.find(item => item.mapId === id && item.x === x && item.y === y);

      if (npcEditorActionRef.current === "delete" || npcEditActionRef.current === "erase") {
        if (clickedNpc) {
          upsertEditedNpcsForMap(id, current => current.filter(npc => npc.id !== clickedNpc.id));
          if (editorSelectionRef.current?.kind === "npc" && editorSelectionRef.current.id === clickedNpc.id) {
            setEditorSelection(null);
          }
        }
        return;
      }

      const next = upsertEditedNpcsForMap(id, current => {
        const preset = NPC_VISUAL_PRESETS.find(item => item.id === editorNpcPresetIdRef.current) ?? NPC_VISUAL_PRESETS[0];
        const npcNumber = current.length + 1;
        const newNpc: EditorNpcAsset = {
          id: `${id}-editor-npc-${Date.now()}-${npcNumber}`,
          x,
          y,
          homeX: x,
          homeY: y,
          name: editorNpcNameRef.current.trim() || preset.label,
          lines: editorNpcLinesRef.current.split("\n").map(line => line.trim()).filter(Boolean),
          variant: preset.variant,
          style: isTownMap(id) ? `npc-town-${id} npc-role-${preset.styleRole}` : `npc-role-${preset.styleRole}`,
          walking: editorNpcWalkingRef.current,
        };
        return [...current, newNpc];
      });

      const placed = next.find(npc => npc.x === x && npc.y === y);
      if (placed) setEditorSelection({ kind: "npc", id: placed.id });
      return;
    }

    if (editorModeRef.current === "buildings") {
      placeEditorBuilding(x, y);
      return;
    }

    if (editorModeRef.current === "objects") {
      setEditedObjectsByMap(prev => {
        const base = prev[id] ?? { ...objectsForMap(id) };
        const next = { ...base };
        if (objectEditActionRef.current === "erase") {
          delete next[coord];
        } else {
          next[coord] = editorObjectIdRef.current;
        }
        return { ...prev, [id]: next };
      });
      return;
    }

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
            />
        )}

        {isTownMap(mapId) && Object.entries(displayObjects)
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

            <EditorToolbar editorMode={editorMode} setEditorMode={setEditorMode} />

            {editorMode === "terrain" && (
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

            )}

            {editorMode === "buildings" && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8, marginBottom: 12 }}>
                  {BUILDING_TYPES.map(building => (
                    <button
                      key={building.kind}
                      type="button"
                      onClick={() => {
                        setEditorBuildingKind(building.kind);
                        setEditorBuildingColor(building.defaultColor);
                        setEditorBuildingW(building.defaultW);
                        setEditorBuildingH(building.defaultH);
                      }}
                      title={building.description}
                      style={{
                        minHeight: 64,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: "8px 10px",
                        border: editorBuildingKind === building.kind ? "4px solid #315f2a" : "2px solid #252018",
                        background: editorBuildingKind === building.kind ? "#d8f0b0" : "#fff8c8",
                        color: "#252018",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ ...VT, fontSize: "1.2rem", lineHeight: 1 }}>{building.label}</span>
                      <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.7 }}>
                        {building.defaultW}×{building.defaultH} · {building.description}
                      </span>
                    </button>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, alignItems: "end" }}>
                  <label style={{ display: "grid", gap: 4 }}>
                    <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Roof color</span>
                    <select
                      value={editorBuildingColor}
                      onChange={(e) => setEditorBuildingColor(e.target.value as EditorBuildingColor)}
                      style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                    >
                      {BUILDING_COLORS.map(color => <option key={color} value={color}>{color}</option>)}
                    </select>
                  </label>
                  <label style={{ display: "grid", gap: 4 }}>
                    <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Width</span>
                    <input
                      type="number"
                      min={3}
                      max={14}
                      value={editorBuildingW}
                      onChange={(e) => setEditorBuildingW(Number(e.target.value))}
                      style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                    />
                  </label>
                  <label style={{ display: "grid", gap: 4 }}>
                    <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Height</span>
                    <input
                      type="number"
                      min={3}
                      max={10}
                      value={editorBuildingH}
                      onChange={(e) => setEditorBuildingH(Number(e.target.value))}
                      style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                    />
                  </label>
                  <div style={{ ...VT, fontSize: "1.05rem", color: "#252018" }}>
                    Click a top-left tile to place. Door is created automatically. Use Select to edit, move, resize, duplicate, or delete buildings.
                    {UNIQUE_BUILDING_KINDS.has(editorBuildingKind) && displayBuildings.some(building => building.kind === editorBuildingKind) && (
                      <div style={{ color: "#b6422c", marginTop: 4 }}>
                        Placing this will replace the existing {BUILDING_KIND_LABEL[editorBuildingKind]}.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {editorMode === "objects" && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  <button
                    type="button"
                    onClick={() => setObjectEditAction("place")}
                    style={{
                      padding: "7px 10px",
                      cursor: "pointer",
                      border: objectEditAction === "place" ? "4px solid #315f2a" : "2px solid #252018",
                      background: objectEditAction === "place" ? "#d8f0b0" : "#fff8c8",
                      color: "#252018",
                      fontWeight: 900,
                    }}
                  >
                    Place
                  </button>
                  <button
                    type="button"
                    onClick={() => setObjectEditAction("erase")}
                    style={{
                      padding: "7px 10px",
                      cursor: "pointer",
                      border: objectEditAction === "erase" ? "4px solid #ca4b36" : "2px solid #252018",
                      background: objectEditAction === "erase" ? "#ffd0c8" : "#fff8c8",
                      color: "#252018",
                      fontWeight: 900,
                    }}
                  >
                    Remove
                  </button>
                  <span style={{ ...VT, fontSize: "1.05rem", color: "#252018", alignSelf: "center" }}>
                    Selected: {objectLabelForId(editorObjectId)}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8, maxHeight: 260, overflow: "auto", paddingRight: 4 }}>
                  {OBJECT_EDITOR_CATEGORIES.flatMap(category =>
                    ACTIVE_MAP_OBJECT_DEFS.filter(def => def.category === category).map(def => (
                      <button
                        key={def.id}
                        type="button"
                        onClick={() => {
                          setEditorObjectId(def.id);
                          setObjectEditAction("place");
                        }}
                        title={def.id}
                        style={{
                          minHeight: 56,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "7px 9px",
                          border: editorObjectId === def.id && objectEditAction === "place" ? "4px solid #315f2a" : "2px solid #252018",
                          background: "#fff8c8",
                          color: "#252018",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{
                          width: 42,
                          height: 42,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#d7c58d",
                          border: "2px solid #252018",
                          flexShrink: 0,
                          overflow: "visible",
                        }}>
                          <span className={objectClassFor(def.id)} />
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ ...VT, fontSize: "1.05rem", lineHeight: 1 }}>{def.label}</span>
                          <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>{def.id} · {def.category}</span>
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {editorMode === "npcs" && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  {(["create", "delete"] as NpcEditorAction[]).map(action => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => {
                        setNpcEditorAction(action);
                        setNpcEditAction(action === "delete" ? "erase" : "place");
                      }}
                      style={{
                        padding: "7px 10px",
                        cursor: "pointer",
                        border: npcEditorAction === action ? "4px solid #315f2a" : "2px solid #252018",
                        background: npcEditorAction === action ? "#d8f0b0" : "#fff8c8",
                        color: "#252018",
                        fontWeight: 900,
                        textTransform: "capitalize",
                      }}
                    >
                      {action === "create" ? "Create NPC" : "Delete NPC"}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  <span style={{ ...VT, fontSize: "1.05rem", color: "#252018", alignSelf: "center" }}>
                    NPCs on map: {displayEditorNpcs.length}
                  </span>
                  <span style={{ ...RJ, fontSize: "0.78rem", color: "#66512c", alignSelf: "center", fontWeight: 800 }}>
                    {npcEditorAction === "create" ? "Click map to create." : "Click NPCs to delete."}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 240px) 1fr", gap: 10, alignItems: "start", marginBottom: 10 }}>
                  <label style={{ display: "grid", gap: 4 }}>
                    <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Name</span>
                    <input
                      value={editorNpcName}
                      onChange={(e) => setEditorNpcName(e.target.value)}
                      style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                    />
                  </label>
                  <label style={{ display: "grid", gap: 4 }}>
                    <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Dialogue, one line per row</span>
                    <textarea
                      value={editorNpcLines}
                      onChange={(e) => setEditorNpcLines(e.target.value)}
                      style={{ minHeight: 76, padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace" }}
                    />
                  </label>
                </div>

                <label style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10, color: "#252018", ...RJ, fontSize: "1rem", fontWeight: 800 }}>
                  <input
                    type="checkbox"
                    checked={editorNpcWalking}
                    onChange={(e) => setEditorNpcWalking(e.target.checked)}
                  />
                  Walks around home tile
                </label>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  {NPC_VISUAL_CATEGORIES.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setEditorNpcCategory(category)}
                      style={{
                        padding: "6px 9px",
                        cursor: "pointer",
                        border: editorNpcCategory === category ? "4px solid #315f2a" : "2px solid #252018",
                        background: editorNpcCategory === category ? "#d8f0b0" : "#fff8c8",
                        color: "#252018",
                        fontWeight: 900,
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <input
                  value={editorNpcSearch}
                  onChange={(e) => setEditorNpcSearch(e.target.value)}
                  placeholder="Search NPC visuals..."
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    padding: 8,
                    border: "2px solid #252018",
                    background: "#fff8c8",
                    color: "#252018",
                  }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 8, maxHeight: 310, overflow: "auto", paddingRight: 4 }}>
                  {NPC_VISUAL_PRESETS
                    .filter(preset => preset.category === editorNpcCategory)
                    .filter(preset => {
                      const query = editorNpcSearch.trim().toLowerCase();
                      if (!query) return true;
                      return preset.label.toLowerCase().includes(query) || preset.id.toLowerCase().includes(query) || preset.styleRole.toLowerCase().includes(query);
                    })
                    .map(preset => {
                    const style = isTownMap(mapId) ? `npc-town-${mapId} npc-role-${preset.styleRole}` : `npc-role-${preset.styleRole}`;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setEditorNpcPresetId(preset.id);
                          setEditorNpcName(name => name === "Local NPC" ? preset.label : name);
                          setNpcEditAction("place");
                        }}
                        style={{
                          minHeight: 66,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "7px 9px",
                          border: editorNpcPresetId === preset.id && npcEditAction === "place" ? "4px solid #315f2a" : "2px solid #252018",
                          background: "#fff8c8",
                          color: "#252018",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{
                          width: 42,
                          height: 42,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#d7c58d",
                          border: "2px solid #252018",
                          flexShrink: 0,
                        }}>
                          <span className={`npc-sprite npc-variant-${preset.variant} ${style}`} />
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ ...VT, fontSize: "1.05rem", lineHeight: 1 }}>{preset.label}</span>
                          <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>
                            v{preset.variant} · {preset.styleRole}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {isSelectEditorMode(editorMode) && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ ...VT, fontSize: "1.25rem", color: "#252018", marginBottom: 8 }}>
                  Inspector
                </div>

                {!editorSelection && (
                  <div style={{ ...RJ, fontSize: "0.9rem", color: "#66512c" }}>
                    Click an NPC, building, object, or tile to inspect it. Drag NPCs/buildings/objects to move them. Use the inspector to edit, duplicate, or delete.
                  </div>
                )}

                {editorSelection?.kind === "tile" && (() => {
                  const selectedTile = rowsForMap(mapId)[editorSelection.y]?.[editorSelection.x] ?? "G";
                  const selectedTerrain = tileTypeFor(selectedTile);
                  return (
                    <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                      Selected tile: {editorSelection.x},{editorSelection.y}
                      <br />
                      Terrain: <b>{selectedTerrain?.name ?? selectedTile}</b> ({selectedTile})
                    </div>
                  );
                })()}

                {selectedBuilding && (
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                      Building: <b>{BUILDING_KIND_LABEL[selectedBuilding!.kind]}</b> at {selectedBuilding!.x},{selectedBuilding!.y}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Type</span>
                        <select
                          value={selectedBuilding!.kind}
                          onChange={(e) => {
                            const kind = e.target.value as EditorBuildingKind;
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map(building => building.id === selectedBuilding!.id
                                ? { ...building, kind, crest: buildingCrestForKind(kind), color: colorForEditorBuildingKind(kind) }
                                : building
                              ).filter((building, _, all) => !UNIQUE_BUILDING_KINDS.has(building.kind) || building.id === selectedBuilding!.id || all.find(other => other.kind === building.kind)?.id === building.id);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        >
                          {BUILDING_TYPES.map(type => <option key={type.kind} value={type.kind}>{type.label}</option>)}
                        </select>
                      </label>

                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Color</span>
                        <select
                          value={selectedBuilding!.color}
                          onChange={(e) => {
                            const color = e.target.value as EditorBuildingColor;
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map(building => building.id === selectedBuilding!.id ? { ...building, color } : building);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        >
                          {BUILDING_COLORS.map(color => <option key={color} value={color}>{color}</option>)}
                        </select>
                      </label>

                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Width</span>
                        <input
                          type="number"
                          min={3}
                          max={14}
                          value={selectedBuilding!.w}
                          onChange={(e) => {
                            const w = Number(e.target.value);
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map(building => building.id === selectedBuilding!.id ? { ...building, w } : building);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>

                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Height</span>
                        <input
                          type="number"
                          min={3}
                          max={10}
                          value={selectedBuilding!.h}
                          onChange={(e) => {
                            const h = Number(e.target.value);
                            setEditedBuildingsByMap(prev => {
                              const current = prev[mapIdRef.current] ?? buildingsForMap(mapIdRef.current);
                              const next = current.map(building => building.id === selectedBuilding!.id ? { ...building, h } : building);
                              editedBuildingsByMapRef.current = { ...editedBuildingsByMapRef.current, [mapIdRef.current]: next };
                              return { ...prev, [mapIdRef.current]: next };
                            });
                          }}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>X</span>
                        <input
                          type="number"
                          value={selectedBuilding!.x}
                          onChange={(e) => moveEditorBuildingTo(selectedBuilding!.id, Number(e.target.value), selectedBuilding!.y)}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>
                      <label style={{ display: "grid", gap: 4 }}>
                        <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Y</span>
                        <input
                          type="number"
                          value={selectedBuilding!.y}
                          onChange={(e) => moveEditorBuildingTo(selectedBuilding!.id, selectedBuilding!.x, Number(e.target.value))}
                          style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                        />
                      </label>
                    </div>

                    <div style={{ ...RJ, fontSize: "0.82rem", color: "#66512c", fontWeight: 700 }}>
                      Drag the building to move it. Drag its bottom-right tile to resize it.
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => duplicateSelectedBuilding(selectedBuilding)}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
                      >
                        Duplicate Building
                      </button>
                      <button
                        type="button"
                        onClick={() => removeEditorBuilding(selectedBuilding)}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #ca4b36", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
                      >
                        Delete Building
                      </button>
                    </div>
                  </div>
                )}

                {editorSelection?.kind === "object" && (
                  <div style={{ display: "grid", gap: 8 }}>
                    <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                      Object at {editorSelection.coord}: <b>{displayObjects[editorSelection.coord]}</b>
                    </div>

                    <div style={{ ...RJ, fontSize: "0.82rem", color: "#66512c", fontWeight: 700 }}>
                      Drag the object on the editor grid to move it.
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => duplicateSelectedObject(editorSelection.coord)}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
                      >
                        Duplicate Object
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const id = mapIdRef.current;
                          setEditedObjectsByMap(prev => {
                            const base = prev[id] ?? { ...objectsForMap(id) };
                            const next = { ...base };
                            delete next[editorSelection.coord];
                            editedObjectsByMapRef.current = { ...editedObjectsByMapRef.current, [id]: next };
                            return { ...prev, [id]: next };
                          });
                          setEditorSelection(null);
                        }}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #ca4b36", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
                      >
                        Delete Object
                      </button>
                    </div>
                  </div>
                )}

                {selectedNpc && (
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        width: 48,
                        height: 48,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#d7c58d",
                        border: "2px solid #252018",
                      }}>
                        <span className={`npc-sprite npc-variant-${selectedNpc.variant ?? 0} ${selectedNpc.style ?? ""}`} />
                      </span>
                      <div style={{ ...RJ, fontSize: "0.95rem", color: "#252018" }}>
                        NPC at {selectedNpc.x},{selectedNpc.y}
                      </div>
                    </div>

                    <label style={{ display: "grid", gap: 4 }}>
                      <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Name</span>
                      <input
                        value={selectedNpc.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.map(npc => npc.id === selectedNpc.id ? { ...npc, name: value } : npc));
                        }}
                        style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
                      />
                    </label>

                    <label style={{ display: "grid", gap: 4 }}>
                      <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Dialogue, one line per row</span>
                      <textarea
                        value={selectedNpc.lines.join("\n")}
                        onChange={(e) => {
                          const lines = e.target.value.split("\n").map(line => line.trim()).filter(Boolean);
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.map(npc => npc.id === selectedNpc.id ? { ...npc, lines } : npc));
                        }}
                        style={{ minHeight: 76, padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", fontFamily: "monospace" }}
                      />
                    </label>

                    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#252018", ...RJ, fontSize: "1rem", fontWeight: 800 }}>
                      <input
                        type="checkbox"
                        checked={selectedNpc.walking !== false}
                        onChange={(e) => {
                          const walking = e.target.checked;
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.map(npc => npc.id === selectedNpc.id ? { ...npc, walking } : npc));
                        }}
                      />
                      Walks around home tile
                    </label>

                    <div>
                      <div style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018", marginBottom: 6 }}>Change visual</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8, maxHeight: 180, overflow: "auto", paddingRight: 4 }}>
                        {NPC_VISUAL_PRESETS.map(preset => {
                          const style = isTownMap(mapId) ? `npc-town-${mapId} npc-role-${preset.styleRole}` : `npc-role-${preset.styleRole}`;
                          return (
                            <button
                              key={`selected-${preset.id}`}
                              type="button"
                              onClick={() => {
                                upsertEditedNpcsForMap(mapIdRef.current, current => current.map(npc => npc.id === selectedNpc.id ? { ...npc, variant: preset.variant, style } : npc));
                              }}
                              style={{
                                minHeight: 58,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "6px 8px",
                                border: selectedNpc.variant === preset.variant && selectedNpc.style === style ? "4px solid #315f2a" : "2px solid #252018",
                                background: "#fff8c8",
                                color: "#252018",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ width: 36, height: 36, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "#d7c58d", border: "2px solid #252018", flexShrink: 0 }}>
                                <span className={`npc-sprite npc-variant-${preset.variant} ${style}`} />
                              </span>
                              <span style={{ ...VT, fontSize: "0.95rem", lineHeight: 1 }}>{preset.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => {
                          upsertEditedNpcsForMap(mapIdRef.current, current => current.filter(npc => npc.id !== selectedNpc.id));
                          setEditorSelection(null);
                        }}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #ca4b36", background: "#ffd0c8", color: "#252018", fontWeight: 900 }}
                      >
                        Delete NPC
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const clone: EditorNpcAsset = {
                            ...selectedNpc,
                            id: `${mapIdRef.current}-editor-npc-${Date.now()}-copy`,
                            x: selectedNpc.x + 1,
                            homeX: selectedNpc.x + 1,
                            y: selectedNpc.y,
                            homeY: selectedNpc.y,
                            lines: [...selectedNpc.lines],
                          };
                          upsertEditedNpcsForMap(mapIdRef.current, current => [...current, clone]);
                          setEditorSelection({ kind: "npc", id: clone.id });
                        }}
                        style={{ padding: "8px 12px", cursor: "pointer", border: "2px solid #315f2a", background: "#d8f0b0", color: "#252018", fontWeight: 900 }}
                      >
                        Duplicate NPC
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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
            onPointerUp={clearEditorDragState}
            onPointerLeave={clearEditorDragState}
          >
            {displayRows.map((row, y) =>
              row.map((tile, x) => (
                <button
                  key={`${x},${y}`}
                  type="button"
                  title={`${x},${y}: ${tileTypeFor(tile)?.name ?? tile} (${tile})${buildingAtCoord(displayBuildings, x, y) ? ` · Building: ${BUILDING_KIND_LABEL[buildingAtCoord(displayBuildings, x, y)!.kind]}` : ""}${displayObjects[`${x},${y}`] ? ` · Object: ${objectLabelForId(displayObjects[`${x},${y}`])}` : ""}${displayEditorNpcs.some(npc => npc.x === x && npc.y === y) ? " · NPC" : ""}`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    isEditorDraggingRef.current = true;
                    setIsEditorDragging(true);
                    paintEditorTile(x, y);
                  }}
                  onPointerEnter={() => {
                    if (isEditorDraggingRef.current && transformDragTo(x, y)) return;
                    if (isEditorDraggingRef.current) paintEditorTile(x, y);
                  }}
                  style={{
                    width: 18,
                    height: 18,
                    padding: 0,
                    border: displayEditorNpcs.some(npc => npc.x === x && npc.y === y) ? "2px solid #c87aff" : buildingAtCoord(displayBuildings, x, y) ? "2px solid #38bdf8" : displayObjects[`${x},${y}`] ? "2px solid #ffef93" : "0",
                    background: EDITOR_TILE_COLORS[tile] ?? GAME_TILE_COLORS[tile] ?? GAME_TILE_COLORS.G,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {buildingAtCoord(displayBuildings, x, y) && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 1,
                        background: "rgba(56,189,248,0.58)",
                        color: "#252018",
                        fontSize: 9,
                        lineHeight: "14px",
                        fontWeight: 900,
                        textAlign: "center",
                        borderRadius: 2,
                        pointerEvents: "none",
                      }}
                    >
                      {buildingAtCoord(displayBuildings, x, y)?.id === selectedBuilding?.id && x === selectedBuilding!.x + selectedBuilding!.w - 1 && y === selectedBuilding!.y + selectedBuilding!.h - 1 ? "↘" : "⌂"}
                    </span>
                  )}
                  {displayObjects[`${x},${y}`] && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 2,
                        background: objectEditAction === "erase" && editorMode === "objects" ? "#ca4b36" : "#252018",
                        color: "#fff8c8",
                        fontSize: 9,
                        lineHeight: "12px",
                        fontWeight: 900,
                        textAlign: "center",
                        borderRadius: 2,
                        pointerEvents: "none",
                      }}
                    >
                      ◆
                    </span>
                  )}
                  {displayEditorNpcs.some(npc => npc.x === x && npc.y === y) && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 3,
                        background: npcEditAction === "erase" && editorMode === "npcs" ? "#ca4b36" : "#8a4bd6",
                        color: "#fff8c8",
                        fontSize: 9,
                        lineHeight: "10px",
                        fontWeight: 900,
                        textAlign: "center",
                        borderRadius: 999,
                        pointerEvents: "none",
                      }}
                    >
                      N
                    </span>
                  )}
                </button>
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





const cleanRowsForMapAssetExport = (rows: string[][]) =>
  rows.map(row => row.map(tile => BUILDING_TILE_IDS.has(tile) ? "G" : tile));

const createMapAssetExport = ({
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
// After saving, refresh the browser or press Reset This Map in the editor
// so old in-memory edits do not override the new source file.
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

function EditorToolbar({
  editorMode,
  setEditorMode,
}: {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
}) {
  const modes: EditorMode[] = ["select", "terrain", "buildings", "objects", "npcs"];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
      {modes.map(mode => (
        <button
          key={mode}
          type="button"
          onClick={() => setEditorMode(mode)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            border: editorMode === mode ? "4px solid #ca4b36" : "2px solid #252018",
            background: editorMode === mode ? "#fff3a8" : "#fff8c8",
            color: "#252018",
            fontWeight: 900,
            textTransform: "capitalize",
          }}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
