import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../PhonebookList/phonebook-list.module.scss';

const MyFavoriteContacts = () => {
  const contacts = useSelector(store => {
    const favoriteContacts = store.contacts.filter(({ favorite }) => favorite);
    return favoriteContacts;
  });
  const myFavoriteContacts = contacts.map(({ id, name, number }) => (
    <li key={id} className={styles.item}>
      {name}: {number}.
      {/* <button
        className={styles.btn}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button> */}
    </li>
  ));
  return (
    <div>
      <h2>My Favorite contacts</h2>
      <ol className={styles.list}>{myFavoriteContacts}</ol>
    </div>
  );
};

export default MyFavoriteContacts;

MyFavoriteContacts.defaultProps = {
  contacts: [],
};

MyFavoriteContacts.propTypes = {
  // removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
