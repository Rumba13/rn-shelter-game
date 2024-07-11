import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select';
import { Text } from 'react-native';
import { ApocalypseCategories } from '@/src/shared/lib/types/apocalypse-categories';

export function renderApocalypseSelectedText({ selectedItems }: SectionedMultiSelectProps<ApocalypseCategories>) {
  if (selectedItems?.length === 0) {
    return <Text>Выбери Апокалипсисы </Text>;
  } else if (selectedItems && Number(selectedItems.length) === 1) {
    return <Text>{selectedItems[0]}</Text>;
  } else {
    return <Text>Выбрано {selectedItems?.length}</Text>;
  }
}
