import type { EditorMode } from "./shared/editorTypes";
import { EditorToolbar } from "./EditorToolbar";

export function Editor({
  editorMode,
  setEditorMode,
  children,
}: {
  editorMode: EditorMode;
  setEditorMode: (mode: EditorMode) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <EditorToolbar editorMode={editorMode} setEditorMode={setEditorMode} />
      {children}
    </div>
  );
}
