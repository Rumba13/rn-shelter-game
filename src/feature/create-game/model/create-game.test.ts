import { createGameStore } from '@/src/feature/create-game/model/create-game';
import { GameSettings } from '@/src/shared/lib/types/game-settings';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { apocalypses } from '@/src/entities/apocalypse';
import { shelters } from '@/src/entities/shelter/model/shelters';
import { characteristicCards } from '@/src/entities/characteristic-card/model/characteristic-card';
import { Card } from '@/src/shared/lib/types/card';
import { cardKitToCards } from '@/src/shared/lib/card-kit-to-cards';

const gameSettings: GameSettings = {
  difficulty: 8,
  playersCount: 8,
  hillbillyMode: false,
  characteristicBalance: 2,
  sexualOrientation: SexualOrientation.Random,
  balance: 4,
  apocalypses: apocalypses,
  shelters: shelters,
  cardsKit: cardKitToCards(characteristicCards),
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
