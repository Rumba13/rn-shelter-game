import { Shelter } from '@/src/shared/lib/types/shelter'
import { sheltersCategories } from './shelters'

export function categoryNameToShelters(categoryName: string): Shelter[] | undefined {
  return sheltersCategories.find(shelterCategory => shelterCategory.name === categoryName)?.children
}