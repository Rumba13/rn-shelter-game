import { gameSettingsStore } from '@/src/entities/game';

export function difficultyToTotalPrice(difficulty: number): number {
  const difficultyToTotalPriceMap = {
    '1': 75,
    '2': 70,
    '3': 65,
    '4': 45,
    '5': 35,
    '6': 30,
    '7': 25,
    '8': 15,
  };

  if (difficulty > gameSettingsStore.settingsLimits.difficulty.max) throw new Error('Difficulty is more than 8');
//@ts-ignore
  return difficultyToTotalPriceMap[difficulty];
}