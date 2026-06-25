import type { EditorSelection } from "./shared/editorTypes";

export function Inspector({
  selection,
  children,
}: {
  selection: EditorSelection;
  children?: React.ReactNode;
}) {
  return (
    <div className="editor-inspector">
      {selection ? children : <p>Select an NPC, building, object, or tile.</p>}
    </div>
  );
}
