import {
  Alert,
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
import { useEffect, useState } from 'react';
import { CardsOpenedState } from '@/src/pages/game-page/model/cards-opened-state';
import { observer } from 'mobx-react';

type PropsType = {
  player: Player,
  playerNumber: number,
  style?: ViewStyle
  isCurrentPlayer: boolean,
  isObserver: boolean
}

export const PlayerDetails = observer(({ player, playerNumber, style, isCurrentPlayer, isObserver }: PropsType) => {//TODO rename to player card
  const isAllCardsShowed = isObserver || isCurrentPlayer;
  const [cardsOpenedState] = useState(new CardsOpenedState(isAllCardsShowed));

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
                <PlayerCard card={player.bioCharacteristics} isCardShowed={cardsOpenedState.isBioCardShowed}
                            onPress={() => cardsOpenedState.setIsBioCardShowed(true)} />
                <PlayerCard card={player.health} isCardShowed={cardsOpenedState.isHealthCardShowed}
                            onPress={() => cardsOpenedState.setIsHealthCardShowed(true)} />
                <PlayerCard card={player.hobby} isCardShowed={cardsOpenedState.isHobbyCardShowed}
                            onPress={() => cardsOpenedState.setIsHobbyCardShowed(true)} />
                <PlayerCard card={player.phobia} isCardShowed={cardsOpenedState.isPhobiaCardShowed}
                            onPress={() => cardsOpenedState.setIsPhobiaCardShowed(true)} />
                <PlayerCard card={player.character} isCardShowed={cardsOpenedState.isCharacterCardShowed}
                            onPress={() => cardsOpenedState.setIsCharacterCardShowed(true)} />
                <PlayerCard card={player.additionalInformation}
                            isCardShowed={cardsOpenedState.isAdditionalInformationCardShowed}
                            onPress={() => cardsOpenedState.setIsAdditionalInformationCardShowed(true)} />
                <PlayerCard card={player.knowledge} isCardShowed={cardsOpenedState.isKnowledgeCardShowed}
                            onPress={() => cardsOpenedState.setIsKnowledgeCardShowed(true)} />
                <PlayerCard card={player.luggage} isCardShowed={cardsOpenedState.isLuggageCardShowed}
                            onPress={() => cardsOpenedState.setIsLuggageCardShowed(true)} />
                <PlayerCard card={player.actionCard} isCardShowed={cardsOpenedState.isActionCardShowed}
                            onPress={() => cardsOpenedState.setIsActionCardShowed(true)} />
                <PlayerCard card={player.conditionCard} isCardShowed={cardsOpenedState.isConditionCardShowed}
                            onPress={() => cardsOpenedState.setIsConditionCardShowed(true)} />
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
});

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