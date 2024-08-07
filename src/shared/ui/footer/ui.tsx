import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { Image } from 'expo-image';

type PropsType = {
  style?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
};

export function Footer({ style: footerStyle, onButtonPress }: PropsType) {
  return (
    <View style={[s.footer, footerStyle]}>
      <View style={s.buttonWrapper}>
        <Image
          style={s.buttonDetail}
          source={require('@/assets/images/gamecreationscreen/next_dec.webp')}
          contentFit={'contain'}
        />
        <ImageButton
          style={s.button}
          buttonImage={require('@/assets/images/gamecreationscreen/next_button.webp')}
          shadowImage={require('@/assets/images/gamecreationscreen/next_button_shadow.webp')}
          onPress={onButtonPress}
        />
      </View>

      <Image
        style={s.footerDetail}
        source={require('@/assets/images/gamecreationscreen/cloud.webp')}
        contentFit={'contain'}
        contentPosition={'bottom'}
      />
    </View>
  );
}

const s = StyleSheet.create({
  footer: {
    position: 'relative',
    flex: 1,
    maxHeight: 170,
  },
  footerDetail: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    zIndex: 30,
    width: '100%',
    maxWidth: '55%',
  },
  buttonWrapper: {
    position: 'relative',
    bottom: '12.5%',
    zIndex: 20,
    flexDirection: 'row',
    height: 90, //TODO remove fixed height if needed
    marginTop: 'auto',
    marginRight: 'auto',
  },
  createGameButtonWrapper: {
    position: 'relative',
  },
  buttonDetail: {
    position: 'relative',
    top: '5%',
    width: '20%',
    height: 'auto',
    marginRight: 10,
  },
});
