import { Shelter } from '@/src/shared/lib/types/shelter';
import { ShelterCategoryList } from '@/src/shared/lib/types/shelter-category-list';
import { sheltersStandartEditionKit } from '@/src/entities/shelter/model/shelters-kit/shelters-standart-edition-kit';
import { sheltersBorovEditionKit } from '@/src/entities/shelter/model/shelters-kit/shelters-borov-edition-kit';

export const sheltersCategories: ShelterCategoryList[] = [
  {
    name: 'Бункеры Стандартного Издания',
    children: [...sheltersStandartEditionKit],
  },
  {
    name: 'Бункеры Издания "Боров"',
    children: [...sheltersBorovEditionKit],
  },
];
export const shelters: Shelter[] = [...sheltersStandartEditionKit, ...sheltersBorovEditionKit];
