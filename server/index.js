const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {
  join
} = require('path');

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});
var clients = [];
let currentUserID;
//generate private room name for two users
function getARoom(user1, user2) {
  return 'privateRooom' + user1.name + "And" + user2.name;
}

function findUserById(id) {
  for (socketID of clients) {
    if (socketID.id === id) {
      return test = socketID;
    }
  }
}
io.sockets.on('connection', function (socket) {
  socket.on('username', function (username) {
    socket.username = username;
    currentUserID = socket.id
    clients.push({
      name: socket.username,
      id: socket.id
    })
    socket.join(`user/${socket.id}`);
  });

  io.emit('username', clients);
  io.emit('currentUser', currentUserID);
  socket.on('disconnect', function (username) {
    clients.map((client, index) => {
      if (client.id == socket.id) {
        clients.splice(index, 1);
      }
    })
    io.emit('username', clients);
  })

  socket.on('initiate private message', function (data) {
    var selectedUserId = data.selectedUserId;
    var currentUser = findUserById(currentUserID);
    if(currentUser){
      // var receiver = people[currentUser];
      // var room = getARoom(people[socket.id], receiver);
      let privatechannel =  getARoom(currentUser.id, selectedUserId)

      //join the anonymous user
      socket.join(privatechannel);
      //join the registered user 
      socket[currentUser].join(privatechannel);


      //notify the client of this
      socket.in(privatechannel).emit('private privatechannel created', privatechannel)
    }
  });





});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});