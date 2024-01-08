import { UPDATE_PRIORITY } from '../ticker/const.mjs';
import { Ticker } from '../ticker/Ticker.mjs';

class EventsTickerClass {
  constructor() {
    /** The frequency that fake events will be fired. */
    this.interactionFrequency = 10;
    this._deltaTime = 0;
    this._didMove = false;
    this.tickerAdded = false;
    this._pauseUpdate = true;
  }
  /**
   * Initializes the event ticker.
   * @param events - The event system.
   */
  init(events) {
    this.removeTickerListener();
    this.events = events;
    this.interactionFrequency = 10;
    this._deltaTime = 0;
    this._didMove = false;
    this.tickerAdded = false;
    this._pauseUpdate = true;
  }
  /** Whether to pause the update checks or not. */
  get pauseUpdate() {
    return this._pauseUpdate;
  }
  set pauseUpdate(paused) {
    this._pauseUpdate = paused;
  }
  /** Adds the ticker listener. */
  addTickerListener() {
    if (this.tickerAdded || !this.domElement) {
      return;
    }
    Ticker.system.add(this.tickerUpdate, this, UPDATE_PRIORITY.INTERACTION);
    this.tickerAdded = true;
  }
  /** Removes the ticker listener. */
  removeTickerListener() {
    if (!this.tickerAdded) {
      return;
    }
    Ticker.system.remove(this.tickerUpdate, this);
    this.tickerAdded = false;
  }
  /** Sets flag to not fire extra events when the user has already moved there mouse */
  pointerMoved() {
    this._didMove = true;
  }
  /** Updates the state of interactive objects. */
  update() {
    if (!this.domElement || this._pauseUpdate) {
      return;
    }
    if (this._didMove) {
      this._didMove = false;
      return;
    }
    const rootPointerEvent = this.events["rootPointerEvent"];
    if (this.events.supportsTouchEvents && rootPointerEvent.pointerType === "touch") {
      return;
    }
    globalThis.document.dispatchEvent(new PointerEvent("pointermove", {
      clientX: rootPointerEvent.clientX,
      clientY: rootPointerEvent.clientY
    }));
  }
  /**
   * Updates the state of interactive objects if at least {@link interactionFrequency}
   * milliseconds have passed since the last invocation.
   *
   * Invoked by a throttled ticker update from {@link PIXI.Ticker.system}.
   * @param ticker - The throttled ticker.
   */
  tickerUpdate(ticker) {
    this._deltaTime += ticker.deltaTime;
    if (this._deltaTime < this.interactionFrequency) {
      return;
    }
    this._deltaTime = 0;
    this.update();
  }
}
const EventsTicker = new EventsTickerClass();

export { EventsTicker };
//# sourceMappingURL=EventTicker.mjs.map
