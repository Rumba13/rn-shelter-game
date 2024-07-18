import { GameSettings } from '@/src/shared/lib/types/game-settings';
import { GameType } from '@/src/shared/lib/types/game';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { Player } from '@/src/shared/lib/types/player';
import { Card } from '@/src/shared/lib/types/card';
import { professions } from '@/src/entities/profession';
import { CardType } from '@/src/shared/lib/types/card-type';
import { PseudoRandomGenerator } from '@/src/shared/lib/pseudo-random-generator';
import { CreatePriceMap } from '@/src/feature/create-game/model/create-price-map';
import { difficultyToTotalPrice } from '@/src/feature/create-game/model/difficulty-to-total-price';
import { gameSettingsStore } from '@/src/entities/game';
import {
  characteristicBalanceToShuffleTimes,
} from '@/src/feature/create-game/model/characteristic-balance-to-shuffle-times';
import { BalanceChances } from '@/src/shared/lib/types/balance-chances';
import { playersBalanceToBalanceChances } from '@/src/feature/create-game/model/players-balance-to-balance-chances';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { genders } from '@/src/entities/gender/model/genders';
import { Profession } from '@/src/shared/lib/types/profession';
import { characteristicCards } from '@/src/entities/characteristic-card/model/characteristic-card';
import { Ending } from '@/src/shared/lib/types/ending';
import { endings } from '@/src/entities/ending';
import { createSeedStore } from '@/src/feature/create-seed/model/create-seed';

class CreateGameStore {
  private readonly pseudoRandomGenerator: PseudoRandomGenerator;
  private createPriceMap: CreatePriceMap;
  private usedProfessions: Profession[] = professions.slice();


  private selectRandomApocalypse(apocalypses: Apocalypse[]): Apocalypse {
    return apocalypses[Math.trunc(this.pseudoRandomGenerator.generateFrom(createSeedStore.seed, 0, apocalypses.length))];
  }

  private selectRandomShelter(shelters: Shelter[]): Shelter {
    return shelters[Math.trunc(this.pseudoRandomGenerator.generateFrom(createSeedStore.seed, 0, shelters.length))];
  }

  private selectRandomProfession(): Profession {
    const professionIndex = Math.trunc(this.pseudoRandomGenerator.generateInRange(1, this.usedProfessions.length));
    const profession = this.usedProfessions[professionIndex];
    this.usedProfessions.splice(professionIndex, 1);
    return profession;
  }

  constructor() {
    this.pseudoRandomGenerator = new PseudoRandomGenerator(createSeedStore.seed);
    this.createPriceMap = new CreatePriceMap(this.pseudoRandomGenerator, createSeedStore.seed);
  }

  private changeBioCharacteristicGender(bioCharacteristicCard: Card, sexualOrientationOption: SexualOrientation): Card {
    if (sexualOrientationOption === SexualOrientation.Random) {
      return bioCharacteristicCard;
    }

    type BioCharacteristics = {
      sex: string;
      age: string;
      gender: string;
    };

    const bioCharacteristics: BioCharacteristics | undefined = <BioCharacteristics>(
      bioCharacteristicCard.name.match(/(?<sex>^.+?)\/ (?<age>.+?)\/ (?<gender>.+?$)/)?.groups
    );

    if (!bioCharacteristics) throw new Error('Cannot parse bio characteristic');

    if (sexualOrientationOption === SexualOrientation.AllGays) {
      //:)
      const gayGenders = genders.filter(gender => gender !== 'straight' && gender !== 'pregnancy');
      const selectedGayGender =
        gayGenders[Math.trunc(this.pseudoRandomGenerator.generateInRange(0, gayGenders.length))];

      switch (selectedGayGender) {
        case 'homosexual':
          bioCharacteristics.gender = bioCharacteristics.sex.includes('Муж') ? 'гомосексуальный' : 'гомосексуальная';
          break;
        case 'pansexual':
          bioCharacteristics.gender = bioCharacteristics.sex.includes('Муж') ? 'пансексуальный' : 'пансексуальная';
          break;

        case 'bisexual':
          bioCharacteristics.gender = bioCharacteristics.sex.includes('Муж') ? 'бисексуальный' : 'бисексуальная';
          break;

        case 'asexual':
          bioCharacteristics.gender = bioCharacteristics.sex.includes('Муж') ? 'асексуальный' : 'асексуальная';
          break;
      }
    } else if (sexualOrientationOption === SexualOrientation.AllStraight) {
      if (!(bioCharacteristics.gender.includes('гетеро') && bioCharacteristics.gender.includes('Береме'))) {
        bioCharacteristics.gender = bioCharacteristics.sex.includes('Муж') ? 'Гетеросексуальный' : 'Гетеросексуальная';
      }
    } else if (sexualOrientationOption === SexualOrientation.Disable) {
      bioCharacteristics.gender = '';
    }

    return {
      ...bioCharacteristicCard,
      name: `${bioCharacteristics.sex} ${bioCharacteristics.age} ${bioCharacteristics.gender}`,
    };
  }

  private createPlayer(
    price: number,
    characteristicBalance: number,
    sexualOrientation: SexualOrientation,
    playerNumber: number,
  ): Player {
    const priceMap: { [k in CardType]: number } = this.createPriceMap.createPriceMapShuffle(
      price,
      characteristicBalanceToShuffleTimes(characteristicBalance),
    );

    const { character, health, luggage, hobby, knowledge, phobia, bio } = characteristicCards;

    return {
      number: playerNumber,
      isKicked: false,
      profession: this.selectRandomProfession(),
      additionalInformation: this.findCardWithPrice(
        characteristicCards['additional-information'],
        priceMap['additional-information'],
      ),
      health: this.findCardWithPrice(health, priceMap.health),
      bioCharacteristics: this.changeBioCharacteristicGender(
        this.findCardWithPrice(bio, priceMap.bio),
        sexualOrientation,
      ),
      character: this.findCardWithPrice(character, priceMap.character),
      hobby: this.findCardWithPrice(hobby, priceMap.hobby),
      luggage: this.findCardWithPrice(luggage, priceMap.luggage),
      knowledge: this.findCardWithPrice(knowledge, priceMap.knowledge),
      phobia: this.findCardWithPrice(phobia, priceMap.phobia),
      actionCard: this.findCardWithPrice(characteristicCards['action-card'], priceMap['action-card']),
      conditionCard: this.findCardWithPrice(characteristicCards['condition-card'], priceMap['condition-card']),
      notes: '',
    };
  }

  public filterCardsByPrice(filteredCards: Card[], price: number) {
    const cards = [];

    for (let i = 0; i < filteredCards.length; i++) {
      if (filteredCards[i].price === price) {
        cards.push(filteredCards[i]);
      }
    }

    return cards;
  }

  public findCardWithPrice(cards: Card[], price: number, _exactPrice: number = price): Card {
    const cardsWithCurrentPrice = this.filterCardsByPrice(cards, price);

    if (cardsWithCurrentPrice[0] === undefined) {
      if (price === gameSettingsStore.settingsLimits.card.minPrice) {
        throw new Error(
          `Cannot find any card. Real price: ${_exactPrice}, Current price: ${price} cardType: ${cards[0].type} `,
        );
      }

      return this.findCardWithPrice(cards, price - 1, _exactPrice);
    }
    if (cardsWithCurrentPrice.length === 1) {
      const foundedCard = cardsWithCurrentPrice[0];
      foundedCard.price = _exactPrice;
      return foundedCard;
    }

    const foundedCard =
      cardsWithCurrentPrice[Math.trunc(this.pseudoRandomGenerator.generateInRange(0, cardsWithCurrentPrice.length))];
    foundedCard.price = _exactPrice;
    return foundedCard;
  }

  private balancePlayerPrice(playersBalance: number, oldPrice: number): number {
    const balanceChances: BalanceChances = playersBalanceToBalanceChances(playersBalance);
    const randomNumber: number = Math.trunc(this.pseudoRandomGenerator.generateInRange(1, 101));
    if (randomNumber <= balanceChances.chanceOfIgnore) {
      //Ignore balance
      return oldPrice;
    } else if (randomNumber <= balanceChances.chanceOfIgnore + balanceChances.chanceOfPriceIncrease) {
      //increase
      const newPrice = oldPrice + (balanceChances.priceValueShift ?? 10);
      return newPrice > gameSettingsStore.settingsLimits.playerPrice.max
        ? gameSettingsStore.settingsLimits.playerPrice.max
        : newPrice;
    } else {
      const newPrice = oldPrice - (balanceChances.priceValueShift ?? 10);
      return newPrice < gameSettingsStore.settingsLimits.playerPrice.min
        ? gameSettingsStore.settingsLimits.playerPrice.min
        : newPrice;
    }
  }

  private createPlayers(
    playersCount: number,
    difficulty: number,
    characteristicBalance: number,
    playersBalance: number,
    sexualOrientation: SexualOrientation,
  ): Player[] {
    const players: Player[] = [];

    this.pseudoRandomGenerator.resetSeed();

    for (let i = 1; i <= playersCount; i++) {
      const playerPrice = this.balancePlayerPrice(playersBalance, difficultyToTotalPrice(difficulty));
      players.push(this.createPlayer(playerPrice, characteristicBalance, sexualOrientation, i));
    }

    this.usedProfessions = professions.slice(); //TODO refactor

    return players;
  }

  private selectRandomEnding(endings: Ending[]): Ending {
    return endings[Math.trunc(this.pseudoRandomGenerator.generateFrom(createSeedStore.seed, 0, endings.length))];
  }

  public createGame(gameSettings: GameSettings): GameType {
    try {
      return {
        apocalypse: this.selectRandomApocalypse(gameSettings.apocalypses),
        shelter: this.selectRandomShelter(gameSettings.shelters),
        ending: this.selectRandomEnding(endings),
        players: this.createPlayers(
          gameSettings.playersCount,
          gameSettings.difficulty,
          gameSettings.characteristicBalance,
          gameSettings.balance,
          gameSettings.sexualOrientation,
        ),
        currentPlayerNumber: -1,
      };
    } catch (err) {
      console.log(err);
      throw new Error(
        'При генерации игры произошла ошибка, скорее всего она связанна с тем, что вы, ослы ебанные, создали такиииих ублюдских персонажей, что у меня даже характеристик таких блядь нету',
      );
    }
  }
}

export const createGameStore = new CreateGameStore();
