import type { TownMapId } from "../maps";

export type CitySizeTier = "small" | "medium" | "large" | "extraLarge";

export const CITY_SIZE_DIMS: Record<CitySizeTier, { width: number; height: number; npcCount: number }> = {
  small: { width: 56, height: 34, npcCount: 8 },
  medium: { width: 80, height: 50, npcCount: 12 },
  large: { width: 97, height: 60, npcCount: 16 },
  extraLarge: { width: 132, height: 75, npcCount: 26 },
};

export const CITY_SIZE_TIER_BY_TOWN: Record<TownMapId, CitySizeTier> = {
  satiria: "small",
  inflatopolis: "small",
  brexiton: "medium",
  promptford: "medium",
  ragebait: "medium",
  tariff: "medium",
  wokeshire: "medium",
  cryptonia: "large",
  surveillia: "large",
  tweetsburg: "large",
  factcheck: "extraLarge",
};

export const cityDimsFor = (townId: TownMapId) => CITY_SIZE_DIMS[CITY_SIZE_TIER_BY_TOWN[townId]];

export const cityNpcCountFor = (townId: TownMapId) => cityDimsFor(townId).npcCount;

export const cityCoreOffsetFor = (townId: TownMapId, baseWidth = 56, baseHeight = 34) => {
  const dims = cityDimsFor(townId);
  return {
    x: Math.floor((dims.width - baseWidth) / 2),
    y: Math.floor((dims.height - baseHeight) / 2),
  };
};
