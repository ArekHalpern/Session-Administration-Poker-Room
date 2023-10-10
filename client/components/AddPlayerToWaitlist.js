import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlayerAndAddToWaitlist } from '../store/waitlist';

const AddPlayerToWaitlist = () => {
  // Use dispatch hook for dispatching actions
  const dispatch = useDispatch();

  // Use state hooks to manage form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Convert tableNumber to a Number
    const tableNumberNumeric = Number(tableNumber);
  
    // Dispatch an action to create a new player and add to the waitlist
    dispatch(createPlayerAndAddToWaitlist({ name, email, notes, tableNumber: tableNumberNumeric }));
  
    // Optionally clear the form inputs after submission
    setName('');
    setEmail('');
    setNotes('');
    setTableNumber('');
  };
  

  return (
    <div className="add-player-form container">
      <h2 className="text-center my-4">Add Player to Waitlist</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            className="form-control"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tableNumber">Table Number</label>
          <input
            type="number"
            className="form-control"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayerToWaitlist;
