import type { ExtensionMetadata } from '../../../extensions/Extensions';
import type { PoolItem } from '../../../utils/pool/Pool';
import type { Effect } from '../../scene/Effect';
export declare class ColorMask implements Effect, PoolItem {
    static extension: ExtensionMetadata;
    priority: number;
    mask: number;
    pipe: string;
    constructor(options: {
        mask: number;
    });
    init(mask: number): void;
    destroy(): void;
    static test(mask: any): boolean;
}
