'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

    socket.on('userKicked', function(data) {
        socket.leave(data.room);
        io.in(data.room).emit('userLeft', {
            type: 'status',
            text: 'kicked from this Channel by' + data.user.username,
            room: data.room,
            created: Date.now(),
            profileImageURL: data.user.profileImageURL,
            username: data.user.username
        });
    });

    socket.on('getClients', function (data) {
        var clients = io.sockets.clients(data.room);
    });

    socket.on('quitRoom', function(data) {
        socket.leave(data.room);
        io.in(data.room).emit('userLeft', {
            type: 'status',
            text: 'left this Channel',
            room: data.room,
            created: Date.now(),
            profileImageURL: data.user.profileImageURL,
            username: data.user.username
        });
    });

    socket.on('getSetup', function(data) {
        socket.join(data.room);
        io.in(data.room).emit('userJoined', {
            type: 'status',
            text: 'just joined',
            room: data.room,
            created: Date.now(),
            profileImageURL: data.user.profileImageURL,
            username: data.user.username
        });
        socket.emit('clientInfo',{
            ip: socket.request.connection.remoteAddress

        });
    });

    socket.on('joinRoom', function(data) {
        socket.join(data.room);
        io.in(data.room).emit('userJoined', {
            type: 'status',
            text: 'just joined',
            room: data.room,
            created: Date.now(),
            profileImageURL: data.user.profileImageURL,
            username: data.user.username
        });

    });

    socket.on('newMessage', function (message) {
        message.type = 'message';
        message.created = Date.now();
        message.profileImageURL = message.user.profileImageURL;
        message.username = message.user.username;

        // Emit the 'chatMessage' event
        io.in(message.room).emit('newMessage', message);
    });


    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function (username) {
        socket.broadcast.emit('broadcast', {
            type: 'disconnect'
        });
    });
};
