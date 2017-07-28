module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("landing");
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

    app.get("/facebookLogin", (req, res) => {
        res.redirect("")
    });
}
