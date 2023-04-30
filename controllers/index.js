const router = require('express').Router();

// Importing routes from subfolders
const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes.js');
const dashboardRoutes = require('./dashboardroutes.js');

// Using imported routes
router.use('/api', apiRoutes); // for API routes
router.use('/dashboard', dashboardRoutes); // for dashboard routes
router.use('/', homeRoutes); // for home routes

// Handling requests to non-existent routes
router.use((req, res) => {
    res.status(404).end(); // sends a 404 error if no route is matched
});

module.exports = router;
