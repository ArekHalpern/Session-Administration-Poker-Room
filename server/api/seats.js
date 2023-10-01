const express = require('express');
const router = express.Router();
const { models: { Seat, Table }} = require('../db');

// POST /api/seats/:tableId - Add a player to a table
router.post('/:tableId', async (req, res, next) => {
  const { tableId } = req.params;
  const { playerId } = req.body;
  
  try {
    const seat = await Seat.create({ tableId, playerId });
    res.status(201).json(seat);
  } catch (err) {
    next(err);
  }
});

// PUT /api/seats/:tableId/:seatId - Assign a player to a seat
router.put('/:tableId/:seatId', async (req, res, next) => {
  const { tableId, seatId } = req.params;
  const { playerId } = req.body;

  try {
    const seat = await Seat.findByPk(seatId);
    if (!seat || seat.tableId !== parseInt(tableId)) {
      res.status(404).send('Seat not found or does not belong to table');
    } else {
      await seat.update({ playerId });
      res.json(seat);
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;