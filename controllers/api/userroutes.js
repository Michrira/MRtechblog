// Import the necessary dependencies
const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user with the data from the request body
        const userData = await User.create(req.body);

        // Set session variables for the user
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        // Send a JSON response with the new user data and a success status code
        res.status(200).json(userData);
    } catch (err) {
        // If there was an error creating the user, log the error and send an error response
        console.log(err);
        res.status(400).json(err);
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        // Find the user in the database with the provided email
        const userData = await User.findOne({ where: { email: req.body.email } });

        // If no user was found with the provided email, send an error response
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Check if the provided password matches the user's password in the database
        const validPassword = await userData.checkPassword(req.body.password);

        // If the password is not valid, send an error response
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Set session variables for the user
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;

        // Send a JSON response with the user data and a success message
        res.json({ user: userData, message: 'You are now logged in!' });

    } catch (err) {
        // If there was an error logging in the user, log the error and send an error response
        console.log(err);
        res.status(400).json(err);
    }
});

// Logout the user
router.post('/logout', (req, res) => {
    // Check if the user is logged in
    if (req.session.logged_in) {
        // Destroy the session and send a success response
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // If the user is not logged in, send an error response
        res.status(404).end();
    }
});

// Export the router
module.exports = router;
