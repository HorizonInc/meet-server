const facebookAuth = {
    'clientID' : '129',
    'clientSecret' : '//',
    'callbackURL' : 'http://localhost:8080/fbCode',
}

module.exports = (app) => {
    const querystring = require('querystring');
    const request = require('request');

    app.get("/fbLogin", (req, res) => {
        res.redirect(`https://www.facebook.com/v2.10/dialog/oauth?` +
                     `client_id=${facebookAuth.clientID}` +
                     `&redirect_uri=${facebookAuth.callbackURL}`);
    });

    var access_token;

    app.get("/fbCode", (req, res) => {
        var code = req.query.code;
        var err = req.query.error;
        var errdesc = req.query.error_description;

            if(err != undefined) {
                console.log("There was an error logging in with facebook: " + err + " " + errdesc);
            } else if(err ="undefined") {
                request.get(`https://graph.facebook.com/v2.10/oauth/access_token?` +
                            `redirect_uri=${facebookAuth.callbackURL}` +
                            `&client_id=${facebookAuth.clientID}` +
                            `&client_secret=${facebookAuth.clientSecret}` +
                            `&code=${code}`, (err, res, body) => {
                                var data = JSON.parse(body);
                                access_token = data.access_token;
                                request.get(`https://graph.facebook.com/v2.10/me?` +
                                            `fields=id%2Cname` +
                                            `&access_token=${access_token}`, (err, res, body) => {
                                                var person = JSON.parse(body);
                                            });
                            });
            }
    });
}
