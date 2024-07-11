import { CardType } from '@/src/shared/lib/types/card-type';
import { PseudoRandomGenerator } from '@/src/shared/lib/pseudo-random-generator';
import { makeAutoObservable } from 'mobx';

export type PriceMap = { [k in CardType]: number };

const cardTypes: CardType[] = [
  'bio',
  'health',
  'hobby',
  'phobia',
  'character',
  'additional-information',
  'knowledge',
  'luggage',
  'action-card',
  'condition-card',
];

export class CreatePriceMap {
  private pseudoRandomGenerator: PseudoRandomGenerator;
  private readonly seed: number;
  private readonly characteristicCount: number = 10;

  constructor(pseudoRandomGenerator: PseudoRandomGenerator, seed: number) {
    makeAutoObservable(this);
    this.pseudoRandomGenerator = pseudoRandomGenerator;
    this.seed = seed;
  }

  private _shuffle(priceMap: PriceMap): void {
    const fromIndex = cardTypes[this.pseudoRandomGenerator.generateInRange(0, cardTypes.length)];
    const toIndex = cardTypes[this.pseudoRandomGenerator.generateInRange(0, cardTypes.length)];

    if (priceMap[fromIndex] === 1 || priceMap[toIndex] === 8) {
      return;
    }

    priceMap[fromIndex]--;
    priceMap[toIndex]++;
  }

  public mockPriceMap(totalPrice: number = 40): PriceMap {
    return {
      'bio': 4,
      'health': 4,
      'hobby': 4,
      'phobia': 4,
      'character': 4,
      'additional-information': 4,
      'knowledge': 4,
      'luggage': 4,
      'action-card': 4,
      'condition-card': 4,
    };
  }

  public createPriceMapShuffle(totalPrice: number, maxShuffleTimes: number = 30): PriceMap {
    const mediumPrice = Math.trunc(totalPrice / this.characteristicCount);
    const rest = totalPrice % this.characteristicCount;

    const priceMap: PriceMap = {
      'bio': mediumPrice,
      'health': mediumPrice,
      'hobby': mediumPrice,
      'phobia': mediumPrice,
      'character': mediumPrice,
      'additional-information': mediumPrice,
      'knowledge': mediumPrice,
      'luggage': mediumPrice,
      'action-card': mediumPrice,
      'condition-card': mediumPrice,
    };


    if (rest !== 0) {
      //spread rest :)

      for (let i = 0; i < rest; i++) {
        const randomPriceMapKey =
          cardTypes[Math.trunc(this.pseudoRandomGenerator.generateInRange(0, cardTypes.length))];

        if (priceMap[randomPriceMapKey] < 8) {
          priceMap[randomPriceMapKey]++;
        } else {
          i--;
        }
      }
    }

    const shuffleTimes: number = Math.trunc(this.pseudoRandomGenerator.generateFrom(this.seed, 1, maxShuffleTimes)); //TODO

    for (let i = 0; i < shuffleTimes; i++) {
      this._shuffle(priceMap);
    }

    return priceMap;
  }
}
