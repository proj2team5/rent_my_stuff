const router = require('express').Router();
const { User, Gear, Rating  } = require('../models');
const withAuth = require('../utils/auth'); //authentication middleware
const sequelize = require('../config/connection');

router.get('/add',withAuth, async (req, res) => {
    try {
      res.render('addGear', { 
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/update/:id',withAuth, async (req, res) => {
    try {
      const gearData = await Gear.findByPk(req.params.id); //get gear by id
      const gear = gearData.get({ plain: true });
      if (gear.owner_id === req.session.user_id){ //ensure that the user is indeed the owner of the gear
        res.render('updateGear', { 
            gear, 
            loggedIn: req.session.loggedIn
        });
        return;
      }
      res.status(403).json({ message: 'You are not the owner of this item' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const gearData = await Gear.findByPk(req.params.id,{
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
        const gear = gearData.get({ plain: true });

        const ratingData = await Rating.findAll({ 
          raw:true,
          where: {
            user_id: gear.owner_id, 
            type: "LENDER"
          },
        })

        if (ratingData.length){
          rating = ratingData.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/ratingData.length
        }else{
          rating = "no ratings"
        }
        


        res.render('gearDetails', {
          gear,
          rating, 
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;