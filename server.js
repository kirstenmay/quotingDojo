const express = require("express");
const app = express();
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingDojo', { useNewUrlParser: true });
const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 5 },
    created_at: Date
})
const Quote = mongoose.model('Quote', QuoteSchema);
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));

app.get('/', (req, res) => {
    res.render("newQuote");
});

app.post('/add', (req, res) => {
    const quote = req.body;
    Quote.create(quote)
        .then(newQuote => {
            newQuote.name = req.body.name;
            newQuote.quote = req.body.quote;
            newQuote.created_at = new Date(Date.now());
            console.log(newQuote.created_at);
            newQuote.save();
            res.redirect("/quotes");
        })
        .catch(err => {
            for (var key in err.errors) {
                console.log("We have an error!", err);
                req.flash('name', err.errors[key].message);
                req.flash('quote', err.errors[key].message);
            }
            res.redirect('/');
        });
});

app.get('/quotes', (req, res) => {
    Quote.find().sort({ 'created_at': -1 })
        .then(quotes => {
            res.render("quotes", { q: quotes });
        })
        .catch(err => res.json(err));
});