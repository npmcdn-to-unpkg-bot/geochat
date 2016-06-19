"use strict";

var UserModel = require('../models/UserModel');
var logs = require('../logconfig');
var util = require('../util');
var configtext = require('../config-text');
var apperror = require('../app-error');

var UserService = function () { }

UserService.prototype.Register = function (userInfo, callback) {
  var user = new UserModel();

  user.firstname  = userInfo.firstname;
  user.lastname   = userInfo.lastname;
  user.email      = userInfo.email;
  user.password   = userInfo.password; //to-do, encrypt password
  user.active     = true;
  user.address    = userInfo.address;
  user.authtoken  = util.GenerateAuthToken();
  user.authtokenexpiration = new Date(+new Date() + 7*24*60*60*1000);

  user.save(function(err) {
    if (err) {
      logs.info(err);
      console.log(err.code);
      if (err.code.toString() === apperror.mongo_duplicate_column_error) {
          callback({isError: true, error: configtext.email_exists, data: []});
      }else {
          callback({isError: true, error: configtext.contact_administrator, data: []});
      }
      return;
    }
    callback({isError: false, error: "", data: user});
    return;
  });

};

UserService.prototype.Login = function (loginInfo, callback) {
  UserModel.findOne({'email': loginInfo.email, "password": loginInfo.password}, function (err, user) {
    if (err) {
      logs.info(err);
      callback({isError: true, error: configtext.contact_administrator, data: []});
    }
    callback({isError: false, error: "", data: user});
  })
};

module.exports = UserService;
