import { CardType } from '@/src/shared/lib/types/card-type';

export const cardTypeToCardIconMap: { [key in CardType]: any } = {
  bio: require('@/assets/images/gamescreen/bio_icon.png'),
  knowledge: require('@/assets/images/gamescreen/brain_icon.png'),
  luggage: require('@/assets/images/gamescreen/baggage.png'),
  'condition-card': void 0,
  'action-card': void 0,
  hobby: require('@/assets/images/gamescreen/hobby_icon.png'),
  'additional-information': require('@/assets/images/gamescreen/addinfo_icon.png'),
  character: require('@/assets/images/gamescreen/persona_icon.png'),
  health: require('@/assets/images/gamescreen/health_icon.png'),
  phobia: require('@/assets/images/gamescreen/phobia_icon.png'),
};