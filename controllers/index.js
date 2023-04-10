const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const userRoutes = require('./user-routes.js');
const gearRoutes = require('./gear-routes.js');

//connecting routes with modules
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/gear', gearRoutes);
router.use('/api', apiRoutes);


module.exports = router;
