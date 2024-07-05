import { Apocalypse } from '@/src/shared/lib/types/apocalypses'
import { ApocalypseCategories } from '@/src/shared/lib/types/apocalypse-categories'

const apocalypsesDefaultKit: Apocalypse[] = [
  {
    name: 'IceAge',
    description:
      'В целях борьбы с глобальным потеплением правительства нескольких стран договорились построить искусственные охладители в своих водах. По завершению постройки стало ясно, что проект был ошибкой. Температура воды и воздуха упала слишком низко, и теперь человечеству приходиться иметь дело с новым ледниковым периодом',
  },
  {
    name: 'AlienParasite',
    description: 'Люди и животные по всему миру подверглись заражению инопланетными паразитами. Исследования показали, что, проникая в тело, паразитические организм стремится захватить мозг и присвоить тело носителя. Заражённые особи начинают охоту на себе подобных.',
  },
]
const apocalypsesBorovEditionKit: Apocalypse[] = [
  {
    name: 'DimaAge',
    description: '',
  },
]

export const apocalypses: Apocalypse[] = [
  ...apocalypsesDefaultKit,
  ...apocalypsesBorovEditionKit,
  //
  // {
  //   name: '',
  //   description: '',
  // },
  // {
  //   name: '',
  //   description: '',
  // },
]

export const apocalypsesCategories: ApocalypseCategories[] = [
  {
    name: 'Апокалипсисы Стандартного Издания',
    children: [...apocalypsesDefaultKit],
  },
  {
    name: 'Апокалипсисы Издания "Боров"',
    children: [...apocalypsesBorovEditionKit],
  },
]