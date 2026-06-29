import { useState } from "react";
import { BuildingPrefabBuilder } from "./builder/BuildingPrefabBuilder";

export function BuildingBuilderButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 12px",
          border: "2px solid #252018",
          background: "#5b3f8c",
          color: "#fff8c8",
          fontWeight: 900,
          cursor: "pointer",
          marginBottom: 10,
        }}
      >
        Open Building Prefab Builder
      </button>

      {open && <BuildingPrefabBuilder onClose={() => setOpen(false)} />}
    </>
  );
}
