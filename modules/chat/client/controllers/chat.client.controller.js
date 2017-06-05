'use strict';

// Create the 'app.chat' controller
angular.module('app.chat').controller('ChatController', ['$scope','Menus', '$location', 'Authentication', 'Socket','$stateParams',
    function ($scope, Menus, $location, Authentication, Socket, $stateParams) {
        $scope.isValid = function(text){
          var isImgLink = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
            return isImgLink.test(text);
        };


        $scope.authentication = Authentication;
        // Create a messages array
        $scope.messages = [];
        $scope.channels = [];
        $scope.userChannels = $scope.authentication.user.channels;
        $scope.actualChannel = '';
        // Menus.addSubMenuItem('sidebar', 'app.chat.channels', {title: 'Add channel', state:'app.chat.channels.list', roles: ['user']});

        // Make sure the Socket is connected
        if (!Socket.socket) {
            Socket.connect();
        }

        Socket.on('setup', function (data) {
            $scope.channels = data.rooms;
            Socket.emit('joinRoom', {
                room: data.rooms[0].name
            });
            $scope.actualChannel = data.rooms[0];

            // for (var i = 0; i < $scope.channels.length; i++){
            //     Menus.addSubMenuItem('sidebar', 'app.chat.channels', {title: $scope.channels[i].name, type:'dropdown', state:'app.channels.users', roles: ['*']});
            // }
        });
        // Add an event listener to the 'chatMessage' event
        Socket.on('newMessage', function (message) {
            $scope.messages.unshift(message);
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
                room: $scope.actualChannel.name
            };

            // Emit a 'chatMessage' message event
            Socket.emit('newMessage', message);

            // Clear the message text
            this.messageText = '';
        };

        $scope.quitRoom = function (channel) {
            $scope.actualChannel = channel;
            Socket.emit('quitRoom', {
                room: channel.name,
            });
        };

        $scope.joinRoom = function (channel) {
            $scope.actualChannel = channel;
            Socket.emit('joinRoom', {
                room: channel.name,
            });

        };

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function () {
            Socket.removeListener('newMessage');
        });
    }
]);
