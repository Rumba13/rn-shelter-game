import { makeAutoObservable } from 'mobx';

export class PseudoRandomGenerator {
  private _previousValue: number;

  constructor(seed: number) {
    makeAutoObservable(this);
    this._previousValue = seed;
  }

  public setSeed(seed: number) {
    this._previousValue = seed;
  }

  public generateInRange(min: number, max: number) {
    const next = (this._previousValue * 16807) % 2147483647;
    this._previousValue = next;
    return next % max;
  }

  public generateFrom(seed: number, min: number, max: number) {
    return ((seed * 16807) % 2147483647) % max;
  }
}
