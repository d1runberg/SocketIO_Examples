var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var five = require('johnny-five');
var board = new five.Board();



var d = new Date();
var psec = 0;
var lightVal;
var tempVal;
var soundVal;
var slideVal;

board.on('ready', function(){
//create sensor object
   var lSensor = new five.Sensor({
      pin: 'A1',
      freq: 100,
      type: 'analog'
   });

   var tempSensor = new five.Sensor({
      pin: 'A0',
      freq: 100,
      type: 'analog'
   });

   var micSensor = new five.Sensor({
      pin: 'A2',
      freq: 100,
      type: 'analog'
   });

   var slider = new five.Sensor({
      pin: 'A3',
      freq: 100,
      type: 'analog'
   });

   //update the lightVal variable with the sensor value
   lSensor.on('data', function(){
      lightVal = this.value;
   });

    tempSensor.on('data',function(){
      tempVal = this.value;
   });

   micSensor.on('data', function(){
      soundVal = this.value;
   });

   slider.on('data', function(){
      slideVal = this.value;
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
     socket.emit('number',{'light': lightVal, 'temp': tempVal, 'sound': soundVal, 'slide': slideVal});
  }, 100);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
