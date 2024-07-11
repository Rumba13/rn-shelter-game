import { makeAutoObservable } from 'mobx';
import { GameSettings } from '@/src/shared/lib/types/game-settings';
import { Game } from '@/src/shared/lib/types/game';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { Player } from '@/src/shared/lib/types/player';
import { Card } from '@/src/shared/lib/types/card';
import { professions } from '@/src/entities/profession';
import { CardType } from '@/src/shared/lib/types/card-type';
import { PseudoRandomGenerator } from '@/src/shared/lib/pseudo-random-generator';
import { sortedCardsStore } from '@/src/entities/characteristic-card/model/sorted-cards';
import { gameCreationOptionsModel } from '@/src/entities/game';

class CreateGame {
  private pseudoRandomGenerator: PseudoRandomGenerator;
  private readonly _seedMax = 20000;
  private readonly _seedMin = 1;
  private readonly seed: number;

  private professions: string[] = professions;

  constructor() {
    this.seed = this.randomInInterval(this._seedMin, this._seedMax);
    this.pseudoRandomGenerator = new PseudoRandomGenerator(this.seed);
    makeAutoObservable(this);
  }

  private randomInInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private selectRandomApocalypse(apocalypses: Apocalypse[]): Apocalypse {
    const selectedApocalypseIndex = Math.trunc(
      this.pseudoRandomGenerator.generateFrom(this.seed, 0, apocalypses.length),
    );
    return apocalypses[selectedApocalypseIndex];
  }

  private selectRandomShelter(shelters: Shelter[]): Shelter {
    const selectedShelterIndex = Math.trunc(this.pseudoRandomGenerator.generateFrom(this.seed, 0, shelters.length));
    return shelters[selectedShelterIndex];
  }

  private createSpreadPriceMap(price: number): { [k in CardType]: number } {
    const mediumPrice = Math.trunc(price / 10);
    const rest = price % 10;

    const cardTypeToPriceMap: { [k in CardType]: number } = {
      'health': mediumPrice,
      'character': mediumPrice,
      'bio': mediumPrice,
      'additional-information': mediumPrice,
      'luggage': mediumPrice,
      'knowledge': mediumPrice,
      'hobby': mediumPrice,
      'action-card': mediumPrice,
      'condition-card': mediumPrice,
      'phobia': mediumPrice,
    };
    const indexToCardType: CardType[] = [
      'health',
      'character',
      'bio',
      'additional-information',
      'luggage',
      'knowledge',
      'hobby',
      'action-card',
      'condition-card',
      'phobia',
    ];

    if (rest !== 0) {
      //add rest to random-seeded characteristic

      switch (rest) {
        case 9:
          cardTypeToPriceMap['condition-card'] += 1;
        case 8:
          cardTypeToPriceMap['action-card'] += 1;
        case 7:
          cardTypeToPriceMap.hobby += 1;
        case 6:
          cardTypeToPriceMap.knowledge += 1;
        case 5:
          cardTypeToPriceMap.luggage += 1;
        case 4:
          cardTypeToPriceMap['additional-information'] += 1;
        case 3:
          cardTypeToPriceMap.bio += 1;
        case 2:
          cardTypeToPriceMap.character += 1;
        case 1:
          cardTypeToPriceMap.health += 1;
          break;
      }
    }

    //randomly move

    const moveTimes: number = Math.trunc(this.pseudoRandomGenerator.generateFrom(this.seed, 6, 32)); //TODO
    for (let i = 0; i < moveTimes; i++) {
      const fromIndex = indexToCardType[this.pseudoRandomGenerator.generateInRange(0, indexToCardType.length)];
      const toIndex = indexToCardType[this.pseudoRandomGenerator.generateInRange(0, indexToCardType.length)];

      if (cardTypeToPriceMap[fromIndex] === 1 || cardTypeToPriceMap[toIndex] === 8) {
        continue;
      }

      cardTypeToPriceMap[fromIndex]--;
      cardTypeToPriceMap[toIndex]++;
    }

    return cardTypeToPriceMap;
  }

  private createPlayer(price: number): Player {
    const professionIndex = Math.trunc(this.pseudoRandomGenerator.generateInRange(1, this.professions.length));
    const profession = this.professions[professionIndex];
    this.professions.splice(professionIndex, 1);

    const priceMap: { [k in CardType]: number } = this.createSpreadPriceMap(price);
    sortedCardsStore.setCardsKit(gameCreationOptionsModel.settings.cardsKit);
    const sortedCards = sortedCardsStore.sortedCards;

    const { character, health, luggage, hobby, knowledge, phobia, bio } = sortedCards;
    const player: Player = {
      isKicked: false,
      profession,
      additionalInformation: this.findCardWithPrice(
        sortedCards['additional-information'],
        priceMap['additional-information'],
      ),
      health: this.findCardWithPrice(health, priceMap.health),
      bioCharacteristics: this.findCardWithPrice(bio, priceMap.bio),
      character: this.findCardWithPrice(character, priceMap.character),
      hobby: this.findCardWithPrice(hobby, priceMap.hobby),
      luggage: this.findCardWithPrice(luggage, priceMap.luggage),
      knowledge: this.findCardWithPrice(knowledge, priceMap.knowledge),
      phobia: this.findCardWithPrice(phobia, priceMap.phobia),
      actionCard: this.findCardWithPrice(sortedCards['action-card'], priceMap['action-card']),
      conditionCard: this.findCardWithPrice(sortedCards['condition-card'], priceMap['condition-card']),
      notes: '',
    };

    return player;
  }

  private findCardWithPrice(cards: Card[], price: number): Card {
    const pretendedCards = cards.filter(card => card.price === price);

    if (pretendedCards[0] === undefined) {

      if (price === 1) {
        throw new Error('Cannot find any card');
      }
      console.log('Recursion with price ' + price);

      return this.findCardWithPrice(cards, price - 1);

    }
    return pretendedCards[Math.trunc(this.pseudoRandomGenerator.generateInRange(0, pretendedCards.length))];
  }

  private createPlayers(playersCount: number): Player[] {
    const players: Player[] = [];

    this.pseudoRandomGenerator.setSeed(this.seed);
    this.pseudoRandomGenerator.generateInRange(1, 1000);
    for (let i = 1; i <= playersCount; i++) {
      players.push(this.createPlayer(43));
    }
    this.professions = professions; //TODO refactor

    return players;
  }

  public createGame(gameSettings: GameSettings): Game {
    sortedCardsStore.setCardsKit(gameSettings.cardsKit);
    const apocalypse = this.selectRandomApocalypse(gameSettings.apocalypses);
    const shelter = this.selectRandomShelter(gameSettings.shelters);
    const players: Player[] = this.createPlayers(gameSettings.playersCount);

    return {
      apocalypse,
      shelter,
      players,
      ending: 'Вы проебали!',
    };
  }
}

export const createGame = new CreateGame();
