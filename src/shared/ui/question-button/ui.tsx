import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { StyleSheet } from 'react-native';

type PropsType = {
  onPress: () => void;
}

const helpButtonSize = 35;

export function QuestionButton({ onPress }: PropsType) {
  return <ImageButton
    onPress={onPress}
    style={s.optionHelpButton}
    options={{
      yOffset: -3,
      xOffset: -2,
      yOffsetOnPress: -1,
      xOffSetOnPress: -1,
    }}
    buttonImage={require('@/assets/images/core/vopros_icon.webp')}
    shadowImage={require('@/assets/images/gameconnectionscreen/info_icon_shadow.webp')}
  />;
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