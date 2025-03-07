'use strict';

// Load the module dependencies
var config = require('../config'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    socketio = require('socket.io'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

// Define the Socket.io configuration method
module.exports = function (app, db) {
    var server;
    if (config.secure && config.secure.ssl === true) {
        // Load SSL key and certificate
        var privateKey = fs.readFileSync(path.resolve(config.secure.privateKey), 'utf8');
        var certificate = fs.readFileSync(path.resolve(config.secure.certificate), 'utf8');
        var caBundle;

        try {
            caBundle = fs.readFileSync(path.resolve(config.secure.caBundle), 'utf8');
        } catch (err) {
            console.log('Warning: couldn\'t find or read caBundle file');
        }

        var options = {
            key: privateKey,
            cert: certificate,
            ca: caBundle,
            //  requestCert : true,
            //  rejectUnauthorized : true,
            secureProtocol: 'TLSv1_method',
            ciphers: [
                'ECDHE-RSA-AES128-GCM-SHA256',
                'ECDHE-ECDSA-AES128-GCM-SHA256',
                'ECDHE-RSA-AES256-GCM-SHA384',
                'ECDHE-ECDSA-AES256-GCM-SHA384',
                'DHE-RSA-AES128-GCM-SHA256',
                'ECDHE-RSA-AES128-SHA256',
                'DHE-RSA-AES128-SHA256',
                'ECDHE-RSA-AES256-SHA384',
                'DHE-RSA-AES256-SHA384',
                'ECDHE-RSA-AES256-SHA256',
                'DHE-RSA-AES256-SHA256',
                'HIGH',
                '!aNULL',
                '!eNULL',
                '!EXPORT',
                '!DES',
                '!RC4',
                '!MD5',
                '!PSK',
                '!SRP',
                '!CAMELLIA'
            ].join(':'),
            honorCipherOrder: true
        };

        // Create new HTTPS Server
        server = https.createServer(options, app);
    } else {
        // Create a new HTTP server
        server = http.createServer(app);
    }
    // Create a new Socket.io server
    var io = socketio.listen(server);

    // Add an event listener to the 'connection' event
    io.on('connection', function (socket) {
        config.files.server.sockets.forEach(function (socketConfiguration) {
            require(path.resolve(socketConfiguration))(io, socket);
        });
    });

    return server;
};
