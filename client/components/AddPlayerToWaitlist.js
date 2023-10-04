// Import necessary dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlayer } from '../store';


const AddPlayerToWaitlist = () => {
  // Use dispatch hook for dispatching actions
  const dispatch = useDispatch();

  // Use state hooks to manage form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Dispatch an action to create a new player
    dispatch(createPlayer({ name, email }));

    // Optionally clear the form inputs after submission
    setName('');
    setEmail('');
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
          <label htmlFor="email">Email (optional)</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Player</button>
      </form>
    </div>
  );
};

export default AddPlayerToWaitlist;
