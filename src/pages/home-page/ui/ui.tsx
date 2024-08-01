import { Alert, Dimensions, View, Text, StatusBar } from 'react-native';
import React from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { InfoButtonAndModal } from '@/src/pages/home-page/ui/info-button/ui';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';

type PropsType = {
  navigation: any;
};

export const HomePage = ({ navigation }: PropsType) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'top', 'right']}>
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
                buttonImage={require('../../../../assets/images/mainscreen/connect_button.webp')}
                shadowImage={require('../../../../assets/images/mainscreen/button_shadow_2.webp')}
                width={'100%'}
                style={{ marginBottom: 5 }}
                onPress={() => navigation.navigate('connect-to-game-page')}
              />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <ImageButton
                  buttonImage={require('../../../../assets/images/mainscreen/howtoplay_button.webp')}
                  shadowImage={require('../../../../assets/images/mainscreen/button_shadow_1.webp')}
                  style={{ marginRight: 7 }}
                />
                <ImageButton
                  buttonImage={require('../../../../assets/images/mainscreen/create_button.webp')}
                  shadowImage={require('../../../../assets/images/mainscreen/button_shadow_1.webp')}
                  onPress={() => navigation.navigate('create-game-page')}
                />
              </View>

              <ImageButton
                buttonImage={require('../../../../assets/images/mainscreen/premium_button3.webp')}
                shadowImage={require('../../../../assets/images/mainscreen/button_shadow_2.webp')}
                width={'100%'}
                style={{ marginTop: 5 }}
                onPress={() => Alert.alert('Купи мне трюфель!')}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              maxHeight: 80,
              paddingTop: 5,
              paddingBottom: 5,
              flex: 1,
            }}>
            <InfoButtonAndModal />
            <ImageButton
              buttonImage={require('../../../../assets/images/mainscreen/zakazat_igru.webp')}
              shadowImage={require('../../../../assets/images/mainscreen/zakazat_igru_shadow.webp')}
              style={{ marginLeft: 10, flex: 4 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const s: any = {
  homePage: {
    height: '100%',
    marginHorizontal: 40,
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
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
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'end',
    paddingLeft: 9,
    paddingRight: 3,
    paddingTop: 7,
    paddingBottom: 1,
  },
  buttonsBackground: {
    width: '100%',
    aspectRatio: 569 / 809, //TODO get aspect ratio from image
  },
};
