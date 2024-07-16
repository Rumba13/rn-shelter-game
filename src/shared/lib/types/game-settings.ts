import { Shelter } from '@/src/shared/lib/types/shelter';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { Card } from '@/src/shared/lib/types/card';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';

export type GameSettings = {
  playersCount: number;
  difficulty: number;
  balance: number;
  sexualOrientation: SexualOrientation;
  cardsKit: Card[];
  apocalypses: Apocalypse[];
  shelters: Shelter[];
  characteristicBalance: number;

  //Special options
  hillbillyMode: boolean;
  lotteryTicketMode:boolean,

};
