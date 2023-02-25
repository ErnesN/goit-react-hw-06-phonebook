import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PhonebooksForm from './PhonebooksForm/PhonebooksForm';
import PhonebookList from './PhonebookList/PhonebookList';
import PhonebooksFilter from './PhonebooksFilter/PhonebooksFilter';
import MyFavoriteContacts from './MyFavoriteContacts/MyFavoriteContacts';

import { addContact, deleteContact } from 'redux/actions';

import styles from './phonebooks.module.scss';

const Phonebooks = () => {
  const contacts = useSelector(store => store.contacts);
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('my-contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const isDublicate = (name, number) => {
    const normalizedTitle = name.toLowerCase();
    const normalizedAuthor = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
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

    const action = addContact({ name, number, favorite });
    dispatch(action);
  };

  const handleDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };
  const handleFilter = ({ target }) => setFilter(target.value);
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  };
  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1>Phonebook</h1>
        <PhonebooksForm onSubmit={handleAddContact} />
      </div>
      <div className={styles.block}>
        <MyFavoriteContacts />
        <PhonebooksFilter handleChange={handleFilter} />
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
