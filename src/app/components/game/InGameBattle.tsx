import { useEffect, useState } from "react";
import {
  ATTACK_CATEGORIES,
  type Enemy,
} from "../../../data/enemies";

const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

type IGPhase = "intro" | "action" | "cat" | "animating" | "victory" | "defeat";

export function InGameBattle({ enemy, playerHp, playerMaxHp, onEnd }: {
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
