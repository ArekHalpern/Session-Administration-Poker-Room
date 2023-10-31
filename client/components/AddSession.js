import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { createSessionThunk } from '../store/sessions';
import { fetchPlayersThunk } from '../store/players';

const AddSession = ({ createSessionThunk, tableId, onCloseModal }) => {
    const [playerName, setPlayerName] = useState('');

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createSessionThunk(playerName, tableId);
        onCloseModal();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="playerName">
                <Form.Label>Player Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter player's name"
                    value={playerName}
                    onChange={handlePlayerNameChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!playerName}>
                Add Player to Table
            </Button>
        </Form>
    );
};

const mapDispatchToProps = {
    createSessionThunk: createSessionThunk,
    fetchPlayersThunk: fetchPlayersThunk,
};

export default connect(null, mapDispatchToProps)(AddSession);
