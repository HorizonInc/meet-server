'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('./db.js');

require('./db.js');
require('./lib/genGroup.js');

var port = 8080;
app.listen(port);
console.log('server listening on port ' + port);
