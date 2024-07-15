import { CardType } from '@/src/shared/lib/types/card-type';
import { Card } from '@/src/shared/lib/types/card';

export type CardKit = {
  [key in CardType]: Card[]
}