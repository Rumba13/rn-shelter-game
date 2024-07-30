import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardBackgroundMap: { [key in CardType]: any } = {
  'bio': require('@/assets/images/gamescreen/bio_bg.webp'),
  'knowledge': require('@/assets/images/gamescreen/brain_bg.webp'),
  'luggage': require('@/assets/images/gamescreen/baggage_bg.webp'),
  'condition-card': require('@/assets/images/gamescreen/karta_uslovija.webp'),
  'action-card': require('@/assets/images/gamescreen/karta_dejstvij.webp'),
  'hobby': require('@/assets/images/gamescreen/hobby_bg.webp'),
  'additional-information': require('@/assets/images/gamescreen/addinfo_bg.webp'),
  'character': require('@/assets/images/gamescreen/persona_bg.webp'),
  'health': require('@/assets/images/gamescreen/health_bg.webp'),
  'phobia': require('@/assets/images/gamescreen/phobia_bg.webp'),
};
