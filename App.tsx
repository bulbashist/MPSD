/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

import { Provider } from 'react-redux';
import NotesPage from './src/pages/notes/notes';
import { store2 } from './src/store/store';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#ffffff',
    height: '100%',
  };

  return (
    <Provider store={store2}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NotesPage />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
