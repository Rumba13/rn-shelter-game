import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { Player } from '@/src/shared/lib/types/player';

export type Game = {
  apocalypse: Apocalypse;
  shelter: Shelter;
  players: Player[];
  ending: string;
};
