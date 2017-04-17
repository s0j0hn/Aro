'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Vote = mongoose.model('Vote'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Vote
 */
exports.create = function(req, res) {
  var vote = new Vote(req.body);
  vote.user = req.user;

  vote.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(vote);
    }
  });
};

/**
 * Show the current Vote
 */
exports.read = function(req, res) {
  res.json(req.vote);
};

/**
 * Update a Vote
 */
exports.update = function(req, res) {
  var vote = req.vote;
  var isCurrentUserOwnerOrAdmin = !!(req.user && vote.user && vote.user._id.toString() === req.user._id.toString() || req.user.roles.indexOf('admin') >= 0);
  
  vote = _.extend(vote, req.body);

  vote.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (isCurrentUserOwnerOrAdmin){
      res.json(vote);
    } else {
      res.json(vote);
    }
  });
};

/**
 * Delete an Vote
 */
exports.delete = function(req, res) {
  var vote = req.vote;
  var isCurrentUserOwnerOrAdmin = !!(req.user && vote.user && vote.user._id.toString() === req.user._id.toString() || req.user.roles.indexOf('admin') >= 0);

  vote.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else if (isCurrentUserOwnerOrAdmin){
        res.json(vote);  
    } else {
      res.json(vote);
    }
  });
};

/**
 * List of Votes
 */
exports.list = function(req, res) {
  var id = req.query.voteId;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
          message: 'RecruitId is invalid'
      });
  }
  
  Vote.find({'recruit': mongoose.Types.ObjectId(id)}).sort('-created').populate('user', 'username profileImageURL created roles').exec(function(err, votes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(votes);
    }
  });
};

/**
 * Vote middleware
 */
exports.voteByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Vote is invalid'
    });
  }

  Vote.findById(id).populate('user', 'username profileImageURL created roles').exec(function (err, vote) {
    if (err) {
      return next(err);
    } else if (!vote) {
      return res.status(404).send({
        message: 'No Vote with that identifier has been found'
      });
    }
    req.vote = vote;
    next();
  });
};
