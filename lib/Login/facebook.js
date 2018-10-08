'use strict';
const request = require('request-promise');
const mongoose = require('mongoose');
const stateGen = require('crypto-random-string');
var UserData = mongoose.model('UserData');

require('../../db.js');

// these are credentials that are used for facebook to authorise the login
var credentials = {
    ClientId: process.env.CLIENT_ID,
    ClientSecret: process.env.CLIENT_SECRET,
    state: {
        st: '',
        ds: '',
    },
    redirect_uri: 'http://localhost:8080/fbCode',
};

var access_token, person, userObject;

module.exports = async(app) => {

    // this get route redirects the user to facebooks site to handle their login
    app.get('/fb', (req, res) => {
        credentials.state.st = stateGen(20);
        credentials.state.ds = stateGen(20);
        res.redirect(`https://www.facebook.com/v3.1/dialog/oauth?client_id=${credentials.ClientId}&redirect_uri=${credentials.redirect_uri}&state=${JSON.stringify(credentials.state)}`);
    });

    // this route deals with what comes back when facebook redirects back to the site and the application then has to exchange the code returned from the login
    // and the applications credentials in return for an access token which is then used to get the users details
    app.get('/fbCode', (req, res) => {
        var code = req.query.code;
        var err = req.query.error;
        var state = JSON.parse(req.query.state);

        if (state.st !== credentials.state.st && state.ds !== credentials.state.ds) {
            console.log('State does not match up! Error');
            res.writeHead('409');
            res.end('The state did not match up, there may be something intercepting your traffic.');
        }

        if (err !== undefined) console.log(err);

        request.get(`https://graph.facebook.com/v3.1/oauth/access_token?client_id=${credentials.ClientId}&redirect_uri=${credentials.redirect_uri}&client_secret=${credentials.ClientSecret}&code=${code}`).then((body) => {
            var data = JSON.parse(body);
            access_token = data.access_token; // this is the access token retuned

            // this then uses the access token to gain the users details
            request.get(`https://graph.facebook.com/v3.1/me?fields=id%2Cname%2Cpicture&access_token=${access_token}&redirect_uri=http://localhost:8080/`).then(body => {
                person = JSON.parse(body);

                UserData.findOne({_id: person.id}, (err, user) => {
                    if (err) console.log('err: ' + err);

                    console.log('user: ' + user);

                    if (user == null) {
                        var userId = (person.name.replace(/\s/g, '')).toUpperCase() + '#' + stateGen(10).toUpperCase();

                        userObject = {
                            _id: person.id,
                            name: person.name,
                            meetId: userId,
                            pictureURL: person.picture.data.url,
                            invites: [],
                        };

                        var newUser = new UserData(userObject);

                        newUser.save()
                            .then(savedUser => {
                                console.log('User Saved: ' + savedUser);
                            }).catch(err => {
                                console.log(err);
                            });
                    } else {
                        // Refresh their session
                    }
                });
                // SUCCESS CONDITION
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            console.log(e);
        });

        res.json(userObject);
        res.end();
    });
};
