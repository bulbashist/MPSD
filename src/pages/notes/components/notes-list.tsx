import React from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableHighlight,
  View,
} from 'react-native';

import { NativeSyntheticEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  changeNoteState,
  deleteNote,
  RootState,
  updateNote,
} from '../../../store/store';
import { INote } from '../../../types';

export const useNotesFilter = () => {
  const { notes, filter } = useSelector((state: RootState) => state.notes);
  return [...notes].filter((note: INote) =>
    note.content.toLowerCase().includes(filter),
  );
};

const NotesList = ({ switchPage }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useNotesFilter();

  // eslint-disable-next-line react-native/no-inline-styles
  const separator = () => <View style={{ height: 25 }} />;

  const noteAddHandler = (_e: GestureResponderEvent) => {
    switchPage(false);
  };

  const pressHandler = (note: INote) => {
    dispatch(
      changeNoteState({
        ...note,
        isBeingEdited: !note.isBeingEdited,
      }),
    );
  };

  const longPressHandler = (note: INote) => {
    dispatch(
      changeNoteState({
        ...note,
        isBeingDeleted: !note.isBeingDeleted,
      }),
    );
  };

  const noteRemovalHandler = async (note: INote) => {
    dispatch(deleteNote(note.id));
  };

  const changeData = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    note: INote,
  ) => {
    dispatch(
      updateNote({
        ...note,
        content: e.nativeEvent.text,
        isBeingEdited: false,
      }),
    );
  };

  return (
    <View>
      <FlatList
        data={notes}
        ItemSeparatorComponent={separator}
        keyExtractor={(note: INote) => note.id}
        renderItem={({ item }) =>
          item.isBeingDeleted ? (
            <TouchableHighlight onLongPress={() => longPressHandler(item)}>
              <View style={styles.noteDeleteItem}>
                <Pressable onPress={() => noteRemovalHandler(item)}>
                  <Text style={styles.tractor}>🗑️</Text>
                </Pressable>
              </View>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              onPress={() => pressHandler(item)}
              onLongPress={() => longPressHandler(item)}>
              <View
                style={{
                  ...styles.noteItem,
                  backgroundColor: item.color,
                }}>
                <TextInput
                  style={styles.noteContent}
                  defaultValue={item.content}
                  onSubmitEditing={e => changeData(e, item)}
                  blurOnSubmit={true}
                  multiline={true}
                />
              </View>
            </TouchableHighlight>
          )
        }
        style={styles.notesList}
      />
      <Pressable style={styles.addBtn} onPress={noteAddHandler}>
        <Text style={styles.addBtnText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  notesList: {
    display: 'flex',
    margin: 20,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9e9e',
    borderRadius: 25,
    paddingTop: 27,
    paddingBottom: 27,
    //padding: '27px 45px',
    paddingLeft: 45,
    paddingRight: 45,
  },
  noteDeleteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    paddingTop: 27,
    paddingBottom: 27,
    paddingLeft: 45,
    paddingRight: 45,
    color: 'black',
    fontSize: 32,
    justifyContent: 'center',
  },
  tractor: {
    fontSize: 32,
  },
  noteContent: {
    display: 'flex',
    flexGrow: 1,
    textAlign: 'center',
    color: '#000000',
    fontSize: 25,
    fontFamily: 'Nunito',
    padding: 0,
    letterSpacing: 0,
  },
  noteBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'green',
  },
  noteBtnText: {
    textTransform: 'capitalize',
    fontSize: 10,
  },
  addBtn: {
    position: 'absolute',
    left: 295,
    top: 477,
    zIndex: 2,

    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'black',
    borderRadius: 35,
  },
  addBtnText: {
    fontSize: 32,
    color: 'white',
  },
});

export default NotesList;
