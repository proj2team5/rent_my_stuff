const router = require('express').Router();
const { User, Gear  } = require('../models');

router.get('/', async (req, res) => {
    try {
      const gearData = await Gear.findAll({
        include: [
          {
            model: User,
            as: 'lender',
            attributes: ['username'],
          },
          {
            model: User,
            as: 'borrower',
            attributes: ['username'],
          },
        ],
      });
  
      const gearList = gearData.map((gear) =>
        gear.get({ plain: true })
      );
      res.status(200).json(gearList)
    //   res.render('homepage', {
    //     gearList, 
    //     loggedIn: req.session.loggedIn,
    //   });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;