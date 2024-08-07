import { useEffect, useState } from 'react';
import { CheckBox } from '@/src/shared/ui/check-box/ui';
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';
import { observer } from 'mobx-react';

type PropsType = {
  title: string;
  onValueChange: (value: boolean) => void;
  description: string;
  isEnable: boolean
};

export const GameOptionCheckbox = observer(({ title, onValueChange, description, isEnable }: PropsType) => {

  useEffect(() => {
  }, []);

  return (
    <GameOptionBase title={title} description={description}>
      <CheckBox
        style={s.gameOptionCheckBox}
        isToggled={isEnable}
        setIsToggled={onValueChange}
      />
    </GameOptionBase>
  );
});

const s: any = {
  gameOptionCheckBox: {
    marginTop: 20,
  },
};
