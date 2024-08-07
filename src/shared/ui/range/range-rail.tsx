import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

type PropsType = {
  trackImage: any
}

export function RangeRail({ trackImage }: PropsType) {
  return (
    <Image
      style={s.sliderTrack}
      source={trackImage}
      contentFit={'contain'}
    />
  );
}

const s = StyleSheet.create({
  sliderTrack: {
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
});