import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, updateFilter } from '../../../../store/store';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.notes.filter);

  const searchHandler = () => {
    setIsSearching(true);
  };

  const textHandler = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    dispatch(updateFilter(e.nativeEvent.text));
    setIsSearching(false);
  };

  return (
    <>
      {!isSearching ? (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Notes</Text>
            <View style={styles.btnWrapper}>
              <Pressable style={styles.headerBtn} onPress={searchHandler}>
                <Text style={styles.headerBtnText}>🔍</Text>
              </Pressable>
              <Pressable style={styles.headerBtn}>
                <Text style={styles.headerBtnText}>ⓘ</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.filter}>Current filter: {filter}</Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.inputElem}
            placeholder="Search"
            onSubmitEditing={textHandler}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 48,
    marginRight: 24,
    marginBottom: 16,
    marginLeft: 24,
  },
  headerText: {
    fontSize: 43,
    color: '#000000',
  },
  headerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: '#3b3b3b',
  },
  headerBtnText: {
    color: '#ffffff',
  },
  btnWrapper: {
    flexDirection: 'row',
  },
  inputElem: {
    margin: 20,
    borderBottomWidth: 3,
    color: '#000000',
  },
  filter: {
    textAlign: 'center',
  },
});

export default Header;
