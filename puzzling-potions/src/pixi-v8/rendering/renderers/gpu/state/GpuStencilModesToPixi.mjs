import { STENCIL_MODES } from '../../shared/state/const.mjs';

const GpuStencilModesToPixi = [];
GpuStencilModesToPixi[STENCIL_MODES.NONE] = void 0;
GpuStencilModesToPixi[STENCIL_MODES.DISABLED] = {
  format: "stencil8",
  depthCompare: "always",
  depthWriteEnabled: false,
  stencilWriteMask: 0,
  stencilReadMask: 0,
  stencilBack: {
    compare: "always",
    passOp: "keep"
  }
};
GpuStencilModesToPixi[STENCIL_MODES.RENDERING_MASK_ADD] = {
  format: "stencil8",
  depthCompare: "always",
  depthWriteEnabled: false,
  stencilBack: {
    compare: "always",
    passOp: "increment-clamp"
  }
};
GpuStencilModesToPixi[STENCIL_MODES.RENDERING_MASK_ADD] = {
  format: "stencil8",
  depthCompare: "always",
  depthWriteEnabled: false,
  stencilBack: {
    compare: "always",
    passOp: "increment-clamp"
  }
};
GpuStencilModesToPixi[STENCIL_MODES.RENDERING_MASK_REMOVE] = {
  format: "stencil8",
  depthCompare: "always",
  depthWriteEnabled: false,
  stencilBack: {
    compare: "always",
    passOp: "decrement-clamp"
  }
};
GpuStencilModesToPixi[STENCIL_MODES.MASK_ACTIVE] = {
  format: "stencil8",
  depthCompare: "always",
  depthWriteEnabled: false,
  stencilWriteMask: 0,
  stencilBack: {
    compare: "equal",
    passOp: "keep"
  }
};

export { GpuStencilModesToPixi };
//# sourceMappingURL=GpuStencilModesToPixi.mjs.map
