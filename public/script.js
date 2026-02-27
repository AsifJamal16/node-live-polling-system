const socket = io();

const questionEl = document.getElementById('question');
const resultEl = document.getElementById('result');
const buttons = document.querySelectorAll('button');

socket.on('pollData', (poll) => {
  questionEl.innerText = poll.question;

  resultEl.innerHTML = "";

  for (let option in poll.options) {
    const data = poll.options[option];

    resultEl.innerHTML += `
      <div class="result-item">
        <strong>${option}</strong> - ${data.votes} votes (${data.percentage}%)
        <div class="bar">
          <div class="fill" style="width:${data.percentage}%"></div>
        </div>
      </div>
    `;
  }
});

function vote(option) {
  socket.emit('vote', option);

  // Disable voting after one click
  buttons.forEach(btn => btn.disabled = true);
}