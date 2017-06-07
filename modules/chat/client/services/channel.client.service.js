(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('app.chat')
        .factory('ConversationsService', ConversationsService);

    ConversationsService.$inject = ['$resource', 'Authentication'];

    function ConversationsService($resource, Authentication) {
        var user = {};
        var local = 'https://localhost\\:3434';
        if (Authentication.user){
            user = Authentication.user;
        }
        var Conversations = $resource(local+'/conversations', {}, {
            update: {
                method: 'POST',
                header:{
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            getMessages:{
                method: 'GET',
                url: 'https://localhost\\:3434/conversations/:name/users',
                params:{
                    name: '@name'
                },
                header:{
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            addUser:{
                method: 'POST',
                url: 'https://localhost\\:3434/conversations/:name/users',
                params:{
                    name: '@name'
                },
                header:{
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            removeUser: {
                method: 'DELETE',
                url: 'https://localhost\\:3434/conversations/:name/users',
                params:{
                    name: '@name'
                },
                header:{
                    'Auth': user.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });

        angular.extend(Conversations, {

            addUserToConversation: function (conversation) {
                return this.addUser(conversation).$promise;
            },
            removeFromConversation: function (conversation) {
                return this.removeUser(conversation).$promise;
            }
        });

        return Conversations;
    }
}());
