import { ImageButton, ImageButtonProps } from '@/src/shared/ui/image-button/ui';
import { StyleSheet } from 'react-native';

type PropsType = {
  onPress: () => void;
  height?: number | string
  width?: number | string
};

const helpButtonSize = 35;

export function QuestionButton({ onPress, height, width }: PropsType) {
  return (
    <ImageButton
      height={height}
      width={width}
      onPress={onPress}
      style={s.optionHelpButton}
      options={{
        yOffset: -3,
        xOffset: -2,
        yOffsetOnPress: -1,
        xOffSetOnPress: -1,
      }}
      buttonImage={require('@/assets/images/core/vopros_icon.png')}
      shadowImage={require('@/assets/images/gameconnectionscreen/info_icon_shadow.png')}
    />
  );
}

const s = StyleSheet.create({
  optionHelpButton: {
    position: 'absolute',
    minWidth: helpButtonSize,
    height: helpButtonSize,
    zIndex: 1000,
    right: 0,
    top: 0,
  },
});
