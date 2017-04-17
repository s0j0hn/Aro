'use strict';

/**
 * Module dependencies
 */
var replysPolicy = require('../policies/replys.server.policy'),
    replys = require('../controllers/replys.server.controller');

module.exports = function(app) {
    // replys Routes
    app.route('/api/replys').all(replysPolicy.isAllowed)
        .get(replys.list)
        .post(replys.create);

    app.route('/api/replys/:replyId').all(replysPolicy.isAllowed)
        .get(replys.read)
        .put(replys.update)
        .delete(replys.delete);

    // Finish by binding the reply middleware
    app.param('replyId', replys.replyByID);
};
