const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const redis = require("redis");

const app = express();

const client = redis.createClient();

client.on("connect", (err) => {
	if(err != undefined)
		console.log(err);
})

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + "/static"));

require("./routes.js")(app);

const port = 8888;
app.listen(port);
console.log("Server is listening on " + port);
