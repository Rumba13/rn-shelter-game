import { apocalypses } from './apocalypses';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';

export function apocalypseNameToApocalypse(apocalypseName: string): Apocalypse {
  const apocalypse = apocalypses.find(apocalypse => apocalypse.name === apocalypseName);

  if (apocalypse === undefined) {
    throw new Error('Apocalypse is undefined');
  }

  return apocalypse;
}
