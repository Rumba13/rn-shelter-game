import { Shelter } from '@/src/shared/lib/types/shelter';
import { characteristicCards } from '@/src/entities/characteristic-card/model/characteristic-card';
import { Card } from '@/src/shared/lib/types/card';

export function characteristicCardNameToCard(cardName: string): Card {
  const card = characteristicCards.find(shelter => shelter.name === cardName);

  if (card === undefined) {
    throw new Error('Shelter is undefined');
  }

  return card;
}
