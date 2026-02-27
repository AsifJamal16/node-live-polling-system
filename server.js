const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let poll = {
  question: "Which language do you like most?",
  options: {
    javascript: 0,
    python: 0,
    cpp: 0
  }
};

function getPollWithPercentages() {
  const totalVotes = Object.values(poll.options).reduce((a, b) => a + b, 0);

  let updatedOptions = {};

  for (let key in poll.options) {
    updatedOptions[key] = {
      votes: poll.options[key],
      percentage: totalVotes === 0 ? 0 :
        ((poll.options[key] / totalVotes) * 100).toFixed(1)
    };
  }

  return {
    question: poll.question,
    options: updatedOptions,
    totalVotes
  };
}

io.on('connection', (socket) => {
  socket.emit('pollData', getPollWithPercentages());

  socket.on('vote', (option) => {
    if (poll.options[option] !== undefined) {
      poll.options[option]++;
      io.emit('pollData', getPollWithPercentages());
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
