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
var usernames = [];
io.sockets.on('connection', function (socket) {

  socket.on('new user', function (data) {
    socket.username = data;
    usernames.push
      ({
        "username": socket.username,
        "is_playing": false,
        "with": null,
        "room": null,
        "person": null
      })
    io.sockets.emit('usernames', JSON.stringify(usernames));
    
  });
  io.sockets.emit('usernames', JSON.stringify(usernames));
  socket.on('update_pic',function(data){
    usernames.map((value, index) => {
      if (data.username == value.username) {
        usernames[index] = {...usernames[index],person: data.person}
      }
      return value
    })
    io.sockets.emit('usernames', JSON.stringify(usernames));
  })
  socket.on('sendInviteToPlay', function (data) {
    if(data.type == 'invite'){
      let from, to
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index
        }
        if (el.username == data.to) {
          to = index
        }
      })
      // let person = usernames[from].person 
      usernames[from] =
        {
          ...usernames[from],
          // "username": data.from,
          "is_playing": 'pending',
          "with": data.to,
          "room": null,
          // "person": person
        }
        let person = usernames[to].person 
      usernames[to] =
        {
          ...usernames[to],
          // "username": data.to,
          "is_playing": 'pending',
          "with": data.from,
          "room": null,
        }
      io.sockets.emit('new message', {
        from: data.from,
        to: data.to,
        type: data.type
      });
    }
    io.emit('usernames', JSON.stringify(usernames));
  });
  socket.on('replyInvite', function (data) {
    if (data.type == 'accept') {
      let from, to
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index
        }
        if (el.username == data.to) {
          to = index
        }
      })
      usernames[from] =
        {
          ...usernames[from],
          // "username": data.from,
          "is_playing": 'accept',
          "with": data.to,
          "room": `user/${data.from}/${data.to}`,
          // "person": null
        }
      usernames[to] =
        {
          ...usernames[to],
          // "username": data.to,
          "is_playing": 'accept',
          "with": data.from,
          "room": `user/${data.from}/${data.to}`,
          // "person": null
        }

    } else if(data.type == 'reject') {
      // type reject
      let from, to
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index
        }
        if (el.username == data.to) {
          to = index
        }
      })
      usernames[from] =
        {
          ...usernames[from],
          // "username": data.from,
          "is_playing": false,
          "with": null,
          "room": null,
          // "person": null
        }
      usernames[to] =
        {
          ...usernames[to],
          // "username": data.to,
          "is_playing": false,
          "with": null,
          "room": null,
          // "person": null
        }
    }
    io.sockets.emit('new message', {
      from: data.from,
      to: data.to,
      type: data.type
    });
    io.emit('usernames', JSON.stringify(usernames));
  });

  socket.on('disconnect', function (data) {
    if (!socket.username) return;
    let clients = usernames.map((value, index) => {
      if (socket.username == value.username) {
        usernames.splice(index, 1)
      }
      return value
    })
    io.emit('usernames', JSON.stringify(usernames));
  });
});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});