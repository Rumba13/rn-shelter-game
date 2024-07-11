import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import { gameSettingsStore } from '@/src/entities/game';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';

type PropsType = {};

export function SelectPlayerSlider({}: PropsType) {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  });

  useEffect(() => {}, [fontsLoaded]);

  const players = [...new Array(gameSettingsStore.settings.playersCount).keys()].map(item => item + 1);
  const observer = (
    <Image
      style={s.sliderObserver}
      resizeMode={'contain'}
      source={require('@/assets/images/playerselectionscreen/main/eye_icon.png')}
    />
  );
  const sliderItems = [observer, ...players];

  return (
    <>
      <View style={s.sliderWrapper}>
        <ImageBackground
          resizeMode={'contain'}
          source={require('@/assets/images/playerselectionscreen/main/vibor_igroka.png')}>
          <View style={{ width: '100%', height: '100%' }}>
            <Carousel
              style={s.slider}
              data={sliderItems}
              loop
              width={200}
              mode={'parallax'}
              scrollAnimationDuration={200}
              maxScrollDistancePerSwipe={300}
              overscrollEnabled
              modeConfig={{ parallaxAdjacentItemScale: 0.55 }}
              defaultIndex={selectedSlideIndex}
              onSnapToItem={index => {
                setSelectedSlideIndex(index);
              }}
              renderItem={({ index, item }) => {
                const isSlideSelected = index === selectedSlideIndex;

                if (index === 0) {
                  return (
                    <View
                      style={{
                        ...s.sliderItem,
                        opacity: isSlideSelected ? 1 : 0.6,
                      }}>
                      {item}
                    </View>
                  );
                } else {
                  return (
                    <View style={s.sliderItem}>
                      <Text
                        style={{
                          ...s.sliderItemText,
                          opacity: isSlideSelected ? 1 : 0.6,
                        }}>
                        {item}
                      </Text>
                    </View>
                  );
                }
              }}
            />
          </View>
        </ImageBackground>
      </View>
      <ImageButton
        style={s.shareButton}
        buttonImage={require('@/assets/images/playerselectionscreen/main/podelitsa_pers_knopka.png')}
        shadowImage={require('@/assets/images/playerselectionscreen/main/podelitsa_pers_knopka_shadow.png')}
        options={{ yOffset: 4, xOffset: 2, yOffsetOnPress: 1, xOffSetOnPress: 1 }}
        title={selectedSlideIndex === 0 ? 'Поделиться игрой' : 'Поделиться персонажем'}
        styleTitle={{
          textAlign: 'center',
          lineHeight: 40,
          fontSize: 17,
          fontFamily: 'RobotoSlabSemiBold',
          letterSpacing: 1.2,
          color: '#1a2634',
        }}
      />
    </>
  );
}

const s = StyleSheet.create({
  sliderWrapper: {
    flex: 1,
  },
  shareButton: {
    display: 'flex',
    height: 45,
    marginBottom: 10,
  },
  sliderObserver: {
    maxWidth: '100%',
    width: 100,
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sliderItem: {
    display: 'flex',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sliderItemText: {
    textAlign: 'center',
    fontSize: 90,
    fontFamily: 'RobotoSlab',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#1a2633',
  },
});
