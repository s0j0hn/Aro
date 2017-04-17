'use strict';

/**
 * Module dependencies
 */
var Acl = require('acl');
var jwt = require('jsonwebtoken');

// Using the memory backend
Acl = new Acl(new Acl.memoryBackend());

/**
 * Invoke Bans Permissions
 */
exports.invokeRolesPolicies = function () {
    Acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/bans',
            permissions: '*'
        }, {
            resources: '/api/bans/:banId',
            permissions: '*'
        }]
    }]);
};

/**
 * Check If Bans Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var token = req.header('loginToken') ? token: false;

    if (token) {
        jwt.verify(token, 'Test123456', function (err, decoded) {
            if (err || decoded === undefined) {
                req.user = null;
            } else {
                req.user = decoded;
            }

        });
    }
    // if (user !== undefined || user !== null){
    //     var decodedUser = jwt.decode(user, 'Test123456');
    //     if (decodedUser._id){
    //         req.user = decodedUser;
    //     }
    // }

    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an Ban is being processed and the current user created it then allow any manipulation
    if (req.ban && req.user && req.ban.user && req.ban.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    Acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });

};
