import { shelters } from '@/src/entities/shelter/model/shelters';
import { GameConnectionData } from '@/src/shared/lib/types/game-connection-data';
import { apocalypses } from '@/src/entities/apocalypse';
import { GameType } from '@/src/shared/lib/types/game';
import { Player } from '@/src/shared/lib/types/player';
import {
  characteristicCardsShortNames,
} from '@/src/entities/characteristic-card/model/characteristic-cards-short-names';
import { sortedCardsStore } from '@/src/entities/characteristic-card/model/sorted-cards';
import {
  characteristicCards,
} from '@/src/entities/characteristic-card/model/characteristic-card';
import { gameStore } from '@/src/entities/game';

class ConnectToGameStore {
  constructor() {
  }

  public connectToGame(gameCode: string, navigation: any) {
    const gameLoadingData: GameConnectionData = JSON.parse(gameCode);
    const shelter = shelters.find(shelter => shelter.id === gameLoadingData.shelterId);
    const apocalypse = apocalypses.find(apocalypse => apocalypse.id === gameLoadingData.apocalypseId);

    if (!apocalypse || !shelter) throw new Error('Apocalypse or shelter is undefined');


    const players: Player[] = <Player[]>gameLoadingData.players.map(player => {

      return {
        bioCharacteristics: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.bio]),
        character: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.character]),
        health: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.health]),
        phobia: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.phobia]),
        actionCard: characteristicCards.find(card => card.id === player[characteristicCardsShortNames['action-card']]),
        conditionCard: characteristicCards.find(card => card.id === player[characteristicCardsShortNames['condition-card']]),
        additionalInformation: characteristicCards.find(card => card.id === player[characteristicCardsShortNames['additional-information']]),
        luggage: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.luggage]),
        knowledge: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.knowledge]),
        hobby: characteristicCards.find(card => card.id === player[characteristicCardsShortNames.hobby]),
        notes: '',
        isKicked: false,
        profession: player.profession,
      };
    });
    console.log(players);

    const game: GameType = {
      shelter,
      apocalypse,
      players: players,
      ending: '',
    };
    gameStore.setGame(game);
    navigation.navigate('dev-page');
  }
}

export const connectToGameStore = new ConnectToGameStore();
