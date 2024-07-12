import { Card } from '@/src/shared/lib/types/card';
import { CharacteristicCardsList } from '@/src/shared/lib/types/characteristic-cards-list';
import { cardsStandartEdition } from '@/src/entities/characteristic-card/model/cards-kits/cards-standart-edition';
import { cardsBorovEdition } from '@/src/entities/characteristic-card/model/cards-kits/cards-borov-edition';

export const characteristicCards: Card[] = [...cardsStandartEdition, ...cardsBorovEdition];
export const characteristicCardsList: CharacteristicCardsList[] = [
  { name: 'Карточки Стандартного Издания', children: [...cardsStandartEdition] },
  { name: 'Карточки Издания "Боров"', children: [...cardsBorovEdition] },
];
