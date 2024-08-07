import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { PickerSelectProps } from 'react-native-picker-select';
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';
import { observer } from 'mobx-react';

type PropsType = {
  title: string;
  items: PickerSelectProps['items'];
  onValueChange: PickerSelectProps['onValueChange'];
  description: string;
};

export const GameOptionSelect = observer(({ title, items, onValueChange, description }: PropsType) => {
  return (
    <GameOptionBase title={title} description={description}>
      <RNPickerSelect onValueChange={onValueChange} items={items} placeholder={{}} />
    </GameOptionBase>
  );
});
