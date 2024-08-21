import { SQLiteDatabase } from 'expo-sqlite';
import { makeAutoObservable } from 'mobx';

class DatabaseStore {
  private _database: SQLiteDatabase | null = null;

  public get database() {
    if (!this._database) {
      throw Error('Database wasn\'t added yet');
    }

    return this._database;
  }

  public set database(database: SQLiteDatabase) {
    if (this._database) return;

    this._database = database;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const databaseStore = new DatabaseStore();