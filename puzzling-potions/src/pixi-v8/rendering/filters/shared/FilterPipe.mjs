import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { UniformGroup } from '../../renderers/shared/shader/UniformGroup.mjs';

class FilterPipe {
  constructor(renderer) {
    this.filterGlobalUniforms = new UniformGroup({
      inputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      inputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      inputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      outputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      backgroundFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      globalFrame: { value: new Float32Array(4), type: "vec4<f32>" }
    });
    this.renderer = renderer;
  }
  push(filterEffect, container, instructionSet) {
    const renderPipes = this.renderer.renderPipes;
    renderPipes.batch.break(instructionSet);
    instructionSet.add({
      type: "filter",
      canBundle: false,
      action: "pushFilter",
      container,
      filterEffect
    });
  }
  pop(_filterEffect, _container, instructionSet) {
    this.renderer.renderPipes.batch.break(instructionSet);
    instructionSet.add({
      type: "filter",
      action: "popFilter",
      canBundle: false
    });
  }
  execute(instruction) {
    if (instruction.action === "pushFilter") {
      this.renderer.filter.push(instruction);
    } else if (instruction.action === "popFilter") {
      this.renderer.filter.pop();
    }
  }
  destroy() {
    this.renderer = null;
    this.filterGlobalUniforms = null;
  }
}
FilterPipe.extension = {
  type: [
    ExtensionType.WebGLPipes,
    ExtensionType.WebGPUPipes,
    ExtensionType.CanvasPipes
  ],
  name: "filter"
};

export { FilterPipe };
//# sourceMappingURL=FilterPipe.mjs.map
