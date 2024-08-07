import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';

export const sexualOrientationToTitleMap: { [key in SexualOrientation]: string } = {
  0: 'Случайно',
  1: 'Все натуралы',
  2: '🌈Все геи🌈',
  3: 'Отключена',
};