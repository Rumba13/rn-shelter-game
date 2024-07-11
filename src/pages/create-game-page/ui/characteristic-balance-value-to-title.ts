export function characteristicBalanceValueToTitle(value: number) {
  const characteristicBalanceValueToTitleMap = {
    '1': 'Нет разброса',
    '2': 'Обычный разброс',
    '3': 'Сильный разброс',
    '4': 'Пиздец на яву',
  };

  //@ts-ignore
  return characteristicBalanceValueToTitleMap[value];
}
