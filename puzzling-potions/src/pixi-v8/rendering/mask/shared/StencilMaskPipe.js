'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Extensions = require('../../../extensions/Extensions.js');
var _const = require('../../renderers/shared/state/const.js');
var buildInstructions = require('../../scene/utils/buildInstructions.js');

class StencilMaskPipe {
  constructor(renderer) {
    // used when building and also when executing..
    this.maskStackHash = {};
    this.maskHash = /* @__PURE__ */ new WeakMap();
    this.renderer = renderer;
  }
  push(mask, _container, instructionSet) {
    const renderer = this.renderer;
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      type: "stencilMask",
      action: "pushMaskBegin",
      mask,
      canBundle: false
    });
    const maskContainer = mask.mask;
    maskContainer.includeInBuild = true;
    if (!this.maskHash.has(mask)) {
      this.maskHash.set(mask, {
        instructionsStart: 0,
        instructionsLength: 0
      });
    }
    const maskData = this.maskHash.get(mask);
    maskData.instructionsStart = instructionSet.instructionSize;
    buildInstructions.collectAllRenderables(
      maskContainer,
      instructionSet,
      renderer.renderPipes
    );
    maskContainer.includeInBuild = false;
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      type: "stencilMask",
      action: "pushMaskEnd",
      mask,
      canBundle: false
    });
    const instructionsLength = instructionSet.instructionSize - maskData.instructionsStart - 1;
    maskData.instructionsLength = instructionsLength;
    if (this.maskStackHash[_container.uid] === void 0) {
      this.maskStackHash[_container.uid] = 0;
    }
    this.maskStackHash[_container.uid]++;
  }
  pop(mask, _container, instructionSet) {
    const renderer = this.renderer;
    this.maskStackHash[_container.uid]--;
    renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      type: "stencilMask",
      action: "popMaskBegin",
      canBundle: false
    });
    const maskData = this.maskHash.get(mask);
    if (this.maskStackHash[_container.uid]) {
      for (let i = 0; i < maskData.instructionsLength; i++) {
        instructionSet.instructions[instructionSet.instructionSize++] = instructionSet.instructions[maskData.instructionsStart++];
      }
    }
    instructionSet.add({
      type: "stencilMask",
      action: "popMaskEnd",
      canBundle: false
    });
  }
  execute(instruction) {
    const renderer = this.renderer;
    const currentRenderTargetUid = renderer.renderTarget.renderTarget.uid;
    let maskStackIndex = this.maskStackHash[currentRenderTargetUid] ?? 0;
    if (instruction.action === "pushMaskBegin") {
      maskStackIndex++;
      renderer.stencil.setStencilMode(_const.STENCIL_MODES.RENDERING_MASK_ADD, maskStackIndex);
      renderer.colorMask.setMask(0);
    } else if (instruction.action === "pushMaskEnd") {
      renderer.stencil.setStencilMode(_const.STENCIL_MODES.MASK_ACTIVE, maskStackIndex);
      renderer.colorMask.setMask(15);
    } else if (instruction.action === "popMaskBegin") {
      maskStackIndex--;
      if (maskStackIndex !== 0) {
        renderer.stencil.setStencilMode(_const.STENCIL_MODES.RENDERING_MASK_REMOVE, maskStackIndex);
        renderer.colorMask.setMask(0);
      }
    } else if (instruction.action === "popMaskEnd") {
      if (maskStackIndex === 0) {
        renderer.stencil.setStencilMode(_const.STENCIL_MODES.DISABLED, maskStackIndex);
      } else {
        renderer.stencil.setStencilMode(_const.STENCIL_MODES.MASK_ACTIVE, maskStackIndex);
      }
      renderer.colorMask.setMask(15);
    }
    this.maskStackHash[currentRenderTargetUid] = maskStackIndex;
  }
  destroy() {
    this.renderer = null;
    this.maskStackHash = null;
    this.maskHash = null;
  }
}
StencilMaskPipe.extension = {
  type: [
    Extensions.ExtensionType.WebGLPipes,
    Extensions.ExtensionType.WebGPUPipes,
    Extensions.ExtensionType.CanvasPipes
  ],
  name: "stencilMask"
};

exports.StencilMaskPipe = StencilMaskPipe;
//# sourceMappingURL=StencilMaskPipe.js.map
