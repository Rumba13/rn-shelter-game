import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { Player } from '@/src/shared/lib/types/player';
import { Ending } from '@/src/shared/lib/types/ending';

export type GameType = {
  apocalypse: Apocalypse;
  shelter: Shelter;
  players: Player[];
  ending: Ending;
  currentPlayerNumber: number; //TODO fix naming
};
