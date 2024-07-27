import { ImageBackground, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { PlayerCard } from '@/src/pages/game-page/ui/player-card/ui';
import { Player } from '@/src/shared/lib/types/player';
import { useState } from 'react';
import { CardsOpenedState } from '@/src/pages/game-page/model/cards-opened-state';
import { observer } from 'mobx-react';
import { CardDisplayStatus } from '@/src/shared/lib/types/card-display-status';
import { KickOutButton } from '@/src/pages/game-page/ui/kick-out-button/ui';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

type PropsType = {
  player: Player;
  playerNumber: number;
  style?: ViewStyle;
  isCurrentPlayer: boolean;
  isObserver: boolean;
};

const kickOutImageHiddenAtPx = -170;
const kickOutImageShowedAtPx = 0;
const kickOutImageHiddenScale = 2;
const kickOutImageShowedScale = 1;
const animationDuration = 110;

export const PlayerDetails = observer(({ player, playerNumber, style, isCurrentPlayer, isObserver }: PropsType) => {
  const allCardsDisplayStatus = isObserver || isCurrentPlayer ? CardDisplayStatus.Showed : CardDisplayStatus.Hidden;
  const [cardsOpenedState] = useState(new CardsOpenedState(allCardsDisplayStatus));
  const kickOutImageTranslateYAnim = useSharedValue(player.isKicked ? 0 : kickOutImageHiddenAtPx);
  const kickOutImageScaleAnim = useSharedValue(player.isKicked ? 1 : kickOutImageHiddenScale);

  const showKickOutImage = () => {
    kickOutImageTranslateYAnim.value = kickOutImageShowedAtPx;
    kickOutImageScaleAnim.value = kickOutImageShowedScale;
  };
  const hideKickOutImage = () => {
    kickOutImageTranslateYAnim.value = kickOutImageHiddenAtPx;
    kickOutImageScaleAnim.value = kickOutImageHiddenScale;
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(kickOutImageTranslateYAnim.value, {
          duration: animationDuration,
          easing: Easing.linear,
        }),
      },
      {
        scale: withTiming(kickOutImageScaleAnim.value, {
          duration: animationDuration,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  return (
    <View style={{ ...s.mainContentWrapper, ...style }}>
      <ImageBackground
        style={s.mainContentBackground}
        resizeMode={'contain'}
        source={require('@/assets/images/gamescreen/igra.webp')}>
        <View style={s.mainContent}>
          <Text ellipsizeMode={'head'} numberOfLines={1} style={s.mainContentTitle}>
            Игрок {playerNumber}
          </Text>
          <Text numberOfLines={2} style={s.mainContentSubTitle}>
            {player.profession.name}
          </Text>
          <KickOutButton player={player} onPress={() => (player.isKicked ? showKickOutImage() : hideKickOutImage())} />

          <Animated.Image
            style={[s.kickOutImage, animatedStyles]}
            source={require('@/assets/images/gamescreen/negoden.webp')}
            resizeMode={'contain'}
          />

          <View style={s.playerCardsWrapper}>
            <ImageBackground
              source={require('@/assets/images/gamescreen/text_box.webp')}
              resizeMode={'contain'}
              style={s.playerCardsBackground}>
              <ScrollView style={s.playerCards} showsVerticalScrollIndicator={false}>
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.bioCharacteristics}
                  cardDisplayStatus={cardsOpenedState.bioCardDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsBioCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.bioCardDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.health}
                  cardDisplayStatus={cardsOpenedState.healthDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsHealthCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.healthDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.hobby}
                  cardDisplayStatus={cardsOpenedState.hobbyDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsHobbyCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.hobbyDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.phobia}
                  cardDisplayStatus={cardsOpenedState.phobiaDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsPhobiaCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.phobiaDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.character}
                  cardDisplayStatus={cardsOpenedState.characterDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsCharacterCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.characterDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.additionalInformation}
                  cardDisplayStatus={cardsOpenedState.additionalInformationDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsAdditionalInformationCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.additionalInformationDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.knowledge}
                  cardDisplayStatus={cardsOpenedState.knowledgeDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsKnowledgeCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.knowledgeDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.luggage}
                  cardDisplayStatus={cardsOpenedState.luggageDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsLuggageCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.luggageDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.actionCard}
                  cardDisplayStatus={cardsOpenedState.actionDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsActionCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.actionDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
                />
                <PlayerCard
                  canBePinned={isCurrentPlayer}
                  card={player.conditionCard}
                  cardDisplayStatus={cardsOpenedState.conditionDisplayStatus}
                  onPress={() =>
                    cardsOpenedState.setIsConditionCardShowed(
                      isCurrentPlayer
                        ? cardsOpenedState.conditionDisplayStatus === CardDisplayStatus.Pinned
                          ? CardDisplayStatus.Showed
                          : CardDisplayStatus.Pinned
                        : CardDisplayStatus.Showed,
                    )
                  }
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
  kickOutImage: {
    position: 'absolute',
    right: 13,
    top: 90,
    zIndex: 1000,
    maxWidth: '100%',
    width: 125,
    height: 56,
  },
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

  mainContent: {
    position: 'relative',
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
