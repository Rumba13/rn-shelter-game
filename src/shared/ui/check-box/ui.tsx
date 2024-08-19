import { StyleProp, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { ImageBackground } from 'expo-image';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type PropsType = {
  style: StyleProp<ViewStyle>;
  isToggled: boolean;
  setIsToggled: (value: boolean) => void;
};
const animationDuration = 140;
const checkBoxToggleOnAtPx = 47;
const checkBoxToggleOffAtPx = 0;

export function CheckBox({ style: checkboxStyle, setIsToggled, isToggled }: PropsType) {
  const translateXAnim = useSharedValue(checkBoxToggleOffAtPx);

  const animateCheckBoxOn = () => translateXAnim.value = checkBoxToggleOnAtPx;
  const animateCheckBoxOff = () => translateXAnim.value = checkBoxToggleOffAtPx;

  const toggleCheckBox = () => {
    setIsToggled(!isToggled);
    isToggled ? animateCheckBoxOff() : animateCheckBoxOn();
  };

  const animatedCheckerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -26 },
      {
        translateX: withTiming(translateXAnim.value, {
          easing: Easing.ease,
          duration: animationDuration,
        }),
      }],
  }));

  return (
    <Animated.View style={[s.checkBox, checkboxStyle]}>
      <TouchableWithoutFeedback onPress={toggleCheckBox}>
        <Animated.View style={s.checkBoxChecker}>
          <ImageBackground
            style={{ height: '100%' }}
            contentFit={'contain'}
            source={require('@/assets/images/gamecreationscreen/checkbox-background.webp')}>
            <Animated.Image
              style={[s.checkBoxImage, animatedCheckerStyle]}
              resizeMode={'contain'}
              source={require('@/assets/images/gamecreationscreen/checkbox-icon.png')}
            />
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Text style={s.checkBoxTitle}>{isToggled ? 'Вкл.' : 'Выкл.'}</Text>
    </Animated.View>
  );
}

const s: any = {
  checkBox: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 170,
    marginTop: 16,
    marginBottom: 5,
    marginLeft: 'auto',
  },
  checkBoxChecker: {
    position: 'relative',
    flex: 2,
    maxWidth: 100,
    height: 45,
  },
  checkBoxImage: {
    position: 'absolute',
    top: '50%',
    width: 53,
    maxWidth: '100%',
  },
  checkBoxTitle: {
    flex: 1,
    alignSelf: 'end',
    marginLeft: 5,
    marginVertical: 'auto',
    fontSize: adaptiveValue(18),
    textAlign: 'center',
    fontFamily: 'RobotoSlabSemiBold',
  },
};
