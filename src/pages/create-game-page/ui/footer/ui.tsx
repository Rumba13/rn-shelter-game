import { Alert, Image, View } from 'react-native'
import { ImageButton } from '@/src/shared/ui/image-button/ui'
import { useFonts } from 'expo-font'
import { gameCreationOptionsModel } from '@/src/pages/create-game-page/model/create-game-options'

type PropsType = {
  navigation: any
}

export function Footer({ navigation }: PropsType) {
  return (
    <View style={s.footer}>
      <View style={s.createGameButtonWrapper}>
        <Image
          style={s.createGameButtonDetail}
          resizeMode={'contain'}
          source={require('@/assets/images/gamecreationscreen/next_dec.png')}
        />
        <ImageButton
          buttonImage={require('@/assets/images/gamecreationscreen/next_button.png')}
          shadowImage={require('@/assets/images/gamecreationscreen/next_button_shadow.png')}
          style={s.createGameButton}
          height={80}
          onPress={() => {
            navigation.navigate('select-player-page');
          }}
        />
      </View>
      <Image
        style={s.footerDetail}
        resizeMode={'cover'}
        source={require('@/assets/images/gamecreationscreen/cloud.png')}
      />
    </View>
  )
}

const s: any = {
  footer: {
    display: 'flex',
    flexBasis: 'auto',
    marginHorizontal: 20,
    height: 'auto',
    position: 'relative',
  },
  footerDetail: {
    width: '100%',
    flexBasis: 80,
    position: 'relative',
    bottom: 30,
  },
  createGameButton: {},
  createGameButtonDetail: {
    position: 'absolute',
    width: 65,
    height: '100%',
    left: 0,
    top: 18,
  },
}
