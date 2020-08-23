const INITIAL_STATE = {
  contacts: null,
  filterBy: null,
};

export function ContactReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.contacts,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filterBy: action.filterBy,
      };
    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((c) => c._id !== action._id),
      };
    case 'SAVE_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts.filter((c) => c._id !== action.contact._id), action.contact],
      };

    default:
      return state;
  }
}
