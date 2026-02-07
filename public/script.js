const socket = io();

const question = document.getElementById('question');
const result = document.getElementById('result');

socket.on('pollData', (poll) => {
  question.innerText = poll.question;

  result.innerHTML = `
    javascript: ${poll.options.javascript}<br>
    python: ${poll.options.python}<br>
    c++: ${poll.options.cpp}
  `;
});

function vote(option){
  socket.emit('vote', option);
}