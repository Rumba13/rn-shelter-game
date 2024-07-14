import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/src/shared/lib/types/card';
import { cardTypeToCardTitleMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-title-map';
import { cardTypeToCardIconMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-icon-map';
import { cardTypeToCardBackgroundMap } from '@/src/pages/game-page/ui/player-card/card-type-to-card-background-map';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';

type PropsType = {
  card: Card,
  isCardHidden: boolean
}

export function PlayerCard({ card, isCardHidden }: PropsType) {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  });

  const isBigCard = card.type === 'action-card' || card.type === 'condition-card';

  const [currentFontSize, setCurrentFontSize] = useState<number>(15);
  useEffect(() => {
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View></View>;

  if (isBigCard) {
    return <View style={s.playerCardContainer}>
      <Text style={s.playerCardTitle}>{cardTypeToCardTitleMap[card.type]}</Text>

      <ImageBackground
        source={isCardHidden ? require('@/assets/images/gamescreen/phobia_bg.png') : cardTypeToCardBackgroundMap[card.type]}
        resizeMode={isCardHidden ? 'repeat' : 'contain'}
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
          >{isCardHidden ? '' : card.name}</Text>

          {isCardHidden
            ?
            <Image style={s.playerCardHint_BigCart} resizeMode={'contain'} tintColor={'rgba(0,0,0,0.15)'}
                   source={require('@/assets/images/gamescreen/gleb_hand.png')} />
            : void 0
          }
        </View>
      </ImageBackground>
    </View>;
  }


  return (
    <View style={s.playerCardContainer}>
      <Text style={s.playerCardTitle}>{cardTypeToCardTitleMap[card.type]}</Text>

      <ImageBackground
        source={isCardHidden ? require('@/assets/images/gamescreen/phobia_bg.png') : cardTypeToCardBackgroundMap[card.type]}
        resizeMode={'contain'}>
        <SafeAreaView style={s.playerCard}>
          <Image tintColor={isCardHidden ? '#616161' : ''} style={s.playerCardIcon} resizeMode={'contain'}
                 source={cardTypeToCardIconMap[card.type]} />
          <Text adjustsFontSizeToFit style={{ ...s.playerCardDescription, fontSize: currentFontSize }} numberOfLines={3}
                ellipsizeMode={'head'}
                onTextLayout={(e) =>
                  e.nativeEvent.lines.length > 3 ? setCurrentFontSize(currentFontSize - 1) : void 0
                }
          >{isCardHidden ? '' : card.name}</Text>

          {isCardHidden
            ?
            <Image style={s.playerCardHint} resizeMode={'contain'} tintColor={'rgba(0,0,0,0.15)'}
                   source={require('@/assets/images/gamescreen/gleb_hand.png')} />
            : void 0
          }


        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

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