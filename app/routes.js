module.exports = (app, client) => {

    var name;

    app.get("/", (req, res) => {
        if(req.session.key) {
            client.hget(`Meet:LocalUser:${req.session.key}`, "first_name", (err, data) => {
                name = data;
                res.render("index", {
                    name: name
                });
            });
        } else if(!req.session.key) {
            res.render("landing");
        }
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/register", (req, res) => {
        res.render("register", {
            errors: null
        });
    });

    app.get("/indextest", (req, res) => {
        res.render("index", {
            name: "test_profile"
        });
    });

    app.get("/maptest", (req, res) => {
        res.render("index" {
            name: "test_profile"
        });
    });

    //app.get("/search", (req, res) => {
    //    client.exists(`Meet:User:${req.body.username}`, (err, data) => {
    //        if(err) {
    //            console.log(err);
    //        } else {
    //            if(reply == 0) {
    //                res.render("search", {
    //                    exists: "doesn't exist"
    //                });
    //            } else if("reply")
    //        }
    //    });
//})//;
}
