import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';
import { useEffect, useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

type PropsType<ItemsType, SelectedItemsType> = {
  title: string;
  description: string;
  renderSelectedText: (props: SectionedMultiSelectProps<ItemsType>) => void;
  items: ItemsType[];
  uniqueKey: string;
  displayKey: string;
  selectText: string;
  searchPlaceholderText: string;
  subKey?: string;
  onValueChange: (selectedItems: SelectedItemsType[]) => void;
  selectedByDefault?: SelectedItemsType[];
};
//TODO refactoring
export function GameOptionList<ItemsType, SelectedItemsType = string>({
                                            title,
                                            description,
                                            renderSelectedText,
                                            items,
                                            selectText,
                                            searchPlaceholderText,
                                            uniqueKey,
                                            displayKey,
                                            onValueChange,
                                            selectedByDefault = [],
                                            subKey,
                                          }: PropsType<ItemsType,SelectedItemsType>) {
  const [selectedItems, setSelectedItems] = useState<SelectedItemsType[]>(selectedByDefault);

  useEffect(() => {
    onValueChange(selectedByDefault);
  }, []);

  function sortOffCategoriesNames(_categoriesNames: SelectedItemsType[]) {
    const categoriesNames: SelectedItemsType[] = [];
    _categoriesNames.forEach(listItemName => {
      if (
        items.find(item => {
          //@ts-ignore
          return item.children.find(shelter => shelter[uniqueKey] === listItemName);
        })
      )
        categoriesNames.push(listItemName);
    });

    return categoriesNames;
  }

  return (
    <GameOptionBase title={title} description={description}>
      <SectionedMultiSelect
        items={items}
        //@ts-ignore
        IconRenderer={Icon}
        uniqueKey={uniqueKey}
        displayKey={displayKey}
        subKey={subKey}
        selectText={selectText}
        alwaysShowSelectText={false}
        renderSelectText={renderSelectedText}
        selectedText={''}
        animateDropDowns
        readOnlyHeadings
        selectChildren
        highlightChildren
        expandDropDowns
        showDropDowns
        showChips={false}
        confirmText={'Окей'}
        searchPlaceholderText={searchPlaceholderText}
        onSelectedItemsChange={selectedItems => setSelectedItems(sortOffCategoriesNames(selectedItems))}
        selectedItems={selectedItems}
        onConfirm={() => onValueChange(selectedItems)}
        styles={StyleSheet.create({
          button: { backgroundColor: '#c3b5a8' },
          itemText: { fontFamily: 'RobotoSlabSemiBold', fontSize: adaptiveValue(16), letterSpacing: 0.7 },
        })}
      />
    </GameOptionBase>
  );
}
