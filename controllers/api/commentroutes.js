// Import the necessary dependencies
const router = require('express').Router(); // Express router
const { Comment } = require('../../models'); // Comment model
const withAuth = require('../../utils/auth'); // Authentication middleware

// Export the router module
module.exports = router;
