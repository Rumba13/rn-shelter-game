import {
  Dimensions,
  StyleSheet,
  View,
  Text, ImageBackground, TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import { gameStore } from '@/src/entities/game';
import { useFonts } from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { PlayerDetails } from './player/ui';
import Carousel from 'react-native-reanimated-carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';

type PropsType = {}

export function GamePage({}: PropsType) {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  });
  const selectPlayerSliderRef = React.createRef<ICarouselInstance>();
  const selectPlayersThumbsRef = React.createRef<ScrollView>();

  const game = gameStore.game;
  if (!game) throw new Error('Game is undefined');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(game.currentPlayerNumber === 0 ? 0 : game.currentPlayerNumber - 1);
  const [thumbsScrollPositionX, setThumbsScrollPositionX] = useState(0);


  if (!fontsLoaded) return <View></View>;


  useEffect(() => {
  }, [fontsLoaded]);

  return (
    <View style={s.gamePage}>
      <View style={{ flex: 1, maxHeight: 530, marginBottom: 10, marginHorizontal: 'auto' }}>

        <Carousel
          overscrollEnabled
          ref={selectPlayerSliderRef}
          style={s.selectPlayerSlider}
          data={game.players}
          width={300}
          scrollAnimationDuration={350}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          defaultIndex={selectedPlayerIndex}
          onSnapToItem={index => {
            const currentItemOnScreen = Math.round(thumbsScrollPositionX / selectPlayerThumbsWidth);

            if (currentItemOnScreen <= index - 4) {
              selectPlayersThumbsRef.current?.scrollTo({
                x: thumbsScrollPositionX + selectPlayerThumbsWidth * 4,
                animated: true,
              });
            } else if (currentItemOnScreen >= index + 1) {
              selectPlayersThumbsRef.current?.scrollTo({
                x: thumbsScrollPositionX - 4 * selectPlayerThumbsWidth,
                animated: true,
              });
            }

            setSelectedPlayerIndex(index);
          }}
          modeConfig={{}}
          renderItem={(item) => {
            return <PlayerDetails isObserver={game.currentPlayerNumber === 0}
                                  isCurrentPlayer={game.currentPlayerNumber === item.index + 1}
                                  style={{ marginLeft: 18 }} playerNumber={item.index + 1} player={item.item} />;
          }}
        />
      </View>

      <View style={{ width: 290, marginHorizontal: 'auto' }}>

        <ImageBackground resizeMode={'stretch'}
                         source={require('@/assets/images/gamescreen/box.png')}>
          <ScrollView showsHorizontalScrollIndicator={false}
                      onScroll={(e) => setThumbsScrollPositionX(Math.round(e.nativeEvent.contentOffset.x))}
                      ref={selectPlayersThumbsRef} contentContainerStyle={{ flexGrow: 1 }} horizontal
                      style={s.selectPlayerThumbs}>


            {game.players.map((player, index) => {
                const isThumbSelected = selectedPlayerIndex === index;
                return (
                  <View style={{
                    ...s.selectPlayerThumb, ...(isThumbSelected ? {} : void 0),
                  }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        selectPlayerSliderRef.current?.scrollTo({ index, animated: true });
                      }}>
                      {
                        isThumbSelected
                          ?
                          <ImageBackground resizeMode={'cover'} source={require('@/assets/images/gamescreen/frame.png')}>
                            <Text style={{
                              ...s.selectPlayerThumbTitle,
                              color: game.currentPlayerNumber === index + 1 ? '#232322' : '#6f586c',
                            }}>{index + 1}</Text>
                          </ImageBackground>
                          :
                          <Text style={{
                            ...s.selectPlayerThumbTitle,
                            color: game.currentPlayerNumber === index + 1 ? '#232322' : '#6f586c',
                          }}>{index + 1}</Text>
                      }
                    </TouchableWithoutFeedback>
                  </View>
                );
              },
            )}
          </ScrollView>
        </ImageBackground>
      </View>
    </View>

  )
    ;
}

const selectPlayerThumbsWidth = 72;

const s = StyleSheet.create({
  gamePage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    marginTop: 20,
  },
  playerCardsBackground: {},
  selectPlayerSlider: {
    width: 300 + 40,
    marginHorizontal: 'auto',
  },
  selectPlayerThumbs: {
    width: 282,
    height: 64,
    marginHorizontal: 'auto',
    flexDirection: 'row',
  },
  selectPlayerThumb: {
    width: selectPlayerThumbsWidth,
  },
  selectPlayerThumbTitle: {
    textAlign: 'center',
    lineHeight: 57,
    fontSize: 38,
    color: '#6f586c',
    height: '100%',
    fontFamily: 'RobotoSlabSemiBold',
  },
});