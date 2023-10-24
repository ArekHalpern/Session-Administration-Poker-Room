import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { addPlayerThunk } from '../store/tables';
import { fetchPlayersThunk } from '../store/players';

const AddPlayerToTable = ({ availablePlayers, addPlayerThunk, tableId, onCloseModal }) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState('');

    useEffect(() => {
        fetchPlayersThunk();
    }, [fetchPlayersThunk]);

    const handlePlayerSelection = (event) => {
        setSelectedPlayerId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addPlayerThunk(tableId, selectedPlayerId);
        onCloseModal();
    };

    const unassignedPlayers = availablePlayers?.filter(player => !player.tableId);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="playerSelection">
                <Form.Label>Select Player</Form.Label>
                <Form.Control as="select" value={selectedPlayerId} onChange={handlePlayerSelection}>
                    <option value="" disabled>Select a player</option>
                    {unassignedPlayers?.map(player => (
                        <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!selectedPlayerId}>
                Add Player
            </Button>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return { availablePlayers: state.players.players };
};

const mapDispatchToProps = {
    addPlayerThunk: addPlayerThunk,
    fetchPlayersThunk: fetchPlayersThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerToTable);



