'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Extensions = require('../../../extensions/Extensions.js');

class ColorMaskPipe {
  constructor(renderer) {
    this.colorStack = [];
    this.colorStackIndex = 0;
    this.currentColor = 0;
    this.renderer = renderer;
  }
  buildStart() {
    this.colorStack[0] = 15;
    this.colorStackIndex = 1;
    this.currentColor = 15;
  }
  push(mask, _container, instructionSet) {
    const renderer = this.renderer;
    renderer.renderPipes.batch.break(instructionSet);
    const colorStack = this.colorStack;
    colorStack[this.colorStackIndex] = colorStack[this.colorStackIndex - 1] & mask.mask;
    const currentColor = this.colorStack[this.colorStackIndex];
    if (currentColor !== this.currentColor) {
      this.currentColor = currentColor;
      instructionSet.add({
        type: "colorMask",
        colorMask: currentColor,
        canBundle: false
      });
    }
    this.colorStackIndex++;
  }
  pop(_mask, _container, instructionSet) {
    const renderer = this.renderer;
    renderer.renderPipes.batch.break(instructionSet);
    const colorStack = this.colorStack;
    this.colorStackIndex--;
    const currentColor = colorStack[this.colorStackIndex - 1];
    if (currentColor !== this.currentColor) {
      this.currentColor = currentColor;
      instructionSet.add({
        type: "colorMask",
        colorMask: currentColor,
        canBundle: false
      });
    }
  }
  execute(instruction) {
    const renderer = this.renderer;
    renderer.colorMask.setMask(instruction.colorMask);
  }
  destroy() {
    this.colorStack = null;
  }
}
/** @ignore */
ColorMaskPipe.extension = {
  type: [
    Extensions.ExtensionType.WebGLPipes,
    Extensions.ExtensionType.WebGPUPipes,
    Extensions.ExtensionType.CanvasPipes
  ],
  name: "colorMask"
};

exports.ColorMaskPipe = ColorMaskPipe;
//# sourceMappingURL=ColorMaskPipe.js.map
