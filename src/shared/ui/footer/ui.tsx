import { StyleProp, View, ViewStyle } from 'react-native';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { Image } from 'expo-image';

type PropsType = {
  styles?: StyleProp<ViewStyle>;
  onNextButtonPress: () => void;
};

export function Footer({ styles, onNextButtonPress }: PropsType) {
  return (
    <View style={[s.footer, styles]}>
      <View style={s.wrapper}>
        <Image
          style={s.createGameButtonDetail}
          contentFit={'contain'}
          source={require('@/assets/images/gamecreationscreen/next_dec.png')}
        />
        <ImageButton
          buttonImage={require('@/assets/images/gamecreationscreen/next_button.png')}
          shadowImage={require('@/assets/images/gamecreationscreen/next_button_shadow.png')}
          style={s.button}
          height={60}
          onPress={onNextButtonPress}
        />
      </View>

      <Image
        style={s.footerDetail}
        contentFit={'contain'}
        contentPosition={'bottom'}
        source={require('@/assets/images/gamecreationscreen/cloud.png')}
      />
    </View>
  );
}

const s: any = {
  footer: {
    flex: 1,
    position: 'relative',
    maxHeight: 170,
    marginHorizontal: 35,
  },
  footerDetail: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  button: {
    zIndex: 100,
    maxWidth: '55%',
    width: '100%',
  },
  wrapper: {
    position: 'relative',
    bottom: '12.5%',
    marginRight: 'auto',
    marginTop: 'auto',
    flexDirection: 'row',
    zIndex: 100,
    height: 90, //TODO remove fixed height
  },
  createGameButtonWrapper: {
    position: 'relative',
  },
  createGameButtonDetail: {
    position: 'relative',
    height: 'auto',
    width: '20%',
    marginRight: 10,
    top: '5%',
  },
};
