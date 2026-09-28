let level = 0;
let score = 0;
let time = 300;
let timer;

const rooms = [
  {
    title: "Level 1: Neon Server",
    question: "The smallest unit of data is...",
    answer: "bit",
    hint: "Think binary. A single 1 or 0.",
    story: "The first server flickers online. A binary lock hums in the dark."
  },
  {
    title: "Level 2: Signal Vault",
    question: "8 bits make one...",
    answer: "byte",
    hint: "A standard computer file size starts here.",
    story: "A pulse of encrypted static floods the chamber. The vault door opens one byte at a time."
  },
  {
    title: "Level 3: Memory Core",
    question: "RAM stands for...",
    answer: "random access memory",
    hint: "It is the computer's temporary working memory.",
    story: "The memory core is alive and volatile. One wrong answer and the system reboots."
  },
  {
    title: "Level 4: CPU Gateway",
    question: "The brain of the computer is called the...",
    answer: "cpu",
    hint: "It processes instructions and controls the system.",
    story: "The gateway finally recognizes your skill. The final exit is almost within reach."
  },
  {
    title: "Final Exit: Ghost Portal",
    question: "Type the command that ends the session and escapes the system:",
    answer: "exit",
    hint: "The door wants a simple command used to leave a program.",
    story: "The portal is live. Type the final command and vanish before the firewall locks in."
  }
];

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const storyEl = document.getElementById("story");
const levelTitleEl = document.getElementById("levelTitle");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const messageEl = document.getElementById("message");
const hintEl = document.getElementById("hint");
const submitBtn = document.getElementById("submitBtn");
const hintBtn = document.getElementById("hintBtn");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

function updateTimer() {
  timerEl.textContent = formatTime(time);
}

function loadRoom() {
  const room = rooms[level];
  levelTitleEl.textContent = room.title;
  questionEl.textContent = room.question;
  answerEl.value = "";
  answerEl.focus();
  messageEl.textContent = "";
  hintEl.textContent = "";
  storyEl.textContent = room.story;
}

function setMessage(text, isSuccess = false) {
  messageEl.textContent = text;
  messageEl.style.color = isSuccess ? "#7ef9a0" : "#ff6b6b";
}

function revealHint() {
  hintEl.textContent = `Hint: ${rooms[level].hint}`;
}

function checkAnswer() {
  const answer = answerEl.value.trim().toLowerCase();
  const correctAnswer = rooms[level].answer;

  if (answer === correctAnswer) {
    score += 100;
    scoreEl.textContent = score;

    if (level < rooms.length - 1) {
      level++;
      setMessage("✅ Access granted. Next terminal unlocked.", true);
      setTimeout(() => {
        loadRoom();
      }, 700);
    } else {
      clearInterval(timer);
      const gameArea = document.getElementById("gameArea");
      gameArea.innerHTML = `
        <div class="victory-box">
          <h2>🎉 YOU ESCAPED!</h2>
          <p>The system collapses behind you.</p>
          <p>Final Score: <strong>${score}</strong></p>
          <button onclick="location.reload()">PLAY AGAIN</button>
        </div>
      `;
    }
  } else {
    setMessage("❌ Incorrect. The firewall rejects your code.");
  }
}

submitBtn.addEventListener("click", checkAnswer);
hintBtn.addEventListener("click", revealHint);
answerEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

loadRoom();
updateTimer();

timer = setInterval(() => {
  time--;
  updateTimer();

  if (time <= 0) {
    clearInterval(timer);

    const gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = `
      <div class="loss-box">
        <h2>⏰ SYSTEM LOCKED</h2>
        <p>The facility shutters and the escape route closes.</p>
        <button onclick="location.reload()">TRY AGAIN</button>
      </div>
    `;
  }
}, 1000);