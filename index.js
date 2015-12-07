var express = require('express');
var app = express();

app.listen(5000, function() {});

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.use(express.static('js'));
app.use(express.static('assets'));
app.use(express.static('node_modules'));