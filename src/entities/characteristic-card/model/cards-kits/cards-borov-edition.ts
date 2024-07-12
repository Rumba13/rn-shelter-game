import { Card } from '@/src/shared/lib/types/card';
import { cardsStandartEdition } from '@/src/entities/characteristic-card/model/cards-kits/cards-standart-edition';

const previousKitLastId = (cardsStandartEdition.at(-1)?.id || 0);

export const cardsBorovEdition: Card[] = <Card[]>[
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
  {
    name: 'Сдох',
    type: 'health',
    price: 1,
  },
  {
    name: 'ДедИнсайд/ 16 лет/ гомосексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Мужчина/ 120 лет/ гетеросексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Женщина/ 96 лет/ бисексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Мужчина/ 116 лет/ гомосексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Мужчина/ 79 лет/ гомосексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'ХуйПоймиЧто/ 17 лет/ хуйсексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Мужчина/ 94 лет/ гомосексуальный',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Женщина/ 197 лет/ пока не определилась',
    type: 'bio',
    price: 1,
  },
  {
    name: 'Дилдо Евы',
    type: 'luggage',
    price: 1,
  },
  {
    name: 'Хагги Вагги',
    type: 'luggage',
    price: 1,
  },
  {
    name: 'Знает, что хочет шпёхнуть Еву',
    type: 'knowledge',
    price: 1,
  },
  {
    name: 'Знает, что он ничего не знает',
    type: 'knowledge',
    price: 1,
  },
  {
    name: 'Копирует профессию любого игрока',
    type: 'action-card',
    price: 1,
  },
].map((card, index) => ({ ...card, id: previousKitLastId + index + 1 }));
