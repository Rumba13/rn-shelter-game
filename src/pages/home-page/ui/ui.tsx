import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { InfoButtonAndModal } from '@/src/pages/home-page/ui/info-button/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';

type PropsType = {
  navigation: any;
};

export const HomePage = ({ navigation }: PropsType) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={s.homePage}>
        <View style={s.mainContent}>
          <Image
            style={s.logo}
            source={require('../../../../assets/images/mainscreen/logo.webp')}
            contentFit={'contain'}
          />
          <ImageBackground
            style={s.buttonsBackground}
            contentFit="fill"
            source={require('../../../../assets/images/mainscreen/black_box_main_menu.webp')}>
            <View style={s.buttons}>
              <ImageButton
                style={{ marginBottom: 5 }}
                buttonImage={require('../../../../assets/images/mainscreen/connect_button.webp')}
                shadowImage={require('../../../../assets/images/mainscreen/button_shadow_2.webp')}
                onPress={() => navigation.navigate('connect-to-game-page')}
              />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <ImageButton
                  style={{ marginRight: 7 }}
                  buttonImage={require('../../../../assets/images/mainscreen/howtoplay_button.webp')}
                  shadowImage={require('../../../../assets/images/mainscreen/button_shadow_1.webp')}
                />
                <ImageButton
                  buttonImage={require('../../../../assets/images/mainscreen/create_button.webp')}
                  shadowImage={require('../../../../assets/images/mainscreen/button_shadow_1.webp')}
                  onPress={() => navigation.navigate('create-game-page')}
                />
              </View>

              <ImageButton
                style={{ marginTop: 5 }}
                buttonImage={require('../../../../assets/images/mainscreen/premium_button3.webp')}
                shadowImage={require('../../../../assets/images/mainscreen/button_shadow_2.webp')}
                onPress={() => Alert.alert('Купи мне трюфель!')}
              />
            </View>
          </ImageBackground>
          <View style={s.footer}>
            <InfoButtonAndModal />
            <ImageButton
              style={{ marginLeft: 10, flex: 4 }}
              buttonImage={require('../../../../assets/images/mainscreen/zakazat_igru.webp')}
              shadowImage={require('../../../../assets/images/mainscreen/zakazat_igru_shadow.webp')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 80,
    paddingTop: 5,
    paddingBottom: 5,
  },
  homePage: {
    flex: 1,
    height: '100%',
    marginHorizontal: 40,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 240,
    marginTop: 10,
    marginBottom: 15,
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingTop: 7,
    paddingRight: 3,
    paddingBottom: 1,
    paddingLeft: 9,
  },
  buttonsBackground: {
    width: '100%',
    aspectRatio: 569 / 809, //TODO get aspect ratio from image
  },
});
