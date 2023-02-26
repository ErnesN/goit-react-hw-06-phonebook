import { ADD_CONTACT, DELETE_CONTACT, SET_FILTER } from './types';

const initialState = {
  contacts: [],
  filter: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      const newContacts = [...state.contacts, payload];
      return { ...state, contacts: newContacts };
    case DELETE_CONTACT:
      const result = state.contacts.filter(item => item.id !== payload);
      return { ...state, contacts: result };
    case SET_FILTER:
      return { ...state, filter: payload };
    default:
      return state;
  }
};

export default reducer;
