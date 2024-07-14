import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardTitleMap: { [key in CardType]: any } = {
  bio: 'Био. Характеристики',
  health: 'Состояние Здоровья',
  knowledge: 'Знание',
  luggage: 'Багаж',
  'condition-card': 'Карта Условия',
  'action-card': 'Карта Действия',
  hobby: 'Хобби',
  'additional-information': 'Доп. Информация',
  character: 'Характер',
  phobia: 'Фобия',
};