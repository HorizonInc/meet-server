const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

require('./app/routes.js')(app);

//setting up the templating engine
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//setting up other dependencies
app.use(express.static(__dirname + "/static"));

var port = 8080;
app.listen(port);
console.log('server listening on port ' + port);
