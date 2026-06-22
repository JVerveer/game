import { useState, useEffect, useRef } from "react";
import {
  Star, Layers, Grid3x3, Sword, Map, User, Package,
  ScrollText, ShoppingBag, Save, Settings,
  Volume2, Gamepad2, Eye, Palette,
  type LucideIcon,
} from "lucide-react";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import {
  ATTACK_CATEGORIES, STATUS_EFFECTS, WILD_ENEMIES, ENCOUNTER_MSGS,
  type Enemy,
} from "../data/enemies";
import {
  ITEMS, INV_TABS, SHOP_ITEMS,
  RARITY_COLORS as ITEM_RARITY_COLORS,
} from "../data/items";
import {
  DS_TILE_COLORS, DS_TILE_ICONS, DS_MAP_ROWS,
  WALKABLE_TILES as WALK,
  GAME_MAPS,
  MAIN_TOWN_IDS,
  TOWN_THEMES,
  TOWN_WORLD_POSITIONS,
  WORLD_ROUTES,
  type GameMapId,
  type Portal,
  type TownMapId,
  getLocationName as LOCATION_FOR,
} from "../data/maps";
import {
  QUESTS, QUEST_TABS, STATUS_COLORS as QUEST_STATUS_COLORS,
  type Quest,
} from "../data/quests";
import {
  INITIAL_HERO, HERO_STATS, REPUTATION_CATEGORIES, ALLIES,
  RARITY_COLORS as ALLY_RARITY_COLORS,
} from "../data/hero";

// ─── Types ──────────────────────────────────────────────────────────────────
type PageId =
  | "cover" | "design" | "components" | "overworld"
  | "battle" | "character" | "inventory" | "quests"
  | "shop" | "save" | "settings";

// ─── Font helpers ────────────────────────────────────────────────────────────
const PX = { fontFamily: "'Press Start 2P', monospace" } as const;
const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

// ─── Reusable micro-components ───────────────────────────────────────────────
function HPBar({
  current, max, size = "md",
}: { current: number; max: number; size?: "sm" | "md" | "lg" }) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const color = pct > 50 ? "#5de85d" : pct > 25 ? "#f5c518" : "#e84a4a";
  const h = size === "sm" ? "h-2" : size === "md" ? "h-3" : "h-5";
  return (
    <div className={`w-full ${h} bg-black/60 border border-white/10`}>
      <div
        className="h-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function XPBar({ pct }: { pct: number }) {
  return (
    <div className="w-full h-2 bg-black/60 border border-white/10">
      <div
        className="h-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: "#4a9eff" }}
      />
    </div>
  );
}

function Panel({
  children, className = "", color = "gold",
}: { children: React.ReactNode; className?: string; color?: "gold" | "green" | "red" | "blue" | "purple" }) {
  const borders: Record<string, string> = {
    gold: "border-yellow-950",
    green: "border-green-950",
    red: "border-red-950",
    blue: "border-blue-950",
    purple: "border-purple-950",
  };
  return (
    <div className={`pixel-window ${borders[color]} p-4 ${className}`}>
      {children}
    </div>
  );
}

function PageHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-amber-500/20">
      <span className="text-amber-500/50 text-xs" style={{ ...PX, fontSize: "0.55rem" }}>{num}</span>
      <h1 className="text-amber-400" style={{ ...PX, fontSize: "0.85rem" }}>{title}</h1>
    </div>
  );
}

function SectionHead({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px flex-1 bg-amber-500/15" />
      <span className="text-amber-500/60 tracking-widest" style={{ ...PX, fontSize: "0.45rem" }}>{label}</span>
      <div className="h-px flex-1 bg-amber-500/15" />
    </div>
  );
}


// ─── COVER ───────────────────────────────────────────────────────────────────
function CoverPage({ onStart }: { onStart: () => void }) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 650);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Enter") onStart(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onStart]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(180deg,#f7db55 0%,#f1bd32 46%,#78a856 46%,#78a856 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(37,32,24,.08) 1px,transparent 1px),linear-gradient(0deg,rgba(37,32,24,.08) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="z-20 text-center w-[min(92vw,760px)] pixel-frame bg-[#fff8c8] px-6 py-8 md:px-12 md:py-10">
        <div className="mb-6 tracking-[0.3em] text-[#66512c]" style={{ ...PX, fontSize: "0.5rem" }}>
          SATIRE STUDIOS PRESENTS
        </div>

        <div className="mb-2">
          <span className="text-[#df3f2c] leading-none" style={{ ...PX, fontSize: "clamp(1.8rem,5vw,3.6rem)" }}>
            CRINGE
          </span>
        </div>
        <div className="mb-8">
          <span className="text-[#252018] leading-none" style={{ ...PX, fontSize: "clamp(1.8rem,5vw,3.6rem)" }}>
            QUEST
          </span>
        </div>

        <div className="text-[#315f2a] mb-8" style={{ ...VT, fontSize: "1.7rem" }}>
          A satirical monster-collecting RPG
        </div>

        <div
          className="my-6 mx-auto relative flex items-end justify-center gap-12 border-4 border-[#252018] bg-[#8db45a] pixel-screen"
          style={{ height: 148, maxWidth: 520 }}
        >
          <div className="trainer-sprite mb-8 scale-150" />
          <div className="text-[#252018] mb-16" style={{ ...PX, fontSize: "1.2rem" }}>VS</div>
          <div className="monster-sprite mb-6" />
          <div className="absolute bottom-0 left-0 right-0 h-10 border-t-4 border-[#252018] bg-[#b78d50]" />
        </div>

        <button
          onClick={onStart}
          className="pixel-btn mt-4 mb-6 mx-auto block px-6 py-3 text-center cursor-pointer transition-colors"
          style={{
            ...PX,
            fontSize: "0.6rem",
            opacity: blink ? 1 : 0.35,
            transition: "opacity 0.05s",
            backgroundColor: "#fff8c8",
            color: "#252018",
            minWidth: 180,
          }}
        >
          PRESS ENTER
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {["Yellow Era", "Turn Battles", "Tall Grass", "Satire Town"].map((s) => (
            <div key={s} className="border-2 border-[#252018] bg-[#f6d746] py-2 px-2 text-[#252018]"
              style={{ ...VT, fontSize: "1rem" }}>
              {s}
            </div>
          ))}
        </div>

        <div className="text-[#66512c] tracking-widest" style={{ ...PX, fontSize: "0.45rem" }}>
          © 2026 SATIRE STUDIOS · v0.2.0
        </div>
      </div>
    </div>
  );
}

// ─── DESIGN SYSTEM ───────────────────────────────────────────────────────────
const PALETTE = [
  { name: "Gold / Primary",   hex: "#f5c518", group: "Core" },
  { name: "Green / Accent",   hex: "#5de85d", group: "Core" },
  { name: "Red / Danger",     hex: "#e84a4a", group: "Core" },
  { name: "Blue / Magic",     hex: "#4a9eff", group: "Core" },
  { name: "Purple / Special", hex: "#c87aff", group: "Core" },
  { name: "Background",       hex: "#05050f", group: "Surface" },
  { name: "Card",             hex: "#0d0d1e", group: "Surface" },
  { name: "Secondary",        hex: "#1b1c2d", group: "Surface" },
  { name: "Muted",            hex: "#16172a", group: "Surface" },
  { name: "Foreground",       hex: "#e4dfc0", group: "Text" },
  { name: "Muted FG",         hex: "#6b6b8e", group: "Text" },
  { name: "Border",           hex: "#2a2b44", group: "Text" },
  { name: "Retro Grass",      hex: "#2e6b2e", group: "Environment" },
  { name: "Retro Water",      hex: "#14527a", group: "Environment" },
  { name: "Retro Cave",       hex: "#4a2e10", group: "Environment" },
  { name: "Retro City",       hex: "#4a4a70", group: "Environment" },
  { name: "Retro Battle",     hex: "#1a0508", group: "Environment" },
];

const TYPE_SCALE = [
  { label: "Display XL",    size: "2.8rem",  font: "PX", weight: 400, text: "LEGENDARY BOSS" },
  { label: "Display L",     size: "2rem",    font: "PX", weight: 400, text: "Chapter 1: Origins" },
  { label: "Title",         size: "1.1rem",  font: "PX", weight: 400, text: "Quest Board" },
  { label: "Subtitle",      size: "0.75rem", font: "PX", weight: 400, text: "Side Quest" },
  { label: "Dialogue",      size: "2rem",    font: "VT", weight: 400, text: '"Ah, a traveler! Come here often?"' },
  { label: "Body",          size: "1.6rem",  font: "VT", weight: 400, text: "You found a strange item in the tall grass..." },
  { label: "Battle Text",   size: "2.4rem",  font: "VT", weight: 400, text: "CRITICAL HIT! 247 DAMAGE!", color: "#f5c518" },
  { label: "Quest Text",    size: "1.3rem",  font: "VT", weight: 400, text: "Defeat 3 Corporate Drones to unlock the boss." },
  { label: "Caption",       size: "0.9rem",  font: "RJ", weight: 600, text: "Lv. 15  ·  HP 82/100  ·  Status: Confused" },
  { label: "Menu Labels",   size: "0.8rem",  font: "RJ", weight: 700, text: "INVENTORY  ·  QUEST LOG  ·  SETTINGS" },
  { label: "Damage Nums",   size: "2.6rem",  font: "PX", weight: 400, text: "-47", color: "#e84a4a" },
  { label: "Heal Nums",     size: "2.6rem",  font: "PX", weight: 400, text: "+23", color: "#5de85d" },
];

function DesignSystemPage() {
  const groups = Array.from(new Set(PALETTE.map((c) => c.group)));
  const getFontStyle = (font: string) => font === "PX" ? PX : font === "VT" ? VT : RJ;

  return (
    <div className="p-8 space-y-12 max-w-5xl">
      <PageHeader num="01" title="DESIGN SYSTEM" />

      {/* Colors */}
      <section>
        <SectionHead label="COLOR PALETTE" />
        {groups.map((g) => (
          <div key={g} className="mb-6">
            <div className="text-muted-foreground mb-3" style={{ ...VT, fontSize: "1.1rem" }}>{g}</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
              {PALETTE.filter((c) => c.group === g).map((col) => (
                <div key={col.hex} className="group cursor-default">
                  <div
                    className="w-full h-14 border border-white/8 mb-1"
                    style={{ backgroundColor: col.hex }}
                  />
                  <div className="text-foreground/70 leading-tight" style={{ ...VT, fontSize: "0.85rem" }}>{col.name}</div>
                  <div className="text-foreground/30 font-mono text-xs">{col.hex}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Typography */}
      <section>
        <SectionHead label="TYPOGRAPHY SCALE" />
        <Panel color="gold" className="space-y-4">
          {TYPE_SCALE.map((t) => (
            <div key={t.label} className="flex items-baseline gap-6 border-b border-white/5 pb-3">
              <div className="w-24 shrink-0 text-muted-foreground" style={{ ...VT, fontSize: "0.95rem" }}>{t.label}</div>
              <div
                className="leading-none"
                style={{ ...getFontStyle(t.font), fontSize: t.size, fontWeight: t.weight, color: t.color || "#e4dfc0" }}
              >
                {t.text}
              </div>
            </div>
          ))}
        </Panel>
      </section>

      {/* Spacing */}
      <section>
        <SectionHead label="SPACING SCALE" />
        <div className="flex flex-wrap items-end gap-6">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className="bg-amber-500/25 border border-amber-500/40"
                style={{ width: s, height: s }}
              />
              <span className="text-muted-foreground font-mono text-xs">{s}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Radius */}
      <section>
        <SectionHead label="BORDER RADIUS" />
        <div className="flex flex-wrap gap-6">
          {[0, 4, 8, 12, 16, 24].map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500/40"
                style={{ borderRadius: r }}
              />
              <span className="text-muted-foreground font-mono text-xs">{r}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <SectionHead label="ELEVATION / SHADOWS" />
        <div className="grid grid-cols-5 gap-6">
          {[
            { label: "Small",    shadow: "0 1px 4px rgba(0,0,0,0.6)" },
            { label: "Medium",   shadow: "0 4px 16px rgba(0,0,0,0.7)" },
            { label: "Large",    shadow: "0 8px 32px rgba(0,0,0,0.8)" },
            { label: "Floating", shadow: "0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(245,197,24,0.15)" },
            { label: "Modal",    shadow: "0 24px 64px rgba(0,0,0,0.95),0 0 0 2px rgba(245,197,24,0.25)" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3">
              <div className="w-full h-16 bg-card border border-amber-500/20" style={{ boxShadow: s.shadow }} />
              <span className="text-muted-foreground" style={{ ...VT, fontSize: "0.95rem" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const BTN_VARIANTS = [
  { label: "Primary",   bg: "#f5c518", fg: "#05050f", border: "#f5c518" },
  { label: "Secondary", bg: "#1b1c2d", fg: "#e4dfc0", border: "#2a2b44" },
  { label: "Danger",    bg: "#e84a4a", fg: "#ffffff", border: "#e84a4a" },
  { label: "Success",   bg: "#5de85d", fg: "#05050f", border: "#5de85d" },
  { label: "Ghost",     bg: "transparent", fg: "#e4dfc0", border: "#2a2b44" },
  { label: "Disabled",  bg: "#16172a", fg: "#6b6b8e", border: "#1b1c2d", disabled: true },
  { label: "Selected",  bg: "#1a2a40", fg: "#4a9eff", border: "#4a9eff" },
];

function ComponentsPage() {
  const [dialogTyping, setDialogTyping] = useState(false);
  const [dialogText, setDialogText] = useState(
    "Hello, brave traveler. I see you've wandered into my domain..."
  );
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string[]>(["confused", "inspired"]);

  const toggleStatus = (key: string) => {
    setActiveStatus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="p-8 space-y-12 max-w-5xl">
      <PageHeader num="02" title="COMPONENT LIBRARY" />

      {/* Buttons */}
      <section>
        <SectionHead label="BUTTONS" />
        <div className="space-y-6">
          {/* Variants */}
          <div>
            <div className="text-muted-foreground mb-3" style={{ ...VT, fontSize: "1.1rem" }}>Variants</div>
            <div className="flex flex-wrap gap-3">
              {BTN_VARIANTS.map((v) => (
                <button
                  key={v.label}
                  disabled={v.disabled}
                  className="px-4 py-2 border-2 transition-all duration-100 active:translate-y-px"
                  style={{
                    backgroundColor: v.bg, color: v.fg, borderColor: v.border,
                    ...PX, fontSize: "0.55rem",
                    opacity: v.disabled ? 0.5 : 1,
                    cursor: v.disabled ? "not-allowed" : "pointer",
                    boxShadow: v.disabled ? "none" : `0 3px 0 ${v.border}60`,
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          {/* Sizes */}
          <div>
            <div className="text-muted-foreground mb-3" style={{ ...VT, fontSize: "1.1rem" }}>Sizes</div>
            <div className="flex flex-wrap items-end gap-3">
              {[
                { label: "Small",  px: "px-3 py-1.5", fs: "0.45rem" },
                { label: "Medium", px: "px-5 py-2.5", fs: "0.55rem" },
                { label: "Large",  px: "px-8 py-4",   fs: "0.7rem" },
              ].map((s) => (
                <button
                  key={s.label}
                  className={`border-2 border-amber-500 ${s.px} text-amber-900 transition-all`}
                  style={{ ...PX, fontSize: s.fs, backgroundColor: "#f5c518", boxShadow: "0 4px 0 #a07a00" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HP / XP Bars */}
      <section>
        <SectionHead label="HEALTH & XP BARS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Player HP",      cur: 82,  max: 100, size: "lg" as const, owner: "HERO" },
            { label: "Enemy HP",       cur: 43,  max: 100, size: "md" as const, owner: "CEO CHAD" },
            { label: "Boss HP",        cur: 14,  max: 100, size: "lg" as const, owner: "⚠ BOSS" },
            { label: "Elite Enemy HP", cur: 67,  max: 80,  size: "md" as const, owner: "ELITE GRUNT" },
          ].map((bar) => (
            <Panel key={bar.label} color="gold" className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-foreground" style={{ ...RJ, fontSize: "0.9rem", fontWeight: 700 }}>{bar.owner}</span>
                <span className="text-muted-foreground text-xs font-mono">{bar.cur}/{bar.max} HP</span>
              </div>
              <HPBar current={bar.cur} max={bar.max} size={bar.size} />
            </Panel>
          ))}
          <Panel color="blue" className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-blue-300" style={{ ...RJ, fontSize: "0.9rem", fontWeight: 700 }}>XP — Normal</span>
              <span className="text-muted-foreground text-xs font-mono">340 / 500</span>
            </div>
            <XPBar pct={68} />
          </Panel>
          <Panel color="purple" className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-purple-300" style={{ ...RJ, fontSize: "0.9rem", fontWeight: 700 }}>XP — Level Up!</span>
              <span className="text-yellow-400 text-xs font-mono animate-pulse">LEVEL UP!</span>
            </div>
            <XPBar pct={100} />
          </Panel>
        </div>
      </section>

      {/* Status Effects */}
      <section>
        <SectionHead label="STATUS EFFECTS" />
        <div className="text-muted-foreground mb-3" style={{ ...VT, fontSize: "1rem" }}>Click to toggle</div>
        <div className="flex flex-wrap gap-3 mb-4">
          {STATUS_EFFECTS.map((s) => {
            const on = activeStatus.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggleStatus(s.key)}
                className="flex items-center gap-2 px-3 py-1.5 border-2 transition-all"
                style={{
                  borderColor: on ? s.color : "#2a2b44",
                  backgroundColor: on ? `${s.color}25` : "transparent",
                  color: on ? s.color : "#6b6b8e",
                  ...RJ, fontSize: "0.85rem", fontWeight: 600,
                }}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            );
          })}
        </div>
        <Panel color="gold" className="flex gap-2 flex-wrap min-h-12">
          {activeStatus.length === 0 && (
            <span className="text-muted-foreground" style={{ ...VT, fontSize: "1.1rem" }}>No status effects active</span>
          )}
          {activeStatus.map((key) => {
            const s = STATUS_EFFECTS.find((e) => e.key === key)!;
            return (
              <div
                key={key}
                className="flex items-center gap-1 px-2 py-1 border text-xs"
                style={{ borderColor: s.color, backgroundColor: `${s.color}20`, color: s.color, ...RJ, fontWeight: 600, fontSize: "0.8rem" }}
              >
                {s.icon} {s.label}
              </div>
            );
          })}
        </Panel>
      </section>

      {/* Dialogue Box */}
      <section>
        <SectionHead label="DIALOGUE SYSTEM" />
        <div className="space-y-4">
          <Panel color="gold" className="relative">
            <div className="flex items-start gap-3">
              <div className="text-3xl shrink-0">🧙‍♂️</div>
              <div className="flex-1">
                <div className="text-amber-400 mb-1" style={{ ...PX, fontSize: "0.55rem" }}>OLD WIZARD GREP</div>
                <div className="text-foreground leading-relaxed" style={{ ...VT, fontSize: "1.5rem" }}>
                  {dialogText}
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 right-4 text-amber-500/60 animate-bounce" style={{ ...PX, fontSize: "0.4rem" }}>▼</div>
          </Panel>
          {/* Choice dialogue */}
          <Panel color="blue">
            <div className="text-blue-300 mb-3" style={{ ...PX, fontSize: "0.55rem" }}>CHOICE DIALOGUE</div>
            <div className="text-foreground mb-3" style={{ ...VT, fontSize: "1.4rem" }}>
              "Do you accept the quest to defeat the Corporate Overlord?"
            </div>
            <div className="flex gap-3">
              {["▶ Yes! Adventure awaits!", "▶ Not right now...", "▶ Tell me more."].map((c) => (
                <button
                  key={c}
                  className="flex-1 border-2 border-blue-400/40 bg-blue-900/20 hover:bg-blue-400/20 hover:border-blue-400 px-3 py-2 text-blue-200 transition-all text-left"
                  style={{ ...VT, fontSize: "1.1rem" }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Panel>
          {/* Boss dialogue */}
          <Panel color="red">
            <div className="text-red-400 mb-1" style={{ ...PX, fontSize: "0.55rem" }}>⚠ BOSS DIALOGUE</div>
            <div className="flex items-start gap-3">
              <div className="text-3xl">😈</div>
              <div className="text-red-100" style={{ ...VT, fontSize: "1.6rem" }}>
                "You dare challenge me?! I have THREE LinkedIn recommendations!"
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* Cards */}
      <section>
        <SectionHead label="CARDS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Enemy Card */}
          <Panel color="red">
            <div className="text-red-400 mb-1" style={{ ...PX, fontSize: "0.45rem" }}>ENEMY CARD</div>
            <div className="text-center py-3 text-5xl">🐉</div>
            <div className="text-center text-foreground mb-1" style={{ ...PX, fontSize: "0.6rem" }}>Corporate Dragon</div>
            <div className="text-center text-muted-foreground mb-3" style={{ ...VT, fontSize: "1.1rem" }}>Finance · Lv. 42</div>
            <HPBar current={67} max={100} size="md" />
            <div className="mt-3 grid grid-cols-3 gap-1 text-center text-xs">
              {[["ATK","88"],["DEF","55"],["SPD","34"]].map(([k,v])=>(
                <div key={k} className="bg-black/30 py-1">
                  <div className="text-muted-foreground" style={RJ}>{k}</div>
                  <div className="text-foreground font-bold" style={RJ}>{v}</div>
                </div>
              ))}
            </div>
          </Panel>
          {/* Quest Card */}
          <Panel color="gold">
            <div className="text-amber-400 mb-1" style={{ ...PX, fontSize: "0.45rem" }}>QUEST CARD</div>
            <div className="flex items-start gap-2 mb-3">
              <span className="text-2xl">📜</span>
              <div>
                <div className="text-foreground" style={{ ...PX, fontSize: "0.55rem" }}>The Lost Spreadsheet</div>
                <div className="text-amber-500/60" style={{ ...VT, fontSize: "1rem" }}>Main Story · Lv. 10+</div>
              </div>
            </div>
            <div className="text-foreground/80 mb-3" style={{ ...VT, fontSize: "1.1rem" }}>
              Recover the missing quarterly report from the haunted server room.
            </div>
            <div className="border-t border-amber-500/15 pt-2 text-amber-300 text-xs" style={RJ}>
              Rewards: 500 XP · 200G · Rare Item
            </div>
          </Panel>
          {/* Inventory Card */}
          <Panel color="blue">
            <div className="text-blue-400 mb-1" style={{ ...PX, fontSize: "0.45rem" }}>ITEM CARD</div>
            <div className="flex items-start gap-2 mb-3">
              <span className="text-2xl">⚗️</span>
              <div>
                <div className="text-foreground" style={{ ...PX, fontSize: "0.55rem" }}>Mega Energy Drink</div>
                <div className="text-blue-400/70" style={{ ...VT, fontSize: "1rem" }}>Consumable · Common</div>
              </div>
            </div>
            <div className="text-foreground/80 mb-3" style={{ ...VT, fontSize: "1.1rem" }}>
              Restores 50 HP. Causes mild existential crisis. Side effects may vary.
            </div>
            <div className="flex justify-between text-xs" style={RJ}>
              <span className="text-muted-foreground">Qty: ×12</span>
              <span className="text-amber-400">Value: 45G</span>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}

// ─── OVERWORLD ───────────────────────────────────────────────────────────────
function OverworldPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [playerPos, setPlayerPos] = useState({ row: 8, col: 9 });

  const legendItems = [
    { tile: "G", label: "Grassland" }, { tile: "T", label: "Forest" },
    { tile: "W", label: "Water" },     { tile: "R", label: "Path/Road" },
    { tile: "B", label: "Buildings" }, { tile: "H", label: "Healing Ctr" },
    { tile: "Q", label: "Quest Giver"},{ tile: "X", label: "Encounter Zone" },
    { tile: "C", label: "Cave" },      { tile: "D", label: "Dungeon" },
    { tile: "V", label: "Save Point" },
  ];

  const TILE_W = 18;
  const TILE_H = 16;

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <PageHeader num="04" title="OVERWORLD SYSTEM" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Panel color="green" className="p-2">
            <div className="text-green-400 mb-2 text-center" style={{ ...PX, fontSize: "0.5rem" }}>
              ★ SATIRIA WORLD MAP ★
            </div>
            <div className="border-2 border-green-500/30 inline-block">
              {DS_MAP_ROWS.map((row, ri) => (
                <div key={ri} className="flex">
                  {row.split("").map((tile, ci) => {
                    const isPlayer = ri === playerPos.row && ci === playerPos.col;
                    const icon = DS_TILE_ICONS[tile];
                    return (
                      <div
                        key={ci}
                        title={tile}
                        style={{
                          width: TILE_W, height: TILE_H,
                          backgroundColor: isPlayer ? "#00ff44" : DS_TILE_COLORS[tile] || "#333",
                          fontSize: 8,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff",
                          cursor: "pointer",
                          border: isPlayer ? "1px solid #fff" : "none",
                          imageRendering: "pixelated",
                        }}
                        onClick={() => setSelected(tile)}
                      >
                        {isPlayer ? "◉" : icon || ""}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          {/* Legend */}
          <Panel color="gold">
            <div className="text-amber-400 mb-3" style={{ ...PX, fontSize: "0.5rem" }}>MAP LEGEND</div>
            <div className="space-y-1">
              {legendItems.map((l) => (
                <div key={l.tile} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 shrink-0 border border-white/10"
                    style={{ backgroundColor: DS_TILE_COLORS[l.tile] }}
                  />
                  <span className="text-foreground/70" style={{ ...VT, fontSize: "1rem" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Location info */}
          <Panel color="blue">
            <div className="text-blue-400 mb-2" style={{ ...PX, fontSize: "0.5rem" }}>CURRENT LOCATION</div>
            <div className="text-foreground mb-1" style={{ ...VT, fontSize: "1.5rem" }}>Satiria Town</div>
            <div className="text-muted-foreground mb-3" style={{ ...VT, fontSize: "1rem" }}>
              A humble starting village. Smells like nostalgia and burnt coffee.
            </div>
            <div className="space-y-1 text-xs" style={RJ}>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wild Pokémon Level</span>
                <span className="text-foreground">5–12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Encounter Rate</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Save Point</span>
                <span className="text-amber-400">★ Available</span>
              </div>
            </div>
          </Panel>

          {/* Movement controls (decorative) */}
          <Panel color="purple">
            <div className="text-purple-400 mb-3" style={{ ...PX, fontSize: "0.5rem" }}>CONTROLS</div>
            <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
              {["", "▲", "", "◀", "·", "▶", "", "▼", ""].map((d, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (d === "▲") setPlayerPos(p => ({ ...p, row: Math.max(0, p.row - 1) }));
                    if (d === "▼") setPlayerPos(p => ({ ...p, row: Math.min(DS_MAP_ROWS.length - 1, p.row + 1) }));
                    if (d === "◀") setPlayerPos(p => ({ ...p, col: Math.max(0, p.col - 1) }));
                    if (d === "▶") setPlayerPos(p => ({ ...p, col: Math.min(29, p.col + 1) }));
                  }}
                  className={`h-7 flex items-center justify-center text-sm transition-colors ${d ? "border border-purple-400/40 bg-purple-900/30 hover:bg-purple-400/20 text-purple-200 cursor-pointer" : "cursor-default"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ─── BATTLE SYSTEM ───────────────────────────────────────────────────────────
type BattlePhase = "action" | "attack-type" | "message" | "levelup" | "victory" | "defeat";

function BattlePage() {
  const [phase, setPhase] = useState<BattlePhase>("action");
  const [msg, setMsg] = useState("What will you do?");
  const [playerHP, setPlayerHP] = useState({ cur: 82, max: 100 });
  const [enemyHP, setEnemyHP] = useState({ cur: 100, max: 100 });
  const [turn, setTurn] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const [dmgFlash, setDmgFlash] = useState<{ val: number; who: "player"|"enemy" } | null>(null);
  const [playerStatuses, setPlayerStatuses] = useState<string[]>([]);
  const [enemyStatuses, setEnemyStatuses] = useState<string[]>(["triggered"]);

  const addLog = (entry: string) => setLog(prev => [entry, ...prev].slice(0, 6));

  const doAttack = (type: string) => {
    const dmg = Math.floor(Math.random() * 28) + 8;
    const newEHP = Math.max(0, enemyHP.cur - dmg);
    setEnemyHP(prev => ({ ...prev, cur: newEHP }));
    setDmgFlash({ val: dmg, who: "enemy" });
    setMsg(`You used ${type}! Dealt ${dmg} damage!`);
    addLog(`You → CEO Chad: -${dmg} HP (${type})`);
    setPhase("message");

    if (newEHP <= 0) {
      setTimeout(() => { setPhase("victory"); setMsg("Enemy defeated! Victory!"); }, 1200);
      return;
    }

    setTimeout(() => {
      setDmgFlash(null);
      const eDmg = Math.floor(Math.random() * 18) + 4;
      const newPHP = Math.max(0, playerHP.cur - eDmg);
      setPlayerHP(prev => ({ ...prev, cur: newPHP }));
      setDmgFlash({ val: eDmg, who: "player" });
      setMsg(`CEO Chad used Vague Threat! You lost ${eDmg} HP!`);
      addLog(`CEO Chad → You: -${eDmg} HP (Vague Threat)`);
      setTurn(t => t + 1);

      if (newPHP <= 0) {
        setTimeout(() => { setPhase("defeat"); setMsg("You fainted... but the real lesson was the cringe we made along the way."); }, 1200);
        return;
      }

      setTimeout(() => { setPhase("action"); setMsg("What will you do?"); setDmgFlash(null); }, 2000);
    }, 1400);
  };

  const doItem = () => {
    const heal = 30;
    setPlayerHP(prev => ({ ...prev, cur: Math.min(prev.max, prev.cur + heal) }));
    setMsg(`Used Energy Drink! Restored ${heal} HP!`);
    addLog(`You used Energy Drink: +${heal} HP`);
    setPhase("message");
    setTimeout(() => { setPhase("action"); setMsg("What will you do?"); }, 1800);
  };

  const doRun = () => {
    if (Math.random() > 0.4) {
      setMsg("Got away safely!");
      addLog("You fled the battle!");
      setPhase("victory");
    } else {
      setMsg("Can't escape! CEO Chad blocks the exit.");
      setPhase("message");
      setTimeout(() => { setPhase("action"); setMsg("What will you do?"); }, 1800);
    }
  };

  const resetBattle = () => {
    setPhase("action"); setMsg("What will you do?");
    setPlayerHP({ cur: 82, max: 100 }); setEnemyHP({ cur: 100, max: 100 });
    setTurn(1); setLog([]); setDmgFlash(null);
    setPlayerStatuses([]); setEnemyStatuses(["triggered"]);
  };

  const bgStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, #1a050a 0%, #0d0d1e 60%)",
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.02) 3px, rgba(255,0,0,0.02) 4px)",
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <PageHeader num="05" title="BATTLE SYSTEM" />

      <div className="border-2 border-red-500/30" style={bgStyle}>
        {/* Turn counter */}
        <div className="flex justify-between items-center px-4 pt-3 pb-1 border-b border-red-500/15">
          <span className="text-red-400/60" style={{ ...PX, fontSize: "0.4rem" }}>BATTLE ARENA</span>
          <span className="text-muted-foreground text-xs" style={RJ}>Turn {turn}</span>
          <span className="text-red-400/60" style={{ ...PX, fontSize: "0.4rem" }}>SATIRIA TOWER</span>
        </div>

        {/* Combat area */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Enemy side */}
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-full">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-red-300" style={{ ...PX, fontSize: "0.55rem" }}>CEO CHAD</span>
                <span className="font-mono text-xs text-foreground/60">{enemyHP.cur}/{enemyHP.max}</span>
              </div>
              <HPBar current={enemyHP.cur} max={enemyHP.max} size="md" />
              <div className="flex gap-1 mt-1">
                {enemyStatuses.map(s => {
                  const ef = STATUS_EFFECTS.find(e => e.key === s);
                  return ef ? (
                    <span key={s} className="text-xs px-1 border" style={{ borderColor: ef.color, color: ef.color, ...RJ, fontSize: "0.7rem" }}>
                      {ef.icon}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <div className="relative text-center mt-4">
              <div
                className="text-7xl select-none transition-transform duration-150"
                style={{
                  filter: dmgFlash?.who === "enemy" ? "brightness(3) sepia(1) hue-rotate(-30deg)" : "none",
                  transform: dmgFlash?.who === "enemy" ? "scale(0.9) translateX(-6px)" : "scale(1)",
                  imageRendering: "pixelated",
                }}
              >
                😈
              </div>
              {dmgFlash?.who === "enemy" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-400 font-bold animate-bounce"
                  style={{ ...PX, fontSize: "0.7rem" }}>
                  -{dmgFlash.val}
                </div>
              )}
            </div>
            <div className="text-muted-foreground text-xs" style={RJ}>Lv. 42 · Finance Type</div>
          </div>

          {/* Player side */}
          <div className="relative flex flex-col items-end gap-2">
            <div className="w-full">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-green-300" style={{ ...PX, fontSize: "0.55rem" }}>HERO</span>
                <span className="font-mono text-xs text-foreground/60">{playerHP.cur}/{playerHP.max}</span>
              </div>
              <HPBar current={playerHP.cur} max={playerHP.max} size="lg" />
              <div className="flex gap-1 mt-1 justify-end">
                {playerStatuses.map(s => {
                  const ef = STATUS_EFFECTS.find(e => e.key === s);
                  return ef ? (
                    <span key={s} className="text-xs px-1 border" style={{ borderColor: ef.color, color: ef.color, ...RJ, fontSize: "0.7rem" }}>
                      {ef.icon}
                    </span>
                  ) : null;
                })}
              </div>
              <div className="mt-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-0.5" style={RJ}>
                  <span>XP</span><span>340/500</span>
                </div>
                <XPBar pct={68} />
              </div>
            </div>
            <div className="relative text-center mt-4">
              <div
                className="text-6xl select-none transition-transform duration-150"
                style={{
                  filter: dmgFlash?.who === "player" ? "brightness(3) sepia(1) hue-rotate(200deg)" : "none",
                  transform: dmgFlash?.who === "player" ? "scale(0.9) translateX(6px)" : "scale(1)",
                }}
              >
                🧙
              </div>
              {dmgFlash?.who === "player" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-400 font-bold animate-bounce"
                  style={{ ...PX, fontSize: "0.7rem" }}>
                  -{dmgFlash.val}
                </div>
              )}
            </div>
            <div className="text-muted-foreground text-xs" style={RJ}>Lv. 15 · Satirist</div>
          </div>
        </div>

        {/* Battle text */}
        <div className="mx-4 mb-4 border-2 border-amber-500/25 bg-black/40 p-3">
          <div
            className="min-h-10"
            style={{
              ...VT, fontSize: "1.5rem",
              color: phase === "victory" ? "#5de85d" : phase === "defeat" ? "#e84a4a" : "#e4dfc0",
            }}
          >
            {msg}
          </div>
        </div>

        {/* Action menu */}
        <div className="mx-4 mb-4">
          {phase === "action" && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "⚔ FIGHT",   action: () => setPhase("attack-type"), color: "#e84a4a" },
                { label: "⚗ ITEM",    action: doItem,    color: "#4a9eff" },
                { label: "🛡 DEFEND",  action: () => { setMsg("You brace yourself! DEF +1 this turn."); setPhase("message"); setTimeout(() => { setPhase("action"); setMsg("What will you do?"); }, 1800); }, color: "#5de85d" },
                { label: "🔄 SWITCH",  action: () => { setMsg("Switch ally... (No allies available)"); setPhase("message"); setTimeout(() => { setPhase("action"); setMsg("What will you do?"); }, 1800); }, color: "#c87aff" },
                { label: "📦 SPECIAL", action: () => { setMsg("ULTIMATE MOVE — CRINGE CANNON! (No SP left)"); setPhase("message"); setTimeout(() => { setPhase("action"); setMsg("What will you do?"); }, 1800); }, color: "#f5c518" },
                { label: "🚪 RUN",     action: doRun,     color: "#6b6b8e" },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={b.action}
                  className="py-2 px-3 border-2 text-left hover:brightness-125 transition-all active:scale-95"
                  style={{ borderColor: `${b.color}50`, color: b.color, backgroundColor: `${b.color}10`, ...RJ, fontWeight: 700, fontSize: "0.85rem" }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}

          {phase === "attack-type" && (
            <div>
              <div className="text-muted-foreground mb-2" style={{ ...VT, fontSize: "1.1rem" }}>Choose attack category:</div>
              <div className="grid grid-cols-3 gap-2">
                {ATTACK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => doAttack(cat.label)}
                    className="py-2 px-3 border-2 flex items-center gap-2 hover:brightness-125 transition-all active:scale-95"
                    style={{ borderColor: `${cat.color}50`, color: cat.color, backgroundColor: `${cat.color}10`, ...RJ, fontWeight: 700, fontSize: "0.85rem" }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
                <button
                  onClick={() => { setPhase("action"); setMsg("What will you do?"); }}
                  className="py-2 px-3 border-2 border-white/10 text-muted-foreground hover:border-white/30 transition-all col-span-3"
                  style={{ ...RJ, fontWeight: 600, fontSize: "0.85rem" }}
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {(phase === "victory" || phase === "defeat") && (
            <div className="text-center py-2">
              <button
                onClick={resetBattle}
                className="px-8 py-3 border-2 border-amber-500 bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-all"
                style={{ ...PX, fontSize: "0.55rem" }}
              >
                ▶ NEW BATTLE
              </button>
            </div>
          )}
        </div>

        {/* Battle log */}
        {log.length > 0 && (
          <div className="mx-4 mb-4 border border-white/8 bg-black/20 p-2 max-h-20 overflow-auto">
            {log.map((entry, i) => (
              <div key={i} className="text-muted-foreground" style={{ ...VT, fontSize: "0.9rem" }}>{entry}</div>
            ))}
          </div>
        )}
      </div>

      {/* Battle events reference */}
      <div>
        <SectionHead label="BATTLE EVENT SCREENS" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Battle Start",    color: "#f5c518", icon: "⚔" },
            { label: "Critical Hit",    color: "#e84a4a", icon: "💥" },
            { label: "Level Up",        color: "#5de85d", icon: "⬆" },
            { label: "Victory",         color: "#f5c518", icon: "🏆" },
            { label: "Defeat",          color: "#e84a4a", icon: "💀" },
            { label: "Boss Intro",      color: "#c87aff", icon: "⚠" },
            { label: "Capture Success", color: "#5de85d", icon: "📦" },
            { label: "Rare Encounter",  color: "#f5c518", icon: "✨" },
          ].map((ev) => (
            <div
              key={ev.label}
              className="border-2 p-3 text-center flex flex-col items-center gap-2"
              style={{ borderColor: `${ev.color}40`, backgroundColor: `${ev.color}08` }}
            >
              <div className="text-2xl">{ev.icon}</div>
              <div style={{ color: ev.color, ...PX, fontSize: "0.4rem" }}>{ev.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CHARACTER ───────────────────────────────────────────────────────────────
function CharacterPage() {
  const stats = [
    { label: "Attack",       val: 74, max: 100, icon: "⚔" },
    { label: "Defense",      val: 52, max: 100, icon: "🛡" },
    { label: "Speed",        val: 88, max: 100, icon: "💨" },
    { label: "Influence",    val: 61, max: 100, icon: "💫" },
    { label: "Intelligence", val: 95, max: 100, icon: "🧠" },
    { label: "Luck",         val: 34, max: 100, icon: "🍀" },
    { label: "Charisma",     val: 77, max: 100, icon: "💬" },
  ];
  const repCategories = [
    { label: "Politics",   val: 42, color: "#c87aff" },
    { label: "Media",      val: 78, color: "#ff7a30" },
    { label: "Technology", val: 91, color: "#4a9eff" },
    { label: "Business",   val: 55, color: "#f5c518" },
    { label: "Internet",   val: 88, color: "#5de85d" },
    { label: "Community",  val: 33, color: "#e84a4a" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <PageHeader num="06" title="CHARACTER SYSTEM" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portrait & basics */}
        <Panel color="gold" className="flex flex-col items-center text-center gap-4">
          <div className="w-24 h-24 border-2 border-amber-500/40 flex items-center justify-center bg-black/40 text-5xl">
            🧙
          </div>
          <div>
            <div className="text-foreground mb-1" style={{ ...PX, fontSize: "0.65rem" }}>PROTAGONIST</div>
            <div className="text-muted-foreground" style={{ ...VT, fontSize: "1.1rem" }}>The Chosen Ironic One</div>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs" style={RJ}>
              <span className="text-muted-foreground">Level</span>
              <span className="text-amber-400 font-bold">15</span>
            </div>
            <div className="flex justify-between text-xs" style={RJ}>
              <span className="text-muted-foreground">HP</span>
              <span className="text-green-400 font-bold">82 / 100</span>
            </div>
            <HPBar current={82} max={100} size="sm" />
            <div className="flex justify-between text-xs" style={RJ}>
              <span className="text-muted-foreground">XP to next</span>
              <span className="text-blue-400 font-bold">160 remaining</span>
            </div>
            <XPBar pct={68} />
          </div>
          <div className="w-full border-t border-amber-500/15 pt-3 grid grid-cols-2 gap-2 text-xs" style={RJ}>
            <div><span className="text-muted-foreground">Currency</span><br /><span className="text-amber-400 font-bold">1,240 G</span></div>
            <div><span className="text-muted-foreground">Play Time</span><br /><span className="text-foreground font-bold">14:22:08</span></div>
            <div><span className="text-muted-foreground">Achievements</span><br /><span className="text-purple-400 font-bold">23 / 120</span></div>
            <div><span className="text-muted-foreground">Energy</span><br /><span className="text-blue-400 font-bold">73 / 90</span></div>
          </div>
        </Panel>

        {/* Stats */}
        <Panel color="blue" className="space-y-3">
          <div className="text-blue-400 mb-3" style={{ ...PX, fontSize: "0.5rem" }}>STATISTICS</div>
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="flex justify-between text-xs" style={RJ}>
                <span className="text-foreground/80">{s.icon} {s.label}</span>
                <span className="text-foreground font-bold">{s.val}</span>
              </div>
              <div className="w-full h-1.5 bg-black/50">
                <div
                  className="h-full transition-all"
                  style={{ width: `${s.val}%`, backgroundColor: s.val > 80 ? "#5de85d" : s.val > 50 ? "#4a9eff" : "#f5c518" }}
                />
              </div>
            </div>
          ))}
        </Panel>

        {/* Reputation */}
        <Panel color="purple" className="space-y-3">
          <div className="text-purple-400 mb-3" style={{ ...PX, fontSize: "0.5rem" }}>REPUTATION</div>
          {repCategories.map((r) => (
            <div key={r.label} className="space-y-1">
              <div className="flex justify-between text-xs" style={RJ}>
                <span className="text-foreground/80">{r.label}</span>
                <span className="font-bold" style={{ color: r.color }}>{r.val}</span>
              </div>
              <div className="w-full h-1.5 bg-black/50">
                <div className="h-full transition-all" style={{ width: `${r.val}%`, backgroundColor: r.color }} />
              </div>
            </div>
          ))}
          <div className="border-t border-purple-400/15 pt-3">
            <div className="text-muted-foreground text-xs mb-2" style={RJ}>Active Status Effects</div>
            <div className="flex flex-wrap gap-1">
              {["inspired", "lucky"].map(key => {
                const s = STATUS_EFFECTS.find(e => e.key === key)!;
                return (
                  <span key={key} className="text-xs px-2 py-0.5 border" style={{ borderColor: s.color, color: s.color, ...RJ, fontSize: "0.75rem" }}>
                    {s.icon} {s.label}
                  </span>
                );
              })}
            </div>
          </div>
        </Panel>
      </div>

      {/* Ally / Creature collection preview */}
      <section>
        <SectionHead label="ALLY COLLECTION" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Memo-Saur",        type: "Corporate", lv: 22, icon: "🦕", rare: "Rare",   hp: [68,90] },
            { name: "Spin Doctor",      type: "Media",     lv: 18, icon: "🌀", rare: "Common", hp: [45,60] },
            { name: "Crypto-Bat",       type: "Finance",   lv: 31, icon: "🦇", rare: "Epic",   hp: [88,120] },
            { name: "Influencer Blob",  type: "Internet",  lv: 14, icon: "🟣", rare: "Common", hp: [52,70] },
          ].map((ally) => {
            const rareColors: Record<string,string> = { Common:"#6b6b8e", Rare:"#4a9eff", Epic:"#c87aff" };
            return (
              <Panel key={ally.name} color="gold" className="text-center hover:border-amber-400/50 transition-colors cursor-pointer">
                <div className="text-4xl mb-2">{ally.icon}</div>
                <div className="text-foreground mb-0.5" style={{ ...PX, fontSize: "0.5rem" }}>{ally.name}</div>
                <div className="text-muted-foreground mb-1" style={{ ...VT, fontSize: "1rem" }}>{ally.type} · Lv.{ally.lv}</div>
                <div className="text-xs mb-2 font-bold" style={{ color: rareColors[ally.rare], ...RJ }}>{ally.rare}</div>
                <HPBar current={ally.hp[0]} max={ally.hp[1]} size="sm" />
                <div className="text-muted-foreground text-xs mt-1" style={RJ}>{ally.hp[0]}/{ally.hp[1]} HP</div>
              </Panel>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── INVENTORY ────────────────────────────────────────────────────────────────
function InventoryPage() {
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState<typeof ITEMS[0] | null>(null);

  const filtered = tab === "All" ? ITEMS : ITEMS.filter(i => i.type === tab);
  const rarityColors: Record<string,string> = { Common:"#6b6b8e", Rare:"#4a9eff", Epic:"#c87aff", Legendary:"#f5c518", Quest:"#5de85d", Key:"#ff7a30" };

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader num="07" title="INVENTORY" />

      {/* Currency bar */}
      <div className="flex justify-end mb-4">
        <div className="border border-amber-500/30 bg-amber-500/10 px-4 py-2 flex items-center gap-2">
          <span className="text-amber-400 text-lg">💰</span>
          <span className="text-amber-400 font-bold" style={{ ...PX, fontSize: "0.6rem" }}>1,240 G</span>
        </div>
      </div>

      {/* Category tabs (scroll) */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {INV_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="shrink-0 px-3 py-1.5 border-2 transition-all text-xs"
            style={{
              borderColor: tab === t ? "#f5c518" : "#2a2b44",
              backgroundColor: tab === t ? "#f5c51820" : "transparent",
              color: tab === t ? "#f5c518" : "#6b6b8e",
              ...RJ, fontWeight: 700, fontSize: "0.8rem",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Item grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map(item => (
            <button
              key={item.name}
              onClick={() => setSelected(item)}
              className="text-left border-2 p-3 hover:border-amber-400/60 transition-colors"
              style={{
                borderColor: selected?.name === item.name ? "#f5c518" : "#2a2b44",
                backgroundColor: selected?.name === item.name ? "#f5c51810" : "#0d0d1e",
              }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-foreground/90 leading-tight mb-1" style={{ ...RJ, fontWeight: 700, fontSize: "0.8rem" }}>{item.name}</div>
              <div className="text-xs font-bold mb-1" style={{ color: rarityColors[item.rarity], ...RJ }}>{item.rarity}</div>
              <div className="flex justify-between text-xs text-muted-foreground" style={RJ}>
                <span>×{item.qty}</span>
                <span>{item.val > 0 ? `${item.val}G` : "—"}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div>
          {selected ? (
            <Panel color="gold" className="space-y-3">
              <div className="text-5xl text-center">{selected.icon}</div>
              <div className="text-center">
                <div className="text-foreground mb-1" style={{ ...PX, fontSize: "0.55rem" }}>{selected.name}</div>
                <div className="text-xs font-bold" style={{ color: rarityColors[selected.rarity], ...RJ }}>{selected.rarity}</div>
              </div>
              <div className="border-t border-amber-500/15 pt-3 space-y-2 text-xs" style={RJ}>
                <div><span className="text-muted-foreground">Type: </span><span className="text-foreground">{selected.type}</span></div>
                <div><span className="text-muted-foreground">Effect: </span><span className="text-foreground">{selected.desc}</span></div>
                <div><span className="text-muted-foreground">Quantity: </span><span className="text-foreground">×{selected.qty}</span></div>
                <div><span className="text-muted-foreground">Value: </span><span className="text-amber-400">{selected.val > 0 ? `${selected.val}G` : "No value"}</span></div>
              </div>
              <button
                className="w-full py-2 border-2 border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all"
                style={{ ...PX, fontSize: "0.45rem" }}
              >
                ▶ USE ITEM
              </button>
            </Panel>
          ) : (
            <Panel color="gold" className="flex items-center justify-center min-h-40 text-center">
              <div className="text-muted-foreground" style={{ ...VT, fontSize: "1.2rem" }}>Select an item to view details</div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── QUESTS ───────────────────────────────────────────────────────────────────
function QuestsPage() {
  const [tab, setTab] = useState("Main Story");
  const [selected, setSelected] = useState<Quest | null>(null);

  const statusColors = QUEST_STATUS_COLORS;
  const filtered = QUESTS.filter(q => q.type === tab);

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader num="08" title="QUEST LOG" />

      <div className="flex gap-1 mb-4 flex-wrap">
        {QUEST_TABS.map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelected(null); }}
            className="px-4 py-1.5 border-2 transition-all"
            style={{
              borderColor: tab === t ? "#f5c518" : "#2a2b44",
              backgroundColor: tab === t ? "#f5c51815" : "transparent",
              color: tab === t ? "#f5c518" : "#6b6b8e",
              ...RJ, fontWeight: 700, fontSize: "0.85rem",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          {filtered.map(q => (
            <button
              key={q.title}
              onClick={() => setSelected(q)}
              className="w-full text-left border-2 p-4 hover:border-amber-500/40 transition-all"
              style={{
                borderColor: selected?.title === q.title ? "#f5c518" : "#2a2b44",
                backgroundColor: selected?.title === q.title ? "#f5c51810" : "#0d0d1e",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{q.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground truncate" style={{ ...RJ, fontWeight: 700, fontSize: "0.9rem" }}>{q.title}</span>
                    <span
                      className="shrink-0 text-xs px-1.5 py-0.5 border font-bold"
                      style={{ color: statusColors[q.status], borderColor: `${statusColors[q.status]}50`, ...RJ }}
                    >
                      {q.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs" style={RJ}>Recommended Lv. {q.lv} · {q.reward}</div>
                </div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground" style={{ ...VT, fontSize: "1.3rem" }}>
              No quests in this category yet.
            </div>
          )}
        </div>

        <div>
          {selected ? (
            <Panel color="gold" className="space-y-4">
              <div className="text-3xl text-center">{selected.icon}</div>
              <div>
                <div className="text-foreground mb-1 leading-tight" style={{ ...PX, fontSize: "0.55rem" }}>{selected.title}</div>
                <div
                  className="text-xs px-2 py-0.5 border inline-block font-bold mt-1"
                  style={{ color: statusColors[selected.status], borderColor: `${statusColors[selected.status]}50`, ...RJ }}
                >
                  {selected.status.toUpperCase()}
                </div>
              </div>
              <div className="text-foreground/80 leading-relaxed" style={{ ...VT, fontSize: "1.2rem" }}>{selected.desc}</div>
              <div className="border-t border-amber-500/15 pt-3 space-y-2 text-xs" style={RJ}>
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">{selected.type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rec. Level</span><span className="text-foreground">{selected.lv}+</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reward</span><span className="text-amber-400">{selected.reward}</span></div>
              </div>
              {selected.status === "active" && (
                <button className="w-full py-2 border-2 border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all" style={{ ...PX, fontSize: "0.45rem" }}>
                  ▶ TRACK QUEST
                </button>
              )}
            </Panel>
          ) : (
            <Panel color="gold" className="flex items-center justify-center min-h-40">
              <div className="text-muted-foreground text-center" style={{ ...VT, fontSize: "1.2rem" }}>Select a quest for details</div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SHOP ─────────────────────────────────────────────────────────────────────
function ShopPage() {
  const [mode, setMode] = useState<"buy"|"sell">("buy");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [gold] = useState(1240);
  const [confirmItem, setConfirmItem] = useState<typeof SHOP_ITEMS[0] | null>(null);

  const total = Object.entries(cart).reduce((acc, [name, qty]) => {
    const item = SHOP_ITEMS.find(i => i.name === name)!;
    return acc + (mode === "buy" ? item.buy : item.sell) * qty;
  }, 0);

  const addToCart = (item: typeof SHOP_ITEMS[0]) => {
    setCart(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
  };
  const removeFromCart = (name: string) => {
    setCart(prev => {
      const n = { ...prev };
      if (n[name] <= 1) delete n[name]; else n[name]--;
      return n;
    });
  };

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader num="09" title="SHOP" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(["buy","sell"] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setCart({}); }}
              className="px-6 py-2 border-2 transition-all"
              style={{
                borderColor: mode === m ? "#f5c518" : "#2a2b44",
                backgroundColor: mode === m ? "#f5c51815" : "transparent",
                color: mode === m ? "#f5c518" : "#6b6b8e",
                ...PX, fontSize: "0.55rem",
              }}
            >
              {m === "buy" ? "▶ BUY" : "◀ SELL"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-2">
          <span className="text-amber-400 text-lg">💰</span>
          <span className="text-amber-400 font-bold" style={{ ...PX, fontSize: "0.6rem" }}>{gold.toLocaleString()} G</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Item list */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🧙‍♂️</span>
            <div className="border-2 border-amber-500/30 bg-card px-4 py-2 flex-1">
              <span className="text-foreground" style={{ ...VT, fontSize: "1.3rem" }}>
                {mode === "buy"
                  ? "Welcome! What can I get for ya, traveler?"
                  : "I'll take those off your hands... for a price."}
              </span>
            </div>
          </div>

          {SHOP_ITEMS.map(item => (
            <div
              key={item.name}
              className="border-2 border-amber-500/20 bg-card p-3 flex items-center gap-3 hover:border-amber-500/40 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="text-foreground font-bold" style={{ ...RJ, fontSize: "0.9rem" }}>{item.name}</div>
                <div className="text-muted-foreground text-xs" style={RJ}>{item.desc}</div>
              </div>
              <div className="text-amber-400 font-bold text-sm shrink-0" style={RJ}>
                {mode === "buy" ? item.buy : item.sell} G
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="w-7 h-7 border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center"
                  style={RJ}
                >−</button>
                <span className="w-6 text-center text-foreground font-bold" style={{ ...RJ, fontSize: "0.85rem" }}>
                  {cart[item.name] || 0}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-7 h-7 border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-colors flex items-center justify-center"
                  style={RJ}
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart / summary */}
        <div className="space-y-4">
          <Panel color="gold">
            <div className="text-amber-400 mb-3" style={{ ...PX, fontSize: "0.5rem" }}>
              {mode === "buy" ? "CART" : "SELLING"}
            </div>
            {Object.keys(cart).length === 0 ? (
              <div className="text-muted-foreground py-4 text-center" style={{ ...VT, fontSize: "1.1rem" }}>Nothing selected</div>
            ) : (
              <div className="space-y-2 mb-4">
                {Object.entries(cart).map(([name, qty]) => {
                  const item = SHOP_ITEMS.find(i => i.name === name)!;
                  const price = mode === "buy" ? item.buy : item.sell;
                  return (
                    <div key={name} className="flex justify-between text-xs" style={RJ}>
                      <span className="text-foreground">{name} ×{qty}</span>
                      <span className="text-amber-400">{price * qty} G</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="border-t border-amber-500/15 pt-3">
              <div className="flex justify-between mb-3" style={RJ}>
                <span className="text-muted-foreground text-sm">Total</span>
                <span className="text-amber-400 font-bold">{total} G</span>
              </div>
              {mode === "buy" && total > gold && (
                <div className="text-red-400 text-xs mb-2 text-center" style={{ ...VT, fontSize: "1rem" }}>
                  ⚠ Not enough gold!
                </div>
              )}
              <button
                disabled={total === 0 || (mode === "buy" && total > gold)}
                className="w-full py-2 border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  borderColor: "#f5c518", backgroundColor: "#f5c51820", color: "#f5c518",
                  ...PX, fontSize: "0.5rem",
                }}
                onClick={() => setCart({})}
              >
                ▶ CONFIRM {mode === "buy" ? "PURCHASE" : "SALE"}
              </button>
            </div>
          </Panel>

          <Panel color="blue">
            <div className="text-blue-400 mb-2" style={{ ...PX, fontSize: "0.45rem" }}>YOUR GOLD</div>
            <div className="text-amber-400 font-bold mb-1" style={{ ...PX, fontSize: "0.9rem" }}>{gold.toLocaleString()} G</div>
            {total > 0 && (
              <div className="text-xs text-muted-foreground" style={RJ}>
                After: {mode === "buy" ? Math.max(0, gold - total) : gold + total} G
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ─── SAVE SYSTEM ─────────────────────────────────────────────────────────────
function SavePage() {
  const [slots] = useState([
    { id: 1, name: "Satiria Town", lv: 15, pct: 12, time: "14:22:08", saved: "2 min ago",  filled: true },
    { id: 2, name: "Dungeon B2F",  lv: 22, pct: 28, time: "31:05:44", saved: "3 days ago", filled: true },
    { id: 3, name: "—",            lv: 0,  pct: 0,  time: "—",        saved: "Empty",      filled: false },
  ]);
  const [saving, setSaving] = useState<number | null>(null);

  const doSave = (id: number) => {
    setSaving(id);
    setTimeout(() => setSaving(null), 1500);
  };

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader num="11" title="SAVE SYSTEM" />

      <div className="space-y-4">
        {/* Autosave */}
        <div className="border-2 border-green-500/30 bg-card p-4 flex items-center gap-4">
          <div className="text-2xl">💾</div>
          <div className="flex-1">
            <div className="text-green-400 mb-0.5" style={{ ...PX, fontSize: "0.5rem" }}>AUTOSAVE</div>
            <div className="text-foreground" style={{ ...VT, fontSize: "1.2rem" }}>Satiria Town — Lv. 15</div>
            <div className="text-muted-foreground text-xs" style={RJ}>Last saved: 2 minutes ago · 14:22:08</div>
          </div>
          <div className="text-green-400 text-xs border border-green-500/40 px-2 py-1" style={{ ...RJ, fontWeight: 600 }}>AUTO</div>
        </div>

        {/* Manual save slots */}
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="border-2 p-4"
            style={{ borderColor: slot.filled ? "rgba(245,197,24,0.25)" : "rgba(42,43,68,0.8)", backgroundColor: "#0d0d1e" }}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{slot.filled ? "📁" : "📂"}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-400" style={{ ...PX, fontSize: "0.5rem" }}>SLOT {slot.id}</span>
                  {slot.filled && (
                    <span className="text-muted-foreground text-xs" style={RJ}>· Saved {slot.saved}</span>
                  )}
                </div>
                {slot.filled ? (
                  <>
                    <div className="text-foreground mb-1" style={{ ...VT, fontSize: "1.3rem" }}>{slot.name}</div>
                    <div className="flex gap-4 text-xs text-muted-foreground" style={RJ}>
                      <span>Lv. {slot.lv}</span>
                      <span>⏱ {slot.time}</span>
                      <span>📊 {slot.pct}% Complete</span>
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground" style={{ ...VT, fontSize: "1.2rem" }}>Empty Slot</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => doSave(slot.id)}
                  className="px-4 py-1.5 border-2 border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-all"
                  style={{ ...PX, fontSize: "0.4rem" }}
                >
                  {saving === slot.id ? "✓ SAVED!" : "SAVE"}
                </button>
                {slot.filled && (
                  <button className="px-4 py-1.5 border-2 border-blue-400/30 text-blue-400 hover:bg-blue-400/10 transition-all" style={{ ...PX, fontSize: "0.4rem" }}>
                    LOAD
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Cloud save */}
        <div className="border-2 border-purple-500/30 bg-card p-4 flex items-center gap-4">
          <div className="text-2xl">☁️</div>
          <div className="flex-1">
            <div className="text-purple-400 mb-0.5" style={{ ...PX, fontSize: "0.5rem" }}>CLOUD SAVE</div>
            <div className="text-foreground" style={{ ...VT, fontSize: "1.2rem" }}>satiria-player-001 · Synced</div>
            <div className="text-muted-foreground text-xs" style={RJ}>Last cloud sync: 5 minutes ago</div>
          </div>
          <button className="px-4 py-1.5 border-2 border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-all" style={{ ...PX, fontSize: "0.4rem" }}>
            SYNC
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
function Slider({ label, defaultVal = 80 }: { label: string; defaultVal?: number }) {
  const [val, setVal] = useState(defaultVal);
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 text-foreground/80 shrink-0" style={{ ...RJ, fontSize: "0.9rem" }}>{label}</span>
      <input
        type="range" min={0} max={100} value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="flex-1 accent-amber-400 h-1"
        style={{ accentColor: "#f5c518" }}
      />
      <span className="w-8 text-right text-muted-foreground text-xs font-mono">{val}</span>
    </div>
  );
}

function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-foreground/80" style={{ ...RJ, fontSize: "0.9rem" }}>{label}</span>
      <button
        onClick={() => setOn(!on)}
        className="w-12 h-6 border-2 relative transition-colors"
        style={{ borderColor: on ? "#f5c518" : "#2a2b44", backgroundColor: on ? "#f5c51825" : "transparent" }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 transition-all"
          style={{ left: on ? "calc(100% - 1.15rem)" : "2px", backgroundColor: on ? "#f5c518" : "#6b6b8e" }}
        />
      </button>
    </div>
  );
}

function Select({ label, options, def }: { label: string; options: string[]; def: string }) {
  const [val, setVal] = useState(def);
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-foreground/80" style={{ ...RJ, fontSize: "0.9rem" }}>{label}</span>
      <select
        value={val}
        onChange={e => setVal(e.target.value)}
        className="bg-secondary border border-border text-foreground px-2 py-1 text-sm"
        style={RJ}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

const SETTINGS_TABS = ["Audio","Gameplay","Accessibility"];

function SettingsPage() {
  const [tab, setTab] = useState("Audio");

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader num="12" title="SETTINGS" />

      <div className="flex gap-1 mb-6">
        {SETTINGS_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-6 py-2 border-2 transition-all flex items-center gap-2"
            style={{
              borderColor: tab === t ? "#f5c518" : "#2a2b44",
              backgroundColor: tab === t ? "#f5c51815" : "transparent",
              color: tab === t ? "#f5c518" : "#6b6b8e",
              ...RJ, fontWeight: 700, fontSize: "0.9rem",
            }}
          >
            {t === "Audio" ? <Volume2 size={14} /> : t === "Gameplay" ? <Gamepad2 size={14} /> : <Eye size={14} />}
            {t}
          </button>
        ))}
      </div>

      {tab === "Audio" && (
        <Panel color="gold" className="space-y-5">
          <div className="text-amber-400 mb-2" style={{ ...PX, fontSize: "0.5rem" }}>AUDIO</div>
          <Slider label="Master Volume" defaultVal={80} />
          <Slider label="Music" defaultVal={70} />
          <Slider label="Sound Effects" defaultVal={90} />
          <Slider label="Voice Acting" defaultVal={75} />
          <Slider label="Ambient" defaultVal={50} />
        </Panel>
      )}

      {tab === "Gameplay" && (
        <Panel color="gold" className="space-y-3">
          <div className="text-amber-400 mb-2" style={{ ...PX, fontSize: "0.5rem" }}>GAMEPLAY</div>
          <Select label="Difficulty" options={["Easy","Normal","Hard","Nightmare","Satirical"]} def="Normal" />
          <Select label="Battle Speed" options={["Slow","Normal","Fast","Instant"]} def="Normal" />
          <Select label="Text Speed" options={["Slow","Normal","Fast"]} def="Normal" />
          <Toggle label="Autosave" defaultOn={true} />
          <Toggle label="Show Tutorials" defaultOn={true} />
          <Toggle label="Skip Battle Animations" defaultOn={false} />
          <Toggle label="Confirm Before Run" defaultOn={true} />
        </Panel>
      )}

      {tab === "Accessibility" && (
        <Panel color="gold" className="space-y-3">
          <div className="text-amber-400 mb-2" style={{ ...PX, fontSize: "0.5rem" }}>ACCESSIBILITY</div>
          <Toggle label="Large Text Mode" defaultOn={false} />
          <Toggle label="High Contrast Mode" defaultOn={false} />
          <Toggle label="Reduced Motion" defaultOn={false} />
          <Toggle label="Subtitles" defaultOn={true} />
          <Toggle label="Controller Remapping" defaultOn={false} />
          <Select label="Color Blind Mode" options={["None","Deuteranopia","Protanopia","Tritanopia","Monochrome"]} def="None" />
          <Slider label="UI Scale" defaultVal={100} />
        </Panel>
      )}
    </div>
  );
}

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


const D_PAD_BTN: React.CSSProperties = {
  height: 38, width: 38, border: "1px solid rgba(255,255,255,0.18)",
  backgroundColor: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.7)",
  cursor: "pointer", fontSize: "1rem", display: "flex",
  alignItems: "center", justifyContent: "center",
};

const objectClassFor = (obj: string) => {
  const map: Record<string, string> = {
    SHOP: "world-object object-shop",
    HEAL: "world-object object-heal",
    HOME: "world-object object-home",
    "⌂": "world-object object-house",
    DOOR_SHOP: "world-object object-door-shop",
    DOOR_HEAL: "world-object object-door-heal",
    DOOR_HOME: "world-object object-door-home",
    "★": "world-object object-save",
    SIGN: "world-object object-sign",
    CAVE: "world-object object-cave",
    EXIT: "world-object object-exit",
    POTN: "world-object object-potion",
    BALL: "world-object object-ball",
    BED: "world-object object-bed",
    TV: "world-object object-tv",
    "←": "world-object object-arrow-left",
    "→": "world-object object-arrow-right",
    TRAIN: "world-object object-train-station",
    ARROW_N: "world-object object-route object-route-n",
    ARROW_S: "world-object object-route object-route-s",
    ARROW_E: "world-object object-route object-route-e",
    ARROW_W: "world-object object-route object-route-w",
    ARROW_NE: "world-object object-route object-route-ne",
    ARROW_NW: "world-object object-route object-route-nw",
    ARROW_SE: "world-object object-route object-route-se",
    ARROW_SW: "world-object object-route object-route-sw",
    CLERK: "clerk-sprite",
    NURSE: "nurse-sprite",
  };
  return map[obj] ?? "world-object object-sign";
};

type MovingNpc = {
  id: string;
  mapId: GameMapId;
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  lines: string[];
  name: string;
  walking?: boolean;
  variant?: number;
};

const INITIAL_NPCS: MovingNpc[] = [
  {
    id: "satiria-guide",
    mapId: "satiria",
    x: 33,
    y: 16,
    homeX: 33,
    homeY: 16,
    name: "Route Guide",
    lines: ['"The east road is open now."', '"Follow the path and keep an eye on the tall grass."'],
    variant: 0,
  },
  {
    id: "satiria-kid",
    mapId: "satiria",
    x: 27,
    y: 18,
    homeX: 27,
    homeY: 18,
    name: "Town Kid",
    lines: ['"I saw the shop clerk polish one potion for six hours."', '"That means it is probably rare."'],
    variant: 1,
  },
  ...TOWN_THEMES.slice(1).map((theme, index) => ({
    id: `${theme.id}-local`,
    mapId: theme.id,
    x: index % 2 === 0 ? 29 : 24,
    y: index % 2 === 0 ? 19 : 17,
    homeX: index % 2 === 0 ? 29 : 24,
    homeY: index % 2 === 0 ? 19 : 17,
    name: theme.npcName,
    lines: theme.npcLines,
    variant: (index + 2) % 5,
  })),
];

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
  const [miniMapOpen, setMiniMapOpen] = useState(true);
  const [trainOpen, setTrainOpen] = useState(false);
  const [trainIndex, setTrainIndex] = useState(0);
  const viewRef = useRef<HTMLDivElement>(null);
  const [viewSize, setViewSize] = useState({ w: 900, h: 600 });
  const currentMap = GAME_MAPS[mapId];
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

  const isIndoor = (id: GameMapId) => id === "shop" || id === "house" || id === "healing";

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
    const nextTile = nextMap.rows[destination.y]?.[destination.x] ?? "G";
    setMapId(destination.mapId);
    setPos({ x: destination.x, y: destination.y });
    setFacing(destination.facing ?? "down");
    setLocation(LOCATION_FOR(destination.mapId, destination.x, destination.y, nextTile));
  };

  const tile = (x: number, y: number) =>
    y >= 0 && y < GAME_MAPS[mapIdRef.current].height && x >= 0 && x < GAME_MAPS[mapIdRef.current].width
      ? (GAME_MAPS[mapIdRef.current].rows[y][x] ?? "T")
      : "T";

  const npcAt = (id: GameMapId, x: number, y: number) =>
    npcsRef.current.find(npc => npc.mapId === id && npc.x === x && npc.y === y);

  const trainDestinations = () => TOWN_THEMES.filter(town => town.id !== mapIdRef.current);

  const travelByTrain = (townId: TownMapId) => {
    setTrainOpen(false);
    setTrainIndex(0);
    warpTo({ mapId: townId, x: 35, y: 25, facing: "up" });
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

  const doMove = (dx: number, dy: number, dir: "up" | "down" | "left" | "right") => {
    if (dlgRef.current || pausedRef.current || battleRef.current || trainOpenRef.current) return;
    const now = Date.now();
    if (now - lastMove.current < 155) return;
    lastMove.current = now;

    setFacing(dir);
    const cur = posRef.current;
    const nx = cur.x + dx;
    const ny = cur.y + dy;
    const t = tile(nx, ny);
    if (!WALK.has(t)) return;
    if (npcAt(mapIdRef.current, nx, ny)) return;

    setPos({ x: nx, y: ny });
    setIsWalking(true);
    setTimeout(() => setIsWalking(false), 180);
    setSteps(s => s + 1);
    setLocation(LOCATION_FOR(mapIdRef.current, nx, ny, t));

    const steppedInteraction = GAME_MAPS[mapIdRef.current].interactions[`${nx},${ny}`];
    if (steppedInteraction?.portal && steppedInteraction.auto) {
      window.setTimeout(() => warpTo(steppedInteraction.portal!), 120);
      return;
    }

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

    // check adjacent then current tile
    for (const [cx, cy] of [[cur.x + ox, cur.y + oy], [cur.x, cur.y]]) {
      const key = `${cx},${cy}`;
      const npc = npcAt(mapIdRef.current, cx, cy);
      if (npc) {
        setDlg({ name: npc.name, lines: npc.lines, idx: 0 });
        return;
      }
      const intr = GAME_MAPS[mapIdRef.current].interactions[key];
      if (intr) {
        if (intr.heal) setHp(h => ({ ...h, cur: h.max }));
        if (intr.save) { setSaveMsg("★ Saved!"); setTimeout(() => setSaveMsg(null), 2500); }
        if (intr.shop) { setSaveMsg("SHOP OPEN"); setTimeout(() => setSaveMsg(null), 1800); }
        if (intr.train) {
          setTrainIndex(0);
          setTrainOpen(true);
          return;
        }
        if (intr.portal && intr.auto) {
          warpTo(intr.portal);
          return;
        }
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
      if (e.key === "Escape") { setPaused(p => !p); return; }
      if (e.key === " " || e.key === "z" || e.key === "Z" || e.key === "Enter") {
        e.preventDefault(); doInteract(); return;
      }
      if (e.key === "ArrowUp"    || e.key === "w" || e.key === "W") { e.preventDefault(); doMove(0, -1, "up"); }
      if (e.key === "ArrowDown"  || e.key === "s" || e.key === "S") { e.preventDefault(); doMove(0, 1, "down"); }
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") { e.preventDefault(); doMove(-1, 0, "left"); }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { e.preventDefault(); doMove(1, 0, "right"); }
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
        const t = map.rows[ny]?.[nx] ?? "T";
        const nearHome = Math.abs(nx - npc.homeX) + Math.abs(ny - npc.homeY) <= 4;
        const blockedByPlayer = mapIdRef.current === npc.mapId && posRef.current.x === nx && posRef.current.y === ny;
        const blockedByNpc = prev.some(other => other.id !== npc.id && other.mapId === npc.mapId && other.x === nx && other.y === ny);
        if (!nearHome || !WALK.has(t) || blockedByPlayer || blockedByNpc) return { ...npc, walking: false };
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

  // Camera: centre on player, clamped to map bounds
  const mapPxW = currentMap.width * TS;
  const mapPxH = currentMap.height * TS;
  const rawCamX = viewSize.w / 2 - (pos.x + 0.5) * TS;
  const rawCamY = viewSize.h / 2 - (pos.y + 0.5) * TS;
  const camX = mapPxW <= viewSize.w ? (viewSize.w - mapPxW) / 2 : Math.min(0, Math.max(rawCamX, viewSize.w - mapPxW));
  const camY = mapPxH <= viewSize.h ? (viewSize.h - mapPxH) / 2 : Math.min(0, Math.max(rawCamY, viewSize.h - mapPxH));

  const hpPct = (hp.cur / hp.max) * 100;
  const hpColor = hpPct > 50 ? "#5de85d" : hpPct > 25 ? "#f5c518" : "#e84a4a";

  return (
    <div className="gameboy-shell">
      <div ref={viewRef} className="gameboy-screen">

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
      }}>
        {/* Tiles rendered as flex rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {currentMap.rows.map((row, ry) => (
            <div key={ry} style={{ display: "flex" }}>
              {row.map((t, cx) => {
                const obj = currentMap.objects[`${cx},${ry}`];
                return (
                  <div
                    key={cx}
                    className={`map-tile tile-${t}`}
                    style={{
                      width: TS, height: TS, flexShrink: 0,
                      boxShadow: "inset 0 0 0 1px rgba(37,32,24,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: TS * 0.62, lineHeight: 1, userSelect: "none",
                    }}
                  >
                    {obj && obj !== "NPC" && <div className={objectClassFor(obj)} />}
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
            <div className={`npc-sprite npc-variant-${npc.variant ?? 0} ${npc.walking ? "walking" : ""}`} />
          </div>
        ))}

        {/* Player sprite — absolutely overlaid on the map */}
        <div style={{
          position: "absolute",
          left: pos.x * TS, top: pos.y * TS,
          width: TS, height: TS,
          display: "flex", alignItems: "center", justifyContent: "center",
          filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.9))",
          zIndex: 10, pointerEvents: "none",
          transition: "left 0.1s linear, top 0.1s linear",
        }}>
          <div className={`trainer-sprite facing-${facing} ${isWalking ? "walking" : ""}`} />
        </div>
      </div>

      {/* ── HUD TOP ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 120,
        padding: "12px 16px",
        background: "linear-gradient(to bottom, rgba(37,32,24,0.88) 0%, transparent 100%)",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        pointerEvents: "none",
      }}>
        {/* Player stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ ...PX, fontSize: "0.45rem", color: "#fff8c8" }}>HERO · LV.15</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...RJ, fontSize: "0.75rem", color: "#e84a4a", fontWeight: 700 }}>HP</span>
            <div style={{ width: 120, height: 10, backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ height: "100%", width: `${hpPct}%`, backgroundColor: hpColor, transition: "width 0.4s" }} />
            </div>
            <span style={{ ...RJ, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
              {hp.cur}/{hp.max}
            </span>
          </div>
        </div>

        {/* Location */}
        <div style={{ textAlign: "center" }}>
          <div className="pixel-window px-4 py-1" style={{ ...VT, fontSize: "1.35rem" }}>{location}</div>
          <div style={{ ...RJ, fontSize: "0.7rem", color: "rgba(255,248,200,0.75)" }}>Steps: {steps}</div>
        </div>

        {/* Currency + pause hint */}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ ...VT, fontSize: "1.2rem", color: "#fff8c8" }}>1,240 G</div>
          <div style={{ ...RJ, fontSize: "0.65rem", color: "rgba(255,248,200,0.65)" }}>ESC to pause</div>
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

      {/* ── SAVE MESSAGE ── */}
      {saveMsg && (
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          zIndex: 130, border: "2px solid rgba(245,197,24,0.7)",
          backgroundColor: "rgba(30,20,0,0.95)", padding: "12px 28px",
          ...VT, fontSize: "1.5rem", color: "#f5c518",
        }}>
          {saveMsg}
        </div>
      )}

      {/* ── CLICKABLE WORLD MINIMAP ── */}
      <button
        type="button"
        aria-label="Open world minimap"
        onClick={() => setMiniMapOpen(open => !open)}
        style={{
          position: "absolute",
          left: 14,
          bottom: 38,
          zIndex: 125,
          width: miniMapOpen ? 254 : 142,
          minHeight: miniMapOpen ? 184 : 92,
          border: "4px solid #252018",
          backgroundColor: "#fff8c8",
          boxShadow: "inset 0 0 0 3px #ffffff, 0 8px 0 rgba(90,60,34,0.55)",
          padding: miniMapOpen ? 10 : 8,
          cursor: "pointer",
          textAlign: "left",
          transition: "width 0.18s ease, min-height 0.18s ease",
        }}
      >
        <div style={{ ...PX, fontSize: "0.42rem", color: "#315f2a", marginBottom: 6 }}>
          WORLD MAP
        </div>
        <div style={{ position: "relative", height: miniMapOpen ? 94 : 54, backgroundColor: "#76ad56", border: "2px solid #252018", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(37,32,24,0.16) 1px, transparent 2px)", backgroundSize: "10px 10px" }} />
          {Object.entries(WORLD_ROUTES).flatMap(([from, routes]) =>
            Object.values(routes).map(to => [from as TownMapId, to!] as const)
          ).filter(([from, to], index, edges) =>
            edges.findIndex(([a, b]) => [a, b].sort().join("-") === [from, to].sort().join("-")) === index
          ).map(([from, to]) => {
            const a = TOWN_WORLD_POSITIONS[from];
            const b = TOWN_WORLD_POSITIONS[to];
            return (
              <div
                key={`${from}-${to}`}
                style={{
                  position: "absolute",
                  left: `${Math.min(a.x, b.x)}%`,
                  top: `${Math.min(a.y, b.y)}%`,
                  width: `${Math.abs(a.x - b.x) || 2}%`,
                  height: `${Math.abs(a.y - b.y) || 2}%`,
                  borderTop: "2px dashed rgba(90,60,34,0.78)",
                  transform: a.y > b.y ? "skewY(-24deg)" : "skewY(24deg)",
                  transformOrigin: "left center",
                }}
              />
            );
          })}
          {TOWN_THEMES.map(town => {
            const p = TOWN_WORLD_POSITIONS[town.id];
            const active = town.id === mapId;
            return (
              <div
                key={town.id}
                title={town.name}
                style={{
                  position: "absolute",
                  left: `calc(${p.x}% - ${active ? 6 : 4}px)`,
                  top: `calc(${p.y}% - ${active ? 6 : 4}px)`,
                  width: active ? 12 : 8,
                  height: active ? 12 : 8,
                  backgroundColor: active ? "#e84a4a" : "#f6d746",
                  border: "2px solid #252018",
                  boxShadow: active ? "0 0 0 3px rgba(232,74,74,0.24)" : "none",
                }}
              />
            );
          })}
        </div>
        <div style={{ ...VT, fontSize: miniMapOpen ? "1rem" : "0.88rem", color: "#252018", lineHeight: 1.1, marginTop: 7 }}>
          Hero: {location}
        </div>
        {miniMapOpen && (
          <div style={{ marginTop: 6 }}>
            <div style={{ ...PX, fontSize: "0.38rem", color: "#b6422c", marginBottom: 4 }}>
              {currentTown?.name ?? currentMap.name}
            </div>
            <div style={{ ...VT, fontSize: "0.9rem", color: "#66512c", lineHeight: 1.1 }}>
              {currentTown ? currentTown.hook : "Interior area. Exit returns to the last town doorway."}
            </div>
          </div>
        )}
      </button>

      {/* ── TRAIN STATION MENU ── */}
      {trainOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 140,
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
            position: "absolute", bottom: 80, left: 12, right: 12, zIndex: 130,
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
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 120,
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
      <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 125, display: "grid", gridTemplateColumns: "repeat(3,38px)", gap: 3, width: 120 }}>
        <div /><button style={D_PAD_BTN} onClick={() => doMove(0,-1,"up")}>▲</button><div />
        <button style={D_PAD_BTN} onClick={() => doMove(-1,0,"left")}>◀</button>
        <button style={{ ...D_PAD_BTN, color: "#f5c518", borderColor: "rgba(245,197,24,0.3)" }} onClick={doInteract}>Z</button>
        <button style={D_PAD_BTN} onClick={() => doMove(1,0,"right")}>▶</button>
        <div /><button style={D_PAD_BTN} onClick={() => doMove(0,1,"down")}>▼</button><div />
      </div>

      {/* ── PAUSE MENU ── */}
      {paused && (
        <div style={{ position: "absolute", inset: 0, zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.85)" }}>
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
