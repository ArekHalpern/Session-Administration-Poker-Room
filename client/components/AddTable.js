import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Col, Row, Container, Modal } from 'react-bootstrap';
import { addPlayerToTableThunk, assignPlayerToSeatThunk, createTableThunk } from '../store';

const AddTable = () => {
  const dispatch = useDispatch();
  const [tableName, setTableName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [seatAssignments, setSeatAssignments] = useState([]);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const handleAddPlayerToTable = () => {
    dispatch(addPlayerToTableThunk(tableName, playerName));
  };

  const handleAssignPlayerToSeat = () => {
    dispatch(assignPlayerToSeatThunk(tableName, seatNumber, playerName))
      .then(() => {
        setSeatAssignments(prevSeatAssignments => [
          ...prevSeatAssignments,
          { playerName, seatNumber }
        ]);
      });
  };

  const handleCreateTable = () => {
    dispatch(createTableThunk({ name: tableName, seats: seatAssignments }));
    resetForm();
  };

  const resetForm = () => {
    setPlayerName('');
    setSeatNumber('');
    setSeatAssignments([]);
  };

  return (
    <Container className="mt-5">
      <Form>
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
        <Button variant="primary" onClick={() => setShowAddPlayerModal(true)} className="ml-2">
          Add Players
        </Button>

        <Modal show={showAddPlayerModal} onHide={() => setShowAddPlayerModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Players</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Player Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter Player Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Seat Number
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                  >
                    <option value="" disabled>Select Seat Number</option>
                    {[...Array(10).keys()].map(i => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Button variant="primary" onClick={handleAddPlayerToTable}>
                Add Player to Table
              </Button>
              {seatNumber && (
                <Button variant="secondary" onClick={handleAssignPlayerToSeat}>
                  Assign Player to Seat
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>

        <Button variant="success" onClick={handleCreateTable} className="ms-2">
          Create Table
        </Button>
        <Button variant="warning" onClick={resetForm} className="ms-2">
          Reset
        </Button>
      </Form>
      {/* Render the list of seat assignments */}
      <div className="mt-3">
        {seatAssignments.map((assignment) => (
          <div key={`${assignment.playerName}-${assignment.seatNumber}`}>
            {assignment.playerName}: Seat {assignment.seatNumber}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AddTable;



