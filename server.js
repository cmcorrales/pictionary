var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var players = 0;
var waitingForConnection = false;

io.on('connect', function(socket) {
    console.log('client connected');
    players++;

    if(waitingForConnection) {
        var message = '';
        io.emit('disconnect', message);
        waitingForConnection = false;
    }

    socket.on('draw', function(position) {
        socket.broadcast.emit('draw', position);
    });

    socket.on('guess', function(guess) {
        socket.broadcast.emit('guess', guess);
    });

});



server.listen(8080);
