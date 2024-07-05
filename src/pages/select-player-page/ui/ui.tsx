import { View, Text, StyleSheet, Image } from 'react-native'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

type PropsType = {}

export function SelectPlayerPage({}: PropsType) {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  })

  useEffect(() => {
  }, [fontsLoaded])

  return <View style={s.selectPlayerPage}>

    <Text style={s.selectPlayerPageTitle}>Выбери номер своего персонажа</Text>
    <View style={s.separatorWrapper}>
      <Image style={s.separator} resizeMode={'contain'}
             source={require('@/assets/images/playerselectionscreen/main/decal_vibor_igroka.png')} />
    </View>
    <Text style={s.selectPlayerPageSubTitle}>Два игрока не могут иметь один и тот же номер</Text>

  </View>
}

const s = StyleSheet.create({
  selectPlayerPage: {
    marginHorizontal: 'auto',
    maxWidth: 290,
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
    letterSpacing:1.4,
    fontFamily: 'RobotoSlabSemiBold',
  },
  separatorWrapper: {},
  separator: {
    maxWidth: '100%',
    height: 26,
  },
})