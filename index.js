'use strict';

require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./db.js');

require('./lib/Login/facebook.js')(app);

require('./lib/genGroup.js')(app);
require('./lib/groupInvites.js')(app);

// loading the web socket connection module
require('./lib/socketConnection.js')(app, io);

var port = 8080 || process.env.PORT;
server.listen(port);
console.log('server listening on port ' + port);
