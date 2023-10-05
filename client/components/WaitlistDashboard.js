import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Form } from 'react-bootstrap';
import { getWaitlistThunk, updateWaitlistEntryThunk, deleteWaitlistEntryThunk, createWaitlistEntryThunk } from '../store/waitlist';

const WaitlistDashboard = ({ waitlist, getWaitlist, updateWaitlist, deleteFromWaitlist, createWaitlistEntry }) => {

  useEffect(() => {
    getWaitlist();
  }, [getWaitlist]);

  const handleUpdate = (id, updatedItem) => {
    updateWaitlist(updatedItem);
  };

  const handleDelete = (id) => {
    deleteFromWaitlist(id);
  };

  const handleCreate = () => {
    const newEntry = {
      playerName: '',
      notes: '',
      tableNumber: null,
    };
    createWaitlistEntry(newEntry);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleCreate}>
        Create Entry
      </Button>
      <Table striped bordered hover>
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
              <td>{item.Player ? item.Player.name : ''}</td>
              <td>{item.notes}</td>
              <td>{item.Table ? item.Table.number : ''}</td>
              <td>
                <Button variant="success" onClick={() => handleUpdate(item.id, item)}>✔️</Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>❌</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  waitlist: state.waitlist,
});

const mapDispatchToProps = dispatch => ({
  getWaitlist: () => dispatch(getWaitlistThunk()),
  updateWaitlist: (item) => dispatch(updateWaitlistEntryThunk(item)),
  deleteFromWaitlist: (id) => dispatch(deleteWaitlistEntryThunk(id)),
  createWaitlistEntry: (item) => dispatch(createWaitlistEntryThunk(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitlistDashboard);
