import { Alert, Image, StyleProp, View, ViewStyle } from 'react-native'
import { ImageButton } from '@/src/shared/ui/image-button/ui'
import { useFonts } from 'expo-font'
import { gameCreationOptionsModel } from '@/src/entities/game/model/create-game-options'

type PropsType = {
  navigation: any
  styles?: StyleProp<ViewStyle>
}

export function Footer({ navigation, styles }: PropsType) {
  return (
    <View style={[s.footer, styles]}>
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
          height={65}
          onPress={() => {
            navigation.navigate('select-player-page')
          }}
        />
      </View>
      <Image
        style={s.footerDetail}
        resizeMode={'contain'}
        source={require('@/assets/images/gamecreationscreen/cloud.png')}
      />
    </View>
  )
}

const s: any = {
  footer: {
    display: 'flex',
    flexBasis: 'auto',
    height: 'auto',
    position: 'relative',
    maxWidth: '100%',
    bottom: 7,
  },
  footerDetail: {
    width: '100%',
    flexBasis: 80,
    position: 'relative',
    bottom: 0,
  },
  createGameButton: {
    position: 'relative',
    left: 0,
    top: 0,
  },
  createGameButtonWrapper: {
    position: 'relative',
    top: 27,
  },
  createGameButtonDetail: {
    position: 'absolute',
    width: 55,
    height: '100%',
    left: 0,
    top: 13,
  },
}
