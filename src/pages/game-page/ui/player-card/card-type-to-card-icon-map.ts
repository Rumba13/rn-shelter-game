import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardIconMap: { [key in CardType]: any } = {
  'bio': require('@/assets/images/gamescreen/bio_icon.webp'),
  'knowledge': require('@/assets/images/gamescreen/brain_icon.webp'),
  'luggage': require('@/assets/images/gamescreen/baggage.webp'),
  'condition-card': void 0,
  'action-card': void 0,
  'hobby': require('@/assets/images/gamescreen/hobby_icon.webp'),
  'additional-information': require('@/assets/images/gamescreen/addinfo_icon.webp'),
  'character': require('@/assets/images/gamescreen/persona_icon.webp'),
  'health': require('@/assets/images/gamescreen/health_icon.webp'),
  'phobia': require('@/assets/images/gamescreen/phobia_icon.webp'),
};
