import { Shelter } from '@/src/shared/lib/types/shelter'
import { ShelterCategoryList } from '@/src/shared/lib/types/shelter-category-list'

const sheltersBorovEdition: Shelter[] = [
  {
    name: 'Чулан Евы',
    description: `Тесный чулан Евы, использовался для хранения отгрызенных писек Димы. Внутри воняет плесенью и ползают слизни.`,
    resources: ['Восемь писек Димы', 'Два сгнивших слизня', 'Пыль со стен'],
    rooms: ['Одна единственная'],
    location: 'Чулан расположен на даче Евы, где-то в пещерах Марокко',
    spaceInSquareMeters: 20,
    stayTimeInMonths: 1,
    difficulty: 8,
  },
  {
    name: 'ЗИП',
    description: `Великий в прошлом в завод. Где-то внутри спрятан вход в бункер для VIP-персон ЗИПа. На заводе присутствуют следы Марсиан. Упоминался в известном рассказе. `,
    resources: ['Станки', 'Инструменты', 'Питательная жижа с тракторов', 'Комплект плазменных винтовок', 'Журналы'],
    rooms: [
      'Оружейная(Вход охраняет Дебил)',
      'Комната директора',
      'Промышленный холодильник(заперт электронным замком)',
      'Производственный цех',
      'Каюты для космопехоты',
    ],
    location: 'Находится в центре города',
    spaceInSquareMeters: 5000,
    stayTimeInMonths: 12 * 8,
    difficulty: 1,
  },
]

const sheltersDefault: Shelter[] = [
  {
    name: 'Вервольф',
    description: `Военный бункер, внутри которого разбросан разный мусор. Говорят, что внутри есть тайник с золотом.`,
    resources: ['Консервы тушёнки', 'Калорифер'],
    rooms: ['Библиотека(дверь заперта)', 'Хим. Лаборатория(комната заблокирована электронным замком)'],
    location: 'Метрополитен крупного города',
    spaceInSquareMeters: 500,
    stayTimeInMonths: 3,
    difficulty: 1,
  },
]

export const sheltersCategories: ShelterCategoryList[] = [
  {
    name: 'Бункеры Стандартного Издания',
    children: [...sheltersDefault],
  },
  {
    name: 'Бункеры Издания "Боров"',
    children: [...sheltersBorovEdition],
  },
]
export const shelters: Shelter[] = [...sheltersDefault, ...sheltersBorovEdition]
