'use strict';


angular.module('app.chat').factory('ChannelsService', ['$resource',
    function ($resource){
        return $resource('/api/channels/:channelId', {
            channelId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
