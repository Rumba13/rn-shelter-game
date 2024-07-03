export function sexualOrientationValueToTitle(value: number): string {
  const sexualOrientationMap = {
    0: 'Случайно',
    1: 'Все натуралы',
    2: '🌈Все геи🌈',
    3: 'Отключена',
  }

  //@ts-ignore
  return sexualOrientationMap[value]
}

