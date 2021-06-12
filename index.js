const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('./config/passport');

require('dotenv').config({ path: 'variables.env' });

const app = express();
app.use(express.urlencoded({
  extended: true
}));

//app.use(expressValidator());

app.engine('handlebars', exphbs({
  defaultLayout: 'layout',
  helpers: require('./helpers/handlebars')
}));
app.set('view engine', 'handlebars');

app.use(express.static('./public'));

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE,
    useUnifiedTopology: true,
  }),
  /*
  store: new MongoStore({
    mongoUrl: process.env.DATABASE,
    mongoOptions: { useUnifiedTopology: true }
  }),
  */
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.mensajes = req.flash();
  next();
});

app.use('/', router());

app.listen(process.env.PORT);