const facebookAuth = {
    'clientID' : '129564380981950',
    'clientSecret' : '18e28b0e8693fab6132a4771fc5da22a',
    'callbackURL' : 'http://localhost:8080/fbCode'
}

module.exports = (app) => {
    const querystring = require('querystring');
    const request = require('request-promise');

    app.get("/fbLogin", (req, res) => {
        res.redirect(`https://www.facebook.com/v2.10/dialog/oauth?` +
                     `client_id=${facebookAuth.clientID}` +
                     `&redirect_uri=${facebookAuth.callbackURL}`);
    });


    // 1: exchange the code for a user access_token
    // 2: query the graph api for an app access_token
    // 3: query the graph api to validate the user access_token and if valid get the user id
    // 4: query the graph api to get the user details 

    var access_token, app_access_token;

    app.get("/fbCode", (req, response) => {
        var code = req.query.code;
        var err = req.query.error;
        var errdesc = req.query.error_description;

        if(err != undefined) {
            console.log("There was an error logging in with facebook: " + err + " " + errdesc);
        } else if(err ="undefined") {
            request.get(`https://graph.facebook.com/v2.30/oauth/access_token?` +
                        `redirect_uri=${facebookAuth.callbackURL}` +
                        `&client_id=${facebookAuth.clientID}` +
                        `&client_secret=${facebookAuth.clientSecret}` +
                        `&code=${code}`)
            .then((body) => {
                access_token = body.access_token;
                request.get(`https://graph.facebook.com/v2.30/oauth/access_token` +
                            `?client_id=${facebookAuth.clientID}` +
                            `&client_secret=${facebookAuth.clientSecret}` +
                            `&redirect_uri=http://localhost:8080/fbAccess` +
                            `&grant_type=client_credentials`)
                .then((body) => {
                    app_access_token = body.access_token;
                }).catch((err) => {
                    console.log("There was an error" + err);
                })
            });
        }
    });

    app.get("/fbAccess", (req, res) => {
        console.log("app_access: " + app_access_token);
        console.log("access_token: " + access_token);
        request.get(`https://graph.facebook.com/debug_token?` +
                    `input_token=${access_token}` +
                    `&access_token=${app_access_token}`, (err, response, body) => {
                        console.log("3: " + body);
                    });
    });
}
