const router = require('express').Router();
const { User } = require('../../models');

// API route to create a user, login, and logout

router.post('/', async (req, res) => {
   
    try {
      const dbUserData = await User.create({ // create user object with email, username and password
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      //when you are able to create the user object update the session
      //as the user will be logged in once the account is created
      req.session.save(() => { 
        req.session.loggedIn = true; // set the loggedIn session variable to true
        req.session.user_id = dbUserData.id; // set the user_id variable to the newly created user's id
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
// login the user  
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({ // match the user in the database with the username provided and pull that user
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password); // use the instance method to check the password
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      // update the session
      req.session.save(() => {
        req.session.loggedIn = true; // set the loggedIn session variable to true
        req.session.user_id = dbUserData.id; // set the user_id variable to the newly created user's id
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
// logout user  
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => { // destroy session to logout user
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});
  
  module.exports = router;