import axios from 'axios';

// Initial State
const initialSessionState = {
    sessions: [],  // An array to hold all session data
    currentSession: null,  // To hold data for a player's current session
};

// Action Types
const START_SESSION = 'START_SESSION';
const END_SESSION = 'END_SESSION';
const GET_PLAYER_SESSIONS = 'GET_PLAYER_SESSIONS';

// Action Creators
const startSession = (playerId, tableId) => ({ type: START_SESSION, playerId, tableId });
const endSession = sessionId => ({ type: END_SESSION, sessionId });
const getPlayerSessions = (playerId, sessions) => ({ type: GET_PLAYER_SESSIONS, playerId, sessions });

// Thunk Creators
export const startSessionThunk = (playerId, tableId) => async dispatch => {
    const response = await axios.post('/api/sessions', { playerId, tableId });
    dispatch(startSession(response.data));
};

export const endSessionThunk = sessionId => async dispatch => {
    const response = await axios.put(`/api/sessions/${sessionId}/end`);
    dispatch(endSession(sessionId));
};

export const getPlayerSessionsThunk = playerId => async dispatch => {
    const response = await axios.get(`/api/sessions/player/${playerId}`);
    dispatch(getPlayerSessions(playerId, response.data));
};

// Reducer
const sessionReducer = (state = initialSessionState, action) => {
    switch (action.type) {
        case START_SESSION:
            return {
                ...state,
                sessions: [...state.sessions, action.data], 
                currentSession: action.data, 
            };
        case END_SESSION:
            const updatedSessions = state.sessions.map(session => 
                session.id === action.sessionId ? { ...session, endTime: new Date().toISOString() } : session
            );
            return {
                ...state,
                sessions: updatedSessions,
                currentSession: null 
            };
        case GET_PLAYER_SESSIONS:
            return {
                ...state,
                sessions: action.sessions
            };
        default:
            return state;
    }
};

export default sessionReducer;
