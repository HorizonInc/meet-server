module.exports = (app) => {

    app.get('/', (req, res) => {
        res.redirect('/login');
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

}
