import type { EditorBuildingColor, EditorBuildingKind } from "../../../../data/cityMaps/mapAsset";
import { BuildingCatalogBuilderButton } from "./BuildingCatalogBuilderButton";
import { BuildingPrefabManager } from "./BuildingPrefabManager";

export function BuildingPalette({
  editorBuildingKind,
  setEditorBuildingKind,
  editorBuildingColor,
  setEditorBuildingColor,
  editorBuildingW,
  setEditorBuildingW,
  editorBuildingH,
  setEditorBuildingH,
}: {
  editorBuildingKind: EditorBuildingKind;
  setEditorBuildingKind: (kind: EditorBuildingKind) => void;
  editorBuildingColor: EditorBuildingColor;
  setEditorBuildingColor: (color: EditorBuildingColor) => void;
  editorBuildingW: number;
  setEditorBuildingW: (width: number) => void;
  editorBuildingH: number;
  setEditorBuildingH: (height: number) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <BuildingCatalogBuilderButton />

      <BuildingPrefabManager
        editorBuildingKind={editorBuildingKind}
        editorBuildingColor={editorBuildingColor}
        editorBuildingW={editorBuildingW}
        editorBuildingH={editorBuildingH}
        setEditorBuildingKind={setEditorBuildingKind}
        setEditorBuildingColor={setEditorBuildingColor}
        setEditorBuildingW={setEditorBuildingW}
        setEditorBuildingH={setEditorBuildingH}
      />
    </div>
  );
}