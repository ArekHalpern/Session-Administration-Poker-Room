import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import tables from './tables';  // Import your tables reducer
import players from './players';  // Import your players reducer

// Combine your auth and tables reducers
const reducer = combineReducers({ auth, tables, players });

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './tables';
export * from './players';
