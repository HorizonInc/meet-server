const facebookAuth = {
    'clientID' : '129564380981950',
    'clientSecret' : '6752d6fd1224544b003cdf4a057a6f68',
    'callbackURL' : 'http://localhost:8080/fbCode'
}

module.exports = (app) => {
    const querystring = require('querystring');
    const request = require('request');
    const client = require('../db.js');

    app.get("/fbLogin", (req, res) => {
        res.redirect(`https://www.facebook.com/v2.10/dialog/oauth?` +
                     `client_id=${facebookAuth.clientID}` +
                     `&redirect_uri=${facebookAuth.callbackURL}`);
    });

    var person, access_token;

    app.get("/fbCode", (req, res) => {
        var code = req.query.code;
        var err = req.query.error;
        var errdesc = req.query.error_description;
        var expiry;

        if(access_token == undefined) {
            if(err != undefined) {
                console.log("There was an error logging in with facebook: " + err + " " + errdesc);
            } else if(err ="undefined") {
                request.get(`https://graph.facebook.com/v2.10/oauth/access_token?` +
                            `redirect_uri=${facebookAuth.callbackURL}` +
                            `&client_id=${facebookAuth.clientID}` +
                            `&client_secret=${facebookAuth.clientSecret}` +
                            `&code=${code}`, (err, body) => {
                                var data = JSON.parse(body);
                                access_token = data.access_token;
                                expiry = data.expires_in;
                                request.get(`https://graph.facebook.com/v2.10/me?` +
                                            `fields=id%2Cname%2Cpicture%2Cemail` +
                                            `&access_token=${access_token}`+
                                            `&redirect_uri=http://localhost:8080/`, (err, body) => {
                                                person = JSON.parse(body);
                                                console.log("welcome, " + person.name);
                                                res.redirect("/username");
                                            });
                            });
            }
        }
    });

    app.get("/username", (req, res) => {
        res.render("username", {
            error: undefined
        });
    });

    app.post("/usernameSelect", (req, res) => {
        var username = req.body.username;
        var account = "facebook";

        client.exists(`Meet:User:${username}`, (err, reply) => {
            if(err) {
                console.log(err);
            } else {
                if(reply == 1) {
                    res.render("username", {
                        error: "This username already exists, please try another"
                    });
                } else if(reply == 0) {
                    client.hmset(`Meet:User:${username}`, [
                        "account", account,
                        "access_token", access_token,
                        "name", person.name,
                        "id", person.id,
                        "expiry", expiry
                    ], (err, reply) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("OK");
                        }
                    });
                }
            }
        });
    });
}
