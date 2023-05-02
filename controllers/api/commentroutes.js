// Require Express Router and Models
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Require withAuth middleware for authentication
const withAuth = require('../../utils/auth');

// GET all comments
router.get("/", (req, res) => {
Comment.findAll()
.then((dbCommentData) => res.json(dbCommentData)) // Return all comments as JSON
.catch((err) => {
console.log(err); // Log error to console
res.status(500).json(err); // Return error with 500 status
});
});

// POST create a comment
router.post('/', withAuth, (req, res) => {
if (req.session) { // If there's an active session
Comment.create({
comment_text: req.body.comment_text, // Set comment text
post_id: req.body.post_id, // Set post ID
user_id: req.session.user_id // Set user ID from session
})
.then(dbCommentData => res.json(dbCommentData)) // Return new comment as JSON
.catch(err => {
console.log(err); // Log error to console
res.status(400).json(err); // Return error with 400 status
});
}
});

module.exports = router; // Export router for use in other files