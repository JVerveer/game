import {
  DEFAULT_CHARACTER_APPEARANCE,
  CHARACTER_ASSET_MANIFEST,
} from "./characterAssets";
import type { CharacterAppearance } from "./characterTypes";

export type HeroAppearance = CharacterAppearance;

export const DEFAULT_HERO_APPEARANCE: HeroAppearance = DEFAULT_CHARACTER_APPEARANCE;

export const HERO_APPEARANCE_OPTIONS = CHARACTER_ASSET_MANIFEST;
