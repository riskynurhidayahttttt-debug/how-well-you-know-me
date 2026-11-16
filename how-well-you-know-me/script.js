const questions = [
  { question: "What is my favorite way to spend a weekend?", answers: ["Watching movies together", "Going on a little adventure", "Staying home and relaxing", "Trying something new"], correct: 0 },
  { question: "What makes me smile the most?", answers: ["A surprise gift", "A sweet message from you", "My favorite food", "A funny movie"], correct: 1 },
  { question: "Which place would I love to visit?", answers: ["A beautiful beach", "A magical flower garden", "A cozy little café", "A snowy mountain"], correct: 1 },
  { question: "What is my favorite kind of date?", answers: ["A fancy dinner", "A simple walk together", "A movie night", "A spontaneous trip"], correct: 1 },
  { question: "What do I value most in a relationship?", answers: ["Expensive gifts", "Honest communication", "Always agreeing", "Being together every minute"], correct: 1 },
  { question: "Which little thing makes me happy?", answers: ["A good morning text", "A new outfit", "A shopping trip", "A long vacation"], correct: 0 },
  { question: "What would I choose for a perfect evening?", answers: ["A party with friends", "Watching the sunset together", "Playing video games", "Going shopping"], correct: 1 },
  { question: "What is my favorite kind of memory?", answers: ["A big celebration", "A little moment spent together", "A luxury holiday", "A surprise present"], correct: 1 }
];

const $ = id => document.getElementById(id);
let currentQuestion = 0;
let score = 0;
let playerOne = "";
let playerTwo = "";
let answered = false;

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  $(screenId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  playerOne = $("playerOne").value.trim();
  playerTwo = $("playerTwo").value.trim();
  if (!playerOne || !playerTwo) {
    alert("Please enter both names first ♡");
    return;
  }
  currentQuestion = 0;
  score = 0;
  $("personName").textContent = playerTwo;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const item = questions[currentQuestion];
  const number = currentQuestion + 1;
  $("questionCount").textContent = `${String(number).padStart(2, "0")} / ${questions.length}`;
  $("progressFill").style.width = `${(number / questions.length) * 100}%`;
  $("questionText").textContent = item.question;
  $("feedback").textContent = "Choose the answer that feels right ♡";
  const answers = $("answers");
  answers.innerHTML = "";
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index, button));
    answers.appendChild(button);
  });
}

function selectAnswer(selected, selectedButton) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach(button => button.disabled = true);
  if (selected === item.correct) {
    score++;
    selectedButton.classList.add("correct");
    $("feedback").textContent = "That's right! You know them so well ✨";
  } else {
    selectedButton.classList.add("wrong");
    buttons[item.correct].classList.add("correct");
    $("feedback").textContent = "A little detail to remember ♡";
  }
  window.setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) renderQuestion();
    else showResult();
  }, 1100);
}

function showResult() {
  const percentage = Math.round((score / questions.length) * 100);
  $("score").textContent = `${percentage}%`;
  $("resultTitle").textContent =
    percentage === 100 ? "A perfect little connection!" :
    percentage >= 75 ? "You know them by heart!" :
    percentage >= 50 ? "A lovely little beginning!" :
    "Every story has more to discover!";
  $("resultMessage").textContent =
    `${playerOne} got ${score} out of ${questions.length} answers right about ${playerTwo}. ` +
    "Remember, the sweetest part of a love story is learning something new about each other every day. ♡";
  showScreen("result");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  $("playerOne").value = "";
  $("playerTwo").value = "";
  showScreen("welcome");
}

function createSky() {
  const sky = $("sky");
  for (let i = 0; i < 35; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "✦";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (Math.random() * 9 + 5) + "px";
    star.style.animationDelay = Math.random() * 4 + "s";
    sky.appendChild(star);
  }
  for (let i = 0; i < 7; i++) {
    const lantern = document.createElement("span");
    lantern.className = "lantern";
    lantern.textContent = "🏮";
    lantern.style.left = Math.random() * 95 + "%";
    lantern.style.top = Math.random() * 85 + "%";
    lantern.style.animationDelay = Math.random() * 5 + "s";
    sky.appendChild(lantern);
  }
}

$("startBtn").addEventListener("click", startQuiz);
$("restartBtn").addEventListener("click", restartQuiz);
createSky();
