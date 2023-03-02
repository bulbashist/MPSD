/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { enablePromise } from 'react-native-sqlite-storage';
import { Provider } from 'react-redux/es/exports';
import App from './App';
import { name as appName } from './app.json';
import { store2 } from './src/store/store';

enablePromise(true);
AppRegistry.registerComponent(appName, () => SuperApp);

const SuperApp = () => (
  <Provider store={store2}>
    <App />
  </Provider>
);
