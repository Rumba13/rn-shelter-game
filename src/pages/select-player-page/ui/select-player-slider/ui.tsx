import { View, Text, StyleSheet, Dimensions, Animated, useWindowDimensions, Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import {  gameStore } from '@/src/entities/game';
import { useEffect, useState } from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { Image, ImageBackground } from 'expo-image';

type PropsType = {
  selectedPlayerIndex: number;
  setSelectedPlayerIndex: (playerIndex: number) => void;
};

export function SelectPlayerSlider({ selectedPlayerIndex, setSelectedPlayerIndex }: PropsType) {
  const players = gameStore.game.players.map(player => player.number);
  const observerPlayer = (
    <Image
      style={s.sliderObserver}
      contentFit={'contain'}
      source={require('@/assets/images/playerselectionscreen/main/eye-icon.webp')}
    />
  );
  const sliderItems = [observerPlayer, ...players];
  const sliderWidth = useWindowDimensions().width - 35; //margin horizontal

  useEffect(() => {}, [sliderWidth]);

  return (
    <>
      <View style={s.sliderWrapper}>
        <ImageBackground
          contentFit={'contain'}
          style={s.sliderBackground}
          source={require('@/assets/images/playerselectionscreen/main/player-select.webp')}>
          <View style={{ width: '100%', height: '100%' }}>
            <Carousel
              style={s.slider}
              data={sliderItems}
              loop
              width={sliderWidth * 0.55}
              mode={'parallax'}
              scrollAnimationDuration={60}
              overscrollEnabled
              modeConfig={{
                parallaxAdjacentItemScale: sliderWidth * 0.0017,
                parallaxScrollingScale: sliderWidth * 0.0025,
              }}
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
        width={'100%'}
        minHeight={65}
        style={s.shareButton}
        buttonImage={require('@/assets/images/playerselectionscreen/main/share-character-icon.webp')}
        shadowImage={require('@/assets/images/playerselectionscreen/main/share-character-icon-shadow.webp')}
        options={{ xOffset: -3, yOffset: -4, xOffSetOnPress: -1, yOffsetOnPress: -2 }}
        title={selectedPlayerIndex === 0 ? 'Поделиться игрой' : 'Поделиться персонажем'}
        titleStyle={{
          textAlign: 'center',
          fontSize: adaptiveValue(19),
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
    width: '100%',
    aspectRatio: 586 / 368,
    marginTop: 18,
    marginBottom: 23,
  },
  sliderBackground: {},
  shareButton: {
    marginBottom: 10,
  },
  sliderObserver: {
    maxWidth: '100%',
    width: 100,
    height: '100%',
    alignSelf: 'center',
  },
  slider: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  sliderItem: {
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  sliderItemText: {
    textAlign: 'center',
    fontSize: adaptiveValue(99),
    fontFamily: 'RobotoSlab',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#1a2633',
  },
});
