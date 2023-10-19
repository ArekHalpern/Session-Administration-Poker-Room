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

// POST /api/waitlist - Create a new waitlist entry
router.post('/', async (req, res, next) => {
    try {
      const { playerId, notes } = req.body;
  
      const isOnWaitlist = await Waitlist.findOne({ where: { playerId } });
      if (isOnWaitlist) {
        return res.status(400).send('Player is already on the waitlist.');
      }
      
      const waitlistEntry = await Waitlist.create({ playerId, notes });
      
      res.status(201).json(waitlistEntry);
    } catch (err) {
      next(err);
    }
  });
  
  // GET /api/waitlist/player/:playerId - Check if a player is on the waitlist
  router.get('/player/:playerId', async (req, res, next) => {
    try {
      const waitlistEntry = await Waitlist.findOne({ 
        where: { playerId: req.params.playerId }, 
        include: [
          { model: Player, attributes: ['name'] },
          { model: Table, attributes: ['number'] }
        ] 
      });
      if (waitlistEntry) {
        res.json(waitlistEntry);
      } else {
        res.status(404).send('Player not found on the waitlist.');
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

