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
        "with": "",
        "room": null,
        "person": null,
        "level": 1,
        "invite": [],
        "accpet": []
      })
    io.sockets.emit('usernames', JSON.stringify(usernames));

  });
  socket.on('addRefresh', function (data) {
    let isEx = false
    let clients = usernames.map((value, index) => {
      if (data.username == value.username) {
        isEx = true
      }
      return value
    })
    if (!isEx) {
      usernames.push(data)
      io.sockets.emit('usernames', JSON.stringify(usernames));
    }
  })
  io.sockets.emit('usernames', JSON.stringify(usernames));
  socket.on('update_pic', function (data) {
    usernames.map((value, index) => {
      if (data.username == value.username) {
        usernames[index] = { ...usernames[index], person: data.person }
      }
      return value
    })
    io.sockets.emit('usernames', JSON.stringify(usernames));
  })
  socket.on('sendInviteToPlay', function (data) {
    if (data.type == 'invite') {
      let from, to
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index
        }
        if (el.username == data.to) {
          to = index
        }
      })
      let withI = usernames[from].invite
      usernames[from] =
        {
          ...usernames[from],
          "is_playing": 'pending',
          "with": data.from,
          "room": null,
          "invite": withI.concat(data.to)
        }
      // let person = usernames[to].person
      usernames[to] =
        {
          ...usernames[to],
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
          "is_playing": 'accept',
          "with": data.to,
          // "room": null,
        }
      let invite = usernames[to].invite
      let accpet = usernames[to].accpet
      usernames[to] =
        {
          ...usernames[to],
          "is_playing": 'accept',
          "with": data.to,
          "invite": invite.filter((value, index, arr) => value !== data.from),
          "accpet": accpet.concat(data.from),
        }
    } else if (data.type == 'reject') {
      let from, to
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index
        }
        if (el.username == data.to) {
          to = index
        }
      })
      let invite = usernames[to].invite
      usernames[from] =
        {
          ...usernames[from],
          "is_playing": false,
          "with": null,
          "room": null,
        }
      usernames[to] =
        {
          ...usernames[to],
          "invite": invite.filter((value) => value !== data.from),
          "room": null,
        }
    }
    io.sockets.emit('new message', {
      from: data.from,
      to: data.to,
      type: data.type
    });
    io.emit('usernames', JSON.stringify(usernames));
  });
  socket.on('startGame',function(data){
    console.log({data});
    
    let player = JSON.parse(data.room);
    usernames.map((el, index) => {
      if (player.includes(el.username)) {
          el.room = data.room
      }
      return el
    })
    io.sockets.emit('usernames', JSON.stringify(usernames));
    io.sockets.emit('data.room', data)
    // console.log({usernames});

  })
  socket.on('disconnect', function (data) {
    if (!socket.username) return;
    let clients = usernames.map((value, index) => {
      if (socket.username == value.username) {
        usernames.splice(index, 1)
      }
      return value
    })

    io.emit('usernames', JSON.stringify(usernames));
    // console.log({ usernames }, ['from disconnect']);
  });
});

const server = http.listen(8080, function () {
  console.log('listening on *:8080');
});