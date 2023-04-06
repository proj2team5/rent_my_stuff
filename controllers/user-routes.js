const router = require('express').Router();
const { User, Gear, Rating, Loan  } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth,async (req, res) => {
    console.log(req.session.user_id)
    try {
        const userData = await User.findByPk(req.session.user_id, { //get user data for the current logged in user
          include: [ // include the gear belonging to the user
            {
              model: Gear,
            },
            {
              model: Loan,
              as: "items_lent"
            },
            {
              model: Loan,
              as: "items_borrowed"
            }
          ],
        });
        
        const user = userData.get({ plain: true });
        console.log(user)
        res.render('profile', { 
          user,  // pass in user data
          loggedIn: req.session.loggedIn, // pass in the logged in boolean
         });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get('/ratings/:id', async (req, res) => {
  try {
      const userData = await User.findByPk(req.params.id, { //get user data for the current logged in user
        include: [ // include the gear belonging to the user
          {
            model: Rating,
          },
        ],
      });
      const user = userData.get({ plain: true });
      const lender_ratings = user.ratings.filter(rating => rating.type === 'LENDER');
      const borrower_ratings = user.ratings.filter(rating => rating.type === 'BORROWER');

      if (lender_ratings.length){
        lender_rating = lender_ratings.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/lender_ratings.length
      }else{
        lender_rating = "no ratings"
      }

      if (borrower_ratings.length){
        borrower_rating = borrower_ratings.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/borrower_ratings.length
      }else{
        borrower_rating = "no ratings"
      }

      res.render('ratings', { 
        user,  // pass in user data
        lender_rating,
        borrower_rating,
        loggedIn: req.session.loggedIn, // pass in the logged in boolean
       });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});
// Ex: /user/rate/:id?type=BORROWER
router.get('/rate/:id', async (req, res) => {
  try {
      const user_id = req.params.id;
      const rating_type = req.query.type
      const user = userData.get({ plain: true });
      res.render('rate', { 
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