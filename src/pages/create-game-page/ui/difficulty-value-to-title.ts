export function difficultyValueToTitle(value: number): string {
  const difficultyMap = {
    1: 'Как диму обоссать',
    2: 'Легко',
    3: 'Деревня',
    4: 'Нормально',
    5: 'Жить можно',
    6: 'Катастрофа',
    7: 'ПИЗДЕЦ',
    8: '🔥ЗИП в час пик🔥',
  }

  //@ts-ignore
  return difficultyMap[value]
}

