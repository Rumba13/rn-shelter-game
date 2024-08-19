import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'expo-image';
import { databaseStore } from '@/src/shared/model/database-store';
import { useSQLiteContext } from 'expo-sqlite/next';

type PropsType = {
  children: React.ReactNode;
};

export function AppLayout({ children }: PropsType) {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
    RobotoSlabNormal: require('@/assets/fonts/RobotoSlab-Regular.ttf'),
    RobotoSlabExtraBold: require('@/assets/fonts/RobotoSlab-ExtraBold.ttf'),
    RobotoSlabMedium: require('@/assets/fonts/RobotoSlab-Medium.ttf'),
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  databaseStore.database = useSQLiteContext();

  useEffect(() => {
    setTimeout(() => {
      StatusBar.setTranslucent(true); //TODO find component that overriding this properties
      StatusBar.setBackgroundColor('#c3b5a8');
    }, 100);
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) return;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={s.root}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../../../assets/images/mainscreen/background.webp')}
            style={s.background}
            contentFit={'fill'}>
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
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
  },
});
