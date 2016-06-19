"use strict";

var winston     = require('winston');
var config      = require('./config');

var logger = new (winston.Logger)({
	    transports: [
	      new (winston.transports.File)({ filename: config.log.path })
	    ]
});

exports.info = function(msg){
	logger.info(msg);
}
