import { Shelter } from '@/src/shared/lib/types/shelter'
import { categoryNameToShelters } from './category-name-to-shelters'

export function shelterCategoriesToShelterNames(shelterCategories: string[]): string[] {
  const sheltersNames: string[] = []

  shelterCategories.forEach(shelterCategoryName => {
    const sheltersToAdd: Shelter[] | undefined = categoryNameToShelters(shelterCategoryName)

    if (sheltersToAdd) {
      sheltersToAdd.forEach(({ name }) => {
        sheltersNames.push(name)
      })
    } else {
      sheltersNames.push(shelterCategoryName)
    }
  })

  return sheltersNames
}
