import axios from 'axios';

// Action Types
const CREATE_WAITLIST_ENTRY = 'CREATE_WAITLIST_ENTRY';
const UPDATE_WAITLIST_ENTRY = 'UPDATE_WAITLIST_ENTRY';
const DELETE_WAITLIST_ENTRY = 'DELETE_WAITLIST_ENTRY';
const GET_WAITLIST = 'GET_WAITLIST';
const CREATE_PLAYER_AND_ADD_TO_WAITLIST = 'CREATE_PLAYER_AND_ADD_TO_WAITLIST';


// Action Creators
const createWaitlistEntry = (entry) => {
    console.log('createWaitlistEntry action payload:', entry);
    return {
      type: CREATE_WAITLIST_ENTRY,
      entry,
    };
  };
  
  const updateWaitlistEntry = (entry) => {
    console.log('updateWaitlistEntry action payload:', entry);
    return {
      type: UPDATE_WAITLIST_ENTRY,
      entry,
    };
  };
  
  const deleteWaitlistEntry = (entryId) => {
    console.log('deleteWaitlistEntry action payload:', entryId);
    return {
      type: DELETE_WAITLIST_ENTRY,
      entryId,
    };
  };
  
  const getWaitlist = (waitlist) => {
    console.log('getWaitlist action payload:', waitlist);
    return {
      type: GET_WAITLIST,
      waitlist,
    };
  };
  

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

export const createPlayerAndAddToWaitlist = ({ name, email, notes, tableNumber }) => async (dispatch) => {
    try {
      // Check if the player already exists
      const existingPlayerRes = await axios.get(`/api/players?email=${email}`);
      let playerId;
  
      if (existingPlayerRes.data && existingPlayerRes.data.length > 0) {
        // Player exists, use the existing player's ID
        playerId = existingPlayerRes.data[0].id;
      } else {
        // Player does not exist, handle accordingly (e.g., throw an error or log a message)
        console.error('Player does not exist.');
        return;  // Exit early from the function
      }
  
      // Now create a new waitlist entry with the existing player's ID
      const waitlistEntryRes = await axios.post('/api/waitlist', {
        playerId,
        tableId: tableNumber,  // Assuming tableNumber is the table ID
        notes,
      });
  
      // Dispatch an action to add the new waitlist entry to the Redux store
      dispatch(createWaitlistEntry(waitlistEntryRes.data));
    } catch (error) {
      console.error('Failed to add player to waitlist:', error);
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
        console.log('Reducer - New State (GET_WAITLIST):', action.waitlist);
        return action.waitlist;
    default:
      return state;
  }
}
