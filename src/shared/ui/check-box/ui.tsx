import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  LayoutAnimation,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { Grayscale } from 'react-native-color-matrix-image-filters';

type PropsType = {
  style: any;
  isToggled: boolean;
  setIsToggled: (bool: boolean) => void;
};

export function CheckBox({ style, setIsToggled, isToggled }: PropsType) {
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  });

  useEffect(() => {

  }, [fontsLoaded]);

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
  useEffect(() => {}, [translateXAnim, fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

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
            resizeMode={'contain'}
            source={require('@/assets/images/gamecreationscreen/perekluchatel.png')}>
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
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    fontFamily: 'RobotoSlabSemiBold',
  },
};
