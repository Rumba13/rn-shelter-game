import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardIconMap: { [key in CardType]: any } = {
  'bio': require('@/assets/images/gamescreen/bio-icon.webp'),
  'knowledge': require('@/assets/images/gamescreen/brain-icon.webp'),
  'luggage': require('@/assets/images/gamescreen/baggage-icon.webp'),
  'condition-card': void 0,
  'action-card': void 0,
  'hobby': require('@/assets/images/gamescreen/hobby-icon.webp'),
  'additional-information': require('@/assets/images/gamescreen/add-info-icon.webp'),
  'character': require('@/assets/images/gamescreen/character-icon.webp'),
  'health': require('@/assets/images/gamescreen/health-icon.webp'),
  'phobia': require('@/assets/images/gamescreen/phobia-icon.webp'),
};
