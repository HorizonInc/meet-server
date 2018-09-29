'use strict';
const mongoose = require('mongoose');
var GroupData = mongoose.model('GroupData');

module.exports = (app) => {
    app.post('/createGroup', (req, res) => {
        console.log(GroupData.find());
    });
};
