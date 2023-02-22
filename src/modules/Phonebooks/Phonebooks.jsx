import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import PhonebooksForm from './PhonebooksForm/PhonebooksForm';
import PhonebookList from './PhonebookList/PhonebookList';
import PhonebooksFilter from './PhonebooksFilter/PhonebooksFilter';

import styles from './phonebooks.module.scss';

const Phonebooks = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts?.length ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

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

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      alert(`${name}: ${number} is already ixist`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
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
        <PhonebooksForm onSubmit={addContact} />
      </div>
      <div className={styles.block}>
        <PhonebooksFilter handleChange={handleFilter} />
        {isContacts && (
          <PhonebookList
            removeContact={removeContact}
            contacts={filteredContacts}
          />
        )}
        {!isContacts && <p>No contacts in list</p>}
      </div>
    </div>
  );
};

export default Phonebooks;
