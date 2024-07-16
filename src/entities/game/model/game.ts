import { makeAutoObservable } from 'mobx';
import { GameType } from '@/src/shared/lib/types/game';
import { playerPropsShortNames } from '@/src/entities/characteristic-card/model/player-props-short-names';

class GameStore {
  public game: GameType | undefined = undefined;
  public gameCode: string | undefined;

  public setGame(game: GameType) {
    this.game = game;
  }

  public setGameCode(gameCode: string) {
    this.gameCode = gameCode;
  }

  public setCurrentPlayerNumber(playerNumber: number) {
    this.getGame().currentPlayerNumber = playerNumber;
  }

  public getGame() {
    if (this.game === undefined) throw new Error('Game is undefined');
    return this.game;
  }

  public togglePlayerKickOut(playerId: number) {
    const game = this.getGame();

    const playerToToggleKickOut = game.players.find(player => player.number === playerId);

    if (playerToToggleKickOut === undefined) {
      throw new Error('togglePlayerKickOut: Player is undefined');
    }

    playerToToggleKickOut.isKicked = !playerToToggleKickOut.isKicked;
  }

  public createGameCode(): string {
    //TODO move to features
    const game = this.getGame();

    return JSON.stringify({
      shelterId: game.shelter.id,
      apocalypseId: game.apocalypse.id,
      endingId: 1,
      players: game.players.map(player => ({
        [playerPropsShortNames.number]: player.number,
        [playerPropsShortNames.profession]: player.profession.id,
        [playerPropsShortNames.bio]: player.bioCharacteristics.id,
        [playerPropsShortNames.health]: player.health.id,
        [playerPropsShortNames.character]: player.character.id,
        [playerPropsShortNames.hobby]: player.hobby.id,
        [playerPropsShortNames.phobia]: player.phobia.id,
        [playerPropsShortNames['additional-information']]: player.additionalInformation.id,
        [playerPropsShortNames.knowledge]: player.knowledge.id,
        [playerPropsShortNames.luggage]: player.luggage.id,
        [playerPropsShortNames['condition-card']]: player.conditionCard.id,
        [playerPropsShortNames['action-card']]: player.actionCard.id,
      })),
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const gameStore = new GameStore();
