import { ExtensionType } from '../../../extensions/Extensions.mjs';
import { Buffer } from '../shared/buffer/Buffer.mjs';
import { BufferResource } from '../shared/buffer/BufferResource.mjs';
import { BufferUsage } from '../shared/buffer/const.mjs';
import { UniformBufferBatch } from './buffer/UniformBufferBatch.mjs';
import { BindGroup } from './shader/BindGroup.mjs';

const minUniformOffsetAlignment = 128;
class GpuUniformBatchPipe {
  constructor(renderer) {
    this.bindGroupHash = {};
    // number of buffers..
    this.buffers = [];
    this.bindGroups = [];
    this.bufferResources = [];
    this.renderer = renderer;
    this.batchBuffer = new UniformBufferBatch({ minUniformOffsetAlignment });
    const totalBuffers = 256 / minUniformOffsetAlignment;
    for (let i = 0; i < totalBuffers; i++) {
      let usage = BufferUsage.UNIFORM | BufferUsage.COPY_DST;
      if (i === 0)
        usage |= BufferUsage.COPY_SRC;
      this.buffers.push(new Buffer({
        data: this.batchBuffer.data,
        usage
      }));
    }
  }
  renderEnd() {
    this.uploadBindGroups();
    this.resetBindGroups();
  }
  resetBindGroups() {
    for (const i in this.bindGroupHash) {
      this.bindGroupHash[i] = null;
    }
    this.batchBuffer.clear();
  }
  // just works for single bind groups for now
  getUniformBindGroup(group, duplicate) {
    if (!duplicate && this.bindGroupHash[group.uid]) {
      return this.bindGroupHash[group.uid];
    }
    this.renderer.uniformBuffer.ensureUniformGroup(group);
    const data = group.buffer.data;
    const offset = this.batchBuffer.addEmptyGroup(data.length);
    this.renderer.uniformBuffer.syncUniformGroup(group, this.batchBuffer.data, offset / 4);
    this.bindGroupHash[group.uid] = this.getBindGroup(offset / minUniformOffsetAlignment);
    return this.bindGroupHash[group.uid];
  }
  getUniformBufferResource(group) {
    this.renderer.uniformBuffer.updateUniformGroup(group);
    const data = group.buffer.data;
    const offset = this.batchBuffer.addGroup(data);
    return this.getBufferResource(offset / minUniformOffsetAlignment);
  }
  getArrayBindGroup(data) {
    const offset = this.batchBuffer.addGroup(data);
    return this.getBindGroup(offset / minUniformOffsetAlignment);
  }
  getArrayBufferResource(data) {
    const offset = this.batchBuffer.addGroup(data);
    const index = offset / minUniformOffsetAlignment;
    return this.getBufferResource(index);
  }
  getBufferResource(index) {
    if (!this.bufferResources[index]) {
      const buffer = this.buffers[index % 2];
      this.bufferResources[index] = new BufferResource({
        buffer,
        offset: (index / 2 | 0) * 256,
        size: minUniformOffsetAlignment
      });
    }
    return this.bufferResources[index];
  }
  getBindGroup(index) {
    if (!this.bindGroups[index]) {
      const bindGroup = new BindGroup({
        0: this.getBufferResource(index)
      });
      this.bindGroups[index] = bindGroup;
    }
    return this.bindGroups[index];
  }
  uploadBindGroups() {
    const bufferSystem = this.renderer.buffer;
    const firstBuffer = this.buffers[0];
    firstBuffer.update(this.batchBuffer.byteIndex);
    bufferSystem.updateBuffer(firstBuffer);
    const commandEncoder = this.renderer.gpu.device.createCommandEncoder();
    for (let i = 1; i < this.buffers.length; i++) {
      const buffer = this.buffers[i];
      commandEncoder.copyBufferToBuffer(
        bufferSystem.getGPUBuffer(firstBuffer),
        minUniformOffsetAlignment,
        bufferSystem.getGPUBuffer(buffer),
        0,
        this.batchBuffer.byteIndex
      );
    }
    this.renderer.gpu.device.queue.submit([commandEncoder.finish()]);
  }
  destroy() {
    for (let i = 0; i < this.bindGroups.length; i++) {
      this.bindGroups[i].destroy();
    }
    this.bindGroups = null;
    this.bindGroupHash = null;
    for (let i = 0; i < this.buffers.length; i++) {
      this.buffers[i].destroy();
    }
    this.buffers = null;
    for (let i = 0; i < this.bufferResources.length; i++) {
      this.bufferResources[i].destroy();
    }
    this.bufferResources = null;
    this.batchBuffer.destroy();
    this.bindGroupHash = null;
    this.renderer = null;
  }
}
/** @ignore */
GpuUniformBatchPipe.extension = {
  type: [
    ExtensionType.WebGPUPipes
  ],
  name: "uniformBatch"
};

export { GpuUniformBatchPipe };
//# sourceMappingURL=GpuUniformBatchPipe.mjs.map
