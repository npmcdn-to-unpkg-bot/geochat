"use strict";

var express = require('express');
var validator = require('validator');
var router = express.Router();
var apperror = require('../app-error');
var UserService = require('../dal/userdal');

router.post('/login', (req, res, next) => {
  if (!req.body.email.IsValidInput() || !req.body.password.IsValidInput()) {
      res.status(200).send({ "isError": true, "error": apperror.invalid_inputs_provided });
  }
  else if (!validator.isEmail(req.body.email)) {
      res.status(200).send({ "isError": true, "error": apperror.invalid_email_format });
  }
  else {
    var user = new UserService();
    var loginInfo = {
                      email: req.body.email, password: req.body.password
                    };

    user.Login(loginInfo, (result) => {
        res.status(200).send(result);
    });

  }
});

router.post('/create', (req, res, next) => {
  if (!req.body.firstname.IsValidInput() || !req.body.lastname.IsValidInput() ||
      !req.body.email.IsValidInput() || !req.body.password.IsValidInput()) {
      res.status(200).send({ "isError": true, "error": apperror.invalid_inputs_provided });
  }
  else if (!validator.isEmail(req.body.email)) {
      res.status(200).send({ "isError": true, "error": apperror.invalid_email_format });
  }
  else {
    var user = new UserService();
    var userInfo = {
                      firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email,
                      password: req.body.password, address: req.body.address
                    };

    user.Register(userInfo, (result) => {
        res.status(200).send(result);
    });
  }
});

module.exports = router;
