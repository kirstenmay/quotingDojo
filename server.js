const express = require("express");
const mongoose = require('mongoose');
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
mongoose.connect('mongodb://localhost/quotingDojo', { useNewUrlParser: true });

const routes = require('./config/routes')(app);

app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000"));