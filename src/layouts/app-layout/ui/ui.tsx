import { Alert, Dimensions, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

type PropsType = {
  children: React.ReactNode;
};

export function AppLayout({ children }: PropsType) {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
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
    <View style={s.root}>
      <ImageBackground
        source={require('../../../../assets/images/mainscreen/background.png')}
        style={s.background}
        resizeMode={'stretch'}>
        {children}
      </ImageBackground>
    </View>
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
