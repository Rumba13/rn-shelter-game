import { Dimensions, PixelRatio } from 'react-native';

export const adaptiveValue = (size: number) =>
  PixelRatio.roundToNearestPixel((Dimensions.get('window').width / 380) * size);
