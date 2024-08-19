import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { StyleSheet } from 'react-native';

type PropsType = {
  onPress: () => void;
  height?: number | string;
  width?: number | string;
};

const helpButtonSize = 35;

export function QuestionButton({ onPress, height, width }: PropsType) {
  return (
    <ImageButton
      style={s.optionHelpButton}
      buttonImage={require('@/assets/images/core/question-icon.webp')}
      shadowImage={require('@/assets/images/gameconnectionscreen/info-icon-shadow.webp')}
      width={width}
      minHeight={height}
      onPress={onPress}
      options={{
        yOffset: -3,
        xOffset: -2,
        yOffsetOnPress: -1,
        xOffSetOnPress: -1,
      }}
    />
  );
}

const s = StyleSheet.create({
  optionHelpButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    minWidth: helpButtonSize,
    height: helpButtonSize,
  },
});
