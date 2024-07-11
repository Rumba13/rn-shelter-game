import { makeAutoObservable, runInAction } from 'mobx';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { GameSettings } from '@/src/shared/lib/types/game-settings';

class GameSettingsStore {
  //@ts-ignore
  public settings: GameSettings = {
    sexualOrientation: SexualOrientation.Random,
    hillbillyMode: false,
    playersCount: 4,
    difficulty: 4,
    balance: 4,
    shelters: [],
    apocalypses: [],
    cardsKit: [],
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

export const gameCreationOptionsModel = new GameSettingsStore();
