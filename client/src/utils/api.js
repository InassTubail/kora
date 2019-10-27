const io = require('socket.io-client');
// let port = process.env.PORT;
// || 'http://localhost:8080'
// console.log(process.env, 'PORTPORT');
// console.log(process.env.PORT, 'PORT');

// console.log({ port });

// console.log({ nodeEnd: process.env.NODE_ENV });
let connectionUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : undefined;

const socket = io.connect(connectionUrl);
// console.log({ socket });

export default socket;
