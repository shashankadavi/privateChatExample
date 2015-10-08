var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var obj = {};
io.on('connection', function(socket){
  socket.on('connected', function(ele){
    console.log(ele.nameTo,ele.nameFrom);
    obj[ele.nameFrom] = socket.id;
    console.log(obj);
  });
  socket.on('chat message', function(msg){
      console.log(obj[msg.nameTo],socket.id);
      io.to(obj[msg.nameTo]).emit('chat message', msg);
      io.to(obj[msg.nameFrom]).emit('chat message', msg);
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
