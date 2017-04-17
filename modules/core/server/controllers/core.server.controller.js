'use strict';
var ipaddr = require('ipaddr.js'),
    iplib = require('ip'),
    mongoose = require('mongoose'),
    Ban = mongoose.model('Ban');

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
                user: req.user || null
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
