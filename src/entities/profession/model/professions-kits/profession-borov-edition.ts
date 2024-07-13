import { Profession } from '@/src/shared/lib/types/profession';

const previousKitLastId: number = 0;

export const professionBorovEdition: Profession[] = [
  {
    name: 'Бомж',
  },
  {
    name: 'Стриптизёр',
  },
  {
    name: 'Бизнесмен',
  },
  {
    name: 'Грузчик',
  },
  {
    name: 'Программист',
  },
  {
    name: 'Танцор',
  },
  {
    name: 'Солдат',
  },
  {
    name: 'Ассенизатор',
  },
  {
    name: 'Данжен Мастер',
  },
  {
    name: 'Секс Раб',
  },
  {
    name: 'Уборщик Евы',
  },
  {
    name: 'Чистильщик Димы',
  },
  {
    name: 'Узбек',
  },
  {
    name: 'Шаурмен',
  },
  {
    name: 'Onlyfans Enjoyer',
  },
  {
    name: 'Негр',
  },
  {
    name: 'Доставшик Пиццы',
  },
  {
    name: 'Могильщик',
  },
  {
    name: 'Выблядок',
  },
  {
    name: 'Качок',
  },
  {
    name: 'Профессиональный гей',
  },
  {
    name: 'Сатору Годжо',
  },
].map((profession, index) => ({ ...profession, id: previousKitLastId + index + 1 }));
