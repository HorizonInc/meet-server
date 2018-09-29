const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Meet', { useNewUrlParser: true});

var userDataSchema = new Schema({
    _id: String,
    name: String,
    meetId: String,
});

var groupDataSchema = new Schema({
    _id: String,
    groupAdminId: String,
    groupMembers: Array,
});

var UserData = mongoose.model('UserData', userDataSchema, 'UserData');
var GroupData = mongoose.model('GroupData', groupDataSchema, 'GroupData');

module.exports = mongoose;
