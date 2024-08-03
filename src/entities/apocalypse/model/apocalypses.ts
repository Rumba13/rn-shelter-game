import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { databaseStore } from '@/src/shared/model/database-store';
import { Edition } from '@/src/shared/lib/edition';

class ApocalypsesStore {

  constructor() {}

  public getApocalypsesByEdition(edition: Edition): Apocalypse[] {
    return databaseStore.database.getAllSync<Apocalypse>(`SELECT * FROM apocalypses WHERE edition = '${edition}';`);
  }
  public getApocalypseByName(name: string) {
    return databaseStore.database.getFirstSync<Apocalypse>(`SELECT * FROM apocalypses WHERE name = '${name}'`);
  }
  public getApocalypseById(id: number) {
    return databaseStore.database.getFirstSync<Apocalypse>(`SELECT * FROM apocalypses WHERE id = '${id}'`);
  }
  public getAllApocalypses(): Apocalypse[] {
    return databaseStore.database.getAllSync<Apocalypse>(`SELECT * FROM apocalypses`);
  }
}

export const apocalypsesStore = new ApocalypsesStore();