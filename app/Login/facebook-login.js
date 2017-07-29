const facebookAuth = {
    'clientID' : '129564380981950',
    'clientSecret' : '18e28b0e8693fab6132a4771fc5da22a',
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

        //console.log(code);
        //console.log(err);

        //console.log(facebookAuth.clientID);
        //console.log(facebookAuth.clientSecret);

        if(err != undefined) {
            console.log("There was an error logging in with facebook: " + err + " " + errdesc);
        } else if(err ="undefined") {
              request.get(`https://graph.facebook.com/v2.10/oauth/access_token?
                           &redirect_uri=http://localhost:8080/
                           &client_id=${facebookAuth.clientID}
                           &client_secret=${facebookAuth.clientSecret}
                           &code=${code}`, (err, res, body) => {
                               console.log(body);
                               access_token = body.access_token;
                           });
        }


    });

}
