import { Card } from '@/src/shared/lib/types/card';

export type Player = {
  isKicked: Boolean;
  profession: string;
  bioCharacteristics: Card;
  health: Card;
  hobby: Card;
  phobia: Card;
  character: Card;
  additionalInformation: Card;
  knowledge: Card;
  luggage: Card;
  conditionCard: Card;
  actionCard: Card;
  notes: string;
};
