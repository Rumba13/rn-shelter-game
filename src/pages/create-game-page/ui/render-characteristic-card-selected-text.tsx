import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select'
import { Text } from 'react-native'
import { CharacteristicCardCategories } from '@/src/shared/lib/types/characteristic-card-categories'

export function renderCharacteristicCardSelectedText({
  selectedItems,
}: SectionedMultiSelectProps<CharacteristicCardCategories>) {
  if (selectedItems?.length === 0) {
    return <Text>Выбери Карточки </Text>
  } else if (selectedItems && Number(selectedItems.length) === 1) {
    return <Text>{selectedItems[0]}</Text>
  } else {
    return <Text>Выбрано {selectedItems?.length}</Text>
  }
}
