import { createGameStore } from '@/src/feature/create-game/model/create-game';
import { GameSettings } from '@/src/shared/lib/types/game-settings';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { sheltersStore } from '@/src/entities/shelter/model/shelters';
import { cardsStore } from '@/src/entities/characteristic-card/model/cards-store';
import { Card } from '@/src/shared/lib/types/card';
import { apocalypsesStore } from '@/src/entities/apocalypse/model/apocalypses-store';

const gameSettings: GameSettings = {
  difficulty: 8,
  playersCount: 8,
  hillbillyMode: false,
  characteristicBalance: 2,
  sexualOrientation: SexualOrientation.Random,
  balance: 4,
  apocalypses: apocalypsesStore.getAllApocalypses(),
  shelters: sheltersStore.getAllShelters(),
  cardsKit: cardsStore.getAllCards(),
  lotteryTicketMode: false,
};

const cards: Card[] = [
  { id: 1, price: 1, name: 'Eavasdaadsa', type: 'bio' },
  { id: 2, price: 2, name: 'Right', type: 'bio' },
  { id: 3, price: 1, name: 'Eavasdaad', type: 'bio' },
];

test('Expect to find card with price 1', () => {
  expect(createGameStore.findCardWithPrice(cards, 3)).toStrictEqual({ id: 2, price: 3, name: 'Right', type: 'bio' });
});

test('Expect to create a game', () => {
  expect(createGameStore.createGame(gameSettings)).not.toBe(null);
});
