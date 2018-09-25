'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('./db.js');

const generateGroup = require('./lib/genGroup.js')(app);

var port = 8080;
app.listen(port);
console.log('server listening on port ' + port);
