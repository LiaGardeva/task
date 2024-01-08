'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ObservablePoint = require('../../../maths/ObservablePoint.js');
var View = require('../../renderers/shared/View.js');

let uid = 0;
class SpriteView {
  constructor(texture) {
    this.owner = View.emptyViewObserver;
    this.batched = true;
    this.buildId = 0;
    this.uid = uid++;
    this.type = "sprite";
    this._bounds = [0, 1, 0, 0];
    this._sourceBounds = [0, 1, 0, 0];
    this.boundsDirty = true;
    this.sourceBoundsDirty = true;
    this.anchor = new ObservablePoint.ObservablePoint(
      this,
      texture.layout.defaultAnchor?.x || 0,
      texture.layout.defaultAnchor?.y || 0
    );
    this.texture = texture;
  }
  set texture(value) {
    if (this._texture === value)
      return;
    value.on("update", this.onUpdate, this);
    this._texture = value;
    value.off("update", this.onUpdate, this);
    this.onUpdate();
  }
  get texture() {
    return this._texture;
  }
  get bounds() {
    if (this.boundsDirty) {
      this.updateBounds();
      this.boundsDirty = false;
    }
    return this._bounds;
  }
  get sourceBounds() {
    if (this.sourceBoundsDirty) {
      this._updateSourceBounds();
      this.sourceBoundsDirty = false;
    }
    return this._sourceBounds;
  }
  updateBounds() {
    const texture = this._texture;
    const textureSource = texture._source;
    const layout = texture.layout;
    const orig = layout.orig;
    const trim = layout.trim;
    const textureSourceWidth = textureSource.width;
    const textureSourceHeight = textureSource.height;
    const width = textureSourceWidth * orig.width;
    const height = textureSourceHeight * orig.height;
    const anchor = this.anchor;
    const bounds = this._bounds;
    if (trim) {
      const sourceWidth = textureSourceWidth * trim.width;
      const sourceHeight = textureSourceHeight * trim.height;
      bounds[1] = trim.x * textureSourceWidth - anchor._x * width;
      bounds[0] = bounds[1] + sourceWidth;
      bounds[3] = trim.y * textureSourceHeight - anchor._y * height;
      bounds[2] = bounds[3] + sourceHeight;
    } else {
      bounds[1] = -anchor._x * width;
      bounds[0] = bounds[1] + width;
      bounds[3] = -anchor._y * height;
      bounds[2] = bounds[3] + height;
    }
    return;
  }
  _updateSourceBounds() {
    const anchor = this.anchor;
    const texture = this._texture;
    const textureSource = texture._source;
    const layout = texture.layout;
    const orig = layout.orig;
    const sourceBounds = this._sourceBounds;
    const width = textureSource.width * orig.width;
    const height = textureSource.height * orig.height;
    sourceBounds[1] = -anchor._x * width;
    sourceBounds[0] = sourceBounds[1] + width;
    sourceBounds[3] = -anchor._y * height;
    sourceBounds[2] = sourceBounds[3] + height;
  }
  addBounds(bounds) {
    const trim = this._texture._layout.trim;
    if (trim) {
      const sourceBounds = this.sourceBounds;
      bounds.addFrame(sourceBounds[0], sourceBounds[2], sourceBounds[1], sourceBounds[3]);
    } else {
      const _bounds = this.bounds;
      bounds.addFrame(_bounds[0], _bounds[2], _bounds[1], _bounds[3]);
    }
  }
  onUpdate() {
    this.didUpdate = true;
    this.sourceBoundsDirty = this.boundsDirty = true;
    this.owner.onViewUpdate();
  }
  // passed local space..
  containsPoint(point) {
    const width = this._texture.frameWidth;
    const height = this._texture.frameHeight;
    const x1 = -width * this.anchor.x;
    let y1 = 0;
    if (point.x >= x1 && point.x < x1 + width) {
      y1 = -height * this.anchor.y;
      if (point.y >= y1 && point.y < y1 + height) {
        return true;
      }
    }
    return false;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options = false) {
    this.anchor = null;
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      this._texture.destroy(destroyTextureSource);
    }
    this._texture = null;
    this._bounds = null;
    this._sourceBounds = null;
  }
}

exports.SpriteView = SpriteView;
//# sourceMappingURL=SpriteView.js.map
