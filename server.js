const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let poll = {
  question: 'which language do you like most?',
  options: {
    javascript: 0,
    python: 0,
    cpp: 0
  }
};

io.on('connection', (socket) => {
  socket.emit('pollData', poll);

  socket.on('vote', (option) => {
    if (poll.options[option] !== undefined) {
      poll.options[option]++;
      io.emit('pollData', poll);
    }
  });
});

server.listen(3000, () => {
  console.log('server running on http://localhost:3000');
});