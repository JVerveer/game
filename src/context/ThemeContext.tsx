import { createContext, useContext, useState, useEffect } from "react";

// ─── Theme definition ─────────────────────────────────────────────────────────
export interface Theme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  // CSS variable values applied to :root
  vars: Record<string, string>;
}

export const THEMES: Theme[] = [
  {
    id: "retro-dark",
    name: "Retro Dark",
    emoji: "🌌",
    description: "Classic deep-space RPG — the default experience",
    vars: {
      "--background": "#05050f",
      "--foreground": "#e4dfc0",
      "--card": "#0d0d1e",
      "--card-foreground": "#e4dfc0",
      "--primary": "#f5c518",
      "--primary-foreground": "#05050f",
      "--secondary": "#1b1c2d",
      "--secondary-foreground": "#e4dfc0",
      "--muted": "#16172a",
      "--muted-foreground": "#6b6b8e",
      "--accent": "#5de85d",
      "--accent-foreground": "#05050f",
      "--destructive": "#e84a4a",
      "--destructive-foreground": "#e4dfc0",
      "--border": "rgba(245,197,24,0.18)",
      "--ring": "#f5c518",
    },
  },
  {
    id: "pixel-dawn",
    name: "Pixel Dawn",
    emoji: "🌅",
    description: "Warm sunrise hues — hopeful and retro",
    vars: {
      "--background": "#1a0f08",
      "--foreground": "#fde8c8",
      "--card": "#241508",
      "--card-foreground": "#fde8c8",
      "--primary": "#f08030",
      "--primary-foreground": "#1a0f08",
      "--secondary": "#2e1c10",
      "--secondary-foreground": "#fde8c8",
      "--muted": "#201408",
      "--muted-foreground": "#886644",
      "--accent": "#f8d030",
      "--accent-foreground": "#1a0f08",
      "--destructive": "#e84a2a",
      "--destructive-foreground": "#fde8c8",
      "--border": "rgba(240,128,48,0.25)",
      "--ring": "#f08030",
    },
  },
  {
    id: "forest-deep",
    name: "Forest Deep",
    emoji: "🌲",
    description: "Ancient woodland mystery — verdant and earthy",
    vars: {
      "--background": "#030e05",
      "--foreground": "#b8e8a0",
      "--card": "#071408",
      "--card-foreground": "#b8e8a0",
      "--primary": "#40d840",
      "--primary-foreground": "#030e05",
      "--secondary": "#0e2010",
      "--secondary-foreground": "#b8e8a0",
      "--muted": "#0a1a0c",
      "--muted-foreground": "#4a7a40",
      "--accent": "#a0e858",
      "--accent-foreground": "#030e05",
      "--destructive": "#e84040",
      "--destructive-foreground": "#b8e8a0",
      "--border": "rgba(64,216,64,0.2)",
      "--ring": "#40d840",
    },
  },
  {
    id: "ocean-night",
    name: "Ocean Night",
    emoji: "🌊",
    description: "Deep sea depths — calm, cold, mysterious",
    vars: {
      "--background": "#020818",
      "--foreground": "#a0d8f8",
      "--card": "#050e28",
      "--card-foreground": "#a0d8f8",
      "--primary": "#18a8e8",
      "--primary-foreground": "#020818",
      "--secondary": "#081830",
      "--secondary-foreground": "#a0d8f8",
      "--muted": "#061020",
      "--muted-foreground": "#306880",
      "--accent": "#00e8d8",
      "--accent-foreground": "#020818",
      "--destructive": "#e84a70",
      "--destructive-foreground": "#a0d8f8",
      "--border": "rgba(24,168,232,0.22)",
      "--ring": "#18a8e8",
    },
  },
  {
    id: "lava-cave",
    name: "Lava Cave",
    emoji: "🌋",
    description: "Volcanic dungeon fire — dangerous and dramatic",
    vars: {
      "--background": "#100402",
      "--foreground": "#ffd0a0",
      "--card": "#1e0804",
      "--card-foreground": "#ffd0a0",
      "--primary": "#f04010",
      "--primary-foreground": "#100402",
      "--secondary": "#280c04",
      "--secondary-foreground": "#ffd0a0",
      "--muted": "#1c0604",
      "--muted-foreground": "#804028",
      "--accent": "#f89020",
      "--accent-foreground": "#100402",
      "--destructive": "#ff2020",
      "--destructive-foreground": "#ffd0a0",
      "--border": "rgba(240,64,16,0.28)",
      "--ring": "#f04010",
    },
  },
  {
    id: "cyber-pink",
    name: "Cyber Pink",
    emoji: "💜",
    description: "Synthwave neon — loud, electric, unapologetic",
    vars: {
      "--background": "#0a0018",
      "--foreground": "#f8d8f8",
      "--card": "#140828",
      "--card-foreground": "#f8d8f8",
      "--primary": "#f020a8",
      "--primary-foreground": "#0a0018",
      "--secondary": "#200838",
      "--secondary-foreground": "#f8d8f8",
      "--muted": "#180630",
      "--muted-foreground": "#805890",
      "--accent": "#00e8f8",
      "--accent-foreground": "#0a0018",
      "--destructive": "#f02848",
      "--destructive-foreground": "#f8d8f8",
      "--border": "rgba(240,32,168,0.28)",
      "--ring": "#f020a8",
    },
  },
  {
    id: "haunted",
    name: "Haunted",
    emoji: "👻",
    description: "Gothic haunted mansion — eerie and enchanting",
    vars: {
      "--background": "#080510",
      "--foreground": "#d8c8f0",
      "--card": "#100a1e",
      "--card-foreground": "#d8c8f0",
      "--primary": "#9040e0",
      "--primary-foreground": "#080510",
      "--secondary": "#180a28",
      "--secondary-foreground": "#d8c8f0",
      "--muted": "#120818",
      "--muted-foreground": "#604878",
      "--accent": "#c878ff",
      "--accent-foreground": "#080510",
      "--destructive": "#e82860",
      "--destructive-foreground": "#d8c8f0",
      "--border": "rgba(144,64,224,0.25)",
      "--ring": "#9040e0",
    },
  },
  {
    id: "arctic",
    name: "Arctic",
    emoji: "❄️",
    description: "Frozen tundra ice — pristine, cold, crystalline",
    vars: {
      "--background": "#020c18",
      "--foreground": "#d8f0ff",
      "--card": "#061828",
      "--card-foreground": "#d8f0ff",
      "--primary": "#40c8f8",
      "--primary-foreground": "#020c18",
      "--secondary": "#0a2038",
      "--secondary-foreground": "#d8f0ff",
      "--muted": "#081828",
      "--muted-foreground": "#406080",
      "--accent": "#80f0e8",
      "--accent-foreground": "#020c18",
      "--destructive": "#e84070",
      "--destructive-foreground": "#d8f0ff",
      "--border": "rgba(64,200,248,0.22)",
      "--ring": "#40c8f8",
    },
  },
  {
    id: "desert-gold",
    name: "Desert Gold",
    emoji: "🏜️",
    description: "Ancient ruins at dusk — warm, rugged, timeless",
    vars: {
      "--background": "#120c04",
      "--foreground": "#f8e8b0",
      "--card": "#1e1408",
      "--card-foreground": "#f8e8b0",
      "--primary": "#d89828",
      "--primary-foreground": "#120c04",
      "--secondary": "#281c08",
      "--secondary-foreground": "#f8e8b0",
      "--muted": "#1c1208",
      "--muted-foreground": "#786030",
      "--accent": "#f0b830",
      "--accent-foreground": "#120c04",
      "--destructive": "#d84028",
      "--destructive-foreground": "#f8e8b0",
      "--border": "rgba(216,152,40,0.25)",
      "--ring": "#d89828",
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    emoji: "⬛",
    description: "Pure black and white — stark, minimal, timeless",
    vars: {
      "--background": "#050505",
      "--foreground": "#e8e8e8",
      "--card": "#101010",
      "--card-foreground": "#e8e8e8",
      "--primary": "#f0f0f0",
      "--primary-foreground": "#050505",
      "--secondary": "#1e1e1e",
      "--secondary-foreground": "#e8e8e8",
      "--muted": "#181818",
      "--muted-foreground": "#686868",
      "--accent": "#c0c0c0",
      "--accent-foreground": "#050505",
      "--destructive": "#c82020",
      "--destructive-foreground": "#e8e8e8",
      "--border": "rgba(255,255,255,0.14)",
      "--ring": "#f0f0f0",
    },
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────
interface ThemeContextValue {
  themeId: string;
  setThemeId: (id: string) => void;
  theme: Theme;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: "retro-dark",
  setThemeId: () => {},
  theme: THEMES[0],
  themes: THEMES,
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem("cq-theme") ?? "retro-dark";
  });

  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  // Apply CSS variables to :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    localStorage.setItem("cq-theme", themeId);
  }, [theme, themeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
