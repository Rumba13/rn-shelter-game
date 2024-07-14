import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardBackgroundMap: { [key in CardType]: any } = {
  bio: require('@/assets/images/gamescreen/bio_bg.png'),
  knowledge: require('@/assets/images/gamescreen/brain_bg.png'),
  luggage: require('@/assets/images/gamescreen/baggage_bg.png'),
  'condition-card': require('@/assets/images/gamescreen/karta_uslovija.png'),
  'action-card': require('@/assets/images/gamescreen/karta_dejstvij.png'),
  hobby: require('@/assets/images/gamescreen/hobby_bg.png'),
  'additional-information': require('@/assets/images/gamescreen/addinfo_bg.png'),
  character: require('@/assets/images/gamescreen/persona_bg.png'),
  health: require('@/assets/images/gamescreen/health_bg.png'),
  phobia: require('@/assets/images/gamescreen/phobia_bg.png'),
};