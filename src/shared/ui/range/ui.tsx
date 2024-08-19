import { StyleSheet } from 'react-native';
import Slider from 'rn-range-slider';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { RangeRail } from '@/src/shared/ui/range/range-rail';
import { RangeThumb } from '@/src/shared/ui/range/range-thumb';

type PropsType = {
  onValueChanged: (value: number) => void;
  min: number;
  max: number;
  defaultValue: number;
  options?: OptionsType
};
type OptionsType = {
  trackImage?: any;
  pickerImage?: any;
};

const defaultOptions: OptionsType = {
  trackImage: require('@/assets/images/gamecreationscreen/picker-track.webp'),
  pickerImage: require('@/assets/images/gamecreationscreen/picker-icon.webp'),
};

export const Range = observer(({ onValueChanged, options = defaultOptions, max, min, defaultValue }: PropsType) => {
  const [minimalValue, setMinimalValue] = useState<number>(defaultValue); //Set slider default value through slider.min

  useEffect(() => {
  }, [min]);

  function _onValueChanged(value: number) { //Unset range default value
    setMinimalValue(min);
    onValueChanged(value);
  }

  return (
    <Slider
      style={s.slider}
      min={minimalValue}
      max={max}
      step={1}
      renderThumb={() => <RangeThumb pickerImage={options.pickerImage} />}
      renderRail={() => <RangeRail trackImage={options.trackImage} />}
      renderRailSelected={() => void 0}
      onValueChanged={_onValueChanged}
      disableRange
    />
  );
});
const s = StyleSheet.create({
  slider: {
    position: 'relative',
    top: -5,
    maxHeight: 'auto',
  },
});
