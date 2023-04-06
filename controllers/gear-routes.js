const router = require('express').Router();
const { User, Gear, Rating  } = require('../models');
const withAuth = require('../utils/auth'); //authentication middleware
const sequelize = require('../config/connection');


router.get('/add', async (req, res) => {
    categories = Gear.getAttributes().category.values
    try {
      res.render('addGear', {
        categories, 
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/update/:id',withAuth, async (req, res) => {
    categories = Gear.getAttributes().category.values
    try {
      const gearData = await Gear.findByPk(req.params.id); //get gear by id
      const gear = gearData.get({ plain: true });
      if (gear.owner_id === req.session.user_id){ //ensure that the user is indeed the owner of the gear
        res.render('updateGear', {
            categories, 
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
            product_id: req.params.id
          },
        })

        if (ratingData.length){
          avg_rating = ratingData.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/ratingData.length
        }else{
          avg_rating = "no ratings"
        }
        
        number_of_reviews = ratingData.length

        res.render('gearDetails', {
          gear,
          avg_rating,
          number_of_reviews,
          ratingData,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;