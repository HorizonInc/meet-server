'use strict';
require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

var sessionStore = new MongoDBStore({
	uri: "mongodb://localhost:27017/Meet",
	collection: "sessions"
});

let expiry = (96 * 60 * 60 * 1000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
	secret: "V8W060£6F0#DF6DSNM67",
	saveUninitialized: false,
	resave: false,
	store: sessionStore,
	cookie: { maxAge: expiry }
}));

require("./db.js");

require("./lib/Login/facebook.js")(app);

require("./lib/genGroup.js")(app);
require("./lib/groupInvites.js")(app);

// loading the web socket connection module
require("./lib/socketConnection.js")(app, io);

var port = 8080 || process.env.PORT;
server.listen(port);
console.log("server listening on port " + port);
