import { Alert, Button, Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Footer } from '@/src/shared/ui/footer/ui';
import { useEffect } from 'react';
import { connectToGameStore } from '@/src/feature/connect-to-game';
import { ScanQRCode } from '@/src/pages/connect-to-game-page/ui/scan-qr-code/ui';

export type PropsType = {
  navigation: any;
};

export function ConnectedToGamePage({ navigation }: PropsType) {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={s.header}>
        <Image
          style={s.headerImage}
          resizeMode={'contain'}
          source={require('@/assets/images/gameconnectionscreen/connect.webp')}
        />
      </View>
      <View style={{ maxWidth: 290, marginHorizontal: 'auto', flex: 1, width: '100%' }}>
        <View style={{ flex: 1, width: '100%', maxHeight: '100%' }}>
          <ScanQRCode navigation={navigation} />
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
