import { userService } from '../services/userService';

const _login = (user) => ({ type: 'LOGIN', user });
const _logout = () => ({ type: 'LOGOUT' });
const _transfer = (updatedUser) => ({ type: 'TRANSFER', updatedUser });

export function login(name) {
  console.log('name to login ', name);
  return async (dispatch) => {
    try {
      const user = await userService.login(name);
      dispatch(_login(user));
    } catch (err) {
      console.log('Problem logging..', err);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    await userService.logout();
    dispatch(_logout);
  };
}

export function signup(newUser) {
  return async () => {
    await userService.signup(newUser);
  };
}

export function transferCoins(status, toName, amount) {
  return async (dispatch) => {
    const updatedUser = await userService.addMove(status, toName, amount);
    dispatch(_transfer(updatedUser));
  };
}
