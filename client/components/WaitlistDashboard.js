import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Container } from 'react-bootstrap';
import { fetchWaitlistThunk, updateWaitlistEntryThunk, deleteWaitlistEntryThunk } from '../store/waitlist';
import AddPlayerToWaitlist from './AddPlayerToWaitlist';  

const WaitlistDashboard = ({ waitlist, fetchWaitlistThunk, updateWaitlistEntryThunk, deleteWaitlistEntryThunk }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWaitlistThunk();
  }, [fetchWaitlistThunk]);

  const handleUpdate = (item) => {
    if (item.table) {
      alert('Player is already seated!');
      return;
    }
    updateWaitlistEntryThunk(item);
  };

  const handleDelete = (id) => {
    deleteWaitlistEntryThunk(id);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Player to Waitlist
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Player to Waitlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPlayerToWaitlist onCloseModal={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
      <Container className="mt-4"> 
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Notes</th>
              <th>Table #</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.map(item => (
              <tr key={item.id}>
                <td>{item.player ? item.player.name : ''}</td>
                <td>{item.notes}</td>
                <td>{item.table ? item.table.number : 'Waiting'}</td>
                <td>
                  <Button variant="success" onClick={() => handleUpdate(item)}>Seat</Button>
                  <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({ waitlist: state.waitlist });
const mapDispatchToProps = {
  fetchWaitlistThunk: fetchWaitlistThunk,
  updateWaitlistEntryThunk: updateWaitlistEntryThunk,
  deleteWaitlistEntryThunk: deleteWaitlistEntryThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitlistDashboard);
