import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Animated } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect, useRef, useState } from 'react'
import { ImageButton } from '@/src/shared/ui/image-button/ui'
import { Footer } from '@/src/shared/ui/footer/ui'
import { navigate } from 'expo-router/build/global-state/routing'
import Carousel from 'react-native-reanimated-carousel/src/Carousel'
import { SelectPlayerSlider } from '@/src/pages/select-player-page/ui/select-player-slider/ui'

type PropsType = {}

export function SelectPlayerPage({}: PropsType) {
  const [isTicketShowed, setIsTicketShowed] = useState<boolean>(false)
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  })
  const translateYAnim = useRef(new Animated.Value(-200)).current

  useEffect(() => {
  }, [fontsLoaded, translateYAnim])

  const showTicket = () => {
    Animated.timing(translateYAnim, {
      toValue: 270,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }
  const hideTicket = () => {
    Animated.timing(translateYAnim, {
      toValue: -200,
      duration: 400,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Animated.View style={s.selectPlayerPage}>
      <Animated.View
        style={{
          ...s.ticketWrapper,
          transform: [{ translateX: ticketWrapperWidth / 2 }, { translateY: translateYAnim }],
        }}>
        <Image
          resizeMode={'cover'}
          style={s.ticket}
          source={require('@/assets/images/playerselectionscreen/ticket/ticket(gay_people).png')}
        />
        <ImageButton
          width={100}
          style={s.ticketButton}
          buttonImage={require('@/assets/images/playerselectionscreen/ticket/arrow_ticket.png')}
          shadowImage={require('@/assets/images/playerselectionscreen/ticket/arrow_ticket(shadow).png')}
          onPress={() => {
            setIsTicketShowed(!isTicketShowed)
            if (isTicketShowed) showTicket()
            else hideTicket()
          }}
          options={{ yOffset: 3, xOffset: 2, yOffsetOnPress: 1, xOffSetOnPress: 1 }}
        />
      </Animated.View>
      <Text style={s.selectPlayerPageTitle}>Выбери номер своего персонажа</Text>
      <View style={s.separatorWrapper}>
        <Image
          style={s.separator}
          resizeMode={'contain'}
          source={require('@/assets/images/playerselectionscreen/main/decal_vibor_igroka.png')}
        />
      </View>
      <Text style={s.selectPlayerPageSubTitle}>Два дауна не могут иметь один и тот же номер</Text>
      <SelectPlayerSlider />
      <ImageButton
        style={s.shareButton}
        buttonImage={require('@/assets/images/playerselectionscreen/main/podelitsa_pers_knopka.png')}
        shadowImage={require('@/assets/images/playerselectionscreen/main/podelitsa_pers_knopka_shadow.png')}
        options={{ yOffset: 4, xOffset: 2, yOffsetOnPress: 1, xOffSetOnPress: 1 }}
        title={'Поделиться персонажем'}
        styleTitle={{
          textAlign: 'center',
          lineHeight: 40,
          fontSize: 17,
          fontFamily: 'RobotoSlabSemiBold',
          letterSpacing: 1.2,
          color: '#1a2634',
        }}
      />
      <Footer
        navigation={{
          navigate: () => {
          },
        }}
        styles={{ position: 'relative', bottom: -7 }}
      />
    </Animated.View>
  )
}

const maxContentWidth = 290
const ticketWrapperWidth = maxContentWidth + 60
const ticketButtonWidth = 100
const s = StyleSheet.create({
  ticketWrapper: {
    position: 'absolute',
    width: ticketWrapperWidth,
    right: '50%',
    zIndex: 100,
    maxHeight: 'auto',
    flex: 0,
    top: '-50%',
  },
  ticket: {
    maxWidth: '100%',
    height: Dimensions.get('window').height - 80,
  },
  ticketButton: {
    position: 'absolute',
    width: ticketButtonWidth,
    height: 60,
    marginHorizontal: 'auto',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -(ticketButtonWidth / 2) }],
  },
  selectPlayerPage: {
    maxWidth: maxContentWidth,
    paddingTop: 210,
    marginHorizontal: 'auto',
    height: 'auto',
    flex: 1,
    maxHeight: Dimensions.get('window').height,
  },
  selectPlayerPageTitle: {
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'RobotoSlab',
    letterSpacing: 1,
  },
  selectPlayerPageSubTitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#664e64',
    letterSpacing: 1.4,
    fontFamily: 'RobotoSlabSemiBold',
  },

  separatorWrapper: {},
  separator: {
    maxWidth: '100%',
    height: 26,
  },
  shareButton: {
    display: 'flex',
    height: 45,
    marginBottom: 10,
  },
})
