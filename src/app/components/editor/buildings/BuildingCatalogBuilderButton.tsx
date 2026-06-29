import { useState } from "react";
import { BuildingCatalogBuilder } from "./BuildingCatalogBuilder";

export function BuildingCatalogBuilderButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 14px",
          border: "3px solid #252018",
          background: "#5b3f8c",
          color: "#fff8c8",
          fontWeight: 900,
          cursor: "pointer",
          marginBottom: 12,
          width: "100%",
        }}
      >
        Open 20×10 Building Catalog Builder
      </button>

      {open && <BuildingCatalogBuilder onClose={() => setOpen(false)} />}
    </>
  );
}
