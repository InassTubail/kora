const io = require('socket.io-client');
let port = process.env.PORT 
// || 'http://localhost:8080' 
console.log(process.env,'PORTPORT');
console.log(process.env.PORT,'PORT');

console.log({port});

const socket = io.connect(port);
console.log({socket});

export default socket; 