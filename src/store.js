import { ContactReducer } from './reducers/ContactReducer';
import { UserReducer } from './reducers/UserReducer';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  contactReducer: ContactReducer,
  userReducer: UserReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


eport co-