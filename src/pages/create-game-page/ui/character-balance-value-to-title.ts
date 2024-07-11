export function characterBalanceValueToTitle(value: number): string {
  const characterBalanceMap = {
    1: 'Все равны',
    2: 'Почти все равны',
    3: 'Слабый разброс',
    4: 'Обычный разброс',
    5: 'Сильный разброс',
    6: 'Как повезёт:)',
    7: 'Дима и Ева',
    8: 'Цари и нищие',
  };

  //@ts-ignore
  return characterBalanceMap[value];
}
