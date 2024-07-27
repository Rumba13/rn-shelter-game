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
          source={require('@/assets/images/gamecreationscreen/next_dec.webp')}
        />
        <ImageButton
          buttonImage={require('@/assets/images/gamecreationscreen/next_button.webp')}
          shadowImage={require('@/assets/images/gamecreationscreen/next_button_shadow.webp')}
          style={s.button}
          options={{ xOffset: -3, yOffset: -3, xOffSetOnPress: -1, yOffsetOnPress: -1 }}
          height={65}
          width={165}
          onPress={onNextButtonPress}
        />
      </View>

      <Image
        style={s.footerDetail}
        resizeMode={'contain'}
        source={require('@/assets/images/gamecreationscreen/cloud.webp')}
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
  button: {
    position: 'relative',
    zIndex: 100,
    left: 0,
    top: 0,
    alignSelf: 'center',
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
