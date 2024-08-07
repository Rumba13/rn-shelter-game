import { Card } from '@/src/shared/lib/types/card';
import { databaseStore } from '@/src/shared/model/database-store';
import { Edition } from '@/src/shared/lib/types/edition';
import { CardType } from '@/src/shared/lib/types/card-type';

class CardsStore {


  constructor() {

  }

  public getCardsByEdition(edition: Edition): Card[] {
    return databaseStore.database.getAllSync<Card>(`SELECT * FROM cards WHERE edition = '${edition}';`);
  }

  public getCardById(id: number): Card {
    const card = databaseStore.database.getFirstSync<Card>(`SELECT * FROM cards WHERE id = '${id}';`);

    if (!card) throw new Error('Card not found');

    return card;
  }

  public getCardByName(name: string): Card {
    const card = databaseStore.database.getFirstSync<Card>(`SELECT * FROM cards WHERE name = '${name.replaceAll('\'', '\'\'')}'`);

    if (!card) throw new Error('Card not found');

    return card;
  }

  public getCardsByType(cardType: CardType): Card[] {
    return databaseStore.database.getAllSync(`SELECT * FROM cards WHERE type = '${cardType}';`);
  }

  public getAllCards(): Card[] {
    const a = Date.now();
    const b = databaseStore.database.getAllSync<Card>(`SELECT * FROM cards;`);
    console.log(Date.now() - a + ' ms');
    return b;
  }

}

export const cardsStore = new CardsStore();