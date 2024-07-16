import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Player } from '@/src/shared/lib/types/player';

type PropsType = {
  player: Player
}

export function KickOutButton({ player }: PropsType) {


  return (
    <View style={s.kickOutButtonWrapper}>
      <TouchableWithoutFeedback onPress={() => player.isKicked = !player.isKicked}>
        <Image
          style={s.kickOutButton}
          resizeMode={'contain'}
          source={require('@/assets/images/gamescreen/vignatj.png')}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const s = StyleSheet.create({
  kickOutButtonWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 23,
    width: 80,
    marginTop: 5,
    marginRight: 15,
  },
  kickOutButton: {
    height: '100%',
    maxWidth: '100%',
  },
});