var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');
http.listen(5000, function() {});

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.use(express.static('js'));
app.use(express.static('assets'));
app.use(express.static('node_modules'));

var users = [];
io.on('connection', function(socket) {
    socket.emit('users', users);
    socket.on('send-location', function(id, location) {
        socket.broadcast.emit('location-update', {id: id, location: location});
        var user = _.where(users, {'id': id});
        if(!user.length) {
            user = {'id': id, 'location': location};
            users.push(user);
        }
        
        user.location = location;
   });
});