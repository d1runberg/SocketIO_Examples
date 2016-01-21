var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var weather = require('openweathermap');

var Boulder = {
    APPID:"274da36717c724c240cb30390af5386c",
    units: 'imperial',
    lang: 'en',
    q:"Boulder"
}


var d = new Date();
var x;
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
      weather.now(Boulder,function(err,data){
         x = data.main.temp;
      });
     socket.emit('number',{'number': x});
     }, 5000);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
