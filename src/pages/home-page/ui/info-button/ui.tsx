import {
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { OverlayModal } from '@/src/shared/ui/overlay-modal/ui';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { useState } from 'react';
import { CONSTANTS } from '@/src/shared/lib/constants';

//TODO separate info button and modal
export function InfoButtonAndModal() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsModalOpened(!isModalOpened)}>
        <Image
          style={s.infoButtonIcon}
          source={require('../../../../../assets/images/mainscreen/info_button.png')}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      <OverlayModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}>
        <ImageBackground
          source={require('../../../../../assets/images/popup/additional_info_background.png')}
          resizeMode={'contain'}>
          <View style={s.modalContent}>
            <ImageButton
              style={s.closeButton}
              buttonImage={require('../../../../../assets/images/popup/close.png')}
              shadowImage={require('../../../../../assets/images/popup/close_shadow.png')}
              onPress={() => setIsModalOpened(false)}
            />
            <View>
              <ScrollView style={s.privacyPolicy}>
                <TouchableOpacity activeOpacity={1}>
                  <Text style={s.privacyPolicyDescription}>
                    Версия приложения: {CONSTANTS.APP_VERSION}
                    {'\n\n'}
                    Дополнительная информация:{'\n\n'}
                    1. С 29 июня запретить продажу трюфеля физическим лицам. 2. Приравнять курс трюфеля к золоту(в
                    соотношении 1 трюфель = 0.98762 грамма чистого золота) 1. С 29 июня запретить продажу трюфеля
                    физическим лицам. 2. Приравнять курс трюфеля к золоту(в соотношении 1 трюфель = 0.98762 грамма
                    чистого золота) 1. С 29 июня запретить продажу трюфеля физическим лицам. 2. Приравнять курс трюфеля
                    к золоту(в соотношении 1 трюфель = 0.98762 грамма чистого золота)
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </OverlayModal>
    </>
  );
}

const s = StyleSheet.create({
  privacyPolicyDescription: {
    padding: 5,
    lineHeight: 18,
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 30,
    marginRight: 25,
    minWidth: 35,
    minHeight: 35,
  },
  infoButtonIcon: {
    maxWidth: 60,
    maxHeight: 60,
  },
  modalContent: {
    position: 'relative',
    width: 320,
    height: 585,
    borderRadius: 15,
  },
  privacyPolicy: {
    position: 'absolute',
    top: 210,
    left: 34,
    maxWidth: 250,
    height: 328,
    borderRadius: 3,
  },
});
