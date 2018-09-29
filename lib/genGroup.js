'use strict';
const mongoose = require('mongoose');

module.exports = (app) => {
    app.post('/createGroup', (req, res) => {
        console.log(JSON.stringify(req.body.userId));
        res.writeHead('200');
        res.end('your group has been generated with members: ');
    });
};
