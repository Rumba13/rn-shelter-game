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
      yOffset: -2,
      yOffsetOnPress: -1,
      xOffset: -1,
      xOffSetOnPress: 0,
    }}
    buttonImage={require('@/assets/images/core/vopros_icon.png')}
    shadowImage={require('@/assets/images/gameconnectionscreen/info_icon_shadow.png')}
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