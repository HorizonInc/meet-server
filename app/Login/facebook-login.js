const facebookAuth = {
    'clientID' : '123',
    'clientSecret' : 'dbe',
    'callbackURL' : 'http://localhost:8080/fbCode'
}

module.exports = (app) => {
    const querystring = require('querystring');

    app.get("/fbLogin", (req, res) => {
        res.redirect(`https://www.facebook.com/v2.30/dialog/oauth?` +
                      `client_id=${facebookAuth.clientID}` +
                      `&redirect_uri=${facebookAuth.callbackURL}`);
    });

    app.get("/fbCode", (req, res) => {
        var code = req.query.code;
        var err = req.query.error;
        var errdesc = req.query.error_description;

        console.log(code);
        console.log(err);

        if(err != undefined) {
            console.log("There was an error loggin in with facebook: " + err + " " + errdesc);
        } else if(err ="undefined") {
            app.get(`https://graph.facebook.com/v2.30/oauth/access_token?
                     client_id=${facebookAuth.clientID}
                     &client_secret=${facebookAuth.clientSecret}
                     &code=${code}`, (req, res) => {
                         console.log(res.body);
                     });
        }


    });

}
