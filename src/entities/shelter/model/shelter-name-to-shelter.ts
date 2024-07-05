import { Shelter } from '@/src/shared/lib/types/shelter'
import { shelters } from './shelters'

export function shelterNameToShelter(shelterName: string): Shelter {
  const shelter = shelters.find(shelter => shelter.name === shelterName)

  if (shelter === undefined) {
    throw new Error('Shelter is undefined')
  }

  return shelter
}
