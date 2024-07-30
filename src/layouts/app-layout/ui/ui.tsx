import { Alert, Dimensions, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

type PropsType = {
  children: React.ReactNode;
};


const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT - STATUS_BAR_HEIGHT;

export function AppLayout({ children }: PropsType) {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
    RobotoSlabNormal: require('@/assets/fonts/RobotoSlab-Regular.ttf'),
    RobotoSlabExtraBold: require('@/assets/fonts/RobotoSlab-ExtraBold.ttf'),
    RobotoSlabMedium: require('@/assets/fonts/RobotoSlab-Medium.ttf'),
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    setTimeout(() => {
      StatusBar.setTranslucent(true); //TODO find component that overriding the properties
      StatusBar.setBackgroundColor('#c3b5a8');
    }, 100);
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={s.root}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../../../assets/images/mainscreen/background.png')}
            style={s.background}
            resizeMode={'stretch'}>
            {children}
          </ImageBackground>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  root: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    margin: 0,
    padding: 0,

  },
});

//borderWidth:3,
//borderColor: "#000000",
