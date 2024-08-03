import {  apocalypsesStore } from './apocalypses';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';

export function apocalypseNameToApocalypse(apocalypseName: string): Apocalypse {
  const apocalypse = apocalypsesStore.getApocalypseByName(apocalypseName);

  if (!apocalypse) {
    throw new Error('Apocalypse is undefined');
  }

  return apocalypse;
}
