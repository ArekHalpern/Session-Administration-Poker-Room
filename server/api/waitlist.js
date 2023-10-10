const express = require('express');
const router = express.Router();
const { models: { Waitlist, Player, Table }} = require('../db');

// GET /api/waitlist - Get the entire waitlist
router.get('/', async (req, res, next) => {
    try {
      const waitlist = await Waitlist.findAll({
        include: [
          { model: Player, attributes: ['name'] },  // Include player name
          { model: Table, attributes: ['number'] }  // Include table number, assuming the field is named 'number'
        ]
      });
      console.log('Fetched waitlist:', JSON.stringify(waitlist, null, 2));  // Log the fetched waitlist
      res.json(waitlist);
    } catch (err) {
      next(err);
    }
  });

// POST /api/waitlist - Create a new waitlist entry
router.post('/', async (req, res, next) => {
  try {
    const { playerId, tableId, notes } = req.body;
    
    const waitlistEntry = await Waitlist.create({ playerId, tableId, notes });
    
    res.status(201).json(waitlistEntry);
  } catch (err) {
    next(err);
  }
});

// PUT /api/waitlist/:id - Update a waitlist entry by id
router.put('/:id', async (req, res, next) => {
  try {
    const waitlistEntry = await Waitlist.findByPk(req.params.id);
    if (!waitlistEntry) {
      res.status(404).send('Waitlist entry not found');
    } else {
      await waitlistEntry.update(req.body);
      res.json(waitlistEntry);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/waitlist/:id - Delete a waitlist entry by id
router.delete('/:id', async (req, res, next) => {
  try {
    const waitlistEntry = await Waitlist.findByPk(req.params.id);
    if (!waitlistEntry) {
      res.status(404).send('Waitlist entry not found');
    } else {
      await waitlistEntry.destroy();
      res.status(204).send();  // No Content
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

