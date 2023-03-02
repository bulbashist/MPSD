import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Colors, INote } from '../types';
import { IStorage } from '../types/IStorage';
import { Storage } from '../types/Storage';
import { v4 as uuid } from 'uuid';

export const store: IStorage = new Storage('notes.db');

const addNote = createAsyncThunk(
  'notes/addNote',
  async (note: Omit<INote, 'id'>): Promise<INote> => {
    const fullNote = {
      id: uuid(),
      color: Colors.get(Math.floor(Math.random() * Colors.size)),
      ...note,
    };

    await store.addNote(fullNote);
    return fullNote;
  },
);

const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (note: INote): Promise<INote> => {
    await store.updateNote(note);
    return note;
  },
);

const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string): Promise<string> => {
    await store.deleteNote(id);
    return id;
  },
);

const setNotes = createAsyncThunk(
  'notes/setNotes',
  async (): Promise<INote[]> => {
    let notes = await store.getNotes();
    notes = notes.map((note: INote) => {
      note.color = Colors.get(Math.floor(Math.random() * Colors.size));
      return note;
    });
    return notes;
  },
);

type NotesState = {
  filter: string;
  notes: INote[];
};

const slice = createSlice({
  name: 'notes',
  initialState: {
    filter: '',
    notes: [] as INote[],
  },
  reducers: {
    updateFilter: (state: NotesState, action: PayloadAction<string>) => {
      state.filter = action.payload.toLowerCase();
      return state;
    },
    changeNoteState: (state: NotesState, action: PayloadAction<INote>) => {
      const copy = [...state.notes];
      const index = copy.findIndex(note => note.id === action.payload.id);
      copy[index] = action.payload;
      state.notes = copy;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const copy = [...state.notes];
        const index = copy.findIndex(note => note.id === action.payload.id);
        console.log(action.payload);
        copy[index] = action.payload;
        state.notes = copy;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note: INote) => note.id === action.payload,
        );
        state.notes.splice(index, 1);
      });
  },
});

const store2 = configureStore({
  reducer: {
    notes: slice.reducer,
  },
});

export let filter = '';

export const { updateFilter, changeNoteState } = slice.actions;
export { addNote, updateNote, deleteNote, setNotes };
export default slice.reducer;
export { store2 };
export type RootState = ReturnType<typeof store2.getState>;
export type AppDispatch = typeof store2.dispatch;
