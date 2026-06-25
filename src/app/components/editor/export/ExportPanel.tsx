export function ExportPanel({
  exportText,
  onCopy,
  onReset,
  onClose,
}: {
  exportText: string;
  onCopy: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button type="button" onClick={onCopy} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Copy Export
        </button>
        <button type="button" onClick={onReset} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Reset This Map
        </button>
        <button type="button" onClick={onClose} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Close
        </button>
      </div>

      <textarea
        readOnly
        value={exportText}
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
    </>
  );
}
