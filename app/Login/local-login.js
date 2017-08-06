module.exports = (app) => {
    const client = require("../db.js")();
    const sha256 = require("js-sha256");

    app.post("/signup", (req, res) => {
        client.exists(`Meet:LocalUser:${req.body.username}`, (err, reply) => {
            console.log
            if(err) {
                console.log("There has been an error in making sure that the username is unique: " + err);
            } else if(!err) {
                if(reply == 1) {
                    res.send("Sorry that username already exists, please choose another.");
                    //setTimeout((req, res) => {
                    //    res.redirect("/register");
                    //}, 1000);
                } else if(reply == 0) {
                    var username = req.body.username;
                    var password = sha256(req.body.password);
                    var first_name = req.body.first_name;
                    var last_name = req.body.last_name;
                    var email = req.body.email;

                    client.hmset("Meet:LocalUser:" + username, [
                        "username", username,
                        "password", password,
                        "first_name", first_name,
                        "last_name", last_name,
                        "email", email
                    ], (err, reply) => {
                        if(err != undefined) {
                            console.log("An error occured during registration: " + err);
                        } else {
                            console.log(reply);
                            res.redirect("/registrationSuccess");
                        }
                    });
                }
            }
        });
    });


    var passwordStored;

    app.post("/loginAccount", (req, res) => {
            var username = req.body.username;
            var password = sha256(req.body.password);

            client.exists(`Meet:LocalUser:${username}`, (err, reply) => {
                if(err) {
                    console.log("There has been an error in making sure the entered username exists: " + err);
                } else if(!err) {
                    if(reply == 1) {
                        var key = "Meet:LocalUser:" + username;

                        client.hget(key, "password", (err, data) => {
                            if(err != undefined) {
                                console.log("There was an error : " + err);
                            } else {
                                passwordStored = data;

                                if(passwordStored == password) {
                                    //res.render("loggedIn"); //do what happens when a login is successful
                                    req.session.key = username;
                                    res.send("Welcome " + username);
                                    console.log("Welcome" + username);
                                } else {
                                    res.send("That username and password combination is not valid");
                                }
                           }
                        });
                    } else if(reply == 0) {
                        res.send("That username does not exist");
                    }
                }
            });
    });

    app.get("/logout", (req, res) => {
        req.session.destroy((err) => {
            if(err)
                console.log(err);
            else
                res.redirect("/");
        });
    });
}
