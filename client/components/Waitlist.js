import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers, deletePlayer, addPlayerToTableThunk } from '../store';

const Waitlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  // Use useSelector to select players from the state
  const players = useSelector(state => state.playersReducer.players);
  
  // Use state to keep track of highlighted players
  const [highlightedPlayers, setHighlightedPlayers] = useState([]);

  const handleSeatPlayer = (playerId, tableId) => {
    dispatch(addPlayerToTableThunk(tableId, playerId));
  };

  const handleRemovePlayer = (playerId) => {
    dispatch(deletePlayer(playerId));
  };

  const toggleHighlightPlayer = (playerId) => {
    setHighlightedPlayers(prevHighlightedPlayers => {
      return prevHighlightedPlayers.includes(playerId)
        ? prevHighlightedPlayers.filter(id => id !== playerId)
        : [...prevHighlightedPlayers, playerId];
    });
  };

  return (
    <div className="waitlist container">
      <h2 className="text-center my-4">Waitlist</h2>
      <ul className="list-group">
        {players.map(player => (
          <li key={player.id} className={`list-group-item ${highlightedPlayers.includes(player.id) ? 'list-group-item-warning' : ''}`}>
            {player.name} - {player.status}
            <div className="btn-group float-right" role="group">
              <button className="btn btn-success" onClick={() => handleSeatPlayer(player.id, 1)}>Seat Player</button>
              <button className="btn btn-danger" onClick={() => handleRemovePlayer(player.id)}>Remove Player</button>
              <button className="btn btn-warning" onClick={() => toggleHighlightPlayer(player.id)}>
                {highlightedPlayers.includes(player.id) ? 'Unhighlight' : 'Highlight'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Waitlist;
