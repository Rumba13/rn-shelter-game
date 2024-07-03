import { Apocalypse } from '@/src/shared/lib/types/apocalypses'
import { Shelter } from '@/src/shared/lib/types/shelter'
import { SexualOrientation } from '@/src/shared/lib/types/game-creation-option/sexual-orientation'

export type GameCreationOptions = {
  seed: string
  playersCount: number
  difficulty: number
  balance: number
  sexualOrientation: SexualOrientation
  cardsKit: string[]
  apocalypses: Apocalypse[]
  shelters: Shelter[]

  //Special options
  hillbillyMode: boolean
}
