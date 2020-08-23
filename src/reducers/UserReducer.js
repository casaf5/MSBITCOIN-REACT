import { storageService } from '../services/storageService';

const INITIAL_STATE = {
  loggedUser: storageService.load('loggedUser') || null,
};

export function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        loggedUser: action.user,
      };
    case 'LOGOUT':
      return {
        loggedUser: null,
      };
    case 'TRANSFER':
      return {
        loggedUser: action.updatedUser,
      };
    default:
      return state;
  }
}
