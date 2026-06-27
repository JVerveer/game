import { getWorldAtlas } from "./worldAssets";

export function WorldAtlasTile({
  atlasId,
  col,
  row,
  tileSize = 48,
  width = 1,
  height = 1,
}: {
  atlasId: string;
  col: number;
  row: number;
  tileSize?: number;
  width?: number;
  height?: number;
}) {
  const atlas = getWorldAtlas(atlasId);

  if (!atlas) {
    return (
      <div
        style={{
          width: tileSize * width,
          height: tileSize * height,
          backgroundColor: "#ca4b36",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: tileSize * width,
        height: tileSize * height,
        backgroundImage: `url(${atlas.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${atlas.atlasWidth}px ${atlas.atlasHeight}px`,
        backgroundPosition: `${-col * tileSize}px ${-row * tileSize}px`,
        imageRendering: "pixelated",
        pointerEvents: "none",
      }}
    />
  );
}
