import { Shelter } from '@/src/shared/lib/types/shelter'

export type ShelterCategoryList = {
  name: string
  children?: Shelter[]
}
