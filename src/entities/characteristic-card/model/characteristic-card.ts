import { CharacteristicCard } from '@/src/shared/lib/types/characteristic-card'
import { CharacteristicCardCategories } from '@/src/shared/lib/types/characteristic-card-categories'

const characteristicCardsStandartEdition: CharacteristicCard[] = [
  { name: 'Тупой', type: 'character' },
  { name: 'Похож на еву', type: 'bio' },
  { name: 'Дегройд', type: 'health' },
]
const characteristicCardsBorovEdition: CharacteristicCard[] = [
  { name: 'Увы', type: 'character' },
  { name: 'ывфы', type: 'bio' },
  { name: 'ывв', type: 'health' },
]
export const characteristicCards: CharacteristicCard[] = [
  ...characteristicCardsStandartEdition,
  ...characteristicCardsBorovEdition,
]
export const characteristicCardCategories: CharacteristicCardCategories[] = [
  { name: 'Карточки Стандартного Издания', children: [...characteristicCardsStandartEdition] },
  { name: 'Карточки Издания "Боров"', children: [...characteristicCardsBorovEdition] },
]
