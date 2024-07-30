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

type PropsType = {
  buttonImage: any;
  shadowImage: any;
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  options?: {
    xOffSetOnPress?: number;
    yOffsetOnPress?: number;
    xOffset?: number;
    yOffset?: number;
  };
  title?: string;
  styleTitle?: StyleProp<TextStyle>;
  maxFontSizeMultiplier?: number;
};

const defaultXOffset = -5;
const defaultXOnClickOffset = -3;
const defaultYOffset = -5;
const defaultYOnClickOffset = -2;
const animationDuration = 35;

export function ImageButton({
                              buttonImage,
                              shadowImage,
                              width,
                              height,
                              style,
                              onPress,
                              options,
                              title,
                              maxFontSizeMultiplier,
                              styleTitle,
                            }: PropsType) {
  const buttonImageXOffSet = options?.xOffset || defaultXOffset;
  const buttonImageYOffSet = options?.yOffset || defaultYOffset;
  const buttonImageOnPressXOffSet = options?.xOffSetOnPress || defaultXOnClickOffset;
  const buttonImageOnPressYOffSet = options?.yOffsetOnPress || defaultYOnClickOffset;
  const buttonTranslateXAnim = useSharedValue(buttonImageXOffSet);
  const buttonTranslateYAnim = useSharedValue(buttonImageYOffSet);

  const unPressButton = () => {
    buttonTranslateXAnim.value = buttonImageXOffSet;
    buttonTranslateYAnim.value = buttonImageYOffSet;
  };
  const pressButton = () => {
    buttonTranslateXAnim.value = buttonImageOnPressXOffSet;
    buttonTranslateYAnim.value = buttonImageOnPressYOffSet;
  };

  const onPressIn = () => {
    pressButton();
  };
  const onPressOut = () => {
    unPressButton();
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(buttonTranslateXAnim.value, {
          easing: Easing.linear,
          duration: animationDuration,
        }),
      },
      {
        translateY: withTiming(buttonTranslateYAnim.value, {
          easing: Easing.linear,
          duration: animationDuration,
        }),
      },
    ],
  }));

  return (
    <Animated.View style={[s.buttonContainer, style, { width, minHeight: height }]}>
      <ImageBackground source={shadowImage} style={s.buttonShadow} contentFit={'contain'}>
        <Animated.View style={[{ maxHeight: '100%' }, animatedStyles]}>
          <ImageBackground source={buttonImage} style={[s.buttonImage]} contentFit={'contain'}>
            <Text style={[s.title, styleTitle]} maxFontSizeMultiplier={maxFontSizeMultiplier} adjustsFontSizeToFit>
              {title}
            </Text>
          </ImageBackground>
        </Animated.View>
      </ImageBackground>

      <TouchableWithoutFeedback style={s.buttonWrapper} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
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
    fontSize: 16,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  buttonShadow: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  buttonImage: {
    maxWidth: '100%',
    position: 'relative',
    maxHeight: '100%',
    minHeight: '100%',
  },
  buttonImage__pressed: {},
  button: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 12,
    maxHeight: '100%',
    minHeight: '100%',
  },
  buttonWrapper: {},
};
