import { View, Text, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { CheckBox } from '@/src/shared/ui/check-box/ui'
import { useFonts } from 'expo-font'
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui'

type PropsType = {
  title: string
  //TODO remove ?
  onValueChange?: (value: boolean) => void
  descriptionHeight: number
  description: string
}

export function GameOptionCheckbox({ title, onValueChange, descriptionHeight, description }: PropsType) {
  const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false)
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  })

  useEffect(() => {}, [fontsLoaded])

  if (!fontsLoaded) {
    return <View></View>
  }
  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <CheckBox
        style={s.gameOptionCheckBox}
        isToggled={isOptionEnabled}
        setIsToggled={isEnable => {
          if (onValueChange) {
            //TODO read upper TODO
            onValueChange(isEnable)
          }
          setIsOptionEnabled(isEnable)
        }}
      />
    </GameOptionBase>
  )
}

const s: any = {
  gameOptionCheckBox: {
    marginTop: 20,
    marginLeft: 'auto',
  },
}
