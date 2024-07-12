import {
  professionsStandartEdition,
} from '@/src/entities/profession/model/professions-kits/professions-standart-edition';
import { professionBorovEdition } from '@/src/entities/profession/model/professions-kits/profession-borov-edition';
import { Profession } from '@/src/shared/lib/types/profession';

export const professions: Profession[] = [...professionsStandartEdition, ...professionBorovEdition];
