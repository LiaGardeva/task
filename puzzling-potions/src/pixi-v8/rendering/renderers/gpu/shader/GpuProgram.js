'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var extractStructAndGroups = require('./extractStructAndGroups.js');
var generateGpuLayoutGroups = require('./generateGpuLayoutGroups.js');
var generateLayoutHash = require('./generateLayoutHash.js');

const _GpuProgram = class {
  constructor({ fragment, vertex, compute, layout, gpuLayout }) {
    this._layoutKey = 0;
    this.fragment = fragment;
    this.vertex = vertex;
    this.compute = compute;
    const structsAndGroups = extractStructAndGroups.extractStructAndGroups(this.fragment.source);
    this.structsAndGroups = structsAndGroups;
    this.layout = layout ?? generateLayoutHash.generateLayoutHash(structsAndGroups);
    this.gpuLayout = gpuLayout ?? generateGpuLayoutGroups.generateGpuLayoutGroups(structsAndGroups);
  }
  destroy() {
    this._gpuLayout = null;
    this.gpuLayout = null;
    this.layout = null;
    this.structsAndGroups = null;
    this.fragment = null;
    this.vertex = null;
    this.compute = null;
  }
  static from(options) {
    const key = `${options.vertex.source}:${options.fragment.source}:${options.fragment.entryPoint}:${options.vertex.entryPoint}`;
    if (!_GpuProgram.programCached[key]) {
      _GpuProgram.programCached[key] = new _GpuProgram(options);
    }
    return _GpuProgram.programCached[key];
  }
};
let GpuProgram = _GpuProgram;
GpuProgram.programCached = {};

exports.GpuProgram = GpuProgram;
//# sourceMappingURL=GpuProgram.js.map
