import { Shelter } from '@/src/shared/lib/types/shelter'
import { characteristicCards } from '@/src/entities/characteristic-card/model/characteristic-card'
import { CharacteristicCard } from '@/src/shared/lib/types/characteristic-card'

export function characteristicCardNameToCard(cardName: string): CharacteristicCard {
  const card = characteristicCards.find(shelter => shelter.name === cardName)

  if (card === undefined) {
    throw new Error('Shelter is undefined')
  }

  return card
}
