import axios from 'axios';

// Action Types
const GET_PLAYERS = 'GET_PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';
const UPDATE_PLAYER = 'UPDATE_PLAYER';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const ADD_PLAYER_TO_TABLE = 'ADD_PLAYER_TO_TABLE';
const ASSIGN_PLAYER_TO_SEAT = 'ASSIGN_PLAYER_TO_SEAT';


// Action Creators
export const getPlayers = players => ({ type: GET_PLAYERS, players });
export const addPlayer = player => ({ type: ADD_PLAYER, player });
export const updatePlayer = player => ({ type: UPDATE_PLAYER, player });
export const removePlayer = playerId => ({ type: REMOVE_PLAYER, playerId });
export const addPlayerToTable = (tableId, seat) => ({ type: ADD_PLAYER_TO_TABLE, tableId, seat });
export const assignPlayerToSeat = (tableId, seatId, seat) => ({ type: ASSIGN_PLAYER_TO_SEAT, tableId, seatId, seat });


// Thunk Creators
export const fetchPlayers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/players');
    dispatch(getPlayers(data));
  } catch (err) {
    console.error('Error fetching players:', err);
  }
};

export const createPlayer = newPlayer => async dispatch => {
  try {
    const { data } = await axios.post('/api/players', newPlayer);
    dispatch(addPlayer(data));
  } catch (err) {
    console.error('Error adding player:', err);
  }
};

export const editPlayer = (playerId, updates) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/players/${playerId}`, updates);
    dispatch(updatePlayer(data));
  } catch (err) {
    console.error('Error updating player:', err);
  }
};

export const deletePlayer = playerId => async dispatch => {
  try {
    await axios.delete(`/api/players/${playerId}`);
    dispatch(removePlayer(playerId));
  } catch (err) {
    console.error('Error deleting player:', err);
  }
};

export const addPlayerToTableThunk = (tableId, playerId) => async dispatch => {
    try {
      const { data } = await axios.post(`/api/tables/${tableId}/seats`, { playerId });
      dispatch(addPlayerToTable(tableId, data));
    } catch (error) {
      console.error('Error adding player to table:', error);
    }
  };
  
  export const assignPlayerToSeatThunk = (tableId, seatId, playerId) => async dispatch => {
    try {
      const { data } = await axios.put(`/api/tables/${tableId}/seats/${seatId}`, { playerId });
      dispatch(assignPlayerToSeat(tableId, seatId, data));
    } catch (error) {
      console.error('Error assigning player to seat:', error);
    }
  };

// Initial State
const initialState = {
    players: [],
    tables: []  // Assuming that each table object contains an array of seats
  };
  
  // Reducer
  export default function playersReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PLAYERS:
        return { ...state, players: action.players };
      case ADD_PLAYER:
        return { ...state, players: [...state.players, action.player] };
      case UPDATE_PLAYER:
        return {
          ...state,
          players: state.players.map(player =>
            player.id === action.player.id ? action.player : player
          )
        };
      case REMOVE_PLAYER:
        return {
          ...state,
          players: state.players.filter(player => player.id !== action.playerId)
        };
      case ADD_PLAYER_TO_TABLE:
        return {
          ...state,
          tables: state.tables.map(table => 
            table.id === action.tableId 
              ? {...table, seats: [...table.seats, action.seat]}
              : table
          )
        };
      case ASSIGN_PLAYER_TO_SEAT:
        return {
          ...state,
          tables: state.tables.map(table =>
            table.id === action.tableId
              ? {
                  ...table,
                  seats: table.seats.map(seat =>
                    seat.id === action.seatId
                      ? { ...seat, ...action.seat }
                      : seat
                  )
                }
              : table
          )
        };
      default:
        return state;
    }
  }