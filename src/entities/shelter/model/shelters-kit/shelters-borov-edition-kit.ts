import { Shelter } from '@/src/shared/lib/types/shelter';
import { sheltersStandartEditionKit } from '@/src/entities/shelter/model/shelters-kit/shelters-standart-edition-kit';

const previousKitId = (sheltersStandartEditionKit.at(-1)?.id || 0);

export const sheltersBorovEditionKit: Shelter[] = [
  {
    name: 'Чулан Евы',
    description: `Тесный чулан Евы, использовался для хранения отгрызенных писек Димы. Внутри воняет плесенью и ползают слизни.`,
    resources: ['Восемь писек Димы', 'Два сгнивших слизня', 'Пыль со стен'],
    rooms: ['Одна единственная'],
    location: 'Чулан расположен на даче Евы, где-то в пещерах Марокко',
    spaceInSquareMeters: 20,
    stayTimeInMonths: 1,
    difficulty: 8,
    id: previousKitId + 1,
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
    id: previousKitId + 2,
  },
];
