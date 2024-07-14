import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Card } from '@/src/shared/lib/types/card';
import { cardTypeToCardTitleMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-title-map';
import { cardTypeToCardIconMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-icon-map';
import { cardTypeToCardBackgroundMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-background-map';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

type PropsType = {
  card: Card,
  isCardShowed: boolean,
  onPress: () => void
}

export const PlayerCard = observer(({ card, isCardShowed, onPress }: PropsType) => {
  const isBigCard = card.type === 'action-card' || card.type === 'condition-card';

  const [currentFontSize, setCurrentFontSize] = useState<number>(15);

  if (isBigCard) {
    return (
      <TouchableWithoutFeedback onPress={onPress} style={{ height: '100%', width: '100%' }}>
        <View style={s.playerCardContainer}>
          <Text style={s.playerCardTitle}>{cardTypeToCardTitleMap[card.type]}</Text>
          <ImageBackground
            source={isCardShowed ? cardTypeToCardBackgroundMap[card.type] : require('@/assets/images/gamescreen/phobia_bg.png')}
            resizeMode={isCardShowed ? 'contain' : 'repeat'}
          >
            <View style={{ ...s.playerCard, height: 240 }}>
              <Text style={{
                ...s.playerCardDescription,
                fontSize: currentFontSize,
                width: '100%',
                height: '100%',
                paddingTop: 5,
                paddingLeft: 4,
                paddingRight: 8,
              }}
                    numberOfLines={10}
                    adjustsFontSizeToFit
                    ellipsizeMode={'head'}
                    onTextLayout={(e) => e.nativeEvent.lines.length > 3 ? setCurrentFontSize(currentFontSize - 1) : void 0}
              >{isCardShowed ? card.name : void 0}</Text>

              {!isCardShowed ?
                <Image style={s.playerCardHint_BigCart} resizeMode={'contain'} tintColor={'rgba(0,0,0,0.15)'}
                       source={require('@/assets/images/gamescreen/gleb_hand.png')} /> : void 0
              }
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={s.playerCardContainer}>
        <Text style={s.playerCardTitle}>{cardTypeToCardTitleMap[card.type]}</Text>

        <ImageBackground
          source={isCardShowed ? cardTypeToCardBackgroundMap[card.type] : require('@/assets/images/gamescreen/phobia_bg.png')}
          resizeMode={'contain'}>
          <SafeAreaView style={s.playerCard}>
            <Image tintColor={isCardShowed ? void 0 : '#616161'} style={s.playerCardIcon} resizeMode={'contain'}
                   source={cardTypeToCardIconMap[card.type]} />
            <Text adjustsFontSizeToFit style={{ ...s.playerCardDescription, fontSize: currentFontSize }}
                  numberOfLines={3}
                  ellipsizeMode={'head'}
                  onTextLayout={(e) =>
                    e.nativeEvent.lines.length > 3 ? setCurrentFontSize(currentFontSize - 1) : void 0
                  }
            >{isCardShowed ? card.name : ''}</Text>

            {!isCardShowed ? <Image style={s.playerCardHint} resizeMode={'contain'} tintColor={'rgba(0,0,0,0.15)'}
                                    source={require('@/assets/images/gamescreen/gleb_hand.png')} /> : void 0
            }


          </SafeAreaView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 16,
    fontFamily: 'RobotoSlabSemiBold',
    letterSpacing: 1.4,
    color: '#6f586c',
  },
  playerCard: {
    position: 'relative',
    height: 70,
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
    lineHeight: 20,
    color: '#232322',
  },
});