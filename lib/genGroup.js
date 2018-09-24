const mongoose = require('mongoose');

const genGroup = (app) => {
    // app.post('/genGroup', (req, res) => {
    //
    // });

    app.get('/group', (req, res) => {
       console.log('cool, they tried to gen a group!');
    });
}

module.exports = genGroup;
