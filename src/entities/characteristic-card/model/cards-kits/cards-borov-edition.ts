import { Card } from '@/src/shared/lib/types/card';
import { cardsStandartEdition } from '@/src/entities/characteristic-card/model/cards-kits/cards-standart-edition';

const previousKitLastId = (cardsStandartEdition.at(-1)?.id || 0);

export const cardsBorovEdition: Card[] = [
  {
    name: 'Бомба(взрыв через 10 часов)',
    type: 'luggage',
    price: 1,
    id: previousKitLastId + 1,
  },
  {
    name: 'Копирует ориентацию любого игрока',
    type: 'action-card',
    price: 1,
    id: previousKitLastId + 2,

  },
  {
    name: 'Знает мать одного из игроков',
    type: 'knowledge',
    price: 4,
    id: previousKitLastId + 3,

  },
  {
    name: 'Сдох',
    type: 'health',
    price: 1,
    id: previousKitLastId + 4,
  },
  {
    name: 'ДедИнсайд/ 16 лет/ гомосексуальный',
    type: 'bio',
    price: 1,
    id: previousKitLastId + 5,
  },
];
