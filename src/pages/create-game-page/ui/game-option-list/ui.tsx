import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';
import { useEffect, useState } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SectionedMultiSelectProps } from 'react-native-sectioned-multi-select';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

type PropsType<ItemsType> = {
  title: string;
  descriptionHeight: number;
  description: string;
  renderSelectedText: (props: SectionedMultiSelectProps<ItemsType>) => void;
  items: ItemsType[]; //TODOsadd
  uniqueKey: string;
  displayKey: string;
  selectText: string;
  searchPlaceholderText: string;
  subKey?: string;
  onValueChange: (selectedItems: string[]) => void;
  selectedByDefault?: string[];
};

export function GameOptionList<ItemsType>({
  title,
  descriptionHeight,
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
}: PropsType<ItemsType>) {
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedByDefault);

  useEffect(() => {
    onValueChange(selectedByDefault);
  }, []);

  function sortOffCategoriesNames(_sheltersNames: string[]) {
    const sheltersNames: string[] = [];
    _sheltersNames.forEach(listItemName => {
      if (
        items.find(item => {
          //TODO fix ts-ignore Ха-ха будто на эту хуйню ебанную всем не похуй?
          //@ts-ignore
          return item.children.find(shelter => shelter.name === listItemName);
        })
      )
        sheltersNames.push(listItemName);
    });

    return sheltersNames;
  }

  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <SectionedMultiSelect
        items={items}
        //@ts-ignore
        IconRenderer={Icon}
        uniqueKey={uniqueKey}
        displayKey={displayKey}
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
        subKey={subKey}
        showChips={false}
        confirmText={'Окей'}
        searchPlaceholderText={searchPlaceholderText}
        onSelectedItemsChange={selectedItems => setSelectedItems(sortOffCategoriesNames(selectedItems))}
        selectedItems={selectedItems}
        onConfirm={() => onValueChange(selectedItems)}
        styles={StyleSheet.create({
          button: { backgroundColor: '#c3b5a8' },
          itemText: { fontFamily: 'RobotoSlabSemiBold', fontSize: 16, letterSpacing: 0.7 },
        })}
      />
    </GameOptionBase>
  );
}
