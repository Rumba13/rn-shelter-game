import { gameSettingsStore } from '@/src/entities/game';
import { BalanceChances } from '@/src/shared/lib/types/balance-chances';

export function playersBalanceToBalanceChances(playerBalance: number): BalanceChances {
  const playersBalanceToBalanceChancesMap: { [key in string]: BalanceChances } = {
    '1': {
      chanceOfIgnore: 100,
      chanceOfPriceDecrease: 0,
      chanceOfPriceIncrease: 0,
    },
    '2': {
      chanceOfIgnore: 90,
      chanceOfPriceDecrease: 5,
      chanceOfPriceIncrease: 5,
    },
    '3': {
      chanceOfIgnore: 80,
      chanceOfPriceDecrease: 10,
      chanceOfPriceIncrease: 10,
    },
    '4': {
      chanceOfIgnore: 70,
      chanceOfPriceDecrease: 15,
      chanceOfPriceIncrease: 15,
    },
    '5': {
      chanceOfIgnore: 40,
      chanceOfPriceDecrease: 30,
      chanceOfPriceIncrease: 30,
    },
    '6': {
      chanceOfIgnore: 20,
      chanceOfPriceDecrease: 40,
      chanceOfPriceIncrease: 40,
    },
    '7': {
      chanceOfIgnore: 10,
      chanceOfPriceDecrease: 45,
      chanceOfPriceIncrease: 45,
      priceValueShift: 15,
    },
    '8': {
      chanceOfIgnore: 0,
      chanceOfPriceDecrease: 50,
      chanceOfPriceIncrease: 50,
      priceValueShift: 38,
    },
  };

  if (playerBalance > gameSettingsStore.settingsLimits.balance.max)
    throw new Error(`Players balance more than ${gameSettingsStore.settingsLimits.balance.max}`);

  return playersBalanceToBalanceChancesMap[playerBalance];
}
