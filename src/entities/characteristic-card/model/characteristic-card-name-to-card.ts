import { characteristicCards } from '@/src/entities/characteristic-card/model/characteristic-card';
import { Card } from '@/src/shared/lib/types/card';
import { cardKitToCards } from '@/src/shared/lib/card-kit-to-cards';

export function characteristicCardNameToCard(cardName: string): Card {
  const card = cardKitToCards(characteristicCards).find(shelter => shelter.name === cardName);

  if (card === undefined) {
    throw new Error('Shelter is undefined');
  }

  return card;
}
