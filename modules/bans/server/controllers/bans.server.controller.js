'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Ban = mongoose.model('Ban'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Ban
 */
exports.create = function(req, res) {
    var ban = new Ban(req.body);
    ban.user = req.user;

    ban.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ban);
        }
    });
};

/**
 * Show the current Ban
 */
exports.read = function(req, res) {
    res.json(req.ban);
};

/**
 * Update a Ban
 */
exports.update = function(req, res) {
    var ban = req.ban;

    ban = _.extend(ban, req.body);

    ban.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ban);
        }
    });
};

/**
 * Delete an Ban
 */
exports.delete = function(req, res) {
    var ban = req.ban;

    ban.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(ban);
        }
    });
};

/**
 * List of Bans
 */
exports.list = function(req, res) {
    Ban.find().sort('-created').populate('user', 'username').exec(function(err, bans) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(bans);
        }
    });
};

/**
 * Ban middleware
 */
exports.banByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Ban is invalid'
        });
    }

    Ban.findById(id).populate('user', 'username').exec(function (err, ban) {
        if (err) {
            return next(err);
        } else if (!ban) {
            return res.status(404).send({
                message: 'No Ban with that identifier has been found'
            });
        }
        req.ban = ban;
        next();
    });
};
