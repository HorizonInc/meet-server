const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
//const passport = require('passport');
const cookieParser = require('cookie-parser');
const client = require("./app/db.js")();
const querystring = require('querystring');

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

app.use(express.static(__dirname + "/static"));

require("./app/routes.js")(app);
require("./app/Login/local-login.js")(app);
require("./app/Login/facebook-login.js")(app, querystring);

const port = 8080;
app.listen(port);
console.log("Server is listening on " + port);
