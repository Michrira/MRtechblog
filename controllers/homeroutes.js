// Import required packages and models
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// GET route for homepage
router.get('/', (req, res) => {
    // Find all posts
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // Serialize post data
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // Render homepage template with posts data
            res.render('homepage', { posts, loggedIn: req.session.logged_in });
        })
        .catch(err => {
            // If error, log it and send an error response
            console.log(err);
            res.status(500).json(err);
        });
});

// GET route for a single post by ID
router.get('/post/:id', (req, res) => {
    // Find a post by its ID
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // If post not found, send a 404 response
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // Serialize post data and render single-post template
            const post = dbPostData.get({ plain: true });
            res.render('single-post', { post, loggedIn: req.session.logged_in });
        })
        .catch(err => {
            // If error, log it and send an error response
            console.log(err);
            res.status(500).json(err);
        });
});

// GET route for the login page
router.get('/login', (req, res) => {
    // If user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    // Render login template
    res.render('login');
});

// GET route for the signup page
router.get('/signup', (req, res) => {
    // If user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    // Render signup template
    res.render('signup');
});

// Catch-all route for 404 errors
router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
    // res.redirect('/');
});

module.exports = router;
