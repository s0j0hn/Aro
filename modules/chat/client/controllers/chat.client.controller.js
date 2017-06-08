'use strict';

// Create the 'app.chat' controller
angular.module('app.chat').controller('ChatController',
    ['$scope','Menus', '$location', 'Authentication', 'Socket','ConversationsService','UsersService','$filter','$sce','$state',
    function ($scope, Menus, $location, Authentication, Socket, ConversationsService, UsersService, $filter, $sce, $state) {
        $scope.isValid = function(text){
          var isImgLink = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
            return isImgLink.test(text);
        };


        $scope.getconversations = getconversations;
        $scope.authentication = Authentication;
        $scope.messages = [];
        $scope.usersConnected = Socket.connected;
        $scope.channels = [{ id: 1, name: 'General'},{ id: 2, name: 'Staff'}];
        $scope.usersChannel = [
            {id: 1, username:'Jan', status: 'online', room: 'General'},
            {id: 2, username:'Julien', status: 'offline', room: 'Staff'},
            {id: 3, username:'Quentin', status: 'absent', room: 'General'},
            {id: 4, username:'Victor', status: 'online', room: 'Staff'}
        ];
        $scope.actualChannel = { id: 1, name: 'General'};
        $scope.socketClient = {};
        $scope.trustedHtml = function (plainText) {
            return $sce.trustAsHtml(plainText);
        };

        if ($scope.authentication.user) {
            $state.go('app.home');
        }

        setup();
        function getconversations() {
            UsersService.getconversations()
                .then()
                .catch();
        }

        // Make sure the Socket is connected
        if (!Socket.socket) {
            Socket.connect();
        }


        function setup() {
            Socket.emit('getSetup', {
                room: $scope.actualChannel.name,
                user: {
                    token: $scope.authentication.user.token,
                    username: $scope.authentication.user.username,
                    password: $scope.authentication.user.password
                }
            });
        }

        Socket.on('newMessage', function (message) {
            $scope.messages.unshift(message);
        });

        Socket.on('clientInfo', function (data) {
            $scope.socketClient.ip = data.ip;
        });

        Socket.on('clients', function (data) {
            $scope.socketClients = data.clients;
        });

        Socket.on('userLeft', function (message) {
            $scope.messages.unshift(message);
        });

        Socket.on('userJoined', function (message) {
            $scope.messages.unshift(message);
        });

        // Create a controller method for sending messages
        $scope.sendMessage = function () {
            // Create a new message object
            var message = {
                text: this.messageText,
                room: $scope.actualChannel.name,
                user: {
                    token: $scope.authentication.user.token,
                    username: $scope.authentication.user.username,
                    profileImageURL: $scope.authentication.user.profileImageURL
                }
            };

            // Emit a 'chatMessage' message event
            Socket.emit('newMessage', message);

            // Clear the message text
            this.messageText = '';
        };

        $scope.quitRoom = function (channel) {
            $scope.actualChannel = '';
            var index = $scope.channels.map(function (item) {
                return item.id;
            }).indexOf(channel.id);
            $scope.channels.splice(index, 1);
            Socket.emit('quitRoom', {
                room: channel.name,
                user: {
                    token: $scope.authentication.user.token,
                    username: $scope.authentication.user.username,
                    password: $scope.authentication.user.password,
                    profileImageURL: $scope.authentication.user.profileImageURL
                }
            });
        };

        $scope.joinRoom = function (channel) {
            if(channel !== $scope.actualChannel){
                $scope.actualChannel = channel;
                Socket.emit('joinRoom', {
                    room: channel.name,
                    user: {
                        token: $scope.authentication.user.token,
                        username: $scope.authentication.user.username,
                        password: $scope.authentication.user.password,
                        profileImageURL: $scope.authentication.user.profileImageURL

                    }
                });
            }
        };

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function () {
            Socket.removeListener('newMessage');
            Socket.emit('disconected', $scope.authentication.username);
        });
    }
]);
