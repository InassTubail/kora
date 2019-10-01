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
// var clients = [];
// let currentUserID;
var usernames = [];
//generate private room name for two users
// function getARoom(user1, user2) {
//   return 'privateRooom' + user1.name + "And" + user2.name;
// }

// function findUserById(id) {
//   for (socketID of clients) {
//     if (socketID.id === id) {
//       return test = socketID;
//     }
//   }
// }
io.sockets.on('connection', function (socket) {
  // socket.on('username', function (username) {
  //   // socket.username = username;
  //   currentUserID = socket.id
  //   clients.push({
  //     name: socket.username,
  //     id: socket.id
  //   })
  //   socket.join(`user/${socket.id}`);
  //   socket.username = username;
  //   user[socket.username] = socket;
  //   io.sockets.emit('user', Object.keys(user));
  // });

  // io.emit('username', clients);
  // io.emit('currentUser', currentUserID);
  // socket.on('disconnect', function (username) {
  //   clients.map((client, index) => {
  //     if (client.id == socket.id) {
  //       clients.splice(index, 1);
  //     }
  //   })
  //   io.emit('username', clients);
  // })

  // socket.on('new user', function (data, callback) {
  //   if (data in user) {
  //     callback(false);
  //   } else {
  //     callback(true);
  //     //save the username to the socket for retrieval
  //     socket.username = data;
  //     user[socket.username] = socket;
  //     io.sockets.emit('user', Object.keys(user));
  //   }
  // });

  // socket.on('sendMessage', function (data, callback) {
  //   var msg = data.trim();
  //   if (msg.substr(0, 3) === "/w ") {
  //     msg = msg.substr(3);
  //     var space = msg.indexOf(" ");
  //     if (space !== 1) {
  //       var name = msg.substr(0, space);
  //       msg = msg.substr(space + 1);
  //       if (name in user) {
  //         user[name].emit('new message', { message: msg, username: socket.username });
  //       }
  //     } else {
  //       callback("error invalid user");
  //     }
  //   } else {
  //     //retrieve the username saved in the socket
  //     io.sockets.emit('new message', { message: data, username: socket.username });
  //   }

  // });

  // socket.on('initiate private message', function (data) {
  //   var selectedUserId = data.selectedUserId;
  //   var currentUser = findUserById(currentUserID);
  //   if(currentUser){
  //     // var receiver = people[currentUser];
  //     // var room = getARoom(people[socket.id], receiver);
  //     let privatechannel =  getARoom(currentUser.id, selectedUserId)
  //     //join the anonymous user
  //     socket.join(privatechannel);
  //     //join the registered user 
  //     socket[currentUser].join(privatechannel);
  //     //notify the client of this
  //     socket.in(privatechannel).emit('private privatechannel created', privatechannel)
  //   }
  // });



  io.sockets.on('connection', function (socket) {

    socket.on('new user', function (data) {
      // if (data in usernames) {
      //   // callback(false);
      // } else {
        socket.username = data;
        usernames[socket.username] = socket;
        io.sockets.emit('usernames', Object.keys(usernames));

      // }
    });
    io.sockets.emit('usernames', Object.keys(usernames));
    
    socket.on('sendMessage', function (data) {
      if (data.type == 'invite') {
        io.sockets.emit('new message', { message: 'msg', from: data.from, to: data.to });
      }

    });

    socket.on('disconnect', function (data) {
      if (!socket.username) return;
      delete usernames[socket.username];
      io.emit('usernames', Object.keys(usernames));
    });
  });

});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});