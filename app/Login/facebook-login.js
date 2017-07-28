'facebookAuth' : {
    'clientID' : '123',
    'clientSecret' : '123',
    'callbackURL' : 'http://localhost:8080/facebookSuccess'
}

module.exports = (app, querystring) => {

    app.get("/facebookLogin", (req, res) => {
        res.redirect('https://www.facebook.com/v2.10/dialog/oauth?client_id=${facebookAuth.clientID}&redirect_uri=${facebookAuth.callbackURL}');
    });

}
