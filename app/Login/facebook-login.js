const facebookAuth = {
    'clientID' : '12',
    'clientSecret' : '67',
    'callbackURL' : 'http://localhost:8080/fbCode'
}

module.exports = (app) => {
    const querystring = require('querystring');
    const request = require('request');

    app.get("/fbLogin", (req, res) => {
        res.redirect(`https://www.facebook.com/v2.10/dialog/oauth?` +
                     `client_id=${facebookAuth.clientID}` +
                     `&redirect_uri=${facebookAuth.callbackURL}`);
    });

    app.get("/fbCode", (req, res) => {
        var code = req.query.code;
        var err = req.query.error;
        var errdesc = req.query.error_description;
        var access_token;
        var person;

        if(access_token == undefined) {
            if(err != undefined) {
                console.log("There was an error logging in with facebook: " + err + " " + errdesc);
            } else if(err ="undefined") {
                request.get(`https://graph.facebook.com/v2.10/oauth/access_token?` +
                            `redirect_uri=${facebookAuth.callbackURL}` +
                            `&client_id=${facebookAuth.clientID}` +
                            `&client_secret=${facebookAuth.clientSecret}` +
                            `&code=${code}`, (err, res, body) => {
                                console.log(body);
                                var data = JSON.parse(body);
                                access_token = data.access_token;
                                request.get(`https://graph.facebook.com/v2.10/me?` +
                                            `fields=id%2Cname%2Cpicture%2Cemail` +
                                            `&access_token=${access_token}`+
                                            `&redirect_uri=http://localhost:8080/`, (err, res, body) => {
                                                person = JSON.parse(body);
                                                console.log("welcome, " + person.name);
                                                console.log(body);
                                            });
                            });
            }
        }


    });
}
