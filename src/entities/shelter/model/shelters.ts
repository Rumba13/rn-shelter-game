import { Shelter } from '@/src/shared/lib/types/shelter';
import { Edition } from '@/src/shared/lib/types/edition';
import { databaseStore } from '@/src/shared/model/database-store';
import { ShelterEncoded } from '@/src/shared/lib/types/shelter-encoded';

class SheltersStore {
  private decodeShelterFromDatabase(shelter: ShelterEncoded): Shelter {

    return {
      ...shelter,
      rooms: JSON.parse(shelter.rooms),
      resources: JSON.parse(shelter.resources),
    };
  }

  public getSheltersByEdition(edition: Edition): Shelter[] {
    return databaseStore.database.getAllSync<ShelterEncoded>(`SELECT * FROM shelters WHERE edition = '${edition}';`).map(this.decodeShelterFromDatabase);
  }

  public getShelterByName(name: string): Shelter {
    const encodedShelter = databaseStore.database.getFirstSync<ShelterEncoded>(`SELECT * FROM shelters WHERE name = '${name}'`);

    if (!encodedShelter) throw new Error('Shelters not found');

    return this.decodeShelterFromDatabase(encodedShelter);
  }

  public getShelterById(id: number): Shelter | null {
    const encodedShelter = databaseStore.database.getFirstSync<ShelterEncoded>(`SELECT * FROM shelters WHERE id = '${id}'`);

    if (!encodedShelter) throw new Error('Shelters not found');

    return this.decodeShelterFromDatabase(
      encodedShelter,
    );
  }

  public getAllShelters(): Shelter[] {
    return databaseStore.database.getAllSync<ShelterEncoded>(`SELECT * FROM shelters;`).map(this.decodeShelterFromDatabase);
  }
}

export const sheltersStore = new SheltersStore();