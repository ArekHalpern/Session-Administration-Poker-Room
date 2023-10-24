import axios from 'axios';

// Actions
const ADD_TO_WAITLIST = 'ADD_TO_WAITLIST';
const REMOVE_FROM_WAITLIST = 'REMOVE_FROM_WAITLIST';
const SET_SESSIONS = 'SET_SESSIONS';
const END_SESSION = 'END_SESSION';

// Initial State
const initialState = {
  waitlist: [],
  sessions: []
};

// Action Creators
export const addToWaitlist = player => ({
  type: ADD_TO_WAITLIST,
  player
});

export const removeFromWaitlist = playerId => ({
  type: REMOVE_FROM_WAITLIST,
  playerId
});

export const setSessions = sessions => ({
  type: SET_SESSIONS,
  sessions
});

export const endSession = sessionId => ({
  type: END_SESSION,
  sessionId
});

// Thunk Creators
export const fetchSessionsForPlayer = playerId => async dispatch => {
    const response = await axios.get(`/api/sessions/player/${playerId}`);
    dispatch(setSessions(response.data));
};

export const addToWaitlistThunk = (playerId, notes) => async dispatch => {
    const response = await axios.post('/api/waitlist', { playerId, notes });
    dispatch(addToWaitlist(response.data));
};

export const removeFromWaitlistThunk = waitlistId => async dispatch => {
    await axios.delete(`/api/waitlist/${waitlistId}`);
    dispatch(removeFromWaitlist(waitlistId));
};

export const assignPlayerToTableThunk = (playerId, tableId) => async (dispatch, getState) => {
    const currentSessions = getState().sessions.sessions; // adjust based on your state tree shape
    const response = await axios.post('/api/sessions', { playerId, tableId });
    dispatch(setSessions([...currentSessions, response.data])); // Add the new session
};


export const removePlayerFromTableThunk = sessionId => async dispatch => {
    await axios.put(`/api/sessions/${sessionId}/end`);
    dispatch(endSession(sessionId));
};

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WAITLIST:
      return { ...state, waitlist: [...state.waitlist, action.player] };
    case REMOVE_FROM_WAITLIST:
      return { ...state, waitlist: state.waitlist.filter(player => player.id !== action.playerId) };
    case SET_SESSIONS:
      return { ...state, sessions: action.sessions };
    case END_SESSION:
      const updatedSessions = state.sessions.map(session => 
        session.id === action.sessionId ? {...session, endTime: new Date()} : session);
      return { ...state, sessions: updatedSessions };
    default:
      return state;
  }
}
