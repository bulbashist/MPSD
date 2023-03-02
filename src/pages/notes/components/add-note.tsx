import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { useDispatch } from 'react-redux/es/exports';
import { addNote, AppDispatch } from '../../../store/store';

const AddNotePage = ({ switchPage }: any) => {
  const elem = useRef<TextInput>(null);
  const dispatch = useDispatch<AppDispatch>();

  const addNoteHandler = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    dispatch(
      addNote({
        content: e.nativeEvent.text,
      }),
    );
    switchPage(true);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        ref={elem}
        onSubmitEditing={e => addNoteHandler(e)}
        blurOnSubmit={true}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 32,
    color: '#000000',
  },
});

export default AddNotePage;
