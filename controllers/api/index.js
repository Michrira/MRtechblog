// Import the express package and create a new router object
const router = require('express').Router();

// Import the routes for users, posts, and comments
const userRoutes = require('./userroutes.js');
const postRoutes = require('./postroutes');
const commentRoutes = require('./commentroutes');

// Define the routes for each resource
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the router object so it can be used in other files
module.exports = router;
