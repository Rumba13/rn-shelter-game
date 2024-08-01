import { SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, Animated } from 'react-native';
import { Card } from '@/src/shared/lib/types/card';
import { cardTypeToCardTitleMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-title-map';
import { cardTypeToCardIconMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-icon-map';
import { cardTypeToCardBackgroundMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-background-map';
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { CardDisplayStatus } from '@/src/shared/lib/types/card-display-status';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { Image, ImageBackground } from 'expo-image';

type PropsType = {
  card: Card;
  cardDisplayStatus: CardDisplayStatus;
  canBePinned: boolean;
  onPress: () => void;
};

export const PlayerCard = observer(({ card, cardDisplayStatus, onPress, canBePinned }: PropsType) => {
  const isBigCard = card.type === 'action-card' || card.type === 'condition-card';

  const [currentFontSize, setCurrentFontSize] = useState<number>(15);
  const translateYAnim = useRef(new Animated.Value(-40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const isCardShowed = cardDisplayStatus === CardDisplayStatus.Showed;
  const isCardPinned = cardDisplayStatus === CardDisplayStatus.Pinned;

  const animationDuration = 100;
  const showPin = () => {
    Animated.timing(translateYAnim, {
      //TODO rewrite on react-native-reanimated
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  };
  const hidePin = () => {
    Animated.timing(translateYAnim, {
      toValue: -40,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {}, [opacityAnim, translateYAnim]);

  if (isBigCard) {
    return (
      <View style={s.playerCardContainer}>
        <Text style={s.playerCardTitle}>{cardTypeToCardTitleMap[card.type]}</Text>
        <ImageBackground
          source={
            isCardShowed || isCardPinned
              ? cardTypeToCardBackgroundMap[card.type]
              : require('@/assets/images/gamescreen/phobia_bg.webp')
          }
          contentFit={isCardShowed || isCardPinned ? 'contain' : 'fill'}>
          {}
          <TouchableWithoutFeedback
            onPress={() => {
              if (canBePinned) {
                isCardPinned ? hidePin() : showPin();
              }
              onPress();
            }}
            style={{ height: '100%', width: '100%' }}>
            <View style={{ ...s.playerCard, aspectRatio: 1 }}>
              <Animated.Image
                style={{ ...s.pinnedImage, transform: [{ translateY: translateYAnim }], opacity: opacityAnim }}
                resizeMode={'contain'}
                source={require('@/assets/images/gamescreen/Pin.png')}
              />

              <Text
                style={{
                  ...s.playerCardDescription,
                  fontSize: adaptiveValue(currentFontSize),
                  width: '100%',
                  height: '100%',
                  paddingTop: 5,
                  paddingLeft: 4,
                  paddingRight: 8,
                }}
                numberOfLines={10}
                adjustsFontSizeToFit
                ellipsizeMode={'head'}
                onTextLayout={e => (e.nativeEvent.lines.length > 3 ? setCurrentFontSize(currentFontSize - 1) : void 0)}>
                {isCardShowed || isCardPinned ? card.name : void 0}
              </Text>

              {!cardDisplayStatus ? (
                <Image
                  style={s.playerCardHint_BigCart}
                  contentFit={'contain'}
                  tintColor={'rgba(0,0,0,0.15)'}
                  source={require('@/assets/images/gamescreen/gleb_hand.webp')}
                />
              ) : (
                void 0
              )}
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>
    );
  }

  return (
    <Animated.View style={s.playerCardContainer}>
      <Text style={s.playerCardTitle}>{cardTypeToCardTitleMap[card.type]}</Text>

      <ImageBackground
        source={
          cardDisplayStatus
            ? cardTypeToCardBackgroundMap[card.type]
            : require('@/assets/images/gamescreen/phobia_bg.webp')
        }
        contentFit={'contain'}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (canBePinned) {
              isCardPinned ? hidePin() : showPin();
            }
            onPress();
          }}>
          <SafeAreaView style={[s.playerCard, { aspectRatio: 471 / 134 }]}>
            <Animated.Image
              style={{ ...s.pinnedImage, transform: [{ translateY: translateYAnim }], opacity: opacityAnim }}
              resizeMode={'contain'}
              source={require('@/assets/images/gamescreen/Pin.png')}
            />

            <Image
              tintColor={isCardShowed || isCardPinned ? void 0 : '#616161'}
              style={s.playerCardIcon}
              contentFit={'contain'}
              source={cardTypeToCardIconMap[card.type]}
            />
            <Text
              adjustsFontSizeToFit
              style={{ ...s.playerCardDescription, fontSize: adaptiveValue(currentFontSize) }}
              numberOfLines={3}
              ellipsizeMode={'head'}
              onTextLayout={e => (e.nativeEvent.lines.length > 3 ? setCurrentFontSize(currentFontSize - 1) : void 0)}>
              {isCardShowed || isCardPinned ? card.name : ''}
            </Text>

            {!cardDisplayStatus ? (
              <Image
                style={s.playerCardHint}
                contentFit={'contain'}
                tintColor={'rgba(0,0,0,0.15)'}
                source={require('@/assets/images/gamescreen/gleb_hand.webp')}
              />
            ) : (
              void 0
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Animated.View>
  );
});

const s = StyleSheet.create({
  playerCardContainer: {
    marginBottom: 5,
    width: '100%',
  },
  playerCardHint: {
    position: 'absolute',
    width: 50,
    height: 50,

    right: 0,
    marginRight: 17,
  },
  pinnedImage: {
    position: 'absolute',
    right: 10,
    top: -5,
    width: 30,
    height: 30,
  },
  playerCardHint_BigCart: {
    position: 'absolute',
    width: 80,
    height: 80,
    marginTop: 20,
    marginLeft: 10,
    top: 0,
    left: 0,
  },
  playerCardTitle: {
    fontSize: adaptiveValue(16),
    fontFamily: 'RobotoSlabSemiBold',
    letterSpacing: 1.4,
    color: '#6f586c',
  },
  playerCard: {
    position: 'relative',
    width: '100%',
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerCardIcon: {
    width: 56,
    height: 56,
    marginRight: 10,
    marginLeft: 5,
  },
  playerCardDescription: {
    width: 164,
    fontWeight: '500',
    fontFamily: 'RobotoSlabSemiBold',
    letterSpacing: 1.2,
    lineHeight: adaptiveValue(20),
    color: '#232322',
  },
});
