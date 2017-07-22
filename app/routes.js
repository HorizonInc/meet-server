module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("landing");
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });
}
