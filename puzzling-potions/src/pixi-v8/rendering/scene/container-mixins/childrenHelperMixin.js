'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var removeItems = require('../../../utils/data/removeItems.js');

const childrenHelperMixin = {
  /**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   * @memberof PIXI.Container#
   */
  removeChildren(beginIndex = 0, endIndex) {
    const end = endIndex ?? this.children.length;
    const range = end - beginIndex;
    const removed = [];
    if (range > 0 && range <= end) {
      for (let i = end - 1; i >= beginIndex; i--) {
        const child = this.children[i];
        if (!child)
          continue;
        if (this.layerGroup) {
          this.layerGroup.removeChild(child);
        }
        removed.push(child);
        child.parent = null;
      }
      removeItems.removeItems(this.children, beginIndex, end);
      for (let i = 0; i < removed.length; ++i) {
        this.emit("childRemoved", removed[i], this, i);
        removed[i].emit("removed", this);
      }
      return removed;
    } else if (range === 0 && this.children.length === 0) {
      return removed;
    }
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  },
  /**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   * @memberof PIXI.Container#
   */
  removeChildAt(index) {
    const child = this.getChildAt(index);
    return this.removeChild(child);
  },
  /**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   * @memberof PIXI.Container#
   */
  getChildAt(index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error(`getChildAt: Index (${index}) does not exist.`);
    }
    return this.children[index];
  },
  /**
   * Changes the position of an existing child in the container container
   * @param child - The child Container instance for which you want to change the index number
   * @param index - The resulting index number for the child container
   * @memberof PIXI.Container#
   */
  setChildIndex(child, index) {
    if (index < 0 || index >= this.children.length) {
      throw new Error(`The index ${index} supplied is out of bounds ${this.children.length}`);
    }
    this.getChildIndex(child);
    this.addChildAt(child, index);
  },
  /**
   * Returns the index position of a child Container instance
   * @param child - The Container instance to identify
   * @returns - The index position of the child container to identify
   * @memberof PIXI.Container#
   */
  getChildIndex(child) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      throw new Error("The supplied Container must be a child of the caller");
    }
    return index;
  },
  /**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
   * @param {PIXI.Container} child - The child to add
   * @param {number} index - The index to place the child in
   * @returns {PIXI.Container} The child that was added.
   * @memberof PIXI.Container#
   */
  addChildAt(child, index) {
    const { children } = this;
    if (index < 0 || index > children.length) {
      throw new Error(`${child}addChildAt: The index ${index} supplied is out of bounds ${children.length}`);
    }
    if (child.parent) {
      const currentIndex = child.parent.children.indexOf(child);
      if (child.parent === this && currentIndex === index) {
        return child;
      }
      if (currentIndex !== -1) {
        child.parent.children.splice(currentIndex, 1);
      }
    }
    if (index === children.length) {
      children.push(child);
    } else {
      children.splice(index, 0, child);
    }
    child.parent = this;
    child.didChange = true;
    child.didViewUpdate = false;
    child.updateFlags = 15;
    if (this.layerGroup) {
      this.layerGroup.addChild(child);
    }
    if (this.sortChildren)
      this.sortDirty = true;
    this.emit("childAdded", child, this, index);
    child.emit("added", this);
    return child;
  },
  /**
   * Swaps the position of 2 Containers within this container.
   * @param child - First container to swap
   * @param child2 - Second container to swap
   */
  swapChildren(child, child2) {
    if (child === child2) {
      return;
    }
    const index1 = this.getChildIndex(child);
    const index2 = this.getChildIndex(child2);
    this.children[index1] = child2;
    this.children[index2] = child;
  },
  /** Remove the DisplayObject from its parent Container. If the DisplayObject has no parent, do nothing. */
  removeFromParent() {
    this.parent?.removeChild(this);
  }
};

exports.childrenHelperMixin = childrenHelperMixin;
//# sourceMappingURL=childrenHelperMixin.js.map
