module.exports = (app) => {
    const client = require("../db.js")();
    const sha256 = require("js-sha256");

    app.post("/signup", (req, res) => {
        var check = client.exists(req.body.username);

        if(check == 0) {
            res.send("sorry that name already exists");
          //res.render("exists", {
            //  name : req.body.username
         // });
        } else if(check == 1) {
           var username = req.body.username;
           var password = sha256(req.body.password);
           var first_name = req.body.first_name;
           var last_name = req.body.last_name;
           var email = req.body.email;

           client.hmset("Meet:User:" + username, [
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
    });


    app.post("/loginAccount", (req, res) => {
        var username = req.body.username;
        var password = sha256(req.body.password);

        if(client.exists("Meet:User:" + username) == 0) {
            res.render("invalid");
        } else if(client.exists("Meet:User:" + username) == 1) {
            var passwordStored = client.hget("Meet:User:" + username, password);

            if(passwordStored == password) {
              //res.render("loggedIn"); //do what happens when a login is successful
              res.send("Welcome" + username);
              console.log("Welcome" + username);
            }
        }
    });
}
