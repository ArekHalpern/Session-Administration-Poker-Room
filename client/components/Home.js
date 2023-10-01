import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddTable from './AddTable';  // import the AddTable component
import { Modal, Button } from 'react-bootstrap';

export const Home = props => {
  const [modalShow, setModalShow] = useState(false);

  const handleShow = () => setModalShow(true);
  const handleHide = () => setModalShow(false);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Button variant="primary" onClick={handleShow} className="mb-2">Add Table</Button><br/>
        <Button variant="primary" className="mb-2">Add Player to Waitlist</Button>

        <Modal show={modalShow} onHide={handleHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddTable />
          </Modal.Body>
        </Modal>
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


