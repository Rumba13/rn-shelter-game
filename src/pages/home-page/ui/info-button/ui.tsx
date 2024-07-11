import {
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Animated,
} from 'react-native';
import { OverlayModal } from '@/src/shared/ui/overlay-modal/ui';

import { useModal } from '@/src/shared/lib/use-modal';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import ScrollView = Animated.ScrollView;
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
//TODO refactor
//TODO make working scroll
export function InfoButton() {
  const { isModalOpened, setIsModalOpened, toggleModal } = useModal();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../../../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {}, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <Image
          style={s.infoButtonIcon}
          resizeMode={'contain'}
          source={require('../../../../../assets/images/mainscreen/info_button.png')}
        />
      </TouchableWithoutFeedback>
      <OverlayModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}>
        <View style={s.modalContent}>
          <ImageBackground
            source={require('../../../../../assets/images/popup/additional_info_background.png')}
            resizeMode={'contain'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageButton
              buttonImage={require('../../../../../assets/images/popup/close.png')}
              shadowImage={require('../../../../../assets/images/popup/close_shadow.png')}
              height={40}
              width={40}
              onPress={() => setIsModalOpened(false)}
              style={s.closeButton}
            />
            <Text style={{ height: '100%' }}></Text>

            <SafeAreaView style={s.privacyPolicy}>
              <ScrollView>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'SpaceMono',
                    lineHeight: 18,
                  }}>
                  1. С 29 июня запретить продажу трюфеля физическим лицам. 2. Приравнять курс трюфеля к золоту(в
                  соотношении 1 трюфель = 0.98762 грамма чистого золота){' '}
                </Text>
              </ScrollView>
            </SafeAreaView>
          </ImageBackground>
        </View>
      </OverlayModal>
    </View>
  );
}

const s: any = {
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 30,
    marginRight: 25,
  },
  infoButtonIcon: {
    maxWidth: 60,
    maxHeight: 60,
  },
  modalContent: {
    width: 320,
    height: 585,
    position: 'relative',
    borderRadius: 15,
  },
  privacyPolicy: {
    position: 'absolute',
    top: 210,
    maxWidth: 250,
    height: 328,
    borderRadius: 3,
  },
};
