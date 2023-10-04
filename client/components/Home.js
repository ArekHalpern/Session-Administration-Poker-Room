import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddTable from './AddTable';
import AddPlayerToWaitlist from './AddPlayerToWaitlist';  // Import the AddPlayerToWaitlist component
import TablesList from './TablesList';
import { Modal, Button, Table } from 'react-bootstrap';

export const Home = props => {
  const [tableModalShow, setTableModalShow] = useState(false);
  const [playerModalShow, setPlayerModalShow] = useState(false);  // State to control the visibility of the AddPlayerToWaitlist modal

  const handleTableModalShow = () => setTableModalShow(true);
  const handleTableModalHide = () => setTableModalShow(false);
  const handlePlayerModalShow = () => setPlayerModalShow(true);  // Function to show the AddPlayerToWaitlist modal
  const handlePlayerModalHide = () => setPlayerModalShow(false);  // Function to hide the AddPlayerToWaitlist modal

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Button variant="primary" onClick={handleTableModalShow} className="mb-2">Add Table</Button><br/>
        <Button variant="primary" onClick={handlePlayerModalShow} className="mb-2">Add Player to Waitlist</Button><br/>  {/* Updated onClick handler */}
        <Button variant="primary" className="mb-2">View Waitlist</Button>
        
        {/* Modal for adding a table */}
        <Modal show={tableModalShow} onHide={handleTableModalHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTable />
          </Modal.Body>
        </Modal>
        
        {/* Modal for adding a player to the waitlist */}
        <Modal show={playerModalShow} onHide={handlePlayerModalHide} centered>  {/* New Modal */}
          <Modal.Header closeButton>
            <Modal.Title>Add Player to Waitlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddPlayerToWaitlist />
          </Modal.Body>
        </Modal>
        
        <TablesList />
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username
  };
};

export default connect(mapState)(Home);

