const io = require('socket.io-client');
let port = process.env.PORT || 'http://localhost:8080' 
const socket = io.connect(port);
export default socket; 