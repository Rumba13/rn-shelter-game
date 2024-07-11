import { professionsStandartEdition } from '@/src/entities/profession/model/professions-kits/professions-standart-edition';
import { professionBorovEdition } from '@/src/entities/profession/model/professions-kits/profession-borov-edition';

export const professions: string[] = [...professionsStandartEdition, ...professionBorovEdition];
