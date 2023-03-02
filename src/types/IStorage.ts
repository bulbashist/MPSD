import { INote } from '../types';

export interface IStorage {
  initializeDB(): void;
  getNotes(): Promise<INote[]>;
  addNote(note: INote): Promise<void>;
  deleteNote(id: string): Promise<void>;
  updateNote(note: INote): Promise<void>;
  getFilteredNotes(content: string): Promise<INote[]>;
}
