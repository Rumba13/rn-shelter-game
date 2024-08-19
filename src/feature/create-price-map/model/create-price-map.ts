import { CardType } from '@/src/shared/lib/types/card-type';
import { PseudoRandomGenerator } from '@/src/shared/lib/pseudo-random-generator';
import { gameSettingsStore } from '@/src/entities/game';
import { PriceMap } from '@/src/shared/lib/types/price-map';

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
  private readonly characteristicCount: number = 10;

  constructor(pseudoRandomGenerator: PseudoRandomGenerator) {
    this.pseudoRandomGenerator = pseudoRandomGenerator;
  }

  private spreadPriceRemainder(priceMap: PriceMap, remainder: number) {//spread rest :)
    for (let i = 0; i < remainder; i++) {
      const randomPriceMapKey =
        cardTypes[Math.trunc(this.pseudoRandomGenerator.generateInRange(0, cardTypes.length))];

      if (priceMap[randomPriceMapKey] < gameSettingsStore.settingsLimits.card.maxPrice) priceMap[randomPriceMapKey]++;
      else i--;
    }
  }

  public createPriceMapShuffle(totalPrice: number, maxShuffleTimes: number = 30): PriceMap {
    const mediumPrice = Math.trunc(totalPrice / this.characteristicCount);
    const priceRemainder = totalPrice % this.characteristicCount;

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

    if (priceRemainder !== 0) this.spreadPriceRemainder(priceMap, priceRemainder);

    const shuffleTimes: number = Math.trunc(this.pseudoRandomGenerator.generateInRangeFromSeed(1, maxShuffleTimes)); //TODO

    for (let i = 0; i < shuffleTimes; i++) this._shuffle(priceMap);

    return priceMap;
  }

  private _shuffle(priceMap: PriceMap): void {
    const fromIndex = cardTypes[this.pseudoRandomGenerator.generateInRange(0, cardTypes.length)];
    const toIndex = cardTypes[this.pseudoRandomGenerator.generateInRange(0, cardTypes.length)];

    if (
      priceMap[fromIndex] === gameSettingsStore.settingsLimits.card.minPrice ||
      priceMap[toIndex] === gameSettingsStore.settingsLimits.card.maxPrice
    ) {
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

}
