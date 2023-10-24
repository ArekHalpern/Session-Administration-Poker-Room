import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Alert, FormControl } from 'react-bootstrap';
import { createTableThunk, addPlayerThunk } from '../store';  
import { fetchPlayersThunk } from '../store/players';  

const AddTable = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players);
  const [tableNumber, setTableNumber] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(null);
  const [playerAdded, setPlayerAdded] = useState(false);  

  useEffect(() => {
    dispatch(fetchPlayersThunk());
  }, [dispatch, playerAdded]);

  const handleCreateTable = (event) => {
    event.preventDefault();
    if (tableNumber && !isNaN(tableNumber)) {
      dispatch(createTableThunk({ number: parseInt(tableNumber, 10) }));
      setTableNumber('');
      setError(null);
    } else {
      setError('Please enter a valid table number');
    }
  };

  const handleAddPlayer = (event) => {
    event.preventDefault();
    const player = players.find(player => player.name.toLowerCase() === playerName.toLowerCase());
    if (player) {
      dispatch(addPlayerThunk({ tableId: tableNumber, playerId: player.id }));
      setPlayerName('');
      setError(null);
      setPlayerAdded(prev => !prev);  // toggle playerAdded state to trigger useEffect
    } else {
      setError('Player not found');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Create a New Table</h2>
      <Form onSubmit={handleCreateTable}>
        <Form.Group controlId="tableNumber">
          <Form.Label>Table Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter table number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="success" type="submit">
          Create Table
        </Button>
      </Form>
      <h2 className="text-center mb-4 mt-4">Add Player to Table</h2>
      <Form onSubmit={handleAddPlayer}>
        <Form.Group controlId="playerName">
          <Form.Label>Player Name</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="success" type="submit">
          Add Player
        </Button>
      </Form>
    </Container>
  );
};

export default AddTable;
