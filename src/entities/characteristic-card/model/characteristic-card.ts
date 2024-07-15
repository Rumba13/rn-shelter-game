import { CharacteristicCardsList } from '@/src/shared/lib/types/characteristic-cards-list';
import { cardsStandartEdition } from '@/src/entities/characteristic-card/model/cards-kits/cards-standart-edition';
import { cardsBorovEdition } from '@/src/entities/characteristic-card/model/cards-kits/cards-borov-edition';
import { mergeCardKits } from '@/src/shared/lib/merge-card-kits';
import { CardKit } from '@/src/shared/lib/types/card-kit';
import { cardKitToCards } from '@/src/shared/lib/card-kit-to-cards';

export const characteristicCards: CardKit = mergeCardKits(cardsStandartEdition, cardsBorovEdition);
export const characteristicCardsList: CharacteristicCardsList[] = [
  { name: 'Карточки Стандартного Издания', children: cardKitToCards(cardsStandartEdition) },
  { name: 'Карточки Издания "Боров"', children: cardKitToCards(cardsBorovEdition) },
];
