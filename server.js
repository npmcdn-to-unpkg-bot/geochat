"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var logs = require('./logconfig');
var session = require('./routes/session');

mongoose.connect(config.db.mongodb, (err) => {
  //to-do, re-factor it. App should react accordingly, when Mongo is up/down
  if (err) {
    console.error(err);
    logs.info(err);
    //don't exit node.js. Keep running it
    //process.exit();
  }
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/session', session);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});

app.listen(config.server.port, function () {
  logs.info("Server is runnning on " + config.server.port);
  console.log("Server is runnning on " + config.server.port);
});

module.exports = app;
