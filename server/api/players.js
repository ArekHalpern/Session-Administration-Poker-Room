const express = require('express');
const router = express.Router();
const { Player } = require('../db'); 

// GET /api/players - Get all players
router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    next(err);
  }
});

// POST /api/players - Create a new player
router.post('/', async (req, res, next) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    next(err);
  }
});

// GET /api/players/:id - Get a single player by id
router.get('/:id', async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      res.status(404).send('Player not found');
    } else {
      res.json(player);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/players/:id - Update a player by id
router.put('/:id', async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      res.status(404).send('Player not found');
    } else {
      await player.update(req.body);
      res.json(player);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/players/:id - Delete a player by id
router.delete('/:id', async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      res.status(404).send('Player not found');
    } else {
      await player.destroy();
      res.status(204).send(); 
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
