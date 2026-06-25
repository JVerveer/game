type NpcEditorAction = "create" | "edit" | "delete";

type NpcVisualCategory =
  | "Generic"
  | "Wokeshire"
  | "Special"
  | "Cryptonia"
  | "Surveillia";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

const NPC_VISUAL_CATEGORIES: NpcVisualCategory[] = [
  "Generic",
  "Wokeshire",
  "Special",
  "Cryptonia",
  "Surveillia",
];

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

export function NpcPalette({
  npcEditorAction,
  setNpcEditorAction,
  editorNpcCategory,
  setEditorNpcCategory,
  editorNpcSearch,
  setEditorNpcSearch,
  editorNpcPresetId,
  setEditorNpcPresetId,
  editorNpcName,
  setEditorNpcName,
  editorNpcWalking,
  setEditorNpcWalking,
  editorNpcLines,
  setEditorNpcLines,
}: {
  npcEditorAction: NpcEditorAction;
  setNpcEditorAction: (action: NpcEditorAction) => void;
  editorNpcCategory: NpcVisualCategory;
  setEditorNpcCategory: (category: NpcVisualCategory) => void;
  editorNpcSearch: string;
  setEditorNpcSearch: (search: string) => void;
  editorNpcPresetId: string;
  setEditorNpcPresetId: (presetId: string) => void;
  editorNpcName: string;
  setEditorNpcName: (name: string) => void;
  editorNpcWalking: boolean;
  setEditorNpcWalking: (walking: boolean) => void;
  editorNpcLines: string;
  setEditorNpcLines: (lines: string) => void;
}) {
  const filteredPresets = NPC_VISUAL_PRESETS.filter(preset => {
    const matchesCategory = preset.category === editorNpcCategory;
    const q = editorNpcSearch.trim().toLowerCase();
    const matchesSearch = !q || preset.label.toLowerCase().includes(q) || preset.id.toLowerCase().includes(q) || preset.styleRole.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const selectedPreset = NPC_VISUAL_PRESETS.find(preset => preset.id === editorNpcPresetId) ?? NPC_VISUAL_PRESETS[0];

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {(["create", "delete"] as const).map(action => (
          <button
            key={action}
            type="button"
            onClick={() => setNpcEditorAction(action)}
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

        <span style={{ ...VT, fontSize: "1.05rem", color: "#252018", alignSelf: "center" }}>
          Selected look: {selectedPreset?.label ?? editorNpcPresetId}
        </span>
      </div>

      {npcEditorAction === "create" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 10 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Category</span>
              <select
                value={editorNpcCategory}
                onChange={(e) => setEditorNpcCategory(e.target.value as NpcVisualCategory)}
                style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
              >
                {NPC_VISUAL_CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Search appearances</span>
              <input
                value={editorNpcSearch}
                onChange={(e) => setEditorNpcSearch(e.target.value)}
                placeholder="Search NPC looks..."
                style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
              />
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>NPC name</span>
              <input
                value={editorNpcName}
                onChange={(e) => setEditorNpcName(e.target.value)}
                style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018" }}
              />
            </label>

            <label style={{ display: "flex", gap: 8, alignItems: "center", alignSelf: "end", paddingBottom: 8 }}>
              <input
                type="checkbox"
                checked={editorNpcWalking}
                onChange={(e) => setEditorNpcWalking(e.target.checked)}
              />
              <span style={{ ...RJ, fontSize: "0.85rem", fontWeight: 800, color: "#252018" }}>Walks around</span>
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8, maxHeight: 230, overflow: "auto", paddingRight: 4, marginBottom: 10 }}>
            {filteredPresets.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setEditorNpcPresetId(preset.id)}
                style={{
                  minHeight: 56,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 9px",
                  border: editorNpcPresetId === preset.id ? "4px solid #315f2a" : "2px solid #252018",
                  background: editorNpcPresetId === preset.id ? "#d8f0b0" : "#fff8c8",
                  color: "#252018",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  className={`npc-sprite npc-variant-${preset.variant} npc-role-${preset.styleRole}`}
                  style={{ transform: "scale(0.72)", transformOrigin: "center", flexShrink: 0 }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ ...VT, fontSize: "1.05rem", lineHeight: 1 }}>{preset.label}</span>
                  <span style={{ ...RJ, fontSize: "0.68rem", fontWeight: 700, opacity: 0.65 }}>{preset.styleRole} · v{preset.variant}</span>
                </span>
              </button>
            ))}
          </div>

          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ ...RJ, fontSize: "0.72rem", fontWeight: 800, color: "#252018" }}>Dialogue lines</span>
            <textarea
              value={editorNpcLines}
              onChange={(e) => setEditorNpcLines(e.target.value)}
              rows={3}
              style={{ padding: 8, border: "2px solid #252018", background: "#fff8c8", color: "#252018", resize: "vertical" }}
            />
          </label>
        </>
      )}

      {npcEditorAction === "delete" && (
        <div style={{ ...VT, fontSize: "1.1rem", color: "#252018" }}>
          Click an NPC on the map to delete it. Select mode is still used for editing and moving NPCs.
        </div>
      )}
    </div>
  );
}
