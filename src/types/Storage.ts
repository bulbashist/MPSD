import {
  SQLiteDatabase,
  openDatabase,
  ResultSet,
} from 'react-native-sqlite-storage';
import 'react-native-get-random-values';
import { IStorage } from './IStorage';
import { INote } from '../types';

export class Storage implements IStorage {
  private db: SQLiteDatabase | null = null;
  private name = '';

  constructor(name: string) {
    this.name = name;
    this.initializeDB();
  }

  public async initializeDB() {
    this.db = await openDatabase({ name: this.name, location: 'default' });

    if (!this.db) {
      throw new Error('DB is null');
    }

    // await this.db.executeSql(`
    //   DROP TABLE notes
    // `);
    await this.db.executeSql(
      `
      CREATE TABLE IF NOT EXISTS notes(
        id TEXT PRIMARY KEY NOT NULL,
        content TEXT NOT NULL
      );
    `,
    );
  }

  async getNotes(): Promise<INote[]> {
    if (!this.db) {
      this.db = await openDatabase({ name: this.name, location: 'default' });
    }

    let result: [ResultSet];
    result = await this.db.executeSql('SELECT * FROM notes');

    const notes = [] as INote[];
    for (let i = 0; i < result[0].rows.length; i++) {
      notes.push({
        ...result[0].rows.item(i),
        isBeingDeleted: Boolean(result[0].rows.item(i).isBeingDeleted),
      });
    }

    return notes;
  }

  async addNote(note: INote): Promise<void> {
    if (!this.db) {
      this.db = await openDatabase({ name: this.name, location: 'default' });
    }

    await this.db.executeSql(
      `INSERT INTO notes (id, content) VALUES ("${note.id}", "${note.content}");`,
    );
    return;
  }

  async deleteNote(id: string): Promise<void> {
    if (!this.db) {
      this.db = await openDatabase({ name: this.name, location: 'default' });
    }

    await this.db.executeSql(`DELETE FROM notes WHERE id="${id}"`);
    return;
  }

  async updateNote(note: INote): Promise<void> {
    console.log(note);
    if (!this.db) {
      this.db = await openDatabase({ name: this.name, location: 'default' });
    }

    console.log(note);
    await this.db.executeSql(`
      UPDATE notes
      SET 
          content = "${note.content}"
      WHERE id="${note.id}"
    `);
    return;
  }

  async getFilteredNotes(content: string): Promise<INote[]> {
    if (!content) {
      return this.getNotes();
    }

    if (!this.db) {
      this.db = await openDatabase({ name: this.name, location: 'default' });
    }

    let result: [ResultSet];
    result = await this.db.executeSql(
      `SELECT * FROM notes WHERE content="${content}"`,
    );

    const notes = [] as INote[];
    for (let i = 0; i < result[0].rows.length; i++) {
      notes.push(result[0].rows.item(i));
    }

    return notes;
  }
}
