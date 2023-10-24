import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Container, Card } from 'react-bootstrap';
import { fetchSingleTableThunk, addPlayerThunk, removePlayerThunk } from '../store/tables';

const SingleTable = ({ table, fetchSingleTableThunk, addPlayerThunk, removePlayerThunk, match }) => {
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
        console.log('useEffect triggered with table ID:', match.params.id);
        fetchSingleTableThunk(match.params.id);
    }, [fetchSingleTableThunk, match.params.id]);

    useEffect(() => {
        console.log('Table data updated:', table);
    }, [table]);
  
    const handleAddPlayer = (playerId) => {
        console.log('Adding player with ID:', playerId);
        addPlayerThunk(table.id, playerId);
    };
  
    const handleRemovePlayer = (playerId) => {
        console.log('Removing player with ID:', playerId);
        removePlayerThunk(table.id, playerId);
    };
  
    return (
        <div className="table-card">
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Player to Table
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Player to Table</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>
                    <AddPlayerToTable onCloseModal={() => setShowModal(false)} />
                </Modal.Body> */}
            </Modal>
            <Container className="mt-4">
                <Card>
                    <Card.Header>Table {table ? table.id : 'loading...'}</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Session Start Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table && table.sessions ? table.sessions.map(session => (
                                    <tr key={session.id}>
                                        <td>{session.player ? session.player.name : 'loading...'}</td>
                                        <td>{new Date(session.startTime).toLocaleString()}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleRemovePlayer(session.player.id)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3">No players at this table</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const tableId = ownProps.match.params.id;
    const table = state.tables.find(table => table.id === tableId);
    console.log('Mapped state to props, found table:', table);
    return { table };
};

const mapDispatchToProps = {
    fetchSingleTableThunk: fetchSingleTableThunk,
    addPlayerThunk: addPlayerThunk,
    removePlayerThunk: removePlayerThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTable);
