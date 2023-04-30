// Import necessary packages and models
const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        // Find all users and exclude password attribute from the returned object
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        // Send users as response
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get specific user
router.get('/:id', async (req, res) => {
    try {
        // Find a user with specific id, exclude password attribute from the returned object,
        // include posts and comments for the user, and include the associated post for each comment
        const user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });
        // If no user is found with the given id, send a 404 error response
        if (!user) {
            res.status(404).json({
                message: 'No user found with this id'
            });
            return;
        }
        // Send user as response
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a user
router.post('/', async (req, res) => {
    try {
        // Create a new user using the input from the request body
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        // Set user session variables and save the session before sending the user as response
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        req.session.save(() => {
            res.json(user);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        // Find a user with the given username and check if the password matches
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        // If no user is found with the given username, send a 400 error response
        if (!user) {
            res.status(400).json({
                message: 'No user with that username!'
            });
            return;
        }
        // Check if the given password matches the user's password
        const validPassword = user.checkPassword(req.body.password);
        // If the password does not match, send a 400 error response
        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect password!'
            });
            return;
        }
        // Set user session variables and save the session before sending the user as response
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        req.session.save(() => {
            res.json({
                user: user,
                message: 'You are now logged in!'
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Export router to be used in other files
module.exports = router;
