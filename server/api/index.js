const router = require('express').Router();

const tableRoutes = require('./tables');

// Existing user routes
router.use('/users', require('./users'));

// New routes for tables and players
router.use('/tables', require('./tables'));
router.use('/players', require('./players'));

// 404 handler for unrecognized routes
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
