const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const client = require("./app/db.js")();

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//app.use(session({
//	secret: ''
//}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
//app.use(flash());

app.use(express.static(__dirname + "/static"));

require("./app/routes.js")(app);
require("./app/Login/local-login.js")(app);
require("./app/Login/facebook-login.js")(app);
require("./app/Login/twitter-login.js")(app);
require("./app/Login/google-login.js")(app);

const port = 8080;
app.listen(port);
console.log("Server is listening on " + port);
