import { Spritesheet } from './Spritesheet';
import type { AssetExtension } from '../assets/AssetExtension';
import type { SpritesheetData } from './Spritesheet';
export interface SpriteSheetJson extends SpritesheetData {
    meta: {
        image: string;
        scale: string;
        related_multi_packs?: string[];
    };
}
/**
 * Asset extension for loading spritesheets.
 * @memberof PIXI
 * @type {PIXI.AssetExtension}
 */
export declare const spritesheetAsset: AssetExtension<Spritesheet | SpriteSheetJson, any>;
