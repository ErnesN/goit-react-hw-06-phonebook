import { useSelector, useDispatch } from 'react-redux';

import PhonebooksForm from './PhonebooksForm/PhonebooksForm';
import PhonebookList from './PhonebookList/PhonebookList';
import PhonebooksFilter from './PhonebooksFilter/PhonebooksFilter';
import MyFavoriteContacts from './MyFavoriteContacts/MyFavoriteContacts';

import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';
import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import styles from './phonebooks.module.scss';

const Phonebooks = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normalizedTitle = name.toLowerCase();
    const normalizedAuthor = number.toLowerCase();
    const result = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedTitle &&
        number.toLowerCase() === normalizedAuthor
      );
    });

    return Boolean(result);
  };

  const handleAddContact = ({ name, number, favorite }) => {
    if (isDublicate(name, number)) {
      alert(`${name}: ${number} is already ixist`);
      return false;
    }

    dispatch(addContact({ name, number, favorite }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };
  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1>Phonebook</h1>
        <PhonebooksForm onSubmit={handleAddContact} />
      </div>
      <div className={styles.block}>
        <MyFavoriteContacts />
        <PhonebooksFilter value={filter} handleChange={handleFilter} />
        {isContacts && (
          <PhonebookList
            removeContact={handleDeleteContact}
            contacts={filteredContacts}
          />
        )}
        {!isContacts && <p>No contacts in list</p>}
      </div>
    </div>
  );
};

export default Phonebooks;
