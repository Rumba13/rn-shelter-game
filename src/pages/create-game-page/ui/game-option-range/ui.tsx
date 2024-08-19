import { View, Text } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Range } from '@/src/shared/ui/range/ui';
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

type PropsType = {
  title: string;
  onValueChanged: (value: number) => void;
  selectedTitle: string;
  min: number;
  max: number;
  defaultValue: number;
  description: string;
};

export const GameOptionRange = observer(({
                                           title,
                                           onValueChanged,
                                           max,
                                           min,
                                           selectedTitle,
                                           defaultValue,
                                           description,
                                         }: PropsType) => {
  useEffect(() => {
  }, []);

  return (
    <GameOptionBase title={title} description={description}>
      <View style={s.selectedTitleWrapper}>
        <ImageBackground
          source={require('@/assets/images/gamecreationscreen/create-text-frame.webp')}
          contentFit={'fill'}>
          <Text style={s.selectedTitle}>{selectedTitle}</Text>
        </ImageBackground>
      </View>
      <Range
        onValueChanged={onValueChanged}
        defaultValue={defaultValue}
        max={max}
        min={min}
        options={{
          trackImage: require('@/assets/images/gamecreationscreen/picker-track-gradient.webp'),
          pickerImage: require('@/assets/images/gamecreationscreen/picker-icon-inactive.webp'),
        }}
      />
    </GameOptionBase>
  );
});

const s: any = {
  selectedTitleWrapper: {
    width: '100%',
    height: 40,
    maxHeight: 40,
    marginTop: 5,
  },
  selectedTitle: {
    paddingVertical: 8,
    fontSize: adaptiveValue(19),
    textAlign: 'center',
    fontFamily: 'RobotoSlabSemiBold',
    lineHeight: 20,
    letterSpacing: 1,
    color: '#98795d',
  },
};
