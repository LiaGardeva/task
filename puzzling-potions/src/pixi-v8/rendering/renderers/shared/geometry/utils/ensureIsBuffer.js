'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Buffer = require('../../buffer/Buffer.js');
var _const = require('../../buffer/const.js');

function ensureIsBuffer(buffer, index) {
  if (!(buffer instanceof Buffer.Buffer)) {
    let usage = index ? _const.BufferUsage.INDEX : _const.BufferUsage.VERTEX;
    if (buffer instanceof Array) {
      if (index) {
        buffer = new Uint32Array(buffer);
        usage = _const.BufferUsage.INDEX | _const.BufferUsage.COPY_DST;
      } else {
        buffer = new Float32Array(buffer);
        usage = _const.BufferUsage.VERTEX | _const.BufferUsage.COPY_DST;
      }
    }
    buffer = new Buffer.Buffer({
      data: buffer,
      label: "index-mesh-buffer",
      usage
    });
  }
  return buffer;
}

exports.ensureIsBuffer = ensureIsBuffer;
//# sourceMappingURL=ensureIsBuffer.js.map
