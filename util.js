"use strict";

var uuid = require('node-uuid');
var crypto = require('crypto');
var NodeGeocoder = require('node-geocoder');

var secret = "I@Love@NNNode.JS";

var options = {
  provider: 'google',

  httpAdapter: 'https',
  apiKey: 'AIzaSyBF9xb6TLxfTEji1O4UqL7rwZc16fQRctA',
  formatter: null
};

var Util = function () {
  return {
            GenerateAuthToken: function () {
              return uuid.v4();
            },
            Encrypt: function (strToEncrypt) {
              return crypto.createHmac('sha256', secret)
                   .update(strToEncrypt)
                   .digest('hex');
            },
            getLatLon: function (address, callback) {
              var geocoder = NodeGeocoder(options);
              geocoder.geocode(address, function(err, res) {
                if (err) {
                  callback(err.message, null)
                }
                else {
                  callback(null, {"lat": res[0].latitude, "lon": res[0].longitude});
                }
              });
            }
  };
}();

module.exports = Util;
