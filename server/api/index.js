const router = require('express').Router();

// Import other route modules
const tableRoutes = require('./tables');
const sessionRoutes = require('./sessions');  // Import the sessions routes

// Existing user routes
router.use('/users', require('./users'));

// New routes for tables, players, waitlist, and sessions
router.use('/tables', tableRoutes);
router.use('/players', require('./players'));
router.use('/waitlist', require('./waitlist'));
router.use('/sessions', sessionRoutes);  // New route handler for sessions

// 404 handler for unrecognized routes
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;

