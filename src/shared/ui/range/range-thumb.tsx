import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

type PropsType = {
  pickerImage:any
}
const sliderPickerSize = 36;

export function RangeThumb({pickerImage}: PropsType) {
  return (
    <View
      style={{
        height: sliderPickerSize + 10,
        width: sliderPickerSize + 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={s.sliderPicker}
        contentFit={'contain'}
        source={pickerImage}
      />
    </View>
  );
}

const s = StyleSheet.create({
  sliderPicker: {
    zIndex: 2,
    width: sliderPickerSize,
    height: sliderPickerSize,
  },
});