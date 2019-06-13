const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', async (req, res) => {
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    try {
        const Users = await Users.add(req.body)
        .then(saved => {
            res.status(201).json(saved);    
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: `Come on in ${user.username}` });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch (error => {
        res.status(500).json(error);
    });
});

router.post('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({ message: 'you can checkout any time you like, but you can never leave' })
            } else {
                res.status(200).json({ message: 'bye, thanks for playing' });
            }
        })
    } else {
        res.status(200).json({ message: 'You were never here to begin with' })
    }
})
module.exports = router;