import { Dimensions, StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { gameStore } from '@/src/entities/game';
import React, { useState } from 'react';
import { PlayerDetails } from './player/ui';
import Carousel from 'react-native-reanimated-carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { LeftSidebar } from '@/src/pages/game-page/ui/left-sidebar/left-sidebar';
import { RightSidebar } from '@/src/pages/game-page/ui/right-sidebar/ui';
import { observer } from 'mobx-react';
import { Easing, EasingFunction, EasingFunctionFactory } from 'react-native-reanimated';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { ImageBackground } from 'expo-image';

type PropsType = {};

const sidebarsAnimationDuration = 270;
const sidebarsAnimationEasing: EasingFunction | EasingFunctionFactory = Easing.out(Easing.sin);
const sliderRation = 1049 / 593;
const sliderWidth = Dimensions.get('window').width - 84;
const sliderHeight = sliderWidth * sliderRation;

export const GamePage = observer(({}: PropsType) => {
  const selectPlayerSliderRef = React.createRef<ICarouselInstance>();
  const selectPlayersThumbsRef = React.createRef<ScrollView>();
  const [isLeftSidebarOpened, setIsLeftSidebarOpened] = React.useState<boolean>(true);
  const [isRightSidebarOpened, setIsRightSidebarOpened] = React.useState<boolean>(false);
  const [thumbsScrollPositionX, setThumbsScrollPositionX] = useState(0);

  const game = gameStore.game;
  if (!game) throw new Error('Game is undefined');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(
    game.currentPlayerNumber === 0 ? 0 : game.currentPlayerNumber - 1,
  );

  return (
    <View style={s.gamePage}>
      <View style={{ flex: 1, maxHeight: sliderHeight, marginBottom: 10, marginHorizontal: 'auto' }}>
        <Carousel
          overscrollEnabled
          ref={selectPlayerSliderRef}
          style={s.selectPlayerSlider}
          data={game.players}
          width={sliderWidth}
          scrollAnimationDuration={350}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          defaultIndex={selectedPlayerIndex}
          onSnapToItem={index => {
            const currentItemOnScreen = Math.round(thumbsScrollPositionX / selectPlayerThumbsWidth);

            if (currentItemOnScreen <= index - 4) {
              //Scroll to player when he out of screen
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
          renderItem={item =>
            <PlayerDetails
              key={item.index}
              isObserver={game.currentPlayerNumber === 0}
              isCurrentPlayer={game.currentPlayerNumber === item.index + 1}
              style={{ marginLeft: 18 }}
              playerNumber={item.index + 1}
              player={item.item}
            />
          }
        />
      </View>

      <View style={{ width: (sliderWidth / 100) * 95, marginHorizontal: 'auto' }}>
        <ImageBackground contentFit={'fill'} source={require('@/assets/images/gamescreen/box-icon.webp')}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            onScroll={e => setThumbsScrollPositionX(Math.round(e.nativeEvent.contentOffset.x))}
            ref={selectPlayersThumbsRef}
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal
            style={s.selectPlayerThumbs}>
            {game.players.map((player, index) => {
              const isThumbSelected = selectedPlayerIndex === index;
              const isThumbHighlighted = player.isKicked;

              return (
                <View
                  key={index}
                  style={{
                    ...s.selectPlayerThumb,
                    ...(isThumbSelected ? {} : void 0),
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      selectPlayerSliderRef.current?.scrollTo({ index, animated: true });
                    }}>
                    {isThumbSelected ? (
                      <ImageBackground contentFit={'cover'} source={require('@/assets/images/gamescreen/frame-icon.webp')}>
                        <Text
                          style={{
                            ...s.selectPlayerThumbTitle,
                            color:
                              game.currentPlayerNumber === index + 1
                                ? '#232322'
                                : isThumbHighlighted
                                  ? '#7f3941'
                                  : '#6f586c',
                          }}>
                          {index + 1}
                        </Text>
                      </ImageBackground>
                    ) : (
                      <Text
                        style={{
                          ...s.selectPlayerThumbTitle,
                          color:
                            game.currentPlayerNumber === index + 1
                              ? '#232322'
                              : isThumbHighlighted
                                ? '#7f3941'
                                : '#6f586c',
                        }}>
                        {index + 1}
                      </Text>
                    )}
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </ScrollView>
        </ImageBackground>
      </View>
      <LeftSidebar
        animationEasing={sidebarsAnimationEasing}
        animationDuration={sidebarsAnimationDuration}
        isCompletelyHidden={isRightSidebarOpened}
        shelterCapacity={Math.floor(game.players.length / 2)}
        apocalypse={game.apocalypse}
        shelter={game.shelter}
        isOpened={isLeftSidebarOpened}
        setIsOpened={setIsLeftSidebarOpened}
      />
      <RightSidebar
        animationEasing={sidebarsAnimationEasing}
        ending={game.ending.description}
        unKickedOutPlayers={game.players.filter(player => !player.isKicked)}
        animationDuration={sidebarsAnimationDuration}
        isHidden={isLeftSidebarOpened}
        isOpened={isRightSidebarOpened}
        setIsOpened={setIsRightSidebarOpened}
      />
    </View>
  );
});

const selectPlayerThumbsWidth = sliderWidth / 4 - 5;

const s = StyleSheet.create({
  gamePage: {
    position: 'relative',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    marginTop: 20,
  },
  playerCardsBackground: {},
  selectPlayerSlider: {
    width: sliderWidth + 40,
  },
  selectPlayerThumbs: {
    width: '100%',
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
    fontSize: adaptiveValue(38),
    color: '#6f586c',
    height: '100%',
    fontFamily: 'RobotoSlabSemiBold',
  },
});
