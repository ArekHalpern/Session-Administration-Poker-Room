const express = require('express');
const router = express.Router();
const { models: { Table }} = require('../db')

// GET /api/tables - Get all tables
router.get('/', async (req, res, next) => {
  try {
    const tables = await Table.findAll();
    res.json(tables);
  } catch (err) {
    next(err);
  }
});

// POST /api/tables - Create a new table
router.post('/', async (req, res, next) => {
    try {
      const { number } = req.body;  
  
      // Prepare data for the new table
      const tableData = { number, status: 'open' };  // Default status is 'open'
  
      const table = await Table.create(tableData);
  
      res.status(201).json(table);
    } catch (err) {
      next(err);
    }
  });

// GET /api/tables/:id - Get a single table by id including its sessions
router.get('/:id', async (req, res, next) => {
    try {
      const table = await Table.findByPk(req.params.id, {
        include: [
          {
            model: Session,
            as: 'sessions',
            include: [Player]  // if you want to include player details in each session
          }
        ]
      });
      
      if (!table) {
        res.status(404).send('Table not found');
      } else {
        res.json(table);
      }
    } catch (err) {
      next(err);
    }
  });
  

// PUT /api/tables/:id - Update a table by id
router.put('/:id', async (req, res, next) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      res.status(404).send('Table not found');
    } else {
      await table.update(req.body);
      res.json(table);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tables/:id - Delete a table by id
router.delete('/:id', async (req, res, next) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      res.status(404).send('Table not found');
    } else {
      await table.destroy();
      res.status(204).send();  // No Content
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
