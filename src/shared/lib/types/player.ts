import { Card } from '@/src/shared/lib/types/card';
import { Profession } from '@/src/shared/lib/types/profession';

export type Player = {
  isKicked: Boolean;
  profession: Profession;
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
  number: number;
};
