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
    socket.on('get-users', function() {
        console.log(users);
        socket.emit('users', users);    
    });
    
    socket.on('send-location', function(id, location) {
        socket.broadcast.emit('location-update', {id: id, location: location});
        
        var index = _.findIndex(users, function(item) {
            return item.id == id;
        });
        
        if(index < 0) {
            users.push({'id': id, 'location': location});
        }
        else {
            users[index].location = location; 
        }
   });
});