import { apocalypses } from './apocalypses'
import { Apocalypse } from '@/src/shared/lib/types/apocalypse'

export function apocalypseNameToApocalypse(shelterName: string): Apocalypse {
  const apocalypse = apocalypses.find(shelter => shelter.name === shelterName)

  if (apocalypse === undefined) {
    throw new Error('Shelter is undefined')
  }

  return apocalypse
}
