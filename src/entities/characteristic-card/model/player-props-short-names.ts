import { CardType } from '@/src/shared/lib/types/card-type';

export const playerPropsShortNames: { [key in CardType | 'profession' | 'number']: string } = {
  'bio': 'a',
  'health': 'b',
  'character': 'c',
  'hobby': 'd',
  'phobia': 'e',
  'additional-information': 'f',
  'knowledge': 'g',
  'luggage': 'h',
  'condition-card': 'i',
  'action-card': 'j',
  'profession': 'k',
  'number': 'l',
};
