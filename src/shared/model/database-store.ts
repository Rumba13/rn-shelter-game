import { SQLiteDatabase } from 'expo-sqlite';

class DatabaseStore {
  private _database: SQLiteDatabase | null = null;

  get database() {
    if (this._database === null) {
      throw Error('Database wasn\'t added');
    }

    return this._database;
  }
  set database(database: SQLiteDatabase) {
    this._database = database;
  }

  constructor() {

  }
}

export const databaseStore = new DatabaseStore();