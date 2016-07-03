"use strict";

var express = require('express');
var router = express.Router();
var UserService = require('../dal/userdal');

router.post('/', (req, res, next) => {
  var user = new UserService();

  user.FetchAllUsers((users) => {
      res.status(200).send(users);
  });

});

router.post('/search', (req, res, next) => {

  var user = new UserService();

  user.Search(req.body.searchtext, (users) => {
      res.status(200).send(users);
  });

});

module.exports = router;
