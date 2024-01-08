import { Texture } from '../rendering/renderers/shared/texture/Texture';
import type { PointData } from '../maths/PointData';
import type { TextureSource } from '../rendering/renderers/shared/texture/sources/TextureSource';
import type { BindableTexture } from '../rendering/renderers/shared/texture/Texture';
import type { Dict } from '../utils/types';
/**
 * Represents the JSON data for a spritesheet atlas.
 * @memberof PIXI
 */
export interface SpritesheetFrameData {
    frame: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    trimmed?: boolean;
    rotated?: boolean;
    sourceSize?: {
        w: number;
        h: number;
    };
    spriteSourceSize?: {
        x: number;
        y: number;
    };
    anchor?: PointData;
}
/**
 * Atlas format.
 * @memberof PIXI
 */
export interface SpritesheetData {
    frames: Dict<SpritesheetFrameData>;
    animations?: Dict<string[]>;
    meta: {
        scale: string;
        related_multi_packs?: string[];
    };
}
/**
 * Utility class for maintaining reference to a collection
 * of Textures on a single Spritesheet.
 *
 * To access a sprite sheet from your code you may pass its JSON data file to Pixi's loader:
 *
 * ```js
 * import { Assets } from 'pixi.js';
 *
 * const sheet = await Assets.load('images/spritesheet.json');
 * ```
 *
 * Alternately, you may circumvent the loader by instantiating the Spritesheet directly:
 *
 * ```js
 * import { Spritesheet } from 'pixi.js';
 *
 * const sheet = new Spritesheet(texture, spritesheetData);
 * await sheet.parse();
 * console.log('Spritesheet ready to use!');
 * ```
 *
 * With the `sheet.textures` you can create Sprite objects, and `sheet.animations` can be used to create an AnimatedSprite.
 *
 * Here's an example of a sprite sheet JSON data file:
 * ```json
 * {
 *     "frames": {
 *         "enemy1.png":
 *         {
 *             "frame": {"x":103,"y":1,"w":32,"h":32},
 *             "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
 *             "sourceSize": {"w":32,"h":32},
 *             "anchor": {"x":16,"y":16}
 *         },
 *         "enemy2.png":
 *         {
 *             "frame": {"x":103,"y":35,"w":32,"h":32},
 *             "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
 *             "sourceSize": {"w":32,"h":32},
 *             "anchor": {"x":16,"y":16}
 *         },
 *         "button.png":
 *         {
 *             "frame": {"x":1,"y":1,"w":100,"h":100},
 *             "spriteSourceSize": {"x":0,"y":0,"w":100,"h":100},
 *             "sourceSize": {"w":100,"h":100},
 *             "anchor": {"x":0,"y":0},
 *             "borders": {"left":35,"top":35,"right":35,"bottom":35}
 *         }
 *     },
 *
 *     "animations": {
 *         "enemy": ["enemy1.png","enemy2.png"]
 *     },
 *
 *     "meta": {
 *         "image": "sheet.png",
 *         "format": "RGBA8888",
 *         "size": {"w":136,"h":102},
 *         "scale": "1"
 *     }
 * }
 * ```
 * Sprite sheets can be packed using tools like {@link https://codeandweb.com/texturepacker|TexturePacker},
 * {@link https://renderhjs.net/shoebox/|Shoebox} or {@link https://github.com/krzysztof-o/spritesheet.js|Spritesheet.js}.
 * Default anchor points (see {@link PIXI.Texture#defaultAnchor}), default 9-slice borders
 * (see {@link PIXI.Texture#defaultBorders}) and grouping of animation sprites are currently only
 * supported by TexturePacker.
 * @memberof PIXI
 */
export declare class Spritesheet {
    /** The maximum number of Textures to build per process. */
    static readonly BATCH_SIZE = 1000;
    /** For multi-packed spritesheets, this contains a reference to all the other spritesheets it depends on. */
    linkedSheets: Spritesheet[];
    /** Reference to ths source texture. */
    textureSource: TextureSource;
    /**
     * A map containing all textures of the sprite sheet.
     * Can be used to create a {@link PIXI.Sprite|Sprite}:
     * @example
     * import { Sprite } from 'pixi.js';
     *
     * new Sprite(sheet.textures['image.png']);
     */
    textures: Dict<Texture>;
    /**
     * A map containing the textures for each animation.
     * Can be used to create an {@link PIXI.AnimatedSprite|AnimatedSprite}:
     * @example
     * import { AnimatedSprite } from 'pixi.js';
     *
     * new AnimatedSprite(sheet.animations['anim_name']);
     */
    animations: Dict<Texture[]>;
    /**
     * Reference to the original JSON data.
     * @type {object}
     */
    data: SpritesheetData;
    /** The resolution of the spritesheet. */
    resolution: number;
    /**
     * Reference to original source image from the Loader. This reference is retained so we
     * can destroy the Texture later on. It is never used internally.
     */
    private _texture;
    /**
     * Map of spritesheet frames.
     * @type {object}
     */
    private _frames;
    /** Collection of frame names. */
    private _frameKeys;
    /** Current batch index being processed. */
    private _batchIndex;
    /**
     * Callback when parse is completed.
     * @type {Function}
     */
    private _callback;
    /**
     * @param texture - Reference to the source BaseTexture object.
     * @param {object} data - Spritesheet image data.
     */
    constructor(texture: BindableTexture, data: SpritesheetData);
    /**
     * Parser spritesheet from loaded data. This is done asynchronously
     * to prevent creating too many Texture within a single process.
     * @method PIXI.Spritesheet#parse
     */
    parse(): Promise<Record<string, Texture>>;
    /**
     * Process a batch of frames
     * @param initialFrameIndex - The index of frame to start.
     */
    private _processFrames;
    /** Parse animations config. */
    private _processAnimations;
    /** The parse has completed. */
    private _parseComplete;
    /** Begin the next batch of textures. */
    private _nextBatch;
    /**
     * Destroy Spritesheet and don't use after this.
     * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
     */
    destroy(destroyBase?: boolean): void;
}
