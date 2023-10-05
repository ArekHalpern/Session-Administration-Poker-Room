import axios from 'axios';

// Action Types
const CREATE_WAITLIST_ENTRY = 'CREATE_WAITLIST_ENTRY';
const UPDATE_WAITLIST_ENTRY = 'UPDATE_WAITLIST_ENTRY';
const DELETE_WAITLIST_ENTRY = 'DELETE_WAITLIST_ENTRY';
const GET_WAITLIST = 'GET_WAITLIST';

// Action Creators
const createWaitlistEntry = (entry) => ({
  type: CREATE_WAITLIST_ENTRY,
  entry,
});

const updateWaitlistEntry = (entry) => ({
  type: UPDATE_WAITLIST_ENTRY,
  entry,
});

const deleteWaitlistEntry = (entryId) => ({
  type: DELETE_WAITLIST_ENTRY,
  entryId,
});

const getWaitlist = (waitlist) => ({
  type: GET_WAITLIST,
  waitlist,
});

// Thunk Creators
export const createWaitlistEntryThunk = (newEntry) => async (dispatch) => {
  try {
    const res = await axios.post('/api/waitlist', newEntry);
    dispatch(createWaitlistEntry(res.data));
  } catch (error) {
    console.error('Failed to create new waitlist entry:', error);
  }
};

export const updateWaitlistEntryThunk = (entry) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/waitlist/${entry.id}`, entry);
    dispatch(updateWaitlistEntry(res.data));
  } catch (error) {
    console.error('There was an error updating the waitlist entry', error);
  }
};

export const deleteWaitlistEntryThunk = (entryId) => async (dispatch) => {
  try {
    await axios.delete(`/api/waitlist/${entryId}`);
    dispatch(deleteWaitlistEntry(entryId));
  } catch (error) {
    console.error('There was an error deleting the waitlist entry:', error);
  }
};

export const getWaitlistThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/waitlist');
    dispatch(getWaitlist(res.data));
  } catch (error) {
    console.error('There was an error fetching the waitlist:', error);
  }
};

// Initial State
const initialState = [];

// Reducer
export default function waitlistReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_WAITLIST_ENTRY:
      return [...state, action.entry];
    case UPDATE_WAITLIST_ENTRY:
      return state.map((entry) =>
        entry.id === action.entry.id ? action.entry : entry
      );
    case DELETE_WAITLIST_ENTRY:
      return state.filter((entry) => entry.id !== action.entryId);
    case GET_WAITLIST:
      return action.waitlist;
    default:
      return state;
  }
}
