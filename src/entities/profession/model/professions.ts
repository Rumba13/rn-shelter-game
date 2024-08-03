import { Profession } from '@/src/shared/lib/types/profession';
import { databaseStore } from '@/src/shared/model/database-store';

class ProfessionsStore {
  public getProfessionById(id: number): Profession | null {
    return databaseStore.database.getFirstSync<Profession>(`SELECT * FROM professions WHERE id = '${id}'`);
  }
}

export const professionsStore = new ProfessionsStore();