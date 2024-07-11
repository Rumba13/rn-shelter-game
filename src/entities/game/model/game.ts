import { makeAutoObservable } from 'mobx';
import { GameType } from '@/src/shared/lib/types/game';
import {
  characteristicCardsShortNames,
} from '@/src/entities/characteristic-card/model/characteristic-cards-short-names';

class GameStore {
  public game: GameType | undefined = undefined;
  public gameCode: string | undefined;

  public setGame(game: GameType) {
    this.game = game;
  }

  public setGameCode(gameCode: string) {
    this.gameCode = gameCode;
  }

  public getGame() {
    if (this.game === undefined) throw new Error('Game is undefined');
    return this.game;
  }

  public createGameCode(): string {
    const game = this.getGame();

    return JSON.stringify({
      shelterId: game.shelter.id,
      apocalypseId: game.apocalypse.id,
      endingId: 1,
      players: game.players.map(player => ({
        profession: player.profession,
        [characteristicCardsShortNames.bio]: player.bioCharacteristics.id,
        [characteristicCardsShortNames.health]: player.health.id,
        [characteristicCardsShortNames.character]: player.character.id,
        [characteristicCardsShortNames.hobby]: player.hobby.id,
        [characteristicCardsShortNames.phobia]: player.phobia.id,
        [characteristicCardsShortNames['additional-information']]: player.additionalInformation.id,
        [characteristicCardsShortNames.knowledge]: player.knowledge.id,
        [characteristicCardsShortNames.luggage]: player.luggage.id,
        [characteristicCardsShortNames['condition-card']]: player.conditionCard.id,
        [characteristicCardsShortNames['action-card']]: player.actionCard.id,
      })),
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const gameStore = new GameStore();
