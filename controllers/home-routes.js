const router = require('express').Router();
const { User, Gear  } = require('../models');

router.get('/', async (req, res) => {
    try {
      if (req.query.filter) {
        var listings = await Gear.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
          where: {
            category: req.query.filter
          }
        });
      }else{
        var listings = await Gear.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
      };
  
      const list = listings.map((gear) =>
        gear.get({ plain: true })
      );

      res.render('homepage', {
        list, 
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;