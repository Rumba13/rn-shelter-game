import { shelters } from '@/src/entities/shelter/model/shelters';
import { GameConnectionData } from '@/src/shared/lib/types/game-connection-data';
import { apocalypses } from '@/src/entities/apocalypse';
import { GameType } from '@/src/shared/lib/types/game';
import { Player } from '@/src/shared/lib/types/player';
import { playerPropsShortNames } from '@/src/entities/characteristic-card/model/player-props-short-names';
import { characteristicCards } from '@/src/entities/characteristic-card/model/characteristic-card';
import { gameStore } from '@/src/entities/game';
import { professions } from '@/src/entities/profession';
import { endings } from '@/src/entities/ending';

class ConnectToGameStore {
  constructor() {}

  public connectToGame(gameCode: string, navigation: any) {
    const gameLoadingData: GameConnectionData = JSON.parse(gameCode);
    const shelter = shelters.find(shelter => shelter.id === gameLoadingData.shelterId);
    const apocalypse = apocalypses.find(apocalypse => apocalypse.id === gameLoadingData.apocalypseId);
    const ending = endings.find(ending => ending.id === gameLoadingData.endingId);

    if (!apocalypse || !shelter || !ending) throw new Error('Apocalypse or shelter or ending is undefined');

    const players: Player[] = <Player[]>gameLoadingData.players.map(player => {
      return {
        number: player[playerPropsShortNames['number']],
        bioCharacteristics: characteristicCards.bio.find(card => card.id === player[playerPropsShortNames.bio]),
        character: characteristicCards.character.find(card => card.id === player[playerPropsShortNames.character]),
        health: characteristicCards.health.find(card => card.id === player[playerPropsShortNames.health]),
        phobia: characteristicCards.phobia.find(card => card.id === player[playerPropsShortNames.phobia]),
        actionCard: characteristicCards['action-card'].find(
          card => card.id === player[playerPropsShortNames['action-card']],
        ),
        conditionCard: characteristicCards['condition-card'].find(
          card => card.id === player[playerPropsShortNames['condition-card']],
        ),
        additionalInformation: characteristicCards['additional-information'].find(
          card => card.id === player[playerPropsShortNames['additional-information']],
        ),
        luggage: characteristicCards.luggage.find(card => card.id === player[playerPropsShortNames.luggage]),
        knowledge: characteristicCards.knowledge.find(card => card.id === player[playerPropsShortNames.knowledge]),
        hobby: characteristicCards.hobby.find(card => card.id === player[playerPropsShortNames.hobby]),
        notes: '',
        isKicked: false,
        profession: professions.find(profession => profession.id === player[playerPropsShortNames.profession]),
      };
    });

    const game: GameType = {
      shelter,
      apocalypse,
      players: players,
      ending: ending,
      currentPlayerNumber: -1,
    };
    gameStore.setGame(game);
    navigation.navigate('select-player-page');
  }
}

export const connectToGameStore = new ConnectToGameStore();
