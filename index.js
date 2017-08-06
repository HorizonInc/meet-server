const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
const bodyParser = require("body-parser");
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const client = require("./app/db.js")();

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

const expiry = (60000 * 60); //session expiry time (1 hour currently)

app.use(session({
	secret: '/////',
	store : new redisStore({ host:"localhost", port: 6379, client: client, ttl: 260}),
	saveUninitialized: false,
	resave: false,
	cookie: { maxAge: expiry }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(validator());
app.use(cookieParser());
//app.use(flash());

app.use(express.static(__dirname + "/static"));

require("./app/routes.js")(app, client);
require("./app/Login/local-login.js")(app, validator);
require("./app/Login/facebook-login.js")(app);
require("./app/Login/twitter-login.js")(app);
require("./app/Login/google-login.js")(app);

const port = 8080;
app.listen(port);
console.log("Server is listening on " + port);
