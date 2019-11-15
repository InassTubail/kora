const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { join } = require('path');

// app.use('/', express.static('./public'));

let roomCounter = 0;
const sockets = {};
let roomsTimerIds = {};
let timerIds = {};
let timers = {}
app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});
var usernames = [];
io.sockets.on('connection', function (socket) {
  socket.on('new user', function (data) {
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
    sockets[socket.username].join(`user${socket.username}`);
  });
  socket.on('addRefresh', function (data) {
    let isEx = false;
    let clients = usernames.map((value, index) => {
      if (data.username == value.username) {
        isEx = true;
      }
      return value;
    });
    if (!isEx) {
      usernames.push(data);
      console.log(data.username);
      
      io.sockets.emit('usernames', JSON.stringify(usernames));
      sockets[data.username] = socket
      sockets[data.username].join(`user${data.username}`);
    }
  });
  io.sockets.emit('usernames', JSON.stringify(usernames));
  socket.on('update_pic', function (data) {
    usernames.map((value, index) => {
      if (data.username == value.username) {
        usernames[index] = { ...usernames[index], person: data.person };
      }
      return value;
    });
    io.sockets.emit('usernames', JSON.stringify(usernames));
  });
  socket.on('remove timer', function (roomName) {
    // if (timerIds[roomName] !== 11) {
    clearInterval(roomsTimerIds[roomName])
    roomsTimerIds[roomName] = false
    timerIds[roomName] = 11
    // }
  })
  socket.on('sendInviteToPlay', function (data) {
    let from = null, to=  null;
    usernames.forEach((el, index) => {
      if (el.username == data.from) {
        from = index;
      }
      if (el.username == data.to) {
        to = index;
      }
    });
    if(from !== null && to === null) 
    {
      io.in(`user${usernames[from].username}`).emit('leave-partener', {person: data.to});
    }
    // if (from !== null && to !== null) { 
    if (data.type == 'invite' && to !== null && from !== null) {
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
        timerIds[roomName] = 11
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
      usernames[to] ? usernames[to] = {
        ...usernames[to],
        is_playing: false,
        with: null,
        room: null
      }: null

      io.emit(
        'cancelInvite',
        JSON.stringify({ to: data.to, from: usernames[from].username })
      );
    }
    if (data.type == 'cancelPlayer') {
      let withI = usernames[from].accpet;
      const fromPlayer = usernames[from];
      const toPlayer = usernames[to];
      sockets[toPlayer.username].leave(fromPlayer.roomName);
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
      usernames[to] ? usernames[to] = {
        ...usernames[to],
        is_playing: false,
        with: null,
        room: null
      } : null
      io.emit(
        'cancelPlayer',
        JSON.stringify({ to: data.to, from: usernames[from].username })
      );
    }
  // }else{
    // (from !== null && to === null) 
    // {
    //   io.in(`user${usernames[from].username}`).emit('leave-partener', {person: data.to});
    // }
    // to !== null && io.in(`user${usernames[to].username}`).emit('leave-partener', {person: data.from});
  // }
    io.emit('usernames', JSON.stringify(usernames));
  });

  socket.on('replyInvite', function (data) {
    let from = null, to=null;
    usernames.forEach((el, index) => {
      if (el.username == data.from) {
        from = index;
      }
      if (el.username == data.to) {
        to = index;
      }
    });
    if(from !== null && to === null) {
      io.in(`user${usernames[from].username}`).emit('leave-partener', {person: data.to});
      usernames[from] = {
        ...usernames[from],
        is_playing: false,
        with: null,
        room: null
    } 
    io.emit('usernames', JSON.stringify(usernames));
    return;
  }
  console.log('******affter return');
    // if (to !== null) {
    //   io.in(`user${usernames[to].username}`).emit('leave-partener', {person: data.from});
    // }
    // if(from !== null && to !== null){ 
    if (data.type == 'accept') {
      usernames[from] ? usernames[from] = {
        ...usernames[from],
        is_playing: 'accept',
        with: data.to
      }: null
      // join the roomName provided in to (room owner)
      const fromPlayer = usernames[from];
      const toPlayer = usernames[to];
      (fromPlayer && toPlayer) ? usernames[from].roomName = usernames[to].roomName : null
      fromPlayer && sockets[fromPlayer.username].join(toPlayer.roomName);
      toPlayer && io.in(toPlayer.roomName).emit('test room', { a: 'socket room message' });
      let invite = usernames[to] && usernames[to].invite;
      let accpet = usernames[to] && usernames[to].accpet;
      usernames[to] ? usernames[to] = {
        ...usernames[to],
        is_playing: 'accept',
        with: data.to,
        invite: invite.filter((value, index, arr) => value !== data.from),
        accpet: accpet.concat(data.from)
      }: null
    } else if (data.type == 'reject') {
      let invite = usernames[to] && usernames[to].invite;
      usernames[from] ? usernames[from] = {
        ...usernames[from],
        is_playing: false,
        with: null,
        room: null
      } : null
      usernames[to] ? usernames[to] = {
        ...usernames[to],
        invite: invite.filter(value => value !== data.from)
      } : null
      if (
        usernames[to].accpet.length === 0 &&
        usernames[to].invite.length === 0
      ) {
        usernames[to] ? usernames[to] = {
          ...usernames[to],
          is_playing: false,
          with: null,
          room: null
        } : null
      }
    } else if (data.type == 'withdrawal') {
      // leave the room which is currently in
      const fromPlayer = usernames[from];
      const toPlayer = usernames[to];
      fromPlayer && sockets[fromPlayer.username].leave(toPlayer.roomName);

      let withI = usernames[from] && usernames[from].accpet;
      usernames[from] ? usernames[from] = {
        ...usernames[from],
        accpet: [],
        invite: [],
        is_playing: false,
        with: null,
        room: null
      }: null
      usernames[to] ? usernames[to] = {
        ...usernames[to],
        accpet: withI.filter(el => el !== data.to)
      }: null
      if (
        usernames[to].accpet.length === 0 &&
        usernames[to].invite.length === 0
      ) {
        usernames[to] ? usernames[to] = {
          ...usernames[to],
          is_playing: false,
          with: null,
          room: null
        } : null
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
  // }else{
    // from !== null && io.in(`user${usernames[from].username}`).emit('leave-partener', {person: usernames[to].username});
    // to !== null && io.in(`user${usernames[to].username}`).emit('leave-partener', {person: usernames[from].username});
  // }
    io.emit('usernames', JSON.stringify(usernames));
  });
  // when the turns swap, takes roomId and player username
  // clears the last timer and starts a new one
  socket.on('switch timer', function (roomName) {
    if (timerIds[roomName] !== 11) {
      // clearInterval(roomsTimerIds[roomName])
      // roomsTimerIds[roomName] = false
      timerIds[roomName] = 11
    }
  })
  socket.on('turn.end', function (message) {
    const { roomName, role } = message;
    // console.log(timerIds[roomName], ';');
    if (!roomsTimerIds[roomName]) {
      let timerId = setInterval(() => {
        if (timerIds[roomName] <= 11 && timerIds[roomName] > 0) {
          timerIds[roomName] = timerIds[roomName] - 1
          io.in(roomName).emit('timer', timerIds[roomName]);
        }
      }, 1000);
      roomsTimerIds[roomName] = timerId
    }
  });
  socket.on('finishGame', function (room, roomName) {
    let player = JSON.parse(room);
    usernames.map((el, index) => {
      if (player.length > 0 && player.includes(el.username)) {
        sockets[el.username].leave(roomName);
        el.invite = []
        el.accpet = []
        el.is_playing = false
        el.with = ''
        el.room = null;
        el.roomName = '';
      }
      return el;
    });
    delete roomsTimerIds[roomName]
    delete timerIds[roomName]
    io.sockets.emit('usernames', JSON.stringify(usernames));
  })
  // when the game starts, starts a timer and store timerId in roomsTimerIds array
  socket.on('startGame', function (data, roomName) {
    // let role, color, roomName;
    let player = JSON.parse(data.room);
    usernames.map((el, index) => {
      if (player.includes(el.username)) {
        el.room = data.room;
        // roomName = el.roomName
      }
      return el;
    });
    let message = { roomName }
    clearInterval(roomsTimerIds[roomName])
    roomsTimerIds[roomName] = false
    io.in(roomName).emit('turn role', message);
    io.sockets.emit('usernames', JSON.stringify(usernames));
    if (data.data.fromEqual) {
      io.in(roomName).emit('data.room.equal', data, timers[roomName]);
    } else {
      io.in(roomName).emit('data.room', data);
    }
    // starts the timer
  });


  socket.on('disconnect', function (data) {
    if (!socket.username) return;
    console.log(socket.username, 'socket.username DISCONNECT');

    let clients = usernames.map((value, index) => {
      if (socket.username == value.username) {
        usernames.splice(index, 1);
      }
      return value;
    });
    console.log({ usernames }, 'usernames frOM DISCONNECT');
    
    io.emit('usernames', JSON.stringify(usernames));
    sockets[socket.username].leave(`user${socket.username}`);
  });
});

const server = http.listen(process.env.PORT || 8080, function () {
  console.log('listening on *:8080');
});
