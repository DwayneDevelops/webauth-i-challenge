const express = require('express');

const Users = require('../users/users-model.js');
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;