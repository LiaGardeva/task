'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _const = require('../../texture/const.js');

const infoMap = {
  uint8x2: { type: _const.GL_TYPES.UNSIGNED_BYTE, size: 2, normalised: false },
  uint8x4: { type: _const.GL_TYPES.UNSIGNED_BYTE, size: 4, normalised: false },
  sint8x2: { type: _const.GL_TYPES.BYTE, size: 2, normalised: false },
  sint8x4: { type: _const.GL_TYPES.BYTE, size: 4, normalised: false },
  unorm8x2: { type: _const.GL_TYPES.UNSIGNED_BYTE, size: 2, normalised: true },
  unorm8x4: { type: _const.GL_TYPES.UNSIGNED_BYTE, size: 4, normalised: true },
  snorm8x2: { type: _const.GL_TYPES.BYTE, size: 2, normalised: true },
  snorm8x4: { type: _const.GL_TYPES.BYTE, size: 4, normalised: true },
  uint16x2: { type: _const.GL_TYPES.UNSIGNED_SHORT, size: 2, normalised: false },
  uint16x4: { type: _const.GL_TYPES.UNSIGNED_SHORT, size: 4, normalised: false },
  sint16x2: { type: _const.GL_TYPES.SHORT, size: 2, normalised: false },
  sint16x4: { type: _const.GL_TYPES.SHORT, size: 4, normalised: false },
  unorm16x2: { type: _const.GL_TYPES.UNSIGNED_SHORT, size: 2, normalised: true },
  unorm16x4: { type: _const.GL_TYPES.UNSIGNED_SHORT, size: 4, normalised: true },
  snorm16x2: { type: _const.GL_TYPES.SHORT, size: 2, normalised: true },
  snorm16x4: { type: _const.GL_TYPES.SHORT, size: 4, normalised: true },
  float16x2: { type: _const.GL_TYPES.HALF_FLOAT, size: 2, normalised: false },
  float16x4: { type: _const.GL_TYPES.HALF_FLOAT, size: 4, normalised: false },
  float32: { type: _const.GL_TYPES.FLOAT, size: 1, normalised: false },
  float32x2: { type: _const.GL_TYPES.FLOAT, size: 2, normalised: false },
  float32x3: { type: _const.GL_TYPES.FLOAT, size: 3, normalised: false },
  float32x4: { type: _const.GL_TYPES.FLOAT, size: 4, normalised: false },
  uint32: { type: _const.GL_TYPES.UNSIGNED_INT, size: 1, normalised: false },
  uint32x2: { type: _const.GL_TYPES.UNSIGNED_INT, size: 2, normalised: false },
  uint32x3: { type: _const.GL_TYPES.UNSIGNED_INT, size: 3, normalised: false },
  uint32x4: { type: _const.GL_TYPES.UNSIGNED_INT, size: 4, normalised: false },
  sint32: { type: _const.GL_TYPES.INT, size: 1, normalised: false },
  sint32x2: { type: _const.GL_TYPES.INT, size: 2, normalised: false },
  sint32x3: { type: _const.GL_TYPES.INT, size: 3, normalised: false },
  sint32x4: { type: _const.GL_TYPES.INT, size: 4, normalised: false }
};
function getGlInfoFromFormat(format) {
  return infoMap[format] ?? infoMap.float32;
}

exports.getGlInfoFromFormat = getGlInfoFromFormat;
//# sourceMappingURL=getGlInfoFromFormat.js.map
