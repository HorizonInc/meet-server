const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/static"));

require("./routes.js")(app);

const port = 8888;
app.listen(port);
console.log("Server is listening on " + port);
