import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlayerAndAddToWaitlistThunk } from '../store/waitlist';

const AddPlayerToWaitlist = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const tableNumberNumeric = Number(tableNumber);

    if (!isNaN(tableNumberNumeric)) {
      dispatch(createPlayerAndAddToWaitlistThunk({ name, email, notes, tableNumber: tableNumberNumeric }));

      // Clear the form inputs after submission
      setName('');
      setEmail('');
      setNotes('');
      setTableNumber('');
    } else {
      alert('Please enter a valid table number.');
    }
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tableNumber">Table Number</label>
          <input
            type="number"
            className="form-control"
            id="tableNumber"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayerToWaitlist;
