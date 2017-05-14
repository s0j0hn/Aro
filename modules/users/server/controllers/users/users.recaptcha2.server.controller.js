'use strict';


var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');


exports.verifyRecaptcha = function (req, res) {
    
};
