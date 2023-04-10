const router = require('express').Router();
const { User, Gear, Rating, Loan  } = require('../models');
const withAuth = require('../utils/auth');

// this route will rnder the user profile
router.get('/', withAuth,async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, { //get user data for the current logged in user
          include: [ // include the gear, items borrowed, and items rented belonging to the user
            {
              model: Gear,
            },
            {
              model: Loan,
              as: "items_lent", // we use the as alias so sequelize knows which foreign key to use
              include: [ // for items being rented we need to include data about the borrower and the gear that is being rented out
                {
                  model: User,
                  as: "borrower", // we use the as alias so sequelize knows which foreign key to use
                  include: [ // we include reviews for the borrower this data will be displayed for borrow request
                    {
                      model: Rating
                    } 
                  ]
                },
                {
                  model: Gear,
                }
              ],
            },
            {
              model: Loan, // this will be items the user is borrowing
              as: "items_borrowed",// we use the as alias so sequelize knows which foreign key to use
              include: [ 
                {
                  model: Gear,
                }
              ]
            }
          ],
        });
        
        const user = userData.get({ plain: true });
        res.render('profile', { 
          user,  // pass in user data
          loggedIn: req.session.loggedIn, // pass in the logged in boolean
         });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// renders the rate page, will be redirected here after return or confirming item returned
// Ex: users/rate/1?type=BORROWER?gearid=1
router.get('/rate/:id', withAuth, async (req, res) => {
  try {
      //get data from prams and query params
      const user_id = req.params.id;
      const rating_type = req.query.type
      const gearID = req.query.gearid
      res.render('rate', {
        gearID,   // pass in the gear id
        user_id,  // pass in user id
        rating_type, // pass in rating type
        loggedIn: req.session.loggedIn, // pass in the logged in boolean
       });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// when user request /login route checks if user is already logged in if not renders login page
// if user is logged in they are returned to the homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
// when user request /signup route checks if user is already logged in if not renders login page
// if user is logged in they are returned to the homepage
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signUp');
});
  

module.exports = router;