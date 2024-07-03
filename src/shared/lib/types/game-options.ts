import { Shelter } from '@/src/shared/lib/types/shelter'
import { Apocalypse } from '@/src/shared/lib/types/apocalypses'

export type GameOptions = {
  gameCode: string
  characters: any
  shelter: Shelter
  apocalypse: Apocalypse
}
