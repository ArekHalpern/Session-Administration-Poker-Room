const express = require('express');
const router = express.Router();
const { models: { Session, Player, Table }} = require('../db');

// GET /api/sessions - Get all sessions
router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      include: [
        { model: Player, attributes: ['name'] },
        { model: Table, attributes: ['number'] }
      ]
    });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

// GET /api/sessions/player/:playerId - Get all sessions for a specific player
router.get('/player/:playerId', async (req, res, next) => {
    try {
      const sessions = await Session.findAll({
        where: { playerId: req.params.playerId },
        include: [
          { model: Player, attributes: ['name'] },
          { model: Table, attributes: ['number'] }
        ]
      });
      res.json(sessions);
    } catch (err) {
      next(err);
    }
  });
  

// POST /api/sessions - Create a new session
router.post('/', async (req, res, next) => {
  try {
    const { playerId, tableId } = req.body;
    const session = await Session.create({ playerId, tableId });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

// PUT /api/sessions/:id/end - End a session by id
router.put('/:id/end', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      res.status(404).send('Session not found');
    } else {
      await session.update({ endTime: new Date() });
      res.json(session);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/sessions/:id - Delete a session by id
router.delete('/:id', async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      res.status(404).send('Session not found');
    } else {
      await session.destroy();
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
