import { sheltersStore } from '@/src/entities/shelter/model/shelters-store';
import { GameConnectionData } from '@/src/shared/lib/types/game-connection-data';
import { GameType } from '@/src/shared/lib/types/game';
import { Player } from '@/src/shared/lib/types/player';
import { playerPropsShortNames } from '@/src/entities/characteristic-card/model/player-props-short-names';
import { cardsStore } from '@/src/entities/characteristic-card/model/cards-store';
import { gameStore } from '@/src/entities/game';
import { endings } from '@/src/entities/ending';
import { apocalypsesStore } from '@/src/entities/apocalypse/model/apocalypses-store';
import { professionsStore } from '@/src/entities/profession/model/professions';

class ConnectToGame {
  public connectToGame(gameCode: string, navigation: any) {
    const gameLoadingData: GameConnectionData = JSON.parse(gameCode);
    const shelter = sheltersStore.getShelterById(gameLoadingData.shelterId);
    const apocalypse = apocalypsesStore.getApocalypseById(gameLoadingData.apocalypseId);
    const ending = endings.find(ending => ending.id === gameLoadingData.endingId);

    if (!apocalypse || !shelter || !ending) throw new Error('Apocalypse or shelter or ending is undefined');

    const players: Player[] = <Player[]>gameLoadingData.players.map(playerData => {
      return {
        number: playerData[playerPropsShortNames['number']],
        bioCharacteristics: cardsStore.getCardById(playerData[playerPropsShortNames.bio]),
        character: cardsStore.getCardById(playerData[playerPropsShortNames.character]),
        health: cardsStore.getCardById(playerData[playerPropsShortNames.health]),
        phobia: cardsStore.getCardById(playerData[playerPropsShortNames.phobia]),
        actionCard: cardsStore.getCardById(playerData[playerPropsShortNames['action-card']]),
        conditionCard: cardsStore.getCardById(playerData[playerPropsShortNames['condition-card']]),
        additionalInformation: cardsStore.getCardById(playerData[playerPropsShortNames['additional-information']]),
        luggage: cardsStore.getCardById(playerData[playerPropsShortNames.luggage]),
        knowledge: cardsStore.getCardById(playerData[playerPropsShortNames.knowledge]),
        hobby: cardsStore.getCardById(playerData[playerPropsShortNames.hobby]),
        notes: '',
        isKicked: false,
        profession: professionsStore.getProfessionById(playerData[playerPropsShortNames.profession]),
      };
    });

    gameStore.game = {
      shelter,
      apocalypse,
      players: players,
      ending: ending,
      currentPlayerNumber: -1,
    };
    navigation.navigate('select-player-page');
  }
}

export const connectToGameStore = new ConnectToGame();
