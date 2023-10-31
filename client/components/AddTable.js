import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Alert, FormControl } from 'react-bootstrap';
import { createTableThunk, addPlayerThunk } from '../store';  
import { fetchPlayersThunk } from '../store/players';  

const AddTable = () => {
  const dispatch = useDispatch();
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState(null);



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

        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default AddTable;
