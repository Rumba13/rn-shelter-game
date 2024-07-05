import { CharacteristicCard } from '@/src/shared/lib/types/characteristic-card'

export type CharacteristicCardCategories = {
  name: string,
  children: CharacteristicCard[] //TODO refacrtoring
}