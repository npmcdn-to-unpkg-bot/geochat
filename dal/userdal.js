var UserModel = require('../models/UserModel');
var logs = require('../logconfig');
var util = require('../util');
var configtext = require('../config-text');
var apperror = require('../app-error');
var async = require('async');

var UserService = function () { }

UserService.prototype.Register = function (userInfo, callback) {
  async.waterfall([
                  function GetGeoLocationByAddress(callback) {
                                var latlon = util.getLatLon(userInfo.address.name, function (err, data) {
                                  if (err) {
                                    callback({isError: true, error: "Error in finding geo location. Register failed.", data: []}, null);
                                  }
                                  else {
                                    callback(null, data)
                                  }
                              });
                  },
                  function SaveUser(latlon, callback) {
                    var user = new UserModel();

                    user.firstname  = userInfo.firstname;
                    user.lastname   = userInfo.lastname;
                    user.email      = userInfo.email;
                    user.password   = util.Encrypt(userInfo.password);
                    user.active     = true;
                    user.address    = userInfo.address;
                    user.authtoken  = util.GenerateAuthToken();
                    user.authtokenexpiration = new Date(+new Date() + 7*24*60*60*1000);
                    user.latitude = latlon.lat;
                    user.longitude = latlon.lon;

                    user.save(function(err) {
                      if (err) {
                        if (err.code.toString() === apperror.mongo_duplicate_column_error) {
                            callback({isError: true, error: configtext.email_exists, data: []}, null);
                        }else {
                            callback({isError: true, error: configtext.contact_administrator, data: []}, null);
                        }
                        return;
                      }
                      callback(null, {isError: false, error: "", data: AppError.registration_successfull});
                      return;
                    });
                  }
  ], function(err, result) {
      if (err) {
        callback(err);
      }
      else {
        callback(result);
      }
  });
};

UserService.prototype.Login = function (loginInfo, callback) {
  UserModel.findOne({'email': loginInfo.email, "password": util.Encrypt(loginInfo.password)}, '-authtokenexpiration -__v -email -active -password', function (err, user) {
    if (err) {
      callback({isError: true, error: configtext.contact_administrator, data: []});
    }
      if (user != null) {
        callback({isError: false, error: "", data: user});
      }
      else {
        callback({isError: true, error: apperror.invalid_credentials, data: []});
      }
  })
};

UserService.prototype.FetchAllUsers = function(callback) {
  UserModel.find({}, '-authtoken -password -active -address -authtokenexpiration -__v -email', function (err, users) {
    if (err) {
      callback({isError: true, error: configtext.contact_administrator, data: []});
    }

    if (users.length == 0) {
      callback({isError: true, error: apperror.no_users, data: []});
    }
    else {
      callback({isError: false, error: "", data: users});
    }
  });
}

UserService.prototype.IsValidAuthToken = function (authtoken, userid, callback) {
  UserModel.findOne( {'authtoken': authtoken }, function (err, user) {
    if (err) {
      callback({isError: true, error: configtext.contact_administrator, data: []});
    }
      if (user != null) {
        if (user._id.toString() === userid) {
          callback({isError: false, error: "", data: user});
        }
        else {
          callback({isError: true, error: apperror.invalid_auth_token, data: []});
        }
      }
      else {
        callback({isError: true, error: apperror.invalid_auth_token, data: []});
      }
  });
}

module.exports = UserService;
