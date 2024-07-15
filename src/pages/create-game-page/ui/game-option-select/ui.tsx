import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerSelectProps } from 'react-native-picker-select';
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';

type PropsType = {
  title: string;
  items: PickerSelectProps['items'];
  onValueChange: PickerSelectProps['onValueChange'];
  descriptionHeight: number;
  description: string;
};

export function GameOptionSelect({ title, items, onValueChange, descriptionHeight, description }: PropsType) {
  const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false);

  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <RNPickerSelect onValueChange={onValueChange} items={items} placeholder={{}} />
    </GameOptionBase>
  );
}
