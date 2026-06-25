export function EditorCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="editor-canvas">
      {children}
    </div>
  );
}
