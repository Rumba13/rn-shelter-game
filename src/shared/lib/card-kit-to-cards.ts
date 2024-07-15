import { CardKit } from '@/src/shared/lib/types/card-kit';
import { Card } from '@/src/shared/lib/types/card';
import { CardType } from '@/src/shared/lib/types/card-type';

export function cardKitToCards(cardKit: CardKit): Card[] {
  let cards: Card[] = [];

  Object.keys(cardKit).forEach(property => {
    cards = cards.concat(cardKit[<CardType>property]);
  });

  return cards;
}
