import { makeAutoObservable, runInAction } from 'mobx';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { GameSettings } from '@/src/shared/lib/types/game-settings';

class GameSettingsStore {
  public settings: GameSettings = {
    sexualOrientation: SexualOrientation.Random,
    hillbillyMode: false,
    playersCount: 4,
    difficulty: 4,
    balance: 4,
    shelters: [],
    apocalypses: [],
    cardsKit: [],
    characteristicBalance: 2,
  };
  public settingsLimits = {
    difficulty: {
      max: 8,
      min: 1,
    },
    balance: {
      max: 8,
      min: 1,
    },
    playersCount: {
      max: 22,
      min: 4,
    },
    card: {
      maxPrice: 8,
      minPrice: 1,
    },
    characteristicBalance: {
      max: 4,
      min: 1,
    },
    playerCardsCount: 10,
    playerPrice: {
      max: 80,
      min: 10,
    },
  };

  public setSettings(callBack: (settings: GameSettings) => any) {
    runInAction(() => callBack(this.settings));
  }

  public _writeOptions() {
    return JSON.stringify(this.settings);
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const gameSettingsStore = new GameSettingsStore();
