import type { SHAPE_PRIMITIVE } from '../const';
import type { Rectangle } from './Rectangle';
/** A basic object to define a Pixi shape. */
export interface ShapePrimitive {
    /** The type of the object, mainly used to avoid `instanceof` checks */
    readonly type: SHAPE_PRIMITIVE;
    /** Checks whether the x and y coordinates passed to this function are contained within this ShapePrimitive. */
    contains(x: number, y: number): boolean;
    /** Creates a clone of this ShapePrimitive instance. */
    clone(): ShapePrimitive;
    /** Copies the properties from another ShapePrimitive to this ShapePrimitive. */
    copyFrom(source: ShapePrimitive): void;
    /** Copies the properties from this ShapePrimitive to another ShapePrimitive. */
    copyTo(destination: ShapePrimitive): void;
    /** Returns the framing rectangle of the ShapePrimitive as a Rectangle object. */
    getBounds(out?: Rectangle): Rectangle;
    readonly x: number;
    readonly y: number;
}
