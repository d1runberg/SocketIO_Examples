var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var d = new Date();
var psec = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //send data to client
    setInterval(function(){
            socket.emit('date', {'date': new Date()});
            }, 1000);

    setInterval(function(){
     var x = Math.random();
     socket.emit('number',{'number': x});
     }, 5000);

});
   
http.listen(3000, function(){
  console.log('listening on *:3000');
});
