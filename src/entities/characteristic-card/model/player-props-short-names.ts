import { CardType } from '@/src/shared/lib/types/card-type';

export const playerPropsShortNames: { [key in CardType | 'profession' | 'number']: string } = {
  'bio': 'b',
  'health': 'he',
  'character': 'c',
  'hobby': 'h',
  'phobia': 'p',
  'additional-information': 'a',
  'knowledge': 'k',
  'luggage': 'l',
  'condition-card': 'cc',
  'action-card': 'ac',
  'profession': 'pr',
  'number': 'n',
};
