const request = require('request-promise');
const mongoose = require('mongoose');

//these are credentials that are used for facebook to authorise the login
var credentials = {
    ClientId : "",
    ClientSecret : "",
    redirect_uri : ''
};

var access_token = undefined, person;

module.exports = (async (app) => {

    //this get route redirects the user to facebooks site to handle their login
    app.get('/fb', (req, res) => {
        res.redirect(`https://www.facebook.com/v2.10/dialog/oauth?client_id=${credentials.ClientId}&redirect_uri=${credentials.redirect_uri}`);
    });

    //this route deals with what comes back when facebook redirects back to the site and the application then has to exchange the code returned from the login
    //and the applications credentials in return for an access token which is then used to get the users details
    app.get("/fbCode", (req, res) => {
        var code = req.query.code;
        var err = req.query.error;

        if(err != undefined) console.log(err);

        request.get(`https://graph.facebook.com/v2.10/oauth/access_token?client_id=${credentials.ClientId}&redirect_uri=${credentials.redirect_uri}&client_secret=${credentials.ClientSecret}&code=${code}`).then((body) => {
            var data = JSON.parse(body);
            access_token = data.access_token; //this is the access token retuned

            //this then uses the access token to gain the users details
            request.get(`https://graph.facebook.com/v2.10/me?fields=id%2Cname%2Cpicture&access_token=${access_token}&redirect_uri=http://localhost:8080/`).then(body => {
                person = JSON.parse(body);

                //SUCCESS CONDITION
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
            console.log(e);
        });
    });
})
