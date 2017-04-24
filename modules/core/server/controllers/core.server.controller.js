'use strict';
var ipaddr = require('ipaddr.js'),
    iplib = require('ip'),
    mongoose = require('mongoose'),
    validator = require('validator'),
    Ban = mongoose.model('Ban'),
    path = require('path'),
    config = require(path.resolve('./config/config'));

function getIP(req) {
    var ipString = (req.headers['X-Forwarded-For'] ||
        req.headers['x-forwarded-for'] ||
        '').split(',')[0] ||
        req.connection.remoteAddress;

    if (ipaddr.isValid(ipString)) {
        try {
            var addr = ipaddr.parse(ipString);
            if (ipaddr.IPv6.isValid(ipString) && addr.isIPv4MappedAddress()) {
                return addr.toIPv4Address().toString();
            }
            return addr.toNormalizedString();
        } catch (e) {
            return ipString;
        }
    }
    return 'unknown';
}
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
    var ip = getIP(req);
    var banned = false;

    var safeUserObject = null;
    if (req.user) {
        safeUserObject = {
            displayName: validator.escape(req.user.displayName),
            provider: validator.escape(req.user.provider),
            username: validator.escape(req.user.username),
            created: req.user.created.toString(),
            roles: req.user.roles,
            rank : req.user.rank,
            posts : req.user.posts,
            warnings: req.user.warnings,
            ip_address: req.user.ip_address,
            replys: req.user.replys,
            views: req.user.views,
            profileImageURL: req.user.profileImageURL,
            email: validator.escape(req.user.email),
            lastName: validator.escape(req.user.lastName),
            firstName: validator.escape(req.user.firstName),
            additionalProvidersData: req.user.additionalProvidersData
        };
    }

    Ban.find().sort('created').exec(function(err, bans) {
        for (var i = 0; i < bans.length; i++) {
            var ban = bans[i];
            if ( ban.address && iplib.cidrSubnet(ban.address).contains(ip)){
                banned = true;
            }
        }
        if (banned) {
            res.status(422).render('modules/core/server/views/banned', {
                ip: ip
            });
        } else {
            res.render('modules/core/server/views/index', {
                user: JSON.stringify(safeUserObject),
                sharedConfig: JSON.stringify(config.shared)
            });
        }
    });


};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {

  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
