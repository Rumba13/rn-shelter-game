import { Card } from '@/src/shared/lib/types/card';

export const cardsBorovEdition: Card[] = [
  {
    name: 'Бомба(взрыв через 10 часов)',
    type: 'luggage',
    price: 1,
  },
  {
    name: 'Копирует ориентацию любого игрока',
    type: 'action-card',
    price: 1,
  },
  {
    name: 'Знает мать одного из игроков',
    type: 'knowledge',
    price: 4,
  },
  //fallbacks
  {
    name: 'Сдох',
    type: 'health',
    price: 1,
  },
];
