export const getAllContacts = store => store.contacts;
export const getFavoriteContacts = ({ contacts }) => {
  const favoriteContacts = contacts.filter(({ favorite }) => favorite);
  return favoriteContacts;
};
export const getFilteredContacts = ({ contacts, filter }) => {
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
export const getFilter = ({ filter }) => filter;
