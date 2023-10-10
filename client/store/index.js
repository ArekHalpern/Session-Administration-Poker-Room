import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import tables from './tables';  // Import your tables reducer
import players from './players';  // Import your players reducer
import waitlist from './waitlist';  // Import your waitlist reducer

// Combine your auth, tables, players, and waitlist reducers
const reducer = combineReducers({ auth, tables, players, waitlist });

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './tables';
export * from './players';
export * from './waitlist';  // Export everything from your waitlist file

