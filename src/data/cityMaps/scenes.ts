import type { TownMapId } from "../maps";
import type { PixelObject } from "./sceneTypes";
import { SATIRIA_OBJECTS } from "./satiriaScene";
import { BREXITON_OBJECTS } from "./brexitonScene";
import { CRYPTONIA_OBJECTS } from "./cryptoniaScene";
import { FACTCHECK_OBJECTS } from "./factcheckScene";
import { INFLATOPOLIS_OBJECTS } from "./inflatopolisScene";
import { PROMPTFORD_OBJECTS } from "./promptfordScene";
import { RAGEBAIT_OBJECTS } from "./ragebaitScene";
import { SURVEILLIA_OBJECTS } from "./surveilliaScene";
import { TARIFF_OBJECTS } from "./tariffScene";
import { TWEETSBURG_OBJECTS } from "./tweetsburgScene";
import { WOKESHIRE_OBJECTS } from "./wokeshireScene";
import { cityCoreOffsetFor, cityDimsFor, CITY_SIZE_TIER_BY_TOWN } from "./sizeTiers";

export const CITY_SCENE_OBJECTS: Record<TownMapId, PixelObject[]> = {
  satiria: SATIRIA_OBJECTS,
  brexiton: BREXITON_OBJECTS,
  tweetsburg: TWEETSBURG_OBJECTS,
  cryptonia: CRYPTONIA_OBJECTS,
  wokeshire: WOKESHIRE_OBJECTS,
  tariff: TARIFF_OBJECTS,
  factcheck: FACTCHECK_OBJECTS,
  ragebait: RAGEBAIT_OBJECTS,
  surveillia: SURVEILLIA_OBJECTS,
  promptford: PROMPTFORD_OBJECTS,
  inflatopolis: INFLATOPOLIS_OBJECTS,
};

const offsetObjects = (mapId: TownMapId, objects: PixelObject[]) => {
  const offset = cityCoreOffsetFor(mapId);
  return objects.map((object) => ({
    ...object,
    x: object.x + offset.x,
    y: object.y + offset.y,
  }));
};

const generatedSceneObjectsFor = (mapId: TownMapId): PixelObject[] => {
  if (mapId === "satiria") return [];
  const dims = cityDimsFor(mapId);
  const centerX = Math.floor(dims.width / 2) - 1;
  const centerY = Math.floor(dims.height / 2);
  const tier = CITY_SIZE_TIER_BY_TOWN[mapId];
  const objects: PixelObject[] = [
    { sprite: "lamp", x: centerX - 12, y: centerY - 8, className: "pixel-object-lamp-large" },
    { sprite: "lamp", x: centerX + 12, y: centerY - 8, className: "pixel-object-lamp-large" },
    { sprite: "lamp", x: centerX - 12, y: centerY + 8, className: "pixel-object-lamp-large" },
    { sprite: "lamp", x: centerX + 12, y: centerY + 8, className: "pixel-object-lamp-large" },
    { sprite: "bench", x: centerX - 17, y: centerY - 10, className: "pixel-object-bench-large" },
    { sprite: "bench", x: centerX + 15, y: centerY + 10, className: "pixel-object-bench-large" },
  ];

  if (tier === "large" || tier === "extraLarge") {
    objects.push(
      { sprite: "bench", x: 18, y: 20, className: "pixel-object-bench-large" },
      { sprite: "bench", x: dims.width - 21, y: dims.height - 20, className: "pixel-object-bench-large" },
      { sprite: "lamp", x: 20, y: dims.height - 17, className: "pixel-object-lamp-large" },
      { sprite: "lamp", x: dims.width - 22, y: 16, className: "pixel-object-lamp-large" },
    );
  }

  if (tier === "extraLarge") {
    objects.push(
      { sprite: "bench", x: 40, y: 20, className: "pixel-object-bench-large" },
      { sprite: "bench", x: dims.width - 43, y: 20, className: "pixel-object-bench-large" },
      { sprite: "lamp", x: 42, y: dims.height - 19, className: "pixel-object-lamp-large" },
      { sprite: "lamp", x: dims.width - 44, y: dims.height - 19, className: "pixel-object-lamp-large" },
    );
  }

  return objects;
};

export const citySceneObjectsFor = (mapId: TownMapId) => [
  ...offsetObjects(mapId, CITY_SCENE_OBJECTS[mapId] ?? []),
  ...generatedSceneObjectsFor(mapId),
];
