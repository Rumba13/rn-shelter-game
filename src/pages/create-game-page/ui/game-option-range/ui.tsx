import { View, Text } from 'react-native';
import { ImageBackground } from 'expo-image';

import { Range } from '@/src/shared/ui/range/ui';
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

type PropsType = {
  title: string;
  onValueChanged: (value: number) => void;
  selectedTitle: string;
  min: number;
  max: number;
  defaultValue: number;
  descriptionHeight: number;
  description: string;
};

export function GameOptionRange({
  title,
  onValueChanged,
  max,
  min,
  selectedTitle,
  defaultValue,
  descriptionHeight,
  description,
}: PropsType) {
  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <View style={s.selectedTitleWrapper}>
        <ImageBackground
          source={require('@/assets/images/gamecreationscreen/create_text_frame.webp')}
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
          trackImage: require('@/assets/images/gamecreationscreen/picker_line_2_gradient.webp'),
          pickerImage: require('@/assets/images/gamecreationscreen/picker1.webp'),
        }}
      />
    </GameOptionBase>
  );
}

const s: any = {
  selectedTitleWrapper: {
    width: '100%',
    marginTop: 5,
    height: 40,
    maxHeight: 40,
  },
  selectedTitle: {
    fontSize: adaptiveValue(19),
    textAlign: 'center',
    color: '#98795d',
    fontFamily: 'RobotoSlabSemiBold',
    letterSpacing: 1,
    paddingVertical: 8,
    lineHeight: 20,
  },
};
