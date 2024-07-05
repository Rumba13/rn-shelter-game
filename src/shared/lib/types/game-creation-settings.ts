import { Apocalypse } from '@/src/shared/lib/types/apocalypses'
import { Shelter } from '@/src/shared/lib/types/shelter'
import { SexualOrientation } from '@/src/shared/lib/types/game-creation-option/sexual-orientation'
import { CharacteristicCard } from '@/src/shared/lib/types/characteristic-card'

export type GameCreationOptions = {
  playersCount: number
  difficulty: number
  balance: number
  sexualOrientation: SexualOrientation
  cardsKit: CharacteristicCard[]
  apocalypses: Apocalypse[]
  shelters: Shelter[]

  //Special options
  hillbillyMode: boolean
}
