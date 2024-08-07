import { makeAutoObservable } from 'mobx';
import { GameType } from '@/src/shared/lib/types/game';

class GameStore {
  private _game: GameType | undefined;

  public set game(game: GameType) {
    this._game = game;
  }

  public get game(): GameType {
    if (!this._game) throw new Error('Game is undefined');
    return this._game;
  }

  public setCurrentPlayerNumber(playerNumber: number) {
    this.game.currentPlayerNumber = playerNumber;
  }

  public togglePlayerKickOut(playerId: number) {
    const game = this.game;

    const playerToToggleKickOut = game.players.find(player => player.number === playerId);

    if (!playerToToggleKickOut) {
      throw new Error('togglePlayerKickOut: Player is undefined');
    }

    playerToToggleKickOut.isKicked = !playerToToggleKickOut.isKicked;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const gameStore = new GameStore();
