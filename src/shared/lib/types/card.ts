import { CardType } from '@/src/shared/lib/types/card-type';

export type Card = {
  name: string;
  type: CardType;
  price: number;
};
