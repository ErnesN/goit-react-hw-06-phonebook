import { Provider } from 'react-redux';
import Phonebooks from './modules/Phonebooks/Phonebooks';
import { PersistGate } from 'redux-persist/integration/react';
import styles from './modules/Phonebooks/phonebooks.module.scss';

import { store, persistor } from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.phonebook}>
          <Phonebooks />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
