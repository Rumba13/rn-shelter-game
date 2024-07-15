import { Alert, Image, StyleProp, View, ViewStyle } from 'react-native';
import { ImageButton } from '@/src/shared/ui/image-button/ui';

type PropsType = {
  styles?: StyleProp<ViewStyle>;
  onNextButtonPress: () => void;
};

export function Footer({ styles, onNextButtonPress }: PropsType) {
  return (
    <View style={[s.footer, styles]}>
      <View style={s.createGameButtonWrapper}>
        <Image
          style={s.createGameButtonDetail}
          resizeMode={'contain'}
          source={require('@/assets/images/gamecreationscreen/next_dec.png')}
        />
        <ImageButton
          buttonImage={require('@/assets/images/gamecreationscreen/next_button.png')}
          shadowImage={require('@/assets/images/gamecreationscreen/next_button_shadow.png')}
          style={s.createGameButton}
          height={65}
          onPress={onNextButtonPress}
        />
      </View>

      <Image
        style={s.footerDetail}
        resizeMode={'contain'}
        source={require('@/assets/images/gamecreationscreen/cloud.png')}
      />
    </View>
  );
}

const s: any = {
  footer: {
    display: 'flex',
    flexBasis: 'auto',
    position: 'relative',
    flexShrink: 1,
    maxWidth: '100%',
  },
  footerDetail: {
    width: '100%',
    height: 68,
    position: 'relative',
  },
  createGameButton: {
    position: 'relative',
    left: 0,
    top: 0,
  },
  createGameButtonWrapper: {
    position: 'relative',
    top: 27,
  },
  createGameButtonDetail: {
    position: 'absolute',
    width: 55,
    height: '100%',
    left: 0,
    top: 13,
  },
};
