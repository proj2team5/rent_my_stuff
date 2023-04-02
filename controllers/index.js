const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const userRoutes = require('./user-routes.js');
const gearRoutes = require('./gear-routes.js');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
router.use('/gear', gearRoutes);
router.use('/api', apiRoutes);


module.exports = router;
