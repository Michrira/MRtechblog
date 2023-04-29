const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => (
            res.status(200).json({ user_id: userData.id, logged_in: true, username: userData.username })
        ));
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) return res.status(400).json({ message: 'Incorrect email or password, please try again' });
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) return res.status(400).json({ message: 'Incorrect email or password, please try again' });
        req.session.save(() => (
            res.json({ user: userData, message: 'You are now logged in!' })
        ));
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => (
    req.session.logged_in
        ? req.session.destroy(() => res.status(204).end())
        : res.status(404).end()
));

module.exports = router;
