import { contactService } from '../services/contactService';

const _setContacts = (contacts) => ({ type: 'SET_CONTACTS', contacts });
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _saveContact = (contact) => ({ type: 'SAVE_CONTACT', contact });
const _remmoveContact = (contact) => ({ type: 'REMOVE_CONTACT', contact });

export function loadContacts() {
  return async (dispatch, getState) => {
    const contacts = await contactService.query(getState().contactReducer.filterBy);
    dispatch(_setContacts(contacts));
  };
}

export function setFilter(filterBy) {
  return (dispatch) => {
    dispatch(_setFilter(filterBy));
  };
}

export function saveContact(contact) {
  return async (dispatch) => {
    const savedContact = await contactService.saveContact(contact);
    dispatch(_saveContact(savedContact));
  };
}

export function removeContact(id) {
  return async (dispatch) => {
    try {
      await contactService.removeContact(id);
      dispatch(_remmoveContact(id));
    } catch (err) {
      console.log(`Problem Deleting ID ${id}`, err);
    }
  };
}