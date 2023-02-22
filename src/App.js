import Phonebooks from './modules/Phonebooks/Phonebooks';
import styles from './modules/Phonebooks/phonebooks.module.scss';
function App() {
  return (
    <div className={styles.phonebook}>
      <Phonebooks />
    </div>
  );
}

export default App;
