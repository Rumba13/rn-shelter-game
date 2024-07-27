import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Player } from '@/src/shared/lib/types/player';
import { observer } from 'mobx-react';
import { gameStore } from '@/src/entities/game';

type PropsType = {
  player: Player;
  onPress: () => void;
};

export const KickOutButton = observer(({ player, onPress }: PropsType) => {
  return (
    <View style={s.kickOutButtonWrapper}>
      <TouchableWithoutFeedback
        onPress={() => {
          gameStore.togglePlayerKickOut(player.number);
          onPress();
        }}>
        {player.isKicked ? (
          <Image
            style={s.kickOutButton}
            resizeMode={'contain'}
            source={require('@/assets/images/gamescreen/vernutj.webp')}
          />
        ) : (
          <Image
            style={s.kickOutButton}
            resizeMode={'contain'}
            source={require('@/assets/images/gamescreen/vignatj.webp')}
          />
        )}
      </TouchableWithoutFeedback>
    </View>
  );
});

const s = StyleSheet.create({
  kickOutButtonWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 32,
    width: 80,
    marginTop: 0,
    marginRight: 15,
  },
  kickOutButton: {
    height: '100%',
    maxWidth: '100%',
  },
});
