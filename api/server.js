const express = require('express');
const helmet = require('helmet');
const cors = require('cors');



const server = express();

server.use(helmet(), express.json(), cors());

server.get('/', (req, res) => {
    res.send("I'm booted up!");
});



module.exports = server;