import { View, Text, Image, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { CheckBox } from '@/src/shared/ui/check-box/ui'
import { ImageButton } from '@/src/shared/ui/image-button/ui'
import { useFonts } from 'expo-font'
import RNPickerSelect from 'react-native-picker-select'
import { PickerSelectProps } from 'react-native-picker-select'
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui'

type PropsType = {
  title: string
  items: PickerSelectProps['items']
  onValueChange: PickerSelectProps['onValueChange'],
  descriptionHeight: number,
  description:string
}

export function GameOptionSelect({ title, items, onValueChange, descriptionHeight,description }: PropsType) {
  const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false)
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  })

  useEffect(() => {
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <View></View>
  }
  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <RNPickerSelect onValueChange={onValueChange} items={items} placeholder={{}} />
    </GameOptionBase>
  )
}

