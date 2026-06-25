import { ACTIVE_MAP_OBJECT_DEFS, objectLabelForId } from "../../../../data/objectRegistry";
import { objectClassFor } from "../../../mapRenderHelpers";

type ObjectEditAction = "place" | "erase";

const VT = { fontFamily: "'VT323', monospace" } as const;
const RJ = { fontFamily: "'Rajdhani', sans-serif" } as const;

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

export function ObjectPalette({
  objectEditAction,
  setObjectEditAction,
  editorObjectId,
  setEditorObjectId,
}: {
  objectEditAction: ObjectEditAction;
  setObjectEditAction: (action: ObjectEditAction) => void;
  editorObjectId: string;
  setEditorObjectId: (objectId: string) => void;
}) {
  return (
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
  );
}
