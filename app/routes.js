module.exports = (app, client) => {

    var name;

    app.get("/", (req, res) => {
        if(req.session.key) {
            client.hget(`Meet:LocalUser:${req.session.key}`, "first_name", (err, data, res) => {
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
        res.render("register");
    });

    app.get("/indextest", (req, res) => {
        res.render("index", {
            name: "test_profile"
        });
    });
}
