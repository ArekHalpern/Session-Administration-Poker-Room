import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';
import { getWaitlistThunk, updateWaitlistEntryThunk, deleteWaitlistEntryThunk, createWaitlistEntryThunk } from '../store/waitlist';
import AddPlayerToWaitlist from './AddPlayerToWaitlist';  

const WaitlistDashboard = ({ waitlist, getWaitlist, updateWaitlist, deleteFromWaitlist, createWaitlistEntry }) => {
  console.log('waitlist prop:', waitlist);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('Calling getWaitlist');
    getWaitlist();
  }, [getWaitlist]);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const handleUpdate = (id, updatedItem) => {
    updateWaitlist(updatedItem);
  };

  const handleDelete = (id) => {
    deleteFromWaitlist(id);
  };

  const handleCreate = () => {
    handleShowModal();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleCreate}>
        Add Player to Waitlist
      </Button>
      <Modal show={showModal} onHide={handleHideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Player to Waitlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPlayerToWaitlist handleHideModal={handleHideModal} />
        </Modal.Body>
      </Modal>
      <Container className="mt-4"> 
      <Table className="custom-table">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Notes</th>
              <th>Table #</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(waitlist) && waitlist.map(item => (
              <tr key={item.id}>
                <td>{item.player ? item.player.name : ''}</td>
                <td>{item.notes}</td>
                <td>{item.table ? item.table.number : ''}</td>
                <td>
                  <Button variant="success" onClick={() => handleUpdate(item.id, item)}>Seat</Button>
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

const mapStateToProps = state => {
  console.log('Redux state:', state);  
  return {
    waitlist: state.waitlist,
  };
};

const mapDispatchToProps = dispatch => ({
  getWaitlist: () => dispatch(getWaitlistThunk()),
  updateWaitlist: (item) => dispatch(updateWaitlistEntryThunk(item)),
  deleteFromWaitlist: (id) => dispatch(deleteWaitlistEntryThunk(id)),
  createWaitlistEntry: (item) => dispatch(createWaitlistEntryThunk(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitlistDashboard);
