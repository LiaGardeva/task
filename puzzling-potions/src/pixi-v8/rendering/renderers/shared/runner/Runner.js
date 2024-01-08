'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Runner {
  /**
   * @param name - The function name that will be executed on the listeners added to this Runner.
   */
  constructor(name) {
    this.items = [];
    this._name = name;
    this._aliasCount = 0;
  }
  /* eslint-disable jsdoc/require-param, jsdoc/check-param-names */
  /**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   */
  /*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */
  emit(a0, a1, a2, a3, a4, a5, a6, a7) {
    const { name, items } = this;
    this._aliasCount++;
    for (let i = 0, len = items.length; i < len; i++) {
      items[i][name](a0, a1, a2, a3, a4, a5, a6, a7);
    }
    if (items === this.items) {
      this._aliasCount--;
    }
    return this;
  }
  ensureNonAliasedItems() {
    if (this._aliasCount > 0 && this.items.length > 1) {
      this._aliasCount = 0;
      this.items = this.items.slice(0);
    }
  }
  /**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * Eg A listener passed to this Runner will require a 'complete' function.
   *
   * ```
   * import { Runner } from '@pixi/runner';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */
  add(item) {
    if (item[this._name]) {
      this.ensureNonAliasedItems();
      this.remove(item);
      this.items.push(item);
    }
    return this;
  }
  /**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */
  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.ensureNonAliasedItems();
      this.items.splice(index, 1);
    }
    return this;
  }
  /**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */
  contains(item) {
    return this.items.indexOf(item) !== -1;
  }
  /** Remove all listeners from the Runner */
  removeAll() {
    this.ensureNonAliasedItems();
    this.items.length = 0;
    return this;
  }
  /** Remove all references, don't use after this. */
  destroy() {
    this.removeAll();
    this.items = null;
    this._name = null;
  }
  /**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */
  get empty() {
    return this.items.length === 0;
  }
  /**
   * The name of the runner.
   * @readonly
   */
  get name() {
    return this._name;
  }
}
Object.defineProperties(Runner.prototype, {
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */
  dispatch: { value: Runner.prototype.emit },
  /**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */
  run: { value: Runner.prototype.emit }
});

exports.Runner = Runner;
//# sourceMappingURL=Runner.js.map
