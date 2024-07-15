import { nextKitId as previousKitId } from '@/src/entities/characteristic-card/model/cards-kits/cards-standart-edition';
import { setIdsToCardKit } from '@/src/entities/characteristic-card/lib/set-ids-to-card-kit';


export const { cardsKit: cardsBorovEdition, nextKitId } = setIdsToCardKit({
  'bio': [
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
  ],
  'phobia': [],
  'health': [
    {
      name: 'Сдох',
      type: 'health',
      price: 1,
    },
  ],
  'condition-card': [],
  'action-card': [

    {
      name: 'Копирует профессию любого игрока',
      type: 'action-card',
      price: 1,
    },

    {
      name: 'Копирует ориентацию любого игрока',
      type: 'action-card',
      price: 1,
    },
  ],
  'hobby': [],
  'luggage': [
    {
      name: 'Бомба(взрыв через 10 часов)',
      type: 'luggage',
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
  ],
  'character': [],
  'knowledge': [
    {
      name: 'Знает, что он ничего не знает',
      type: 'knowledge',
      price: 1,
    },
    {
      name: 'Знает мать одного из игроков',
      type: 'knowledge',
      price: 4,
    },
    {
      name: 'Знает, что хочет шпёхнуть Еву',
      type: 'knowledge',
      price: 1,
    },
  ],
  'additional-information': [],
}, previousKitId);

