import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { PlayerCard } from '@/src/pages/game-page/ui/player-card/ui';
import { Player } from '@/src/shared/lib/types/player';
import { useState } from 'react';
import { CardsOpenedState } from '@/src/pages/game-page/model/cards-opened-state';
import { observer } from 'mobx-react';
import { CardDisplayStatus } from '@/src/shared/lib/types/card-display-status';

type PropsType = {
  player: Player;
  playerNumber: number;
  style?: ViewStyle;
  isCurrentPlayer: boolean;
  isObserver: boolean;
};

export const PlayerDetails = observer(({ player, playerNumber, style, isCurrentPlayer, isObserver }: PropsType) => {
  //TODO rename to player card
  const allCardsDisplayStatus = isObserver || isCurrentPlayer ? CardDisplayStatus.Showed : CardDisplayStatus.Hidden;
  const [cardsOpenedState] = useState(new CardsOpenedState(allCardsDisplayStatus));

  return (
    <View style={{ ...s.mainContentWrapper, ...style }}>
      <ImageBackground
        style={s.mainContentBackground}
        resizeMode={'contain'}
        source={require('@/assets/images/gamescreen/igra.png')}>
        <View style={s.mainContent}>
          <Text ellipsizeMode={'head'} numberOfLines={1} style={s.mainContentTitle}>
            Игрок {playerNumber}
          </Text>
          <Text numberOfLines={2} style={s.mainContentSubTitle}>
            {player.profession.name}
          </Text>
          <TouchableWithoutFeedback>
            <Image
              style={s.kickOutButton}
              resizeMode={'contain'}
              source={require('@/assets/images/gamescreen/vignatj.png')}
            />
          </TouchableWithoutFeedback>
          <View style={s.playerCardsWrapper}>
            <ImageBackground
              source={require('@/assets/images/gamescreen/text_box.png')}
              resizeMode={'contain'}
              style={s.playerCardsBackground}>
              <ScrollView style={s.playerCards} showsVerticalScrollIndicator={false}>
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.bioCharacteristics}
                  cardDisplayStatus={cardsOpenedState.bioCardDisplayStatus}
                  // onPress={() =>  cardsOpenedState.setIsBioCardShowed(isCurrentPlayer? CardDisplayStatus.Pinned : CardDisplayStatus.Showed)}
                  onPress={() => cardsOpenedState.setIsBioCardShowed((isCurrentPlayer ? (cardsOpenedState.bioCardDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed))}

                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.health}
                  cardDisplayStatus={cardsOpenedState.healthDisplayStatus}
                  onPress={() => cardsOpenedState.setIsHealthCardShowed(isCurrentPlayer ? (cardsOpenedState.healthDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.hobby}
                  cardDisplayStatus={cardsOpenedState.hobbyDisplayStatus}
                  onPress={() => cardsOpenedState.setIsHobbyCardShowed(isCurrentPlayer ? (cardsOpenedState.hobbyDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.phobia}
                  cardDisplayStatus={cardsOpenedState.phobiaDisplayStatus}
                  onPress={() => cardsOpenedState.setIsPhobiaCardShowed(isCurrentPlayer ? (cardsOpenedState.phobiaDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.character}
                  cardDisplayStatus={cardsOpenedState.characterDisplayStatus}
                  onPress={() => cardsOpenedState.setIsCharacterCardShowed(isCurrentPlayer ? (cardsOpenedState.characterDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.additionalInformation}
                  cardDisplayStatus={cardsOpenedState.additionalInformationDisplayStatus}
                  onPress={() => cardsOpenedState.setIsAdditionalInformationCardShowed(isCurrentPlayer ? (cardsOpenedState.additionalInformationDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.knowledge}
                  cardDisplayStatus={cardsOpenedState.knowledgeDisplayStatus}
                  onPress={() => cardsOpenedState.setIsKnowledgeCardShowed(isCurrentPlayer ? (cardsOpenedState.knowledgeDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.luggage}
                  cardDisplayStatus={cardsOpenedState.luggageDisplayStatus}
                  onPress={() => cardsOpenedState.setIsLuggageCardShowed(isCurrentPlayer ? (cardsOpenedState.luggageDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.actionCard}
                  cardDisplayStatus={cardsOpenedState.actionDisplayStatus}
                  onPress={() => cardsOpenedState.setIsActionCardShowed(isCurrentPlayer ? (cardsOpenedState.actionDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}

                  card={player.conditionCard}
                  cardDisplayStatus={cardsOpenedState.conditionDisplayStatus}
                  onPress={() => cardsOpenedState.setIsConditionCardShowed(isCurrentPlayer ? (cardsOpenedState.conditionDisplayStatus === CardDisplayStatus.Pinned ? CardDisplayStatus.Showed : CardDisplayStatus.Pinned) : CardDisplayStatus.Showed)}
                />
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
