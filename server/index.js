const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {
  join
} = require('path');

var clients = [];

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });
app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

io.sockets.on('connection', function (socket) {
  socket.on('username', function (username) {
    socket.username = username;
    clients.push({
      name: socket.username,
      id: socket.id
    })
    // socket.on('disconnect', function(username) {
    //   console.log('-**-*-*-*-*-');
    // io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  io.emit('username', clients);
  socket.on('disconnect', function (username) {
    clients.map((client, index) => {      
      if (client.id == socket.id) {
        clients.splice(index, 1);
      }
    })
    // io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    io.emit('username', clients);
  })

  // socket.on('chat_message', function(message) {
  //     io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  // });

});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});