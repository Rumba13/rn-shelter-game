import { Alert, GestureResponderEvent, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import Slider from 'rn-range-slider'
import { observer } from 'mobx-react'
import { gameCreationOptionsModel } from '@/src/entities/game/model/create-game-options'
import { Label } from '@/src/shared/ui/range/label'
import { useEffect, useState } from 'react'

type PropsType = {
  onValueChanged: (value: number) => void
  min: number
  max: number
  defaultValue: number
  options?: {
    trackImage?: any
    pickerImage?: any
  }
}

//TODO when closing modal with range in it, sliderTrack stand in front of sliderPicker

export const Range = observer(({ onValueChanged, options, max, min, defaultValue }: PropsType) => {
  const [minimalValue, setMinimalValue] = useState<number>(defaultValue)

  if (typeof defaultValue !== 'number') {
    throw new Error("Range Component Error. Default value isn't number")
  }

  useEffect(() => {}, [min])

  function _onValueChanged(value: number) {
    setMinimalValue(min)
    onValueChanged(value)
  }

  return (
    <Slider
      style={s.slider}
      disableRange
      min={minimalValue}
      max={max}
      step={1}
      renderThumb={() => (
        <Image
          style={s.sliderPicker}
          resizeMode={'contain'}
          source={options?.pickerImage ?? require('@/assets/images/gamecreationscreen/picker.png')}
        />
      )}
      renderRail={() => (
        <Image
          style={s.sliderTrack}
          resizeMode={'contain'}
          source={options?.trackImage ?? require('@/assets/images/gamecreationscreen/picker_line.png')}
        />
      )}
      renderRailSelected={() => void 0}
      renderLabel={value => <Label value={value} />}
      renderNotch={() => void 0}
      onValueChanged={_onValueChanged}
    />
    // <TouchableWithoutFeedback onPressIn={onPressIn}>
    //   <View style={s.slider}>
    //     <Image
    //       style={s.sliderPicker}
    //       resizeMode={'contain'}
    //       source={require('@/assets/images/gamecreationscreen/picker.png')}
    //     />
    //     <Image
    //       style={s.sliderTrack}
    //       resizeMode={'contain'}
    //       source={require('@/assets/images/gamecreationscreen/picker_line.png')}
    //     />
    //   </View>
    // </TouchableWithoutFeedback>
  )
})

const s: any = {
  slider: {
    position: 'relative',
    maxHeight: 'auto',
    top: -5,
  },
  sliderPicker: {
    zIndex: 2,
    width: 36,
    height: 36,
  },
  sliderTrack: {
    maxWidth: '100%',
    zIndex: -1,
  },
}
