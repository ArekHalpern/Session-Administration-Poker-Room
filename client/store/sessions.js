import axios from 'axios';

// Initial State
const initialSessionState = {
    sessions: [],
    currentSession: null,
};

// Action Types
const SET_CURRENT_SESSION = 'SET_CURRENT_SESSION';
const UPDATE_SESSION = 'UPDATE_SESSION';
const SET_PLAYER_SESSIONS = 'SET_PLAYER_SESSIONS';

// Action Creators
const setCurrentSession = session => ({ type: SET_CURRENT_SESSION, session });
const updateSession = session => ({ type: UPDATE_SESSION, session });
const setPlayerSessions = sessions => ({ type: SET_PLAYER_SESSIONS, sessions });

// Thunk Creators
export const createSessionThunk = (playerName, tableId) => async dispatch => {
    try {
        const response = await axios.post('/api/sessions', { name: playerName, tableId });  // Adjusted the payload
        dispatch(setCurrentSession(response.data));
    } catch (error) {
        console.error('Error creating session:', error);
    }
};

export const startSessionThunk = (playerId, tableId) => async dispatch => {
    try {
        const response = await axios.post('/api/sessions', { playerId, tableId });
        dispatch(setCurrentSession(response.data));
    } catch (error) {
        console.error('Error starting session:', error);
    }
};

export const endSessionThunk = sessionId => async dispatch => {
    try {
        const response = await axios.put(`/api/sessions/${sessionId}/end`);
        dispatch(updateSession({ ...response.data, endTime: new Date().toISOString() }));
    } catch (error) {
        console.error('Error ending session:', error);
    }
};

export const getPlayerSessionsThunk = playerId => async dispatch => {
    try {
        const response = await axios.get(`/api/sessions/player/${playerId}`);
        dispatch(setPlayerSessions(response.data));
    } catch (error) {
        console.error('Error fetching player sessions:', error);
    }
};

// Reducer
const sessionReducer = (state = initialSessionState, action) => {
    switch (action.type) {
        case SET_CURRENT_SESSION:
            return {
                ...state,
                sessions: [...state.sessions, action.session],
                currentSession: action.session,
            };
        case UPDATE_SESSION:
            const updatedSessions = state.sessions.map(session => 
                session.id === action.session.id ? action.session : session
            );
            return {
                ...state,
                sessions: updatedSessions,
                currentSession: null, 
            };
        case SET_PLAYER_SESSIONS:
            return {
                ...state,
                sessions: action.sessions
            };
        default:
            return state;
    }
};

export default sessionReducer;
