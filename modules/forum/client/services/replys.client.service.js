// Sections service used to communicate Sections REST endpoints
(function () {
    'use strict';

    angular
        .module('app.forum')
        .factory('ReplysService', ReplysService);

    ReplysService.$inject = ['$resource'];

    function ReplysService($resource) {
        return $resource('api/replys/:replyId', {
            replyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
}());
