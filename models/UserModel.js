"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    firstname:  {
        type:String,
        required: true,
    },
    lastname: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password:  {
        type:String,
        required: true,
    },
    active: Boolean,
    address: Schema.Types.Mixed,
    authtoken: {
      type: String,
    },
    authtokenexpiration: {
      type: Date,
    },
    latitude: String,
    longitude: String,
},{strict: true}));
