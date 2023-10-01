import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTableThunk } from '../store/tables';
import { Button, Form, Container } from 'react-bootstrap';

const AddTable = () => {
  const dispatch = useDispatch();
  const [tableName, setTableName] = useState('');
  const [tableSeats, setTableSeats] = useState(10);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTable = {
      name: tableName,
      seats: tableSeats,
    };
    dispatch(createTableThunk(newTable));
    setTableName('');
    setTableSeats(10);
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="tableName">
          <Form.Label>Table Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter table name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="tableSeats">
          <Form.Label>Number of Seats</Form.Label>
          <Form.Control
            type="number"
            value={tableSeats}
            onChange={(e) => setTableSeats(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Table
        </Button>
      </Form>
    </Container>
  );
};

export default AddTable;

