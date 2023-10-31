import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Container, Card } from 'react-bootstrap';
import { fetchSingleTableThunk, removeSessionThunk } from '../store/tables';  // Updated import
import AddSession from './AddSession';  // Updated import

const SingleTable = ({ table, fetchSingleTableThunk, removeSessionThunk, match }) => {  // Updated prop
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchSingleTableThunk(match.params.id);
    }, [fetchSingleTableThunk, match.params.id]);

    const handleRemoveSession = async (sessionId) => {  // Renamed function
        await removeSessionThunk(table.id, sessionId);  // Updated thunk
        fetchSingleTableThunk(match.params.id); 
    };

    const activeSessions = table?.sessions?.filter(session => !session.endTime) || [];
    const endedSessions = table?.sessions?.filter(session => session.endTime) || [];

    return (
        <div className="table-card">
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Player to Table
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Player to Table</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                    <AddSession tableId={table ? table.id : null} onCloseModal={() => setShowModal(false)} /> 
                </Modal.Body>
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
                                {activeSessions.map(session => (
                                    <tr key={session.id}>
                                        <td>{session.player.name}</td> 
                                        <td>{new Date(session.startTime).toLocaleString()}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleRemoveSession(session.id)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Card className="mt-4"> 
                    <Card.Header>Ended Sessions</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Player Name</th> 
                                    <th>Session Start Time</th>
                                    <th>Session End Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {endedSessions.length > 0 ? endedSessions.map(session => (
                                    <tr key={session.id}>
                                        <td>{session.player.name}</td> 
                                        <td>{new Date(session.startTime).toLocaleString()}</td>
                                        <td>{new Date(session.endTime).toLocaleString()}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3">No ended sessions</td>
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
    const table = state.tables.find(table => table.id.toString() === tableId);
    return { table };
};

const mapDispatchToProps = {
    fetchSingleTableThunk: fetchSingleTableThunk,
    removeSessionThunk: removeSessionThunk,  // Updated prop
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTable);
