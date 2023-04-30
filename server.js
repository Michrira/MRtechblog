// Importing required dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// Importing application routes and handlebars helpers
const routes = require('./controllers/');
const helpers = require('./utils/helpers');
// Creating an instance of the express application
const app = express();
// Setting the application port
const PORT = process.env.PORT || 3001;
// Importing the Sequelize database connection and session store
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Configuring the session object
const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {
        // maxAge:
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
// Configuring the middleware to use sessions
app.use(session({
    secret:'my-secret-key',
    resave: false,
    saveUninitialized: false
}));
// Creating an instance of the Handlebars templating engine with custom helpers
app.use(session(sess));
const hbs = exphbs.create({
    helpers
});
// Configuring the Handlebars engine as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Middleware to handle URL encoded data and JSON data
app.use(express.json());
app.use(express.urlencoded
    ({
        extended: false
    }));
// Configuring the static file directory for the server
app.use(express.static(path.join(__dirname, 'public')));
// Attaching the application routes to the middleware
app.use(routes);
// Syncing the Sequelize models and starting the server
sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`);
    }
    )
});
    