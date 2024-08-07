import { TouchableWithoutFeedback, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { OverlayModal } from '@/src/shared/ui/overlay-modal/ui';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { useState } from 'react';
import { createSeedStore } from '@/src/feature/create-seed/model/create-seed';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { Image, ImageBackground } from 'expo-image';

//TODO separate info button and modal
export function InfoButtonAndModal() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsModalOpened(!isModalOpened)}>
        <Image
          style={s.infoButtonIcon}
          source={require('../../../../../assets/images/mainscreen/info_button.webp')}
          contentFit={'contain'}
        />
      </TouchableWithoutFeedback>
      <OverlayModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}>
        <ImageBackground
          source={require('../../../../../assets/images/popup/additional_info_background.webp')}
          contentFit={'contain'}>
          <View style={s.modalContent}>
            <ImageButton
              style={s.closeButton}
              buttonImage={require('../../../../../assets/images/popup/close.webp')}
              shadowImage={require('../../../../../assets/images/popup/close_shadow.webp')}
              options={{ xOffset: -3, yOffset: -3, xOffSetOnPress: -1, yOffsetOnPress: -1 }}
              onPress={() => setIsModalOpened(false)}
            />
            <View>
              <ScrollView style={s.privacyPolicy}>
                <TouchableOpacity activeOpacity={1}>
                  <Text style={s.privacyPolicyDescription}>
                    Версия приложения: {process.env.EXPO_PUBLIC_APP_VERSION}
                    {'\n'}
                    Сид: {createSeedStore.seed}
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
    fontSize: adaptiveValue(16),
    fontFamily: 'SpaceMono',
    lineHeight: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 35,
    minWidth: 35,
    height: 35,
    marginTop: 30,
    marginRight: 25,
  },
  infoButtonIcon: {
    flex: 1,
    height: '100%',
    maxHeight: '100%',
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
