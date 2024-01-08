import type { ICanvas, ICanvasRenderingContext2DSettings } from '../../../../settings/adapter/ICanvas';
import type { ICanvasRenderingContext2D } from '../../../../settings/adapter/ICanvasRenderingContext2D';
export interface CanvasAndContext {
    canvas: ICanvas;
    context: ICanvasRenderingContext2D;
}
/**
 * Texture pool, used by FilterSystem and plugins.
 *
 * Stores collection of temporary pow2 or screen-sized renderTextures
 *
 * If you use custom RenderTexturePool for your filters, you can use methods
 * `getFilterTexture` and `returnFilterTexture` same as in
 * @memberof PIXI
 */
export declare class CanvasPoolClass {
    canvasOptions: ICanvasRenderingContext2DSettings;
    /**
     * Allow renderTextures of the same size as screen, not just pow2
     *
     * Automatically sets to true after `setScreenSize`
     * @default false
     */
    enableFullScreen: boolean;
    canvasPool: {
        [x in string | number]: CanvasAndContext[];
    };
    poolKeyHash: Record<number, string>;
    constructor(canvasOptions?: ICanvasRenderingContext2DSettings);
    /**
     * Creates texture with params that were specified in pool constructor.
     * @param pixelWidth - Width of texture in pixels.
     * @param pixelHeight - Height of texture in pixels.
     */
    createCanvasAndContext(pixelWidth: number, pixelHeight: number): CanvasAndContext;
    /**
     * Gets a Power-of-Two render texture or fullScreen texture
     * @param minWidth - The minimum width of the render texture.
     * @param minHeight - The minimum height of the render texture.
     * @param resolution - The resolution of the render texture.
     * @returns The new render texture.
     */
    getOptimalCanvasAndContext(minWidth: number, minHeight: number, resolution?: number): CanvasAndContext;
    /**
     * Place a render texture back into the pool.
     * @param canvasAndContext
     */
    returnCanvasAndContext(canvasAndContext: CanvasAndContext): void;
    clear(): void;
}
export declare const CanvasPool: CanvasPoolClass;
