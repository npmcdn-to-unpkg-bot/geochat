"use strict";

var express = require('express');
var router = express.Router();
var UserService = require('../dal/userdal');

router.post('/login', (req, res, next) => {
  var user = new UserService();
  //to-do validation of incoming data
  var loginInfo = {
                    email: req.body.email, password: req.body.password
                  };

  user.Login(loginInfo, (result) => {
                    res.send(result);
                });
});

router.post('/create', (req, res, next) => {
  var user = new UserService();
  //to-do validation of incoming data
  var userInfo = {
                    firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email,
                    password: req.body.password, address: req.body.address
                  };

  user.Register(userInfo, (result) => {
                    res.send(result);
                });
});

module.exports = router;
