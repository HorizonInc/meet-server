const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = require('bluebird');
mongoose.connect(`mongodb://localhost:27017/Meet`, {useMongoClient: true});

module.exports = mongoose;
