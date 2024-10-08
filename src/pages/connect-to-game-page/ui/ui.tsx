import { StyleSheet, View } from 'react-native';
import { Footer } from '@/src/shared/ui/footer/ui';
import { ScanQRCode } from '@/src/pages/connect-to-game-page/ui/scan-qr-code/ui';
import { Image } from 'expo-image';

export type PropsType = {
  navigation: any;
};

export function ConnectToGamePage({ navigation }: PropsType) {
  return (
    <View style={s.connectToGamePage}>
      <Image
        style={s.headerTitleImage}
        contentFit={'contain'}
        source={require('@/assets/images/gameconnectionscreen/connect.webp')}
      />
      <View style={s.content}>
        <ScanQRCode navigation={navigation} />
      </View>
      <View style={{ flex: 1 }}></View>
      <Footer style={{ marginHorizontal: 35 }} />
    </View>
  );
}

const s = StyleSheet.create({
  connectToGamePage: {
    paddingTop: 40,
    height: '100%',
    width: '100%',
  },
  content: {
    maxWidth: 290,
    flex: 1,
    marginHorizontal: 'auto',
  },
  headerTitleImage: {
    maxWidth: '90%',
    width: '100%',
    marginHorizontal: 'auto',
  },
});
