import { makeAutoObservable } from 'mobx'
import { GameCreationOptions } from '@/src/shared/lib/types/game-creation-options'
import { GameOptions } from '@/src/shared/lib/types/game-options'

class CreateGame {
  public createGame(options: GameCreationOptions): GameOptions {}

  constructor() {
    makeAutoObservable(this)
  }
}

export const createGame = new CreateGame()
