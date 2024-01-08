'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MeshGeometry = require('../rendering/mesh/shared/MeshGeometry.js');

const _PlaneGeometry = class extends MeshGeometry.MeshGeometry {
  /**
   * @param options - Options to be applied to plane geometry
   * @param options.width - Width of plane
   * @param options.height - Height of plane
   * @param options.verticesX - Number of vertices on x-axis
   * @param options.verticesY - Number of vertices on y-axis
   */
  constructor(options = {}) {
    super({});
    this.build(options);
  }
  /**
   * Refreshes plane coordinates
   * @param options
   */
  build(options) {
    options = { ..._PlaneGeometry.defaultOptions, ...options };
    this.verticesX = this.verticesX ?? options.verticesX;
    this.verticesY = this.verticesY ?? options.verticesY;
    this.width = this.width ?? options.width;
    this.height = this.height ?? options.height;
    const total = this.verticesX * this.verticesY;
    const verts = [];
    const uvs = [];
    const indices = [];
    const verticesX = this.verticesX - 1;
    const verticesY = this.verticesY - 1;
    const sizeX = this.width / verticesX;
    const sizeY = this.height / verticesY;
    for (let i = 0; i < total; i++) {
      const x = i % this.verticesX;
      const y = i / this.verticesX | 0;
      verts.push(x * sizeX, y * sizeY);
      uvs.push(x / verticesX, y / verticesY);
    }
    const totalSub = verticesX * verticesY;
    for (let i = 0; i < totalSub; i++) {
      const xpos = i % verticesX;
      const ypos = i / verticesX | 0;
      const value = ypos * this.verticesX + xpos;
      const value2 = ypos * this.verticesX + xpos + 1;
      const value3 = (ypos + 1) * this.verticesX + xpos;
      const value4 = (ypos + 1) * this.verticesX + xpos + 1;
      indices.push(
        value,
        value2,
        value3,
        value2,
        value4,
        value3
      );
    }
    this.buffers[0].data = new Float32Array(verts);
    this.buffers[1].data = new Float32Array(uvs);
    this.indexBuffer.data = new Uint32Array(indices);
    this.buffers[0].update();
    this.buffers[1].update();
    this.indexBuffer.update();
  }
};
let PlaneGeometry = _PlaneGeometry;
PlaneGeometry.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};

exports.PlaneGeometry = PlaneGeometry;
//# sourceMappingURL=PlaneGeometry.js.map
