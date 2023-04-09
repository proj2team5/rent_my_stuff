const router = require('express').Router();
const { User, Gear  } = require('../models');

// '/' route renders the homepage
// there are two ways this route can be called: going directly to the '/' route or using the dropdown filter
// we have two different sequelize queries to deal with each scenario
router.get('/', async (req, res) => {
    try {
      if (req.query.filter) { // scenario when homepage is called after using dropdown filter
        var listings = await Gear.findAll({
          include: [ // include user data
            {
              model: User,
              attributes: ['username'],
            },
          ],
          where: {
            category: req.query.filter // ensure category matches category of filter
          },
          order: [
            ['posted_date', 'DESC'], // show newest products first
          ]
        });
      }else{
        var listings = await Gear.findAll({ //scenario going directly to the '/' route
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
          order: [
            ['posted_date', 'DESC'], // show newest products first
          ]
        });
      }

      const list = listings.map((gear) =>
        gear.get({ plain: true })
      );

      res.render('homepage', { // render homepage with gear listing and loggedIn session variable
        list, 
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;