import { playerBalanceShiftChances } from '@/src/shared/lib/types/player-balance-shift-chances';

export const playerBalanceToBalanceChancesMap: { [key in string]: playerBalanceShiftChances } = {
  1: {
    chanceOfIgnore: 100,
    chanceOfPriceDecrease: 0,
    chanceOfPriceIncrease: 0,
    priceShift: 10,
  },
  2: {
    chanceOfIgnore: 90,
    chanceOfPriceDecrease: 5,
    chanceOfPriceIncrease: 5,
    priceShift: 10,
  },
  3: {
    chanceOfIgnore: 80,
    chanceOfPriceDecrease: 10,
    chanceOfPriceIncrease: 10,
    priceShift: 10,
  },
  4: {
    chanceOfIgnore: 70,
    chanceOfPriceDecrease: 15,
    chanceOfPriceIncrease: 15,
    priceShift: 10,

  },
  5: {
    chanceOfIgnore: 40,
    chanceOfPriceDecrease: 30,
    chanceOfPriceIncrease: 30,
    priceShift: 10,
  },
  6: {
    chanceOfIgnore: 20,
    chanceOfPriceDecrease: 40,
    chanceOfPriceIncrease: 40,
    priceShift: 10,
  },
  7: {
    chanceOfIgnore: 10,
    chanceOfPriceDecrease: 45,
    chanceOfPriceIncrease: 45,
    priceShift: 15,
  },
  8: {
    chanceOfIgnore: 0,
    chanceOfPriceDecrease: 50,
    chanceOfPriceIncrease: 50,
    priceShift: 38,
  },
};
