/* =========================
   QUESTIONS
========================= */

const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 1
    },
    {
        question: "Who developed the theory of relativity?",
        options: [
            "Isaac Newton",
            "Nikola Tesla",
            "Albert Einstein",
            "Galileo Galilei"
        ],
        correct: 2
    },
    {
        question: "What is the value of π rounded to two decimal places?",
        options: ["3.12", "3.14", "3.18", "3.16"],
        correct: 1
    },
    {
        question: "Which ancient civilization built the pyramids?",
        options: [
            "Romans",
            "Greeks",
            "Egyptians",
            "Mayans"
        ],
        correct: 2
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Gd", "Au", "Go"],
        correct: 2
    }
];

/* =========================
   ELEMENTS
========================= */

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");

const timerDisplay = document.getElementById("timer");
const timerBar = document.getElementById("timer-bar");

const finalScore = document.getElementById("final-score");
const performanceMessage = document.getElementById("performance-message");
const leaderboardList = document.getElementById("leaderboard-list");

/* =========================
   GAME STATE
========================= */

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let acceptingAnswers = true;

/* =========================
   SCREEN MANAGEMENT
========================= */

function showScreen(screen) {
    document
        .querySelectorAll(".screen")
        .forEach(s => s.classList.remove("active"));

    screen.classList.add("active");
}

/* =========================
   QUIZ START
========================= */

startBtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", startQuiz);

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    scoreDisplay.textContent = `Score: ${score}`;

    showScreen(quizScreen);

    loadQuestion();
}

/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    clearInterval(timer);

    acceptingAnswers = true;

    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const q = questions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent = q.question;

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.classList.add("option-btn");
        button.textContent = option;

        button.addEventListener("click", () => {
            if (!acceptingAnswers) return;
            handleAnswer(index);
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
}

/* =========================
   TIMER
========================= */

function startTimer() {

    timeLeft = 15;

    timerDisplay.textContent = timeLeft;
    timerBar.style.width = "100%";

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        timerBar.style.width = `${(timeLeft / 15) * 100}%`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            acceptingAnswers = false;

            revealCorrectAnswer();

            setTimeout(() => {
                currentQuestion++;
                loadQuestion();
            }, 2000);
        }

    }, 1000);
}

/* =========================
   ANSWER HANDLING
========================= */

function handleAnswer(selectedIndex) {

    acceptingAnswers = false;

    clearInterval(timer);

    const q = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (selectedIndex === q.correct) {

        buttons[selectedIndex].classList.add("correct");

        score += 100;

        scoreDisplay.textContent =
            `Score: ${score}`;

    } else {

        buttons[selectedIndex].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000);
}

/* =========================
   TIMEOUT CASE
========================= */

function revealCorrectAnswer() {

    const q = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    buttons[q.correct].classList.add("correct");
}

/* =========================
   END QUIZ
========================= */

function endQuiz() {

    saveScore(score);

    finalScore.textContent = score;

    const percentage =
        (score / (questions.length * 100)) * 100;

    if (percentage >= 80) {
        performanceMessage.textContent =
            "🌟 Excellent! Outstanding performance!";
    } else if (percentage >= 50) {
        performanceMessage.textContent =
            "👍 Good Job! You're doing well.";
    } else {
        performanceMessage.textContent =
            "📚 Keep Practicing! You'll improve with time.";
    }

    renderLeaderboard();

    showScreen(endScreen);
}

/* =========================
   LEADERBOARD
========================= */

function saveScore(score) {

    let scores =
        JSON.parse(localStorage.getItem("eduquizScores"))
        || [];

    scores.push(score);

    scores.sort((a, b) => b - a);

    scores = scores.slice(0, 5);

    localStorage.setItem(
        "eduquizScores",
        JSON.stringify(scores)
    );
}

function renderLeaderboard() {

    const scores =
        JSON.parse(localStorage.getItem("eduquizScores"))
        || [];

    leaderboardList.innerHTML = "";

    if (scores.length === 0) {

        leaderboardList.innerHTML =
            "<li>No scores yet.</li>";

        return;
    }

    scores.forEach(score => {

        const li = document.createElement("li");

        li.textContent = `${score} Points`;

        leaderboardList.appendChild(li);
    });
}