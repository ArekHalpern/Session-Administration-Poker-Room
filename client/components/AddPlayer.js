import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addPlayerToTableThunk, assignPlayerToSeatThunk } from '../store';

function AddPlayer() {
  const dispatch = useDispatch();
  const [playerId, setPlayerId] = useState('');
  const [tableId, setTableId] = useState('');
  const [seatId, setSeatId] = useState('');

  const handleAddPlayerToTable = () => {
    dispatch(addPlayerToTableThunk(tableId, playerId));
  };

  const handleAssignPlayerToSeat = () => {
    dispatch(assignPlayerToSeatThunk(tableId, seatId, playerId));
  };

  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Player ID
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Enter Player ID"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Table ID
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Enter Table ID"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Seat ID
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Enter Seat ID (optional)"
            value={seatId}
            onChange={(e) => setSeatId(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button variant="primary" onClick={handleAddPlayerToTable}>
        Add Player to Table
      </Button>
      {seatId && (
        <Button variant="secondary" onClick={handleAssignPlayerToSeat}>
          Assign Player to Seat
        </Button>
      )}
    </Form>
  );
}

export default AddPlayer;

