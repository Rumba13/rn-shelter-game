export function stayTimeMonthsToTitle(stayTimeInMonths: number): string {
  if (stayTimeInMonths <= 12) return `${stayTimeInMonths}\nмес.`;
  else {
    return `${Math.round(stayTimeInMonths / 12)}\nлет.`;
  }

}