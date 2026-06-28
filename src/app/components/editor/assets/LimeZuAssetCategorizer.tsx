import { LimeZuAssetManager } from "./LimeZuAssetManager";

export function LimeZuAssetCategorizer({ onClose }: { onClose: () => void }) {
  return <LimeZuAssetManager onClose={onClose} />;
}
