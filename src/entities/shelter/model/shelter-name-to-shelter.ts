import { Shelter } from '@/src/shared/lib/types/shelter';
import {  sheltersStore } from './shelters-store';

export function shelterNameToShelter(shelterName: string): Shelter {
  const shelter = sheltersStore.getShelterByName(shelterName);

  if (!shelter) {
    throw new Error('Shelter is undefined');
  }

  return shelter;
}
