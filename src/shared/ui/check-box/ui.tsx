import { Animated, Easing, LayoutAnimation, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { ImageBackground } from 'expo-image';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

type PropsType = {
  style: any;
  isToggled: boolean;
  setIsToggled: (bool: boolean) => void;
};

export function CheckBox({ style, setIsToggled, isToggled }: PropsType) {
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const toggleOn = () => {
    Animated.timing(translateXAnim, {
      toValue: 47,
      duration: 200,
      useNativeDriver: false,
      isInteraction: true,
    }).start();
  };
  const toggleOff = () => {
    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
      isInteraction: true,
    }).start();
  };
  useEffect(() => {}, [translateXAnim]);

  return (
    <Animated.View style={{ ...s.checkBox, ...style }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsToggled(!isToggled);
          if (isToggled) {
            toggleOff();
          } else {
            toggleOn();
          }
        }}>
        <Animated.View style={s.checkBoxChecker}>
          <ImageBackground
            style={{ height: '100%' }}
            contentFit={'contain'}
            source={require('@/assets/images/gamecreationscreen/perekluchatel.webp')}>
            <Animated.Image
              style={{
                ...s.checkBoxImage,
                transform: [{ translateY: -26 }, { translateX: translateXAnim }],
              }}
              resizeMode={'contain'}
              source={require('@/assets/images/gamecreationscreen/perekluchatel_knopka.png')}
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
  },
  checkBoxChecker: {
    position: 'relative',
    flex: 2,
    height: 45,
    maxWidth: 100,
  },
  checkBoxImage: {
    position: 'absolute',
    top: '50%',
    maxWidth: '100%',
    width: 53,
  },
  checkBoxTitle: {
    flex: 1,
    fontSize: adaptiveValue(18),
    textAlign: 'center',
    alignSelf: 'end',
    marginLeft: 5,
    marginVertical: 'auto',
    fontFamily: 'RobotoSlabSemiBold',
  },
};
