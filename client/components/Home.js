import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import AddTable from './AddTable';
import TablesList from './TablesList';

// Home component definition
const Home = () => {
  const [tableModalShow, setTableModalShow] = useState(false);
  
  // Event Handlers
  const handleTableModalToggle = () => setTableModalShow(prev => !prev);
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Button variant="primary" onClick={handleTableModalToggle} className="mb-2">
          Add Table
        </Button>
        <br/>
        <Link to="/waitlist" className="btn btn-primary mb-2">
          View Waitlist
        </Link>
        
        {/* Modal for adding a table */}
        <Modal show={tableModalShow} onHide={handleTableModalToggle} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTable />
          </Modal.Body>
        </Modal>

        {/* Tables Listing */}
        <TablesList />
      </div>
    </div>
  );
};

export default Home;
