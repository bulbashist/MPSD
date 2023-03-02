import React, { useState, useEffect } from 'react';
import AddNotePage from './components/add-note';
import Header from './components/header/header';
import NotesList from './components/notes-list';
import { useDispatch } from 'react-redux';
import { setNotes, AppDispatch } from '../../store/store';

const NotesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setNotes());
  }, [dispatch]);

  const [isList, setIsList] = useState(true);

  return (
    <>
      <Header />
      {isList ? (
        <NotesList switchPage={setIsList} />
      ) : (
        <AddNotePage switchPage={setIsList} />
      )}
    </>
  );
};

export default NotesPage;
