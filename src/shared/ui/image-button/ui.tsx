import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { ImageBackground } from 'expo-image';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

type PropsType = {
  style?: StyleProp<ViewStyle>;
  buttonImage: any;
  shadowImage: any;
  width?: number | string;
  minHeight?: number | string;
  onPress?: (event: GestureResponderEvent) => void;
  options: ButtonOptionsType;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  maxFontSizeMultiplier?: number;
};
type ButtonOptionsType = {
  xOffSetOnPress: number;
  yOffsetOnPress: number;
  xOffset: number;
  yOffset: number;
}
export { PropsType as ImageButtonProps };

const defaultOptions: ButtonOptionsType = {
  xOffset: -5,
  yOffset: -5,
  xOffSetOnPress: -3,
  yOffsetOnPress: -2,
};
const buttonAnimationDuration = 35;

export function ImageButton({
                              buttonImage,
                              shadowImage,
                              width,
                              minHeight,
                              style: buttonContainerStyle,
                              onPress,
                              options = defaultOptions,
                              title,
                              maxFontSizeMultiplier,
                              titleStyle,
                            }: PropsType) {
  const buttonTranslateXAnim = useSharedValue(options.xOffset);
  const buttonTranslateYAnim = useSharedValue(options.yOffset);

  const unPressButton = () => {
    buttonTranslateXAnim.value = options.xOffset;
    buttonTranslateYAnim.value = options.yOffset;
  };
  const pressButton = () => {
    buttonTranslateXAnim.value = options.xOffSetOnPress;
    buttonTranslateYAnim.value = options.yOffsetOnPress;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(buttonTranslateXAnim.value, {
          easing: Easing.linear,
          duration: buttonAnimationDuration,
        }),
      },
      {
        translateY: withTiming(buttonTranslateYAnim.value, {
          easing: Easing.linear,
          duration: buttonAnimationDuration,
        }),
      },
    ],
  }));

  return (
    <Animated.View style={[s.buttonContainer, buttonContainerStyle, { width, minHeight }]}>
      <ImageBackground style={s.buttonShadow} source={shadowImage} contentFit={'contain'}>
        <Animated.View style={animatedStyles}>
          <ImageBackground style={[s.buttonImage]} source={buttonImage} contentFit={'contain'}>
            <Text style={[s.title, titleStyle]} maxFontSizeMultiplier={maxFontSizeMultiplier}
                  adjustsFontSizeToFit>{title}</Text>
          </ImageBackground>
        </Animated.View>
      </ImageBackground>

      <TouchableWithoutFeedback style={s.buttonWrapper} onPress={onPress} onPressIn={pressButton}
                                onPressOut={unPressButton}>
        <View style={s.button}></View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const s: any = {
  buttonContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: adaptiveValue(16),
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  buttonShadow: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttonImage: {
    position: 'relative',
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: '100%',
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 12,
    maxHeight: '100%',
    minHeight: '100%',
  },
  buttonWrapper: {},
};
