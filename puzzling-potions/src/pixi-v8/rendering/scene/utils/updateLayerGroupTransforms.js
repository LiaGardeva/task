'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Container = require('../Container.js');
var mixColors = require('./mixColors.js');
var updateLocalTransform = require('./updateLocalTransform.js');

const tempContainer = new Container.Container();
function updateLayerGroupTransforms(layerGroup, updateChildRenderGroups = false) {
  updateLayerTransform(layerGroup);
  const childrenToUpdate = layerGroup.childrenToUpdate;
  const updateTick = layerGroup.updateTick;
  layerGroup.updateTick++;
  for (const j in childrenToUpdate) {
    const childrenAtDepth = childrenToUpdate[j];
    const list = childrenAtDepth.list;
    const index = childrenAtDepth.index;
    for (let i = 0; i < index; i++) {
      updateTransformAndChildren(list[i], updateTick, 0);
    }
    childrenAtDepth.index = 0;
  }
  if (updateChildRenderGroups) {
    for (let i = 0; i < layerGroup.layerGroupChildren.length; i++) {
      updateLayerGroupTransforms(layerGroup.layerGroupChildren[i], updateChildRenderGroups);
    }
  }
}
function updateLayerTransform(layerGroup) {
  if (layerGroup.layerGroupParent) {
    layerGroup.worldTransform.appendFrom(
      layerGroup.root.layerTransform,
      layerGroup.layerGroupParent.worldTransform
    );
    layerGroup.worldColor = mixColors.mixColors(
      layerGroup.root.layerColor,
      layerGroup.layerGroupParent.worldColor
    );
  } else {
    layerGroup.worldTransform.copyFrom(layerGroup.root.layerTransform);
    layerGroup.worldColor = layerGroup.root.localColor;
  }
}
function updateTransformAndChildren(container, updateTick, updateFlags) {
  if (updateTick === container.updateTick)
    return;
  container.updateTick = updateTick;
  container.didChange = false;
  const localTransform = container.localTransform;
  updateLocalTransform.updateLocalTransform(localTransform, container);
  const parent = container.parent;
  if (parent && !parent.isLayerRoot) {
    updateFlags = updateFlags | container.updateFlags;
    container.layerTransform.appendFrom(
      localTransform,
      parent.layerTransform
    );
    if (updateFlags) {
      updateColorBlendVisibility(container, parent, updateFlags);
    }
  } else {
    updateFlags = container.updateFlags;
    container.layerTransform.copyFrom(localTransform);
    if (updateFlags) {
      updateColorBlendVisibility(container, tempContainer, updateFlags);
    }
  }
  if (!container.isLayerRoot) {
    const children = container.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      updateTransformAndChildren(children[i], updateTick, updateFlags);
    }
    const layerGroup = container.layerGroup;
    if (container.view && !layerGroup.structureDidChange) {
      layerGroup.updateRenderable(container);
    }
  }
}
function updateColorBlendVisibility(container, parent, updateFlags) {
  if (updateFlags & Container.UPDATE_COLOR) {
    container.layerColor = mixColors.mixColors(container.localColor, parent.layerColor);
  }
  if (updateFlags & Container.UPDATE_BLEND) {
    container.layerBlendMode = container.localBlendMode === "inherit" ? parent.layerBlendMode : container.localBlendMode;
  }
  if (updateFlags & Container.UPDATE_VISIBLE) {
    container.layerVisibleRenderable = container.localVisibleRenderable & parent.layerVisibleRenderable;
  }
  container.updateFlags = 0;
}

exports.updateLayerGroupTransforms = updateLayerGroupTransforms;
exports.updateLayerTransform = updateLayerTransform;
exports.updateTransformAndChildren = updateTransformAndChildren;
//# sourceMappingURL=updateLayerGroupTransforms.js.map
