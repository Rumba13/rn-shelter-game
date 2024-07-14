import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { Player } from '@/src/shared/lib/types/player';

export type GameType = {
  apocalypse: Apocalypse;
  shelter: Shelter;
  players: Player[];
  ending: string;
  currentPlayerNumber: number //TODO fix naming
};
