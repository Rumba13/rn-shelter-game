import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select'
import { Shelter } from '@/src/shared/lib/types/shelter'
import { Text } from 'react-native'
import { ShelterCategoryList } from '@/src/shared/lib/types/shelter-category-list'

export function renderBunkerSelectedText({ selectedItems }: SectionedMultiSelectProps<ShelterCategoryList>) {
  if (selectedItems?.length === 0) {
    return <Text>Выбери Бункеры </Text>
  } else if (selectedItems && Number(selectedItems.length) === 1) {
    return <Text>{selectedItems[0]}</Text>
  } else {
    return <Text>Выбрано {selectedItems?.length}</Text>
  }
}
