import { Dimensions, PixelRatio } from 'react-native';

const referenceSize = 380;

export const adaptiveValue = (size: number) =>
  PixelRatio.roundToNearestPixel((Dimensions.get('window').width / referenceSize) * size);
