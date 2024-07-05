import { Shelter } from '@/src/shared/lib/types/shelter'
import { apocalypsesCategories } from '../model/apocalypses'
import { Apocalypse } from '@/src/shared/lib/types/apocalypses'

export function categoryNameToApocalypses(categoryName: string): Apocalypse[] | undefined {
  return apocalypsesCategories.find(apocalypsesCategory => apocalypsesCategory.name === categoryName)?.children
}