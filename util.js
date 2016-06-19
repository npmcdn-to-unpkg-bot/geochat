"use strict";

var uuid = require('node-uuid');

var Util = function () {
  return {
            GenerateAuthToken: function () {
              return uuid.v4();
            }
  };
}();

module.exports = Util;
