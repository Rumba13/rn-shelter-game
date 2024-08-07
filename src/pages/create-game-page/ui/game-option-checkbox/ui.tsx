import { useEffect, useState } from 'react';
import { CheckBox } from '@/src/shared/ui/check-box/ui';
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';

type PropsType = {
  title: string;
  //TODO remove ?
  onValueChange?: (value: boolean) => void;
  descriptionHeight: number;
  description: string;
};

export function GameOptionCheckbox({ title, onValueChange, descriptionHeight, description }: PropsType) {
  const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false);

  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <CheckBox
        checkboxStyle={s.gameOptionCheckBox}
        isToggled={isOptionEnabled}
        setIsToggled={isEnable => {
          if (onValueChange) {
            //TODO read upper TODO
            onValueChange(isEnable);
          }
          setIsOptionEnabled(isEnable);
        }}
      />
    </GameOptionBase>
  );
}

const s: any = {
  gameOptionCheckBox: {
    marginTop: 20,
    marginLeft: 'auto',
  },
};
