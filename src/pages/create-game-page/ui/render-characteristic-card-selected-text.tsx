import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select';
import { Text } from 'react-native';
import { CharacteristicCardsList } from '@/src/shared/lib/types/characteristic-cards-list';

export function renderCharacteristicCardSelectedText({
  selectedItems,
}: SectionedMultiSelectProps<CharacteristicCardsList>) {
  if (selectedItems?.length === 0) {
    return <Text>Выбери Карточки </Text>;
  } else if (selectedItems && Number(selectedItems.length) === 1) {
    return <Text>{selectedItems[0]}</Text>;
  } else {
    return <Text>Выбрано {selectedItems?.length}</Text>;
  }
}
