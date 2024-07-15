import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import { gameSettingsStore } from '@/src/entities/game';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';

type PropsType = {
  selectedPlayerIndex: number;
  setSelectedPlayerIndex: (playerIndex: number) => void;
};

export function SelectPlayerSlider({ selectedPlayerIndex, setSelectedPlayerIndex }: PropsType) {
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
              defaultIndex={selectedPlayerIndex}
              onSnapToItem={index => {
                setSelectedPlayerIndex(index);
              }}
              renderItem={({ index, item }) => {
                const isSlideSelected = index === selectedPlayerIndex;

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
        title={selectedPlayerIndex === 0 ? 'Поделиться игрой' : 'Поделиться персонажем'}
        styleTitle={{
          textAlign: 'center',
          lineHeight: 40,
          fontSize: 19,
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
    height: 185,
    marginTop: 18,
    marginBottom: 23,
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
    fontSize: 99,
    fontFamily: 'RobotoSlab',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#1a2633',
  },
});
