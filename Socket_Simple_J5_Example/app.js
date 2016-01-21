var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var five = require('johnny-five');
var board = new five.Board();



var d = new Date();
var lightVal;

board.on('ready', function(){
//create sensor object
   var lSensor = new five.Sensor({
      pin: 'A3',
      freq: 100,
      type: 'analog'
   });
   //update the lightVal variable with the sensor value
   lSensor.on('slide', function(){
      lightVal = this.value;
   });
});

//routing for the server to index.html page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//when client connects trigger timed emitters. 1 the time stamp and 2 the light value
//on the digital sandbox
io.on('connection', function(socket){
    //send date to client every 1000ms
    setInterval(function(){
            socket.emit('date', {'date': new Date()});
            }, 1000);
   //send the light sensor value every 100 ms
    setInterval(function(){
     socket.emit('number',{'number': lightVal});
  }, 100);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
