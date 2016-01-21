





var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//require the blynk-library module (be sure to npm install blynk-library before running)
var BlynkLib = require('blynk-library');

var d = new Date();
//create a new blynk object with app key (Replace key with yours)
var blynk = new BlynkLib.Blynk('18ca5be499384708a0a1e04ad1803d9d');

//create new pinobject for virtual pin 2
var v2 = new blynk.VirtualPin(2);
var val;



//create an event to fire when blynk app writes a value and print it to console
v2.on('write', function(params) {
  val = params;
});

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
     socket.emit('number',{'number':val});
  }, 100);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
