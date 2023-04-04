const router = require('express').Router();
const userRoutes = require('./user-routes');
const gearRoutes = require('./gear-routes');
const loanRoutes = require('./loan-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/gear', gearRoutes);
router.use('/loans', loanRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;
