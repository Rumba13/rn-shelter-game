import { GameSettings } from '@/src/shared/lib/types/game-settings';
import { GameType } from '@/src/shared/lib/types/game';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { Player } from '@/src/shared/lib/types/player';
import { Card } from '@/src/shared/lib/types/card';
import { CardType } from '@/src/shared/lib/types/card-type';
import { PseudoRandomGenerator } from '@/src/shared/lib/pseudo-random-generator';
import { CreatePriceMap } from '@/src/feature/create-price-map/model/create-price-map';
import { gameSettingsStore } from '@/src/entities/game';
import { playerBalanceShiftChances } from '@/src/shared/lib/types/player-balance-shift-chances';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { genders } from '@/src/entities/gender/model/genders';
import { Profession } from '@/src/shared/lib/types/profession';
import { cardsStore } from '@/src/entities/characteristic-card/model/cards-store';
import { Ending } from '@/src/shared/lib/types/ending';
import { endings } from '@/src/entities/ending';
import { databaseStore } from '@/src/shared/model/database-store';
import { balanceToShuffleTimesMap } from '@/src/feature/create-game/model/characteristic-balance-to-shuffle-times';
import { difficultyToPlayerPriceMap } from '@/src/feature/create-game/model/difficulty-to-player-price';
import { playerBalanceToBalanceChancesMap } from '@/src/feature/create-game/model/players-balance-to-balance--shift-chances';
import { BioCharacteristics } from '@/src/shared/lib/types/bio-characterisctic';
import { createSeedStore } from '@/src/entities/seed/model/seed-store';

class CreateGameStore {
  private readonly pseudoRandomGenerator: PseudoRandomGenerator;
  private createPriceMap: CreatePriceMap;

  private selectRandomApocalypse(apocalypses: Apocalypse[]): Apocalypse {
    return apocalypses[Math.trunc(this.pseudoRandomGenerator.generateInRangeFromSeed(0, apocalypses.length))];
  }

  private selectRandomShelter(shelters: Shelter[]): Shelter {
    return shelters[Math.trunc(this.pseudoRandomGenerator.generateInRangeFromSeed(0, shelters.length))];
  }

  private selectRandomProfession(usedProfession: Profession[]): Profession {
    const professionIndex = Math.trunc(this.pseudoRandomGenerator.generateInRange(1, usedProfession.length));
    const profession = usedProfession[professionIndex];
    usedProfession.splice(professionIndex, 1);
    return profession;
  }

  private selectRandomEnding(endings: Ending[]): Ending {
    return endings[Math.trunc(this.pseudoRandomGenerator.generateInRangeFromSeed(0, endings.length))];
  }

  constructor() {
    this.pseudoRandomGenerator = new PseudoRandomGenerator(createSeedStore.seed);
    this.createPriceMap = new CreatePriceMap(this.pseudoRandomGenerator);
  }

  private changeBioCharacteristicGender(bioCharacteristicCard: Card, sexualOrientationOption: SexualOrientation): Card {
    if (sexualOrientationOption === SexualOrientation.Random) return bioCharacteristicCard;

    const bioCharacteristics: BioCharacteristics | undefined = <BioCharacteristics>(
      bioCharacteristicCard.name.match(/(?<sex>^.+?)\/ (?<age>.+?)\/ (?<gender>.+?$)/)?.groups
    );

    if (!bioCharacteristics || !bioCharacteristics.sex || !bioCharacteristics.age || !bioCharacteristics.gender)
      throw new Error('Can\'t parse bio characteristic');

    if (sexualOrientationOption === SexualOrientation.AllGays) {
      //:)
      const gayGenders = genders.filter(gender => gender !== 'straight' && gender !== 'pregnancy');
      const selectedGayGender =
        gayGenders[Math.trunc(this.pseudoRandomGenerator.generateInRange(0, gayGenders.length))];

      switch (selectedGayGender) {//TODO In faraway bright future(Flutter :) ) use i18n or something familiar
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
    unusedProfessions: Profession[],
  ): Player {
    const priceMap: { [k in CardType]: number } = this.createPriceMap.createPriceMapShuffle(
      price,
      balanceToShuffleTimesMap[characteristicBalance],
    );
    //TODO Cards selector with database
    return {
      number: playerNumber,
      isKicked: false,
      profession: this.selectRandomProfession(unusedProfessions),
      additionalInformation: this.findCardWithPrice(
        cardsStore.getCardsByType('additional-information'),
        priceMap['additional-information'],
      ),
      health: this.findCardWithPrice(cardsStore.getCardsByType('health'), priceMap.health),
      bioCharacteristics: this.changeBioCharacteristicGender(
        this.findCardWithPrice(cardsStore.getCardsByType('bio'), priceMap.bio),
        sexualOrientation,
      ),
      character: this.findCardWithPrice(cardsStore.getCardsByType('character'), priceMap.character),
      hobby: this.findCardWithPrice(cardsStore.getCardsByType('hobby'), priceMap.hobby),
      luggage: this.findCardWithPrice(cardsStore.getCardsByType('luggage'), priceMap.luggage),
      knowledge: this.findCardWithPrice(cardsStore.getCardsByType('knowledge'), priceMap.knowledge),
      phobia: this.findCardWithPrice(cardsStore.getCardsByType('phobia'), priceMap.phobia),
      actionCard: this.findCardWithPrice(cardsStore.getCardsByType('action-card'), priceMap['action-card']),
      conditionCard: this.findCardWithPrice(cardsStore.getCardsByType('condition-card'), priceMap['condition-card']),
      notes: '',
    };
  }

  public filterCardsWithPrice(filteredCards: Card[], price: number) { //Array.prototype.filter, but faster
    const cards = []; //TODO replace with DB query

    for (let i = 0; i < filteredCards.length; i++) {
      if (filteredCards[i].price === price) {
        cards.push(filteredCards[i]);
      }
    }

    return cards;
  }

  public findCardWithPrice(cards: Card[], price: number, _exactPrice: number = price): Card {
    const cardsWithCurrentPrice = this.filterCardsWithPrice(cards, price);

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
    const balanceChances: playerBalanceShiftChances = playerBalanceToBalanceChancesMap[playersBalance];
    const randomNumber: number = Math.trunc(this.pseudoRandomGenerator.generateInRange(1, 101));

    if (randomNumber <= balanceChances.chanceOfIgnore) {//No changes
      return oldPrice;
    }
    if (randomNumber <= balanceChances.chanceOfIgnore + balanceChances.chanceOfPriceIncrease) {//increase player price
      const newPrice = oldPrice + balanceChances.priceShift;
      return Math.min(gameSettingsStore.settingsLimits.playerPrice.max, newPrice);
    }

    const newPrice = oldPrice - balanceChances.priceShift;
    return Math.max(gameSettingsStore.settingsLimits.playerPrice.min, newPrice);
  }

  private createPlayers(
    playersCount: number,
    difficulty: number,
    characteristicBalance: number,
    playersBalance: number,
    sexualOrientation: SexualOrientation,
  ): Player[] {
    const unusedProfessions = databaseStore.database.getAllSync<Profession>('SELECT * FROM professions;');

    this.pseudoRandomGenerator.resetSeed();//Don't touch it unless you know what you are doing

    const players: Player[] = [];

    for (let i = 1; i <= playersCount; i++) {
      const playerPrice = this.balancePlayerPrice(playersBalance, difficultyToPlayerPriceMap[difficulty]);
      players.push(this.createPlayer(playerPrice, characteristicBalance, sexualOrientation, i, unusedProfessions));
    }

    return players;
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
        'При генерации игры произошла ошибка, скорее всего она связанна с тем, что нехватает карточек с низкими ценами',
      );
    }
  }
}

export const createGameStore = new CreateGameStore();
