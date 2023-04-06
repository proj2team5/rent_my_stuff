const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); // handlebars
const routes = require('./controllers'); // routes
const helpers = require('./utils/helpers'); // auth and date format helper

const sequelize = require('./config/connection'); // sequelize db setup
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
  secret: 'Super secret secret',
  cookie: { // default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
        maxAge: 1000*60*60, 
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
  }, 
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// Uses the session middleware with the above configuration
app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Setting up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Uses the routes defined in the './controllers' module
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening! http://localhost:3001/ '));
});
