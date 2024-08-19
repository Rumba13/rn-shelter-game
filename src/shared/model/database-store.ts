import { SQLiteDatabase } from 'expo-sqlite';
import { makeAutoObservable } from 'mobx';

class DatabaseStore {
  private _database: SQLiteDatabase | null = null;

  get database() {
    if (!this._database) {
      throw Error('Database wasn\'t added yet');
    }

    return this._database;
  }

  set database(database: SQLiteDatabase) {
    this._database = database;
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export const databaseStore = new DatabaseStore();