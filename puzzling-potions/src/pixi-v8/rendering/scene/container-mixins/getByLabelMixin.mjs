const findMixin = {
  /**
   * Returns the first child in the container with the specified label.
   *
   * Recursive searches are done in a pre-order traversal.
   * @method getChildByName
   * @memberof PIXI.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {PIXI.DisplayObject} The child with the specified label.
   */
  getChildByLabel(label, deep = false) {
    const children = this.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.label === label || label instanceof RegExp && label.test(child.label))
        return child;
    }
    if (deep) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const found = child.getChildByLabel(label, true);
        if (found) {
          return found;
        }
      }
    }
    return null;
  },
  /**
   * Returns all children in the container with the specified label.
   * @method getChildrenByLabel
   * @memberof PIXI.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @param {PIXI.Container[]} [out=[]] - The array to store matching children in.
   * @returns {PIXI.Container[]} An array of children with the specified label.
   */
  getChildrenByLabel(label, deep = false, out = []) {
    const children = this.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.label === label || label instanceof RegExp && label.test(child.label)) {
        out.push(child);
      }
    }
    if (deep) {
      for (let i = 0; i < children.length; i++) {
        children[i].getChildrenByLabel(label, true, out);
      }
    }
    return out;
  }
};

export { findMixin };
//# sourceMappingURL=getByLabelMixin.mjs.map
