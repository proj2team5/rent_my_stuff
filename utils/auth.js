const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page
      if (!req.session.loggedIn) {
        res.redirect('/login');
      } else {
        // else continue with user's request and wait for next request
        next();
      }
    };
    
    module.exports = withAuth;