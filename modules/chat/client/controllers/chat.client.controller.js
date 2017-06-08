'use strict';

// Create the 'app.chat' controller
angular.module('app.chat').controller('ChatController',
    ['$scope','Menus', '$location', 'Authentication', 'Socket','ConversationsService','UsersService','$filter',
    function ($scope, Menus, $location, Authentication, Socket, ConversationsService, UsersService, $filter) {
        $scope.isValid = function(text){
          var isImgLink = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
            return isImgLink.test(text);
        };

        $scope.getconversations = getconversations;
        $scope.authentication = Authentication;
        $scope.messages = [];
        $scope.usersConnected = Socket.connected;
        $scope.channels = [{ id: 1, name: 'General'},{ id: 2, name: 'Staff'}];
        $scope.userChannels = $scope.authentication.user.channels;
        $scope.actualChannel = $scope.channels[0];
        $scope.socketClient = {};

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
                room: $scope.channels[0],
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
            $scope.socketClient = data;
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
