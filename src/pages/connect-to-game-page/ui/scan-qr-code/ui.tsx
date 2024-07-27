import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { CameraView, PermissionStatus, useCameraPermissions } from 'expo-camera';
import { connectToGameStore } from '@/src/feature/connect-to-game';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';

type PropsType = {
  navigation: any;
};

export function ScanQRCode({ navigation }: PropsType) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  if (!permission) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      {!(isCameraOpen && permission.granted) && (
        <ImageButton
          style={s.qrCode}
          onPress={() => {
            requestPermission();
            setIsCameraOpen(true);
          }}
          buttonImage={require('@/assets/images/gameconnectionscreen/qr.webp')}
          shadowImage={require('@/assets/images/gameconnectionscreen/qr_shadow.webp')}
        />
      )}
      {isCameraOpen && permission.granted && (
        <CameraView
          facing={'back'}
          style={{ width: 300, height: 300 }}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanningResult =>
            connectToGameStore.connectToGame(scanningResult.data, navigation)
          }></CameraView>
      )}
      <Text style={s.qrTitle}>Отсканируй курлык код</Text>
    </View>
  );
}

const s = StyleSheet.create({
  qrCode: {
    maxWidth: '100%',
    width: 140,
    height: 140,
  },
  qrTitle: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 20,
    letterSpacing: 1.5,
    color: '#232322',
    fontFamily: 'RobotoSlabSemiBold',
  },
});
