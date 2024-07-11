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
import { CreatePriceMap } from '@/src/feature/create-game/model/create-price-map';

class CreateGame {
  private pseudoRandomGenerator: PseudoRandomGenerator;
  private createPriceMap: CreatePriceMap;
  private readonly _seedMax = 20000;
  private readonly _seedMin = 1;
  private readonly seed: number;

  private professions: string[] = professions;

  constructor() {
    this.seed = this.randomInInterval(this._seedMin, this._seedMax);
    this.pseudoRandomGenerator = new PseudoRandomGenerator(this.seed);
    this.createPriceMap = new CreatePriceMap(this.seed);
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

  private createPlayer(price: number): Player {
    const professionIndex = Math.trunc(this.pseudoRandomGenerator.generateInRange(1, this.professions.length));
    const profession = this.professions[professionIndex];
    this.professions.splice(professionIndex, 1);

    const priceMap: { [k in CardType]: number } = this.createPriceMap.createPriceMapShuffle(price);
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
