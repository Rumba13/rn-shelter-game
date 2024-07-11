import { Alert, Button, Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Footer } from '@/src/shared/ui/footer/ui';
import { useEffect } from 'react';
import { connectToGameStore } from '@/src/feature/connect-to-game';

export type PropsType = {
  navigation: any;
};

export function ConnectedToGamePage({ navigation }: PropsType) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {}, [permission]);

  if (!permission?.granted) {
    requestPermission();
    return (
      <View>
        <Text>No camera permission :(</Text>
      </View>
    );
  }

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={s.header}>
        <Image
          style={s.headerImage}
          resizeMode={'contain'}
          source={require('@/assets/images/gameconnectionscreen/connect.png')}
        />
      </View>
      <View style={{ flex: 1, maxWidth: 290, marginHorizontal: 'auto' }}>
        <View style={{ flex: 1 }}>
          <CameraView
            facing={'back'}
            style={{ width: 300, height: 300, marginHorizontal: 'auto', justifyContent: 'flex-end' }}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={scanningResult => connectToGameStore.connectToGame(scanningResult.data, navigation)}></CameraView>
        </View>
        <Footer onNextButtonPress={() => {}} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  headerImage: {
    maxWidth: '90%',
    width: '100%',
    marginHorizontal: 'auto',
  },
  header: {
    paddingTop: 40,
  },
});
