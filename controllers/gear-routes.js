const router = require('express').Router();
const { User, Gear, Rating  } = require('../models');
const withAuth = require('../utils/auth'); //authentication middleware
const sequelize = require('../config/connection');

// get routes to render the webpages

// get the add gear page, user must be logged in to access this route else they will be redirected to login page
// redirection done using withAuth middleware
router.get('/add', withAuth,async (req, res) => {
    // in the add gear section a dropdown is available to choose the gear category
    // to ensure that if we change the categories in the gear model's category list the add gear categories are updated
    // we pull the existing enum values from the gear category attributes
    categories = Gear.getAttributes().category.values 
    try {
      res.render('addGear', { //render addGear handlebar page and pass in categories and loggedIn parameters
        categories, 
        loggedIn: req.session.loggedIn
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// get the update gear page, user must be logged in to access this route else they will be redirected to login page
// redirection done using withAuth middleware
router.get('/update/:id',withAuth, async (req, res) => {
    // in the update gear section a dropdown is available to choose the gear category
    // to ensure that if we change the categories in the gear model's category list the update gear categories are updated
    // we pull the existing enum values from the gear category attributes
    categories = Gear.getAttributes().category.values
    try {
      const gearData = await Gear.findByPk(req.params.id); //get gear by id
      const gear = gearData.get({ plain: true });
      if (gear.owner_id === req.session.user_id){ //ensure that the user is indeed the owner of the gear
        res.render('updateGear', { //render updateGear handlebar page and pass in categories, current gear instance data, and loggedIn parameters
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

// get the gear detail page, user must be logged in to access this route else they will be redirected to login page
// redirection done using withAuth middleware
router.get('/:id', withAuth, async (req, res) => {
    try {
        const gearData = await Gear.findByPk(req.params.id,{ // get gear data for a particular id
          include: [ // include the user data for the gear instance
            {
              model: User,
              attributes: ['username'],
            },
          ],
        });
        const gear = gearData.get({ plain: true });
        // we are pulling the ratingData separately as we will be performing some calculations
        const ratingData = await Rating.findAll({ 
          raw:true, // used as a substitute for .get({ plain: true })
          where: {
            user_id: gear.owner_id, 
            product_id: req.params.id
          },
        })
        // if ratings exist calculate the average rating
        if (ratingData.length){
          // map gives us a new array with just the ratings 1 to 5 and reduce sums these ratings.
          // we then divide everything by the array length in other words the number of reviews
          avg_rating = ratingData.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/ratingData.length
        }else{
          avg_rating = "no ratings"
        }
        
        number_of_reviews = ratingData.length

        res.render('gearDetails', { // render gearDetails page and pass in gear instance, average rating, number of reviews, and the reviews as wel as the session variables
          gear,
          avg_rating,
          number_of_reviews,
          ratingData,
          user_id: req.session.user_id,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;