import { lazy, Suspense, useState } from "react";

const NpcCatalogBuilder = lazy(() =>
  import("./NpcCatalogBuilder").then(module => ({
    default: module.NpcCatalogBuilder,
  })),
);

export function NpcCatalogBuilderButton() {
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
        Open Global NPC Builder
      </button>

      <Suspense fallback={<div style={{ padding: 12, fontWeight: 900 }}>Loading NPC builder...</div>}>
        {open && <NpcCatalogBuilder onClose={() => setOpen(false)} />}
      </Suspense>
    </>
  );
}
