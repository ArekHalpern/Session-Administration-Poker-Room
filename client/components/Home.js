import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddTable from './AddTable';
import AddPlayerToWaitlist from './AddPlayerToWaitlist'; 
import TablesList from './TablesList';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

export const Home = props => {
  const [tableModalShow, setTableModalShow] = useState(false);
  const [playerModalShow, setPlayerModalShow] = useState(false);  

  const handleTableModalShow = () => setTableModalShow(true);
  const handleTableModalHide = () => setTableModalShow(false);
  const handlePlayerModalShow = () => setPlayerModalShow(true);  
  const handlePlayerModalHide = () => setPlayerModalShow(false);  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Button variant="primary" onClick={handleTableModalShow} className="mb-2">Add Table</Button><br/>
        <Link to="/waitlist" className="btn btn-primary mb-2">View Waitlist</Link>
        
        {/* Modal for adding a table */}
        <Modal show={tableModalShow} onHide={handleTableModalHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTable />
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

