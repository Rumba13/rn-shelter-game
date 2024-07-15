import { setIdsToCardKit } from '@/src/entities/characteristic-card/lib/set-ids-to-card-kit';
import { CardKit } from '@/src/shared/lib/types/card-kit';
import { expect } from '@jest/globals';

//@ts-ignore
const cardsKit: CardKit = <CardKit>{
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
  ],
  'phobia': [
    {
      type: 'phobia',
      name: 'Агирофобия (Айнарофобия) — боязнь улиц',
      price: 0,
    },
    {
      type: 'phobia',
      name: 'Агорофобия — боязнь городов',
      price: 4,
    },
  ],
  'health': [
    {
      name: 'Сдох',
      type: 'health',
      price: 1,
    },
    {
      type: 'health',
      name: 'Абсолютная слепота',
      price: 0,
    },
  ],
  'condition-card': [
    {
      type: 'condition-card',
      name: 'В случае вашего выбывания бункер очистится от всех текущих вредителей',
      price: 6,
    },
    {
      type: 'condition-card',
      name: 'В случае вашего выбывания в бункере заведутся вредители: змеи',
      price: 1,
    },
  ],
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
  'hobby': [
    {
      type: 'hobby',
      name: 'Автомобилизм',
      price: 4,
    },
    {
      type: 'hobby',
      name: 'Азартные игры',
      price: 0,
      id: 717,
    }],
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
  ],
  'character': [
    {
      type: 'character',
      name: 'Агрессивный',
      price: 1,
    },
    {
      type: 'character',
      name: 'Аккуратный',
      price: 5,
      id: 9,
    }],
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
  ],
  'additional-information': [
    {
      type: 'additional-information',
      name: 'Верит в жизнь после смерти',
      price: 4,
    },
    {
      type: 'additional-information',
      name: 'Владеет языком жестов',
      price: 3,
    }],
};

test('expect setIdsToCardKit to set ids in card kit from 1 to 20', () => {

  expect(setIdsToCardKit(cardsKit, 1)).toStrictEqual({
    cardsKit: {
      'bio': [
        {
          name: 'ДедИнсайд/ 16 лет/ гомосексуальный',
          type: 'bio',
          price: 1,
          id: 1,
        },
        {
          name: 'Мужчина/ 120 лет/ гетеросексуальный',
          type: 'bio',
          price: 1,
          id: 2,
        },
      ],
      'phobia': [
        {
          type: 'phobia',
          name: 'Агирофобия (Айнарофобия) — боязнь улиц',
          price: 0,
          id: 3,
        },
        {
          type: 'phobia',
          name: 'Агорофобия — боязнь городов',
          price: 4,
          id: 4,
        },
      ],
      'health': [
        {
          name: 'Сдох',
          type: 'health',
          price: 1,
          id: 5,
        },
        {
          type: 'health',
          name: 'Абсолютная слепота',
          price: 0,
          id: 6,
        },
      ],
      'condition-card': [
        {
          type: 'condition-card',
          name: 'В случае вашего выбывания бункер очистится от всех текущих вредителей',
          price: 6,
          id: 7,
        },
        {
          type: 'condition-card',
          name: 'В случае вашего выбывания в бункере заведутся вредители: змеи',
          price: 1,
          id: 8,
        },
      ],
      'action-card': [

        {
          name: 'Копирует профессию любого игрока',
          type: 'action-card',
          price: 1,
          id: 9,
        },

        {
          name: 'Копирует ориентацию любого игрока',
          type: 'action-card',
          price: 1,
          id: 10,
        },
      ],
      'hobby': [
        {
          type: 'hobby',
          name: 'Автомобилизм',
          price: 4,
          id: 11,
        },
        {
          type: 'hobby',
          name: 'Азартные игры',
          price: 0,
          id: 12,
        }],
      'luggage': [
        {
          name: 'Бомба(взрыв через 10 часов)',
          type: 'luggage',
          price: 1,
          id: 13,
        },
        {
          name: 'Дилдо Евы',
          type: 'luggage',
          price: 1,
          id: 14,
        },
      ],
      'character': [
        {
          type: 'character',
          name: 'Агрессивный',
          price: 1,
          id: 15,
        },
        {
          type: 'character',
          name: 'Аккуратный',
          price: 5,
          id: 16,
        }],
      'knowledge': [
        {
          name: 'Знает, что он ничего не знает',
          type: 'knowledge',
          price: 1,
          id: 17,
        },
        {
          name: 'Знает мать одного из игроков',
          type: 'knowledge',
          price: 4,
          id: 18,
        },
      ],
      'additional-information': [
        {
          type: 'additional-information',
          name: 'Верит в жизнь после смерти',
          price: 4,
          id: 19,
        },
        {
          type: 'additional-information',
          name: 'Владеет языком жестов',
          price: 3,
          id: 20,
        }],
    }, nextKitId: 21,
  });

});

