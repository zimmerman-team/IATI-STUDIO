"use strict"

import path from "path"
import fs from "fs"
import express from "express"
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import http from 'http'
import socket_io from "socket.io"
import passportSocketIo from "passport.socketio"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from "passport"
import connect_mongo from "connect-mongo"
import connect_redis from "connect-redis"
import csrf from 'csurf'

import config from "./config/config.js"
import DatabaseContainer from './utils/DatabaseContainer'

import mongoose from "mongoose"
mongoose.Promise = global.Promise; // use ES6 promises

let app = express();
let server = http.Server(app)
let io = socket_io(server)

if (config.env === "development") {
    // start webpack dev server
    require('./dev')(app)

    const MongoStore = connect_mongo(session)
    var sessionStore = new MongoStore(config.sessionStore.mongodb)
} else {
    // TODO: use redis sessions in production - 2016-05-12
    // const RedisStore = connect_redis(session)
    // var sessionStore = new RedisStore(config.sessionStore.redis)

    const MongoStore = connect_mongo(session)
    var sessionStore = new MongoStore(config.sessionStore.mongodb)
}



app.set('view engine', 'jade');
app.set('views', __dirname + '/views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cryptoKey));
// TODO: add cryptoKey 2016-05-02
// app.use(cookieParser(config.cryptoKey));
// TODO: actually save a cryptokey for sessionStore - 2016-04-28
app.use(session({
    secret: config.cryptoKey,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    domain: '.iatistudio.com',
    path: '/'
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(csrf());

//response locals
app.use(function(req, res, next) {
  req.app = app
  // res.cookie('_csrfToken', req.csrfToken());

  // console.log(req.session)
  // console.log(req.csrfToken());
  // console.log(req.csrfToken());

  // req.session.csrfSecret = req.csrfToken()
  // res.locals.token = req.csrfToken()
  // res.locals.token = req.session.csrfSecret

  res.locals.user = {};
  res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  next();
});

//global locals
app.locals.projectName = config.projectName;
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = config.companyName;
app.locals.cacheBreaker = 'br34k-01';

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  secret:       config.cryptoKey,    // change this
  store:        sessionStore,
  success:      onAuthorizeSuccess,
  fail:         onAuthorizeFail,
}));

function onAuthorizeSuccess(data, accept){
  accept();
}

function onAuthorizeFail(data, message, error, accept){
  // see: http://socket.io/docs/client-api/#socket > error-object
  console.error('failed connection to socket.io:', message);

  if(error)
    accept(new Error(message));
}

mongoose.connect(config.database.url)
var connection = mongoose.connection;

// accessible everywhere
global.db = connection
global.config = config
app.io = io
app.db = connection
app.config = config;

// required by drywall...

import sendmail from './auth/util/sendmail'
import slugify from './auth/util/slugify'
import workflow from './auth/util/workflow'
app.utility = {};
app.utility.sendmail = sendmail
app.utility.slugify = slugify
app.utility.workflow = workflow

// TODO: just make these static imports - 2016-05-04

// Authentication-related models
require('./models/auth/Note')(app, mongoose);
require('./models/auth/Status')(app, mongoose);
require('./models/auth/StatusLog')(app, mongoose);
require('./models/auth/Category')(app, mongoose);

//then regular docs
require('./models/auth/User')(app, mongoose);
require('./models/auth/Admin')(app, mongoose);
require('./models/auth/AdminGroup')(app, mongoose);
require('./models/auth/Account')(app, mongoose);
require('./models/auth/LoginAttempt')(app, mongoose);

// console.log(require('mongoose').model('User'));


connection.once('open', function() {

    // TODO: pass these around explicitly instead - 2016-05-10
    DatabaseContainer.setDb(connection.db);
    DatabaseContainer.setIo(io);


    // passport.js authentication configuration
    require('./passport')(app, passport);

    // All main routes
    require('./routes')(app);

    // socket API's
    require('./sockets')(app)


    server.listen(config.port, function() {
        console.info('Server is running on port ' + config.port);
    })
})
