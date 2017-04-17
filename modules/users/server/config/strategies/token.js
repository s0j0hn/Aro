'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

var jwt = require('jwt-simple');

module.exports = function () {

    passport.use('local-token', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        function(username, password, done) {

            User.findOne({
                username: username
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user or invalid password'
                    });
                }
                if (!user || !user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid username or password (' + (new Date()).toLocaleTimeString() + ')'
                    });
                }

                // generate login token
                // add token and exp date to user object
                user.loginTokenExpires = Date.now() + (8 * (60 * 60 * 1000)) * 2;
                user.loginToken = jwt.encode(user, 'Test123456');


                // save user object to update database
                user.save(function(err) {
                    if(err){
                        done(err);
                    } else {
                        done(null, user);
                    }
                });
            });
        }
    ));
};
