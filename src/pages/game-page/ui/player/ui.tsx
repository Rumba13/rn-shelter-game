import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View, ViewStyle,
} from 'react-native';
import { PlayerCard } from '@/src/pages/game-page/ui/player-card/ui';
import { Player } from '@/src/shared/lib/types/player';

type PropsType = {
  player: Player,
  playerNumber: number,
  style?: ViewStyle
  isCurrentPlayer: boolean,
  isObserver: boolean
}

export function PlayerDetails({ player, playerNumber, style, isCurrentPlayer, isObserver }: PropsType) {//TODO rename to player card

  const isCardHidden = !(isObserver || isCurrentPlayer);

  return (
    <View style={{ ...s.mainContentWrapper, ...style }}>
      <ImageBackground style={s.mainContentBackground} resizeMode={'contain'}
                       source={require('@/assets/images/gamescreen/igra.png')}>
        <View style={s.mainContent}>
          <Text ellipsizeMode={'head'} numberOfLines={1} style={s.mainContentTitle}>Игрок {playerNumber}</Text>
          <Text numberOfLines={2} style={s.mainContentSubTitle}>{player.profession.name}</Text>
          <TouchableWithoutFeedback>
            <Image style={s.kickOutButton} resizeMode={'contain'}
                   source={require('@/assets/images/gamescreen/vignatj.png')} />
          </TouchableWithoutFeedback>
          <View style={s.playerCardsWrapper}>
            <ImageBackground source={require('@/assets/images/gamescreen/text_box.png')} resizeMode={'contain'}
                             style={s.playerCardsBackground}>
              <ScrollView style={s.playerCards} showsVerticalScrollIndicator={false}>
                <PlayerCard card={player.bioCharacteristics} isCardHidden={isCardHidden} />
                <PlayerCard card={player.health} isCardHidden={isCardHidden} />
                <PlayerCard card={player.hobby} isCardHidden={isCardHidden} />
                <PlayerCard card={player.phobia} isCardHidden={isCardHidden} />
                <PlayerCard card={player.character} isCardHidden={isCardHidden} />
                <PlayerCard card={player.additionalInformation} isCardHidden={isCardHidden} />
                <PlayerCard card={player.knowledge} isCardHidden={isCardHidden} />
                <PlayerCard card={player.luggage} isCardHidden={isCardHidden} />
                <PlayerCard card={player.actionCard} isCardHidden={isCardHidden} />
                <PlayerCard card={player.conditionCard} isCardHidden={isCardHidden} />
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  playerCardsWrapper: {
    flex: 1,
    margin: 17,
  },
  playerCardsBackground: {
    flex: 1,
  },
  mainContentWrapper: {
    position: 'relative',
    width: '100%',
    height: 530,

    marginHorizontal: 'auto',
  },
  selectPlayerSlider: {

    height: 100,
    width: '100%',

  },
  playerCards: {
    paddingHorizontal: 13,
    marginVertical: 10,

  },
  kickOutButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 23,
    width: 80,
    marginTop: 5,
    marginRight: 15,
    maxWidth: '100%',
  },
  mainContent: {
    width: '100%',
    height: '100%',
  },
  mainContentTitle: {
    width: '100%',
    fontFamily: 'RobotoSlab',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 3,
  },
  mainContentSubTitle: {
    width: '100%',
    fontFamily: 'RobotoSlabSemiBold',
    textAlign: 'center',
    height: 45,
    fontSize: 20,
    marginTop: 6,
  },
  mainContentBackground: {
    width: '100%',
    height: '100%',
  },
});