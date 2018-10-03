'use strict';
const mongoose = require('mongoose');
var UserData = mongoose.model('UserData');

require('../db.js');

module.exports = (app, io) => {
    io.on('connection', (socket) => {
        console.log('A User Connecteds');
    });

    io.on('UserId', (data) => {
        let UserID = data;

        UserData.findOne({meetId: UserID}, (err, user) => {
            
        });
    });
};
