'use strict';

// Configure the 'app.chat' module routes
angular.module('app.chat').config(['$stateProvider',
    function ($stateProvider, helper) {
        $stateProvider
            .state('app.chat', {
                abstract: true,
                url: '/chat',
                template: '<ui-view/>',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('app.chat.view', {
                url: '/view',
                templateUrl: 'modules/chat/client/views/chat.client.view.html',
                controller: 'ChatController',
                data: {
                    roles: ['user', 'admin']
                }

            })
            .state('app.chat.channels', {
                url: '/channels',
                title: 'Channels',
                // controller: 'ChannelsController',
                templateUrl: 'modules/chat/client/views/list-channels.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });
        
        getChannel.$inject = ['$stateParams', 'ChannelsService'];

        function getChannel($stateParams, ChannelsService) {
            return ChannelsService.get({
                channelId: $stateParams.channelId
            }).$promise;
        }

        newChannel.$inject = ['ChannelsService'];

        function newChannel(ChannelsService) {
            return new ChannelsService();
        }
    }
]);
