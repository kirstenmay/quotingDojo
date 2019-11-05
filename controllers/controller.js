const mongoose = require('mongoose');
const MongModels = require('../models/quote');

const Quote = MongModels.Quote;

module.exports = {
    homePage: function(req, res) {
        res.render("newQuote")
    },
    addQuote: function(req, res) {
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
    },
    allQuotes: function(req, res) {
        Quote.find().sort({ 'created_at': -1 })
            .then(quotes => {
                res.render("quotes", { q: quotes });
            })
            .catch(err => res.json(err));
    },

}