import axios from 'axios';

// Action Types
const CREATE_TABLE = 'CREATE_TABLE';
const UPDATE_TABLE = 'UPDATE_TABLE';
const DELETE_TABLE = 'DELETE_TABLE';
const SET_TABLES = 'SET_TABLES';
const SET_SINGLE_TABLE = 'SET_SINGLE_TABLE';
const ADD_PLAYER = 'ADD_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';

// Action Creators
const createTable = table => ({
  type: CREATE_TABLE,
  table,
});

const updateTable = table => ({
  type: UPDATE_TABLE,
  table,
});

const deleteTable = tableId => ({
  type: DELETE_TABLE,
  tableId,
});

const setTables = tables => ({
  type: SET_TABLES,
  tables,
});

const setSingleTable = table => ({
  type: SET_SINGLE_TABLE,
  table,
});

const addPlayer = (tableId, session) => ({
  type: ADD_PLAYER,
  tableId,
  session,
});

const removePlayer = (tableId, session) => ({
  type: REMOVE_PLAYER,
  tableId,
  session,
});

// Thunk Creators
export const createTableThunk = newTable => async dispatch => {
  try {
    const res = await axios.post('/api/tables', newTable);
    dispatch(createTable(res.data));
  } catch (error) {
    console.error('Failed to create new table:', error);
  }
};

export const updateTableThunk = table => async dispatch => {
  try {
    const res = await axios.put(`/api/tables/${table.id}`, table);
    dispatch(updateTable(res.data));
  } catch (error) {
    console.error('There was an error updating the table', error);
  }
};

export const deleteTableThunk = tableId => async dispatch => {
  try {
    await axios.delete(`/api/tables/${tableId}`);
    dispatch(deleteTable(tableId));
  } catch (error) {
    console.error('There was an error deleting the table:', error);
  }
};

export const fetchTablesThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/tables');
    dispatch(setTables(res.data));
  } catch (error) {
    console.error('There was an error fetching tables:', error);
  }
};

export const fetchSingleTableThunk = tableId => async dispatch => {
  try {
    const res = await axios.get(`/api/tables/${tableId}`);
    dispatch(setSingleTable(res.data));
  } catch (error) {
    console.error('There was an error fetching the table:', error);
  }
};

export const addPlayerThunk = (tableId, playerId) => async dispatch => {
  try {
    const res = await axios.post(`/api/tables/${tableId}/addPlayer`, { playerId });
    dispatch(addPlayer(tableId, res.data));
  } catch (error) {
    console.error('Failed to add player:', error);
  }
};

export const removePlayerThunk = (tableId, playerId) => async dispatch => {
  try {
    const res = await axios.post(`/api/tables/${tableId}/removePlayer`, { playerId });
    dispatch(removePlayer(tableId, res.data));
  } catch (error) {
    console.error('Failed to remove player:', error);
  }
};

// Initial State
const initialState = [];

// Reducer
export default function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TABLE:
      return [...state, action.table];
    case UPDATE_TABLE:
      return state.map(table => 
        table.id === action.table.id ? action.table : table
      );
    case DELETE_TABLE:
      return state.filter(table => table.id !== action.tableId);
    case SET_TABLES:
      return action.tables;
      case SET_SINGLE_TABLE:
  console.log('SET_SINGLE_TABLE action payload:', action.table);
  // rest of the code...

        const index = state.findIndex(table => table.id === action.table.id);
        if (index !== -1) {
            const newState = [...state];
            newState[index] = action.table;
            return newState;
        } else {
            return [...state, action.table];
        }    
    case ADD_PLAYER:
      return state.map(table =>
        table.id === action.tableId
          ? { ...table, currentSession: action.session }
          : table
      );
    case REMOVE_PLAYER:
      return state.map(table =>
        table.id === action.tableId
          ? { ...table, currentSession: null }
          : table
      );


    default:
      return state;
  }
}
