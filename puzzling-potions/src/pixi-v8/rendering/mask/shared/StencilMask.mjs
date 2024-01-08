import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { Container } from '../../scene/Container.mjs';
import { addMaskBounds } from './addMaskBounds.mjs';
import { addMaskLocalBounds } from './addMaskLocalBounds.mjs';

class StencilMask {
  constructor(options) {
    this.priority = 0;
    this.pipe = "stencilMask";
    if (options?.mask) {
      this.init(options.mask);
    }
  }
  init(mask) {
    this.mask = mask;
    this.mask.includeInBuild = false;
    this.mask.measurable = false;
  }
  reset() {
    this.mask.measurable = true;
    this.mask.includeInBuild = true;
    this.mask = null;
  }
  addBounds(bounds, skipUpdateTransform) {
    addMaskBounds(this.mask, bounds, skipUpdateTransform);
  }
  addLocalBounds(bounds, localRoot) {
    addMaskLocalBounds(this.mask, bounds, localRoot);
  }
  containsPoint(point) {
    const mask = this.mask;
    if (mask.containsPoint) {
      return mask.containsPoint(point);
    }
    return false;
  }
  destroy() {
    this.reset();
  }
  static test(mask) {
    return mask instanceof Container;
  }
}
StencilMask.extension = ExtensionType.MaskEffect;

export { StencilMask };
//# sourceMappingURL=StencilMask.mjs.map
