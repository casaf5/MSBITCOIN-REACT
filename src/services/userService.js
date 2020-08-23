import { storageService } from '../services/storageService';
import { bitcoinService } from './bitcoinService';
import { utilsService } from './utilsService';

export const userService = {
  login,
  logout,
  signup,
  addMove,
};

const _users = storageService.load('users') || [];
var loggedUser = storageService.load('loggedUser') || null;

async function signup(newUser) {
  newUser.moves = [];
  newUser.coins = 100;
  newUser._id = utilsService.genID();
  _users.push(newUser);
  storageService.save('users', _users);
  return newUser;
}

async function login(name) {
  const user = _users.find((u) => u.name === name);
  if (user) {
    loggedUser = user;
    storageService.save('loggedUser', user);
    return user;
  }
  return null;
}

function logout() {
  storageService.remove('loggedUser');
  loggedUser = null;
}

async function addMove(status, toName, amount) {
  await _buildMove(status, toName, amount);
  const idx = _users.findIndex((u) => u._id === loggedUser._id);
  _users.splice(idx, 1, loggedUser);
  storageService.save('loggedUser', loggedUser);
  storageService.save('users', _users);
  return loggedUser;
}

async function _buildMove(status, toName, amount) {
  const move = {
    status,
    toName,
    amount,
    completedAt: new Date().toLocaleDateString(),
    rateAtTransfer: await bitcoinService.getRate(amount),
  };
  loggedUser.coins -= amount;
  loggedUser.moves.unshift(move);
}
