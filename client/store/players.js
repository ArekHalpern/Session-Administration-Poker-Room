import axios from 'axios';

// Actions
const ADD_TO_WAITLIST = 'ADD_TO_WAITLIST';
const REMOVE_FROM_WAITLIST = 'REMOVE_FROM_WAITLIST';
const SET_PLAYERS = 'SET_PLAYERS';

// Initial State
const initialState = {
  waitlist: [],
  sessions: []
};

// Action Creators

export const setPlayers = players => ({
  type: SET_PLAYERS,
  players
});


// Thunk Creators
export const fetchPlayersThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/players'); 
    dispatch(setPlayers(response.data));
  } catch (error) {
    console.error(error); 
  }
};

export const fetchSessionsForPlayer = playerId => async dispatch => {
    const response = await axios.get(`/api/sessions/player/${playerId}`);
    dispatch(setSessions(response.data));
};



// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
      case SET_PLAYERS:  
      return { ...state, players: action.players };
    default:
      return state;
  }
}
