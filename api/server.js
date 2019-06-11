const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true,
    },
    saveUninitialized: true,
    resave: false,
    store: new KnexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    }),
};

server.use(helmet(), express.json(), cors(), session(sessionConfig));

server.get('/', (req, res) => {
    res.send("I'm booted up!");
});

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);


module.exports = server;