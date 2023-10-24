import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Container, Card } from 'react-bootstrap';
import { fetchSingleTableThunk, removePlayerThunk } from '../store/tables';
import AddPlayer from './AddPlayer';

const SingleTable = ({ table, fetchSingleTableThunk, removePlayerThunk, match }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchSingleTableThunk(match.params.id);
    }, [fetchSingleTableThunk, match.params.id]);

    const handleRemovePlayer = async (playerId) => {
        await removePlayerThunk(table.id, playerId);
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
                {console.log('table', table)}
                <Modal.Body>
                    <AddPlayer tableId={table ? table.id : null} onCloseModal={() => setShowModal(false)} />
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
                                        <td>{session.player ? session.player.name : 'loading...'}</td>
                                        <td>{new Date(session.startTime).toLocaleString()}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleRemovePlayer(session.player.id)}>
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
                                        <td>{session.player ? session.player.name : 'loading...'}</td>
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
    removePlayerThunk: removePlayerThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTable);
