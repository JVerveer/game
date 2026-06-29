import { CharacterSheetRenderer } from "./CharacterSheetRenderer";
import { getNpcSheetAssignment } from "./NpcSheetRuntime";

export function NpcSheetSprite({
  npcId,
  x,
  y,
  tileSize = 48,
  pixelSize = 1,
  fallback,
}: {
  npcId: string;
  x: number;
  y: number;
  tileSize?: number;
  pixelSize?: number;
  fallback?: React.ReactNode;
}) {
  const assignment = getNpcSheetAssignment(npcId);

  if (!assignment) return <>{fallback ?? null}</>;

  return (
    <div
      className="npc-sheet-sprite"
      style={{
        position: "absolute",
        left: x * tileSize,
        top: y * tileSize,
        width: tileSize,
        height: tileSize,
        zIndex: 60 + y,
        pointerEvents: "none",
      }}
    >
      <CharacterSheetRenderer
        assetId={assignment.assetId}
        animation={assignment.animation ?? "idle"}
        facing={assignment.facing ?? "down"}
        pixelSize={pixelSize}
        playing
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
