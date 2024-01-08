import { Buffer } from '../../renderers/shared/buffer/Buffer.mjs';
import { BufferUsage } from '../../renderers/shared/buffer/const.mjs';
import { Geometry } from '../../renderers/shared/geometry/Geometry.mjs';

const placeHolderBufferData = new Float32Array(1);
const placeHolderIndexData = new Uint32Array(1);
function getBatchedGeometry() {
  const vertexSize = 6;
  const attributeBuffer = new Buffer({
    data: placeHolderBufferData,
    label: "attribute-batch-buffer",
    usage: BufferUsage.VERTEX | BufferUsage.COPY_DST
  });
  const indexBuffer = new Buffer({
    data: placeHolderIndexData,
    label: "index-batch-buffer",
    usage: BufferUsage.INDEX | BufferUsage.COPY_DST
    // | BufferUsage.STATIC,
  });
  const stride = vertexSize * 4;
  const geometry = new Geometry({
    attributes: {
      aPosition: {
        buffer: attributeBuffer,
        shaderLocation: 0,
        format: "float32x2",
        stride,
        offset: 0
      },
      aUV: {
        buffer: attributeBuffer,
        shaderLocation: 1,
        format: "float32x2",
        stride,
        offset: 2 * 4
      },
      aColor: {
        buffer: attributeBuffer,
        shaderLocation: 2,
        format: "unorm8x4",
        stride,
        offset: 4 * 4
      },
      aTextureId: {
        buffer: attributeBuffer,
        shaderLocation: 3,
        format: "float32",
        stride,
        offset: 5 * 4
      }
    },
    indexBuffer
  });
  return geometry;
}

export { getBatchedGeometry };
//# sourceMappingURL=getBatchedGeometry.mjs.map
