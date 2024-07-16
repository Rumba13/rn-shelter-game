import { Shelter } from '@/src/shared/lib/types/shelter';

export const sheltersStandartEditionKit: Shelter[] = [
  {
    name: 'Тора Бора',
    stayTimeInMonths: 3,
    location: 'Лес',
    spaceInSquareMeters: 50,
    description:
      'Грязный бункер, никогда не использовавшийся по назначению. Говорят, что внутри есть тайник с золотом.',
    rooms: ['Мастерская (в идеальном состоянии)', 'Библиотека (дверь заперта)', 'Оранжерея (дверь заперта)'],
    resources: ['Макароны и супы быстрого приготовления', 'Комплект дозиметров'],
    id: 1,
  },
  {
    name: 'Проект 816',
    stayTimeInMonths: 3,
    location: 'Деревня',
    spaceInSquareMeters: 100,
    description: 'Чистый бункер, в котором водятся тараканы. Ходят слухи, что этот бункер проклят.',
    rooms: [
      'Оружейная (комната заблокирована электронным замком)',
      'Библиотека (состояние неизвестно)',
      'Хим. лаборатория (состояние неизвестно)',
    ],
    resources: ['Замороженное мясо и овощи', 'Комплект дозиметров'],
    id: 2,
  },
  {
    name: 'Бункер №42',
    stayTimeInMonths: 72,
    location: 'Лес',
    spaceInSquareMeters: 100,
    description:
      'Металлический бункер, дважды подвергавшийся реконструкции. В газетах писали, что в этом бункере произошло убийство.',
    rooms: [
      'Мастерская (состояние неизвестно)',
      'Оружейная (комната заблокирована электронным замком)',
      'Мед. кабинет (дверь заперта)',
    ],
    resources: ['Консервы тушёнки', 'Дневник архитектора бункера'],
    id: 3,
  },
  {
    name: 'Dutchman',
    stayTimeInMonths: 9,
    location: 'Пустыня',
    spaceInSquareMeters: 250,
    description:
      'Полузаброшенный бункер, никогда не использовавшийся по назначению. Система вентиляции бункера сильно шумит.',
    rooms: [
      'Библиотека (вход завален)',
      'Кухня (в идеальном состоянии)',
      'Оранжерея (дверь заперта)',
      'Мед. кабинет (вход завален)',
    ],
    resources: ['Консервированные овощи и фрукты', 'Кондиционер'],
    id: 4,
  },
  {
    name: 'Winterhold',
    stayTimeInMonths: 24,
    location: 'Метрополитен крупного города',
    spaceInSquareMeters: 100,
    description: 'Полузаброшенный бункер, никогда не использовавшийся по назначению. Упоминался в известном рассказе.',
    rooms: ['Оранжерея (комната заблокирована электронным замком)', 'Хим. лаборатория (состояние неизвестно)'],
    resources: ['Замороженное мясо и овощи', 'Техническая документация бункера'],
    id: 5,
  },
  {
    name: 'Объект 825 ГТС',
    stayTimeInMonths: 12,
    location: 'Побережье озера Байкал',
    spaceInSquareMeters: 250,
    description:
      'Чистый бункер, использованный на съёмках фильма. В одной из комнат ощущается стойкий неприятный запах.',
    rooms: [
      'Мастерская (состояние неизвестно)',
      'Оружейная (вход завален)',
      'Кухня (в идеальном состоянии)',
      'Комната с тренажёрами (вход завален)',
    ],
    resources: ['Замороженные пиццы', 'Комплект дозиметров'],
    id: 6,
  },
  {
    id: 7,
    name: 'Templewo',
    stayTimeInMonths: 24,
    location: 'Побережье озера Байкал',
    spaceInSquareMeters: 500,
    description: 'Военный бункер, дважды подвергавшийся реконструкции. По всему бункеру разбросаны фантики от конфет.',
    rooms: ['Оранжерея (дверь заперта)', 'Мастерская (вход завален)'],
    resources: ['Замороженное мясо и овощи', 'Пылесос "Кот-КокосOS"'],
  },
  {
    id: 8,
    name: 'Regenwurmlager',
    stayTimeInMonths: 1,
    location: 'Степь',
    spaceInSquareMeters: 250,
    description: 'Современный бункер, освящённый самим Папой Римским. Говорят, что внутри есть тайник с золотом.',
    rooms: [
      'Хим. лаборатория (состояние неизвестно)',
      'Кухня (комната заблокирована электронным замком)',
      'Мед. кабинет (комната заблокирована электронным замком)',
    ],
    resources: ['Огромные запасы гречки', 'DVD проигрыватель и набор фильмов'],
  },
  {
    id: 9,
    name: 'Тайфун',
    stayTimeInMonths: 9,
    location: 'Метрополитен крупного города',
    spaceInSquareMeters: 300,
    description:
      'Современный бункер, внутри которого разбросан разный мелкий мусор. Система вентиляции бункера сильно шумит.',
    rooms: [
      'Хим. лаборатория (комната заблокирована электронным замком)',
      'Комната с тренажёрами (в идеальном состоянии)',
      'Оружейная (комната заблокирована электронным замком)',
      'Кухня (вход завален)',
    ],
    resources: ['Макароны и супы быстрого приготовления', 'Виниловый проигрыватель со старыми пластинками'],
  },
  {
    id: 10,
    name: 'Вервольф',
    stayTimeInMonths: 1,
    location: 'Тундра',
    spaceInSquareMeters: 100,
    description:
      'Современный бункер, внутри которого разбросан разный мелкий мусор. Изначально построен для укрытия президента.',
    rooms: [
      'Оранжерея (состояние неизвестно)',
      'Мастерская (в идеальном состоянии)',
      'Кухня (в идеальном состоянии)',
      'Хим. лаборатория (вход завален)',
    ],
    resources: ['Огромные запасы гречки', 'Техническая документация бункера'],
  },
  {
    id: 11,
    name: 'Цитадель',
    stayTimeInMonths: 24,
    location: 'Рига',
    spaceInSquareMeters: 250,
    description: 'Чистый бункер, в котором чувствуется неприятный запах. Упоминался в известном рассказе.',
    rooms: ['Кухня (дверь заперта)', 'Мастерская (комната заблокирована электронным замком)'],
    resources: ['Рацион правильного питания на каждый день', 'Виниловый проигрыватель со старыми пластинками'],
  },
].map<Shelter>((shelter, index) => ({ ...shelter, id: index + 1 }));
