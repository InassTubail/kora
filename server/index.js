const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { join } = require('path');

// app.use('/', express.static('./public'));

let roomCounter = 0;
const sockets = {};
let roomsTimerIds = [];

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});
var usernames = [];
io.sockets.on('connection', function(socket) {
  socket.on('new user', function(data) {
    socket.username = data;
    usernames.push({
      username: socket.username,
      is_playing: false,
      with: '',
      room: null,
      person: null,
      level: 1,
      invite: [],
      accpet: []
    });
    io.sockets.emit('usernames', JSON.stringify(usernames));
    // map the user and socket obj to sockets hashmap for future use
    sockets[socket.username] = socket;
  });
  socket.on('addRefresh', function(data) {
    let isEx = false;
    let clients = usernames.map((value, index) => {
      if (data.username == value.username) {
        isEx = true;
      }
      return value;
    });
    if (!isEx) {
      usernames.push(data);
      io.sockets.emit('usernames', JSON.stringify(usernames));
    }
  });
  io.sockets.emit('usernames', JSON.stringify(usernames));
  socket.on('update_pic', function(data) {
    usernames.map((value, index) => {
      if (data.username == value.username) {
        usernames[index] = { ...usernames[index], person: data.person };
      }
      return value;
    });
    io.sockets.emit('usernames', JSON.stringify(usernames));
  });

  socket.on('sendInviteToPlay', function(data) {
    let from, to;
    usernames.forEach((el, index) => {
      if (el.username == data.from) {
        from = index;
      }
      if (el.username == data.to) {
        to = index;
      }
    });
    if (data.type == 'invite') {
      let withI = usernames[from].invite;
      usernames[from] = {
        ...usernames[from],
        is_playing: 'pending',
        with: data.from,
        room: null,
        invite: withI.concat(data.to)
      };
      if (!usernames[from].roomName) {
        roomCounter++;
        const roomName = `room-${roomCounter}`;
        usernames[from].roomName = roomName;
        // create a new room
        sockets[usernames[from].username].join(roomName);
      }

      usernames[to] = {
        ...usernames[to],
        is_playing: 'pending',
        with: data.from,
        room: null
      };
      io.sockets.emit('new message', {
        from: data.from,
        to: data.to,
        type: data.type
      });
    }
    if (data.type == 'cancelInvite') {
      let withI = usernames[from].invite;
      usernames[from] = {
        ...usernames[from],
        invite: withI.filter(el => el !== data.to)
      };
      if (
        usernames[from].accpet.length === 0 &&
        usernames[from].invite.length === 0
      ) {
        usernames[from] = {
          ...usernames[from],
          is_playing: false,
          with: null,
          room: null
        };
      }
      usernames[to] = {
        ...usernames[to],
        is_playing: false,
        with: null,
        room: null
      };

      io.emit(
        'cancelInvite',
        JSON.stringify({ to: usernames[to], from: usernames[from].username })
      );
    }
    if (data.type == 'cancelPlayer') {
      let withI = usernames[from].accpet;
      usernames[from] = {
        ...usernames[from],
        accpet: withI.filter(el => el !== data.to)
      };
      if (
        usernames[from].accpet.length === 0 &&
        usernames[from].invite.length === 0
      ) {
        usernames[from] = {
          ...usernames[from],
          is_playing: false,
          with: null,
          room: null
        };
      }
      usernames[to] = {
        ...usernames[to],
        is_playing: false,
        with: null,
        room: null
      };
      io.emit(
        'cancelPlayer',
        JSON.stringify({ to: usernames[to], from: usernames[from].username })
      );
    }
    io.emit('usernames', JSON.stringify(usernames));
  });

  socket.on('replyInvite', function(data) {
    if (data.type == 'accept') {
      let from, to;
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index;
        }
        if (el.username == data.to) {
          to = index;
        }
      });
      usernames[from] = {
        ...usernames[from],
        is_playing: 'accept',
        with: data.to
      };
      // join the roomName provided in to (room owner)
      const fromPlayer = usernames[from];
      const toPlayer = usernames[to];
      sockets[fromPlayer.username].join(toPlayer.roomName);
      io.in(toPlayer.roomName).emit('test room', { a: 'socket room message' });

      let invite = usernames[to].invite;
      let accpet = usernames[to].accpet;
      usernames[to] = {
        ...usernames[to],
        is_playing: 'accept',
        with: data.to,
        invite: invite.filter((value, index, arr) => value !== data.from),
        accpet: accpet.concat(data.from)
      };
    } else if (data.type == 'reject') {
      let from, to;
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index;
        }
        if (el.username == data.to) {
          to = index;
        }
      });

      let invite = usernames[to].invite;
      usernames[from] = {
        ...usernames[from],
        is_playing: false,
        with: null,
        room: null
      };
      usernames[to] = {
        ...usernames[to],
        invite: invite.filter(value => value !== data.from)
      };
      if (
        usernames[to].accpet.length === 0 &&
        usernames[to].invite.length === 0
      ) {
        usernames[to] = {
          ...usernames[to],
          is_playing: false,
          with: null,
          room: null
        };
      }
    } else if (data.type == 'withdrawal') {
      let from, to;
      usernames.forEach((el, index) => {
        if (el.username == data.from) {
          from = index;
        }
        if (el.username == data.to) {
          to = index;
        }
      });

      // leave the room which is currently in
      const fromPlayer = usernames[from];
      const toPlayer = usernames[to];
      sockets[fromPlayer.username].leave(toPlayer.roomName);

      let withI = usernames[from].accpet;
      usernames[from] = {
        ...usernames[from],
        accpet: [],
        invite: [],
        is_playing: false,
        with: null,
        room: null
      };
      usernames[to] = {
        ...usernames[to],
        accpet: withI.filter(el => el !== data.to)
      };
      if (
        usernames[to].accpet.length === 0 &&
        usernames[to].invite.length === 0
      ) {
        usernames[to] = {
          ...usernames[to],
          is_playing: false,
          with: null,
          room: null
        };
      }
      io.emit(
        'withdrawal',
        JSON.stringify({ to: usernames[to], from: usernames[from].username })
      );
    }
    io.sockets.emit('new message', {
      from: data.from,
      to: data.to,
      type: data.type
    });
    io.emit('usernames', JSON.stringify(usernames));
  });

  // when the game starts, starts a timer and store timerId in roomsTimerIds array
  socket.on('startGame', function(data) {
    let player = JSON.parse(data.room);
    usernames.map((el, index) => {
      if (player.includes(el.username)) {
        el.room = data.room;
      }
      return el;
    });
    io.sockets.emit('usernames', JSON.stringify(usernames));
    io.sockets.emit('data.room', data);
    // starts the timer
  });

  // when the turns swap, takes roomId and player username
  // clears the last timer and starts a new one
  socket.on('turn.end', message => {
    const { roomId, username } = message;
  });

  socket.on('disconnect', function(data) {
    if (!socket.username) return;
    let clients = usernames.map((value, index) => {
      if (socket.username == value.username) {
        usernames.splice(index, 1);
      }
      return value;
    });

    io.emit('usernames', JSON.stringify(usernames));
  });
});

const server = http.listen(process.env.PORT || 8080, function() {
  console.log('listening on *:8080');
});
