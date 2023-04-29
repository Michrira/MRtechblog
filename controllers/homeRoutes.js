const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: { model: User, attributes: ['username'] },
            order: [['date_created', 'DESC']]
        });

        res.render('homepage', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login page route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

// Signup page route
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
});

// Single post route
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [{ model: User, attributes: ['username'] }] }
            ]
        });

        res.render('post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: { model: User, attributes: ['username'] },
            order: [['date_created', 'DESC']]
        });

        res.render('dashboard', { posts, logged_in: req.session.logged_in, username: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
