import { playerPropsShortNames } from '@/src/entities/characteristic-card';
import { GameType } from '@/src/shared/lib/types/game';

class CreateGameCodeStore {
  public createGameCode(game: GameType): string {
    return JSON.stringify({
      shelterId: game.shelter.id,
      apocalypseId: game.apocalypse.id,
      endingId: game.ending.id,
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
}

export const createGameCodeStore = new CreateGameCodeStore();