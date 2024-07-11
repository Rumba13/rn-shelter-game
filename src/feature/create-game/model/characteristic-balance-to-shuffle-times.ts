import { gameSettingsStore } from '@/src/entities/game';

export function characteristicBalanceToShuffleTimes(balance: number): number {
  const balanceToShuffleTimesMap = {
    '1': 0,
    '2': 20,
    '3': 40,
    '4': 80,
  };

  if (balance > gameSettingsStore.settingsLimits.characteristicBalance.max) throw new Error(`Characteristic balance is more than ${gameSettingsStore.settingsLimits.characteristicBalance.max}`);

  //@ts-ignore
  return balanceToShuffleTimesMap[balance.toString()];
}