import { categoryNameToApocalypses } from './category-name-to-apocalypses'
import { Apocalypse } from '@/src/shared/lib/types/apocalypses'

export function apocalypseCategoriesToApocalypseNames(shelterCategories: string[]): string[] {
  const apocalypsesNames: string[] = []

  shelterCategories.forEach(shelterCategoryName => {
    const apocalypseToAdd: Apocalypse[] | undefined = categoryNameToApocalypses(shelterCategoryName)

    if (apocalypseToAdd) {
      apocalypseToAdd.forEach(({ name }) => {
        apocalypsesNames.push(name)
      })
    } else {
      apocalypsesNames.push(shelterCategoryName)
    }
  })

  return apocalypsesNames
}
