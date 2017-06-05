'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
    var defaultRoom = 'Staff';
    var rooms = [
        {
            id: 1,
            name: 'General',
            icon: 'fa-clock-o'
        },
        {
            id: 2,
            name: 'Staff',
            icon: 'fa-clock-o'
        }];
    //Emit the rooms array
    socket.emit('setup', {
        rooms: rooms
    });

    socket.on('quitRoom', function(data) {
        socket.leave(data.room);
        io.in(data.room).emit('userLeft', {
            type: 'status',
            text: 'left this Channel',
            room: data.room,
            created: Date.now(),
            profileImageURL: socket.request.user.profileImageURL,
            username: socket.request.user.username
        });
    });

    socket.on('joinRoom', function(data) {
        socket.join(data.room);
        io.in(data.room).emit('userJoined', {
            type: 'status',
            text: 'just joined',
            room: data.room,
            created: Date.now(),
            profileImageURL: socket.request.user.profileImageURL,
            username: socket.request.user.username
        });

    });

    socket.on('newMessage', function (message) {
        message.type = 'message';
        message.created = Date.now();
        message.profileImageURL = socket.request.user.profileImageURL;
        message.username = socket.request.user.username;

        // Emit the 'chatMessage' event
        io.in(message.room).emit('newMessage', message);
    });


    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function () {
        io.in(rooms).emit('newMessage', {
            type: 'status',
            room: defaultRoom,
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};
