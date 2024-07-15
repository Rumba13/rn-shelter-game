import { CardKit } from '@/src/shared/lib/types/card-kit';

export function mergeCardKits(firstKit: CardKit, secondKit: CardKit) {
  return {
    'bio': [...firstKit.bio, ...secondKit.bio],
    'phobia': [...firstKit.phobia, ...secondKit.phobia],
    'health': [...firstKit.health, ...secondKit.health],
    'luggage': [...firstKit.luggage, ...secondKit.luggage],
    'character': [...firstKit.character, ...secondKit.character],
    'knowledge': [...firstKit.knowledge, ...secondKit.knowledge],
    'condition-card': [...firstKit['condition-card'], ...secondKit['condition-card']],
    'action-card': [...firstKit['action-card'], ...secondKit['action-card']],
    'hobby': [...firstKit.hobby, ...secondKit.hobby],
    'additional-information': [...firstKit['additional-information'], ...secondKit['additional-information']],
  };
}
