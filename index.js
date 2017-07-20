const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('flash');

const app = express();

require("./app/db.js")();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + "/static"));

require("./app/routes.js")(app);

const port = 8080;
app.listen(port);
console.log("Server is listening on " + port);
