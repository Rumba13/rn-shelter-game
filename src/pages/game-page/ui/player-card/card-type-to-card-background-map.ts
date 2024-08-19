import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardBackgroundMap: { [key in CardType]: any } = {
  'bio': require('@/assets/images/gamescreen/bio-background.webp'),
  'knowledge': require('@/assets/images/gamescreen/brain-background.webp'),
  'luggage': require('@/assets/images/gamescreen/baggage-background.webp'),
  'condition-card': require('@/assets/images/gamescreen/card-condition.webp'),
  'action-card': require('@/assets/images/gamescreen/card-action.webp'),
  'hobby': require('@/assets/images/gamescreen/hobby-background.webp'),
  'additional-information': require('@/assets/images/gamescreen/add-info-background.webp'),
  'character': require('@/assets/images/gamescreen/character-background.webp'),
  'health': require('@/assets/images/gamescreen/health-background.webp'),
  'phobia': require('@/assets/images/gamescreen/phobia-background.webp'),
};
