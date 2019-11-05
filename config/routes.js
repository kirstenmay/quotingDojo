const controller = require('../controllers/controller');

module.exports = app => {
    app.get('/', controller.homePage);
    app.post('/add', controller.addQuote);
    app.get('/quotes', controller.allQuotes);
}