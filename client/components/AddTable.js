import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { createTableThunk } from '../store';

const AddTable = () => {
  const dispatch = useDispatch();
  const [tableNumber, setTableNumber] = useState('');

  const handleCreateTable = () => {
    // Ensure tableNumber is a valid number before dispatching
    if (tableNumber && !isNaN(tableNumber)) {
      dispatch(createTableThunk({ number: parseInt(tableNumber, 10) }));
      setTableNumber('');  // Reset the tableNumber state
    } else {
      alert('Please enter a valid table number');
    }
  };

  return (
    <Container className="mt-5">
      <Form>
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
        <Button variant="success" onClick={handleCreateTable}>
          Create Table
        </Button>
      </Form>
    </Container>
  );
};

export default AddTable;

