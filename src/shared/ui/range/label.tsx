import { View, Text } from 'react-native'

type PropsType = {
  value: number
}

export function Label({ value }: PropsType) {
  return (
    <View style={s.labelWrapper}>

      <Text style={s.label}>
        {value}
      </Text>

    </View>
  )
}

const s: any = {
  labelWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom:2,
    borderRadius: 7,
    marginBottom:5,
    minWidth: 15,
    position:"relative",
    top:3,
  },
  label: {},
}