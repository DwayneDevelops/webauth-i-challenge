const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');


const server = express();

server.use(helmet(), express.json(), cors());

server.get('/', (req, res) => {
    res.send("I'm booted up!");
});

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/restricted', authRouter);

module.exports = server;