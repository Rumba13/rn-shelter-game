import { Alert, Image, ImageBackground, View } from 'react-native';
import React from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { InfoButton } from '@/src/pages/home-page/ui/info-button/ui';

type PropsType = {
  navigation: any;
};

export const HomePage = ({ navigation }: PropsType) => {
  return (
    <View style={s.homePage}>
      <View style={s.mainContent}>
        <Image style={s.logo} source={require('../../../../assets/images/mainscreen/logo.png')} />
        <ImageBackground
          style={s.buttons}
          resizeMode="stretch"
          source={require('../../../../assets/images/mainscreen/black_box_main_menu.png')}>
          <ImageButton
            buttonImage={require('../../../../assets/images/mainscreen/connect_button.png')}
            shadowImage={require('../../../../assets/images/mainscreen/button_shadow_2.png')}
            height={130}
            width={'100%'}
            style={{ marginBottom: 5 }}
            onPress={() => navigation.navigate('connect-to-game-page')}
          />

          <ImageButton
            buttonImage={require('../../../../assets/images/mainscreen/howtoplay_button.png')}
            shadowImage={require('../../../../assets/images/mainscreen/button_shadow_1.png')}
            height={130}
            width={130}
          />

          <ImageButton
            buttonImage={require('../../../../assets/images/mainscreen/create_button.png')}
            shadowImage={require('../../../../assets/images/mainscreen/button_shadow_1.png')}
            height={130}
            width={130}
            onPress={() => navigation.navigate('create-game-page')}
          />

          <ImageButton
            buttonImage={require('../../../../assets/images/mainscreen/premium_button3.png')}
            shadowImage={require('../../../../assets/images/mainscreen/button_shadow_2.png')}
            height={130}
            width={'100%'}
            style={{ marginTop: 5 }}
            onPress={() => Alert.alert('Купи мне трюфель!')}
          />
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            maxHeight: 80,
            marginTop: 10,
            width: '100%',
          }}>
          <InfoButton />
          <ImageButton
            buttonImage={require('../../../../assets/images/mainscreen/zakazat_igru.png')}
            shadowImage={require('../../../../assets/images/mainscreen/zakazat_igru_shadow.png')}
            height={'auto'}
            width={210}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

const s: any = {
  homePage: {
    height: '100%',
    maxWidth: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    width: 240,
    height: 240,
    objectFit: 'contain',
    marginTop: 10,
    marginBottom: 15,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
    alignItems: 'end',
    paddingTop: 10,
    paddingRight: 2,
    paddingLeft: 7,
    paddingBottom: 1,
  },
};
