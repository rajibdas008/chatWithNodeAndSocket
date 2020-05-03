var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.username = 'Anonymous'

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('message', (data) => {
    console.log('message: ' + data);
    socket.emit('message',data);
    socket.broadcast.emit('message',data);
  });

socket.on('change_user',(data)=>{
    socket.username = data.username;
})


  
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});