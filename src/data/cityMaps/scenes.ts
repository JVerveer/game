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

export const citySceneObjectsFor = (mapId: TownMapId) => CITY_SCENE_OBJECTS[mapId] ?? [];

