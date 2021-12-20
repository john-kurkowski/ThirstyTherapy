const { clearTimeout, setTimeout } = window;

/**
 * Like `setTimeout`, with methods to pause and resume.
 *
 * H/T https://stackoverflow.com/q/3969475/62269
 */
export default class PausableTimeout {
  private _start: Date;
  private _remaining: number;
  private _durationTimeoutId?: number;
  private _callback: () => void;
  private _isDone = false;

  constructor(callback: () => void, ms: number) {
    this._callback = () => {
      callback();
      this._isDone = true;
    };
    this._start = new Date();
    this._remaining = ms;
    this.resume();
  }

  pause(): PausableTimeout {
    if (this._durationTimeoutId && !this._isDone) {
      this._clearTimeoutRef();
      this._remaining -= new Date().getTime() - this._start.getTime();
    }
    return this;
  }

  resume(): PausableTimeout {
    if (!this._durationTimeoutId && !this._isDone) {
      this._start = new Date();
      this._durationTimeoutId = setTimeout(this._callback, this._remaining);
    }
    return this;
  }

  clearTimeout(): void {
    this._clearTimeoutRef();
    this._isDone = true;
  }

  private _clearTimeoutRef() {
    if (this._durationTimeoutId) {
      clearTimeout(this._durationTimeoutId);
      this._durationTimeoutId = undefined;
    }
  }
}
