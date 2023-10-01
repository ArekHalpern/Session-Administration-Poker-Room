import axios from 'axios';

// Action Types
const CREATE_TABLE = 'CREATE_TABLE';
const UPDATE_TABLE = 'UPDATE_TABLE';
const DELETE_TABLE = 'DELETE_TABLE';
const GET_TABLES = 'GET_TABLES';

// Action Creators
const createTable = (table) => ({
  type: CREATE_TABLE,
  table,
});

const updateTable = (table) => ({
  type: UPDATE_TABLE,
  table,
});

const deleteTable = (tableId) => ({
  type: DELETE_TABLE,
  tableId,
});

const getTables = (tables) => ({
  type: GET_TABLES,
  tables,
});

// Thunk Creators
export const createTableThunk = (newTable) => async (dispatch) => {
  try {
    const res = await axios.post('/api/tables', newTable);
    dispatch(createTable(res.data));
  } catch (error) {
    console.error('Failed to create new table:', error);
  }
};

export const updateTableThunk = (table) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/tables/${table.id}`, table);
    dispatch(updateTable(res.data));
  } catch (error) {
    console.error('There was an error updating the table', error);
  }
};

export const deleteTableThunk = (tableId) => async (dispatch) => {
  try {
    await axios.delete(`/api/tables/${tableId}`);
    dispatch(deleteTable(tableId));
  } catch (error) {
    console.error('There was an error deleting the table:', error);
  }
};

export const getTablesThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tables');
    dispatch(getTables(res.data));
  } catch (error) {
    console.error('There was an error fetching tables:', error);
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
      return state.map((table) =>
        table.id === action.table.id ? action.table : table
      );
    case DELETE_TABLE:
      return state.filter((table) => table.id !== action.tableId);
    case GET_TABLES:
      return action.tables;
    default:
      return state;
  }
}
