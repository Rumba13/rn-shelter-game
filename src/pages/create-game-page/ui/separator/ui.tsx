import { Alert,  TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'expo-image';

export function Separator() { //Legacy
  return (
    <View style={s.separatorWrapper}>
      <Image
        style={s.separatorDetail}
        contentFit={'contain'}
        source={require('@/assets/images/gamecreationscreen/razdelenije_premium.webp')}
      />
      <TouchableWithoutFeedback onPress={() => Alert.alert('Я такая толстая!')}>
        <Image
          style={s.separatorImage}
          contentFit={'cover'}
          source={require('@/assets/images/cook.webp')}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const s: any = {
  separatorWrapper: {
    position: 'relative',
    paddingBottom: 25,
  },
  separatorImage: {
    maxWidth: '100%',
    position: 'absolute',
    top: -5,
    height: 70,
    left: '34.5%',
    width: 70,
    borderRadius: 20,
  },
  separatorDetail: {
    maxWidth: '100%',
  },
};
