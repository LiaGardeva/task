import { ExtensionType } from '../../../../extensions/Extensions.mjs';
import { State } from '../../shared/state/State.mjs';
import { GpuBlendModesToPixi } from './GpuBlendModesToPixi.mjs';

class GpuStateSystem {
  constructor() {
    this.defaultState = new State();
    this.defaultState.blend = true;
  }
  contextChange(gpu) {
    this.gpu = gpu;
  }
  getColorTargets(state) {
    const blend = GpuBlendModesToPixi[state.blendMode] || GpuBlendModesToPixi.normal;
    return [
      {
        format: "bgra8unorm",
        writeMask: 0,
        blend
      }
    ];
  }
  destroy() {
    this.gpu = null;
  }
}
/** @ignore */
GpuStateSystem.extension = {
  type: [
    ExtensionType.WebGPUSystem
  ],
  name: "state"
};

export { GpuStateSystem };
//# sourceMappingURL=GpuStateSystem.mjs.map
