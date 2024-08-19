import { makeAutoObservable } from 'mobx';
import { GameType } from '@/src/shared/lib/types/game';

class GameStore {
  private _game?: GameType;

  public set game(game: GameType) {
    this._game = game;
  }

  public get game(): GameType {
    if (!this._game) throw new Error('Game is undefined');
    return this._game;
  }

  public setCurrentPlayerNumber(currentPlayerId: number) {
    this.game.currentPlayerNumber = currentPlayerId;
  }

  public toggleIsPlayerKickedOut(playerId: number) {
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
