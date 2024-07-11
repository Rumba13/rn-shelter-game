import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { ApocalypseCategories } from '@/src/shared/lib/types/apocalypse-categories';
import { apocalypsesStandartEditionKit } from '@/src/entities/apocalypse/model/apocalypses-kits/apocalypses-standart-edition-kit';
import { apocalypsesBorovEditionKit } from '@/src/entities/apocalypse/model/apocalypses-kits/apocalypses-borov-edition-kit';

export const apocalypses: Apocalypse[] = [...apocalypsesStandartEditionKit, ...apocalypsesBorovEditionKit];

export const apocalypsesCategories: ApocalypseCategories[] = [
  {
    name: 'Апокалипсисы Стандартного Издания',
    children: [...apocalypsesStandartEditionKit],
  },
  {
    name: 'Апокалипсисы Издания "Боров"',
    children: [...apocalypsesBorovEditionKit],
  },
];
