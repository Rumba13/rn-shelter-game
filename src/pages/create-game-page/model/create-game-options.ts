import { makeAutoObservable, runInAction } from 'mobx'
import { GameCreationOptions } from '@/src/shared/lib/types/game-creation-options'
import { SexualOrientation } from '@/src/shared/lib/types/game-creation-option/sexual-orientation'

class CreateGameOptions {
  //@ts-ignore
  public options: GameCreationOptions = {
    sexualOrientation: SexualOrientation.Random,
    hillbillyMode: false,
    playersCount: 4,
    difficulty: 4,
    balance: 4,
    shelters: [],
    apocalypses: [],
    cardsKit: [],
  }

  public setOptions(callBack: (options: GameCreationOptions) => any) {
    runInAction(() => {
      callBack(this.options)
    })
  }

  public _writeOptions() {
    return JSON.stringify(this.options)
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const gameCreationOptionsModel = new CreateGameOptions()
