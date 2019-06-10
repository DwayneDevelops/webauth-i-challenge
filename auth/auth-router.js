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
            res.status(200).json({ message: `Come on in ${user.username}` });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch (error => {
        res.status(500).json(error);
    });
});

module.exports = router;