'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Meet', { useNewUrlParser: true});

var userDataSchema = new Schema({
    name: String,
    meetId: String,
    pictureURL: String,
    invites: Array,
});

var groupDataSchema = new Schema({
    group_admin_id: String,
    accepted_members: Array,
    invited_members: Array,
});

var UserData = mongoose.model('UserData', userDataSchema, 'UserData');  // eslint-disable-line
var GroupData = mongoose.model('GroupData', groupDataSchema, 'GroupData');  // eslint-disable-line

module.exports = mongoose;
