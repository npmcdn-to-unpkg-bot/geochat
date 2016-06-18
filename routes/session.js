var express = require('express');
var router = express.Router();
var UserService = require('../dal/userdal');

router.post('/login', function(req, res, next) {
  var user = new UserService();
  //to-do validation of incoming data
  var loginInfo = {
                    email: req.body.email, password: req.body.password
                  };

  user.Login(loginInfo, function(result) {
                    res.send(result);
                });
});

router.post('/create', function(req, res, next) {
  var user = new UserService();
  //to-do validation of incoming data
  var userInfo = {
                    firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email,
                    password: req.body.password, address: req.body.address
                  };

  user.Register(userInfo, function(result) {
                    res.send(result);
                });
});

module.exports = router;
