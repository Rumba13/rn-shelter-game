import { View, Text, Image, Alert, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { CheckBox } from '@/src/shared/ui/check-box/ui'
import { ImageButton } from '@/src/shared/ui/image-button/ui'
import { useFonts } from 'expo-font'
import RNPickerSelect from 'react-native-picker-select'
import { PickerSelectProps } from 'react-native-picker-select'
import { Range } from '@/src/shared/ui/range/ui'
import { observer } from 'mobx-react'
import { gameCreationOptionsModel } from '@/src/pages/create-game-page/model/create-game-options'
import { GameOptionBase } from '@/src/pages/create-game-page/ui/game-option-base/ui'

type PropsType = {
  title: string
  onValueChanged: (value: number) => void
  selectedTitle: string
  min: number
  max: number
  defaultValue: number
  descriptionHeight: number
  description: string
}

export function GameOptionRange({
  title,
  onValueChanged,
  max,
  min,
  selectedTitle,
  defaultValue,
  descriptionHeight,
  description,
}: PropsType) {
  const [fontsLoaded] = useFonts({
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  })

  useEffect(() => {}, [fontsLoaded])

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <GameOptionBase title={title} descriptionHeight={descriptionHeight} description={description}>
      <View style={s.selectedTitleWrapper}>
        <ImageBackground
          source={require('@/assets/images/gamecreationscreen/create_text_frame.png')}
          resizeMode={'stretch'}>
          <Text style={s.selectedTitle}>{selectedTitle}</Text>
        </ImageBackground>
      </View>
      <Range
        onValueChanged={onValueChanged}
        defaultValue={defaultValue}
        max={max}
        min={min}
        options={{
          trackImage: require('@/assets/images/gamecreationscreen/picker_line_2_gradient.png'),
          pickerImage: require('@/assets/images/gamecreationscreen/picker1.png'),
        }}
      />
    </GameOptionBase>
  )
}

const s: any = {
  selectedTitleWrapper: {
    width: '100%',
    marginTop: 5,
    height: 40,
    maxHeight: 40,
  },
  selectedTitle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#98795d',
    fontFamily: 'RobotoSlabSemiBold',
    letterSpacing: 1,
    paddingVertical: 8,
    lineHeight: 20,
  },
}
