export class CreateSeedStore {
  private readonly _seedMax = 20000;
  private readonly _seedMin = 1;
  private _seed: number | undefined;

  public get seed(): number {
    if (this._seed === undefined) {
      this._seed = this._createSeed();
    }
    return this._seed;
  }

  public dangerouslyResetSeed() {
    this._seed = this._createSeed();
  }

  private _createSeed() {
    return Math.floor(Math.random() * (this._seedMax - this._seedMin + 1) + this._seedMin);
  }
}

export const createSeedStore = new CreateSeedStore();