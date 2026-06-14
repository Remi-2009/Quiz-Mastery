/* =========================
   QUESTIONS
========================= */

const HardQuestions = [
    {
        question: "If the mass of an object is 5kg on earth what would be it's mass in space:",
        options: ["5kg", "0kg", "-5kg", "2kg"],
        correct: 0
        hint: "Weight and mass are different quantities."
    },
    {
        question: "Who is the primary scientist responsible for organizing the Modern Periodic Table used today?",
        options: [
           
            "Dmitri Mendeleev",
            "Ernest Rutherford",
            "Albert Einstein",
            "Henry Moseley"
        ],
        correct: 3
    },
    {
        question: "A jacket's price is increased by 20%. A week later, the store puts the jacket on sale for 20% off. How does the final price compare to the original price?",
        options: ["The final price is higher than the original price", 
                  "The final price is lower than the original price", 
                  "The final price is exactly the same as the original price", 
                  "Why should I care about that jacket?"],
        correct: 1
    },
    {
        question: "If a massive star explodes in deep space, how loud would the explosion sound to a spaceship hovering nearby?",
        options: [
            "A faint, low-frequency rumble",
            "Completely silent",
            "It depends on the size of the star",
            "Incredibly loud, enough to shatter the ship's windows"
        ],
        correct: 1
    },
    {
        question: "An observer watches a spaceship pass by at nearly the speed of light. From the theoretical framework of special relativity, which statement correctly describes what the observer measures regarding the spaceship's clock?",
        options: [
         "The clock stops entirely from the observer's perspective.",
           "The clocks run at identical rates because time is a universal absolute.",
           "The spaceship's clock appears to run faster than the observer's own clock.",
           "The spaceship's clock appears to run slower than the observer's own clock."
        ],
        correct: 3

    }
];

const EasyQuestions = [
    {
        question: "If the mass of an object is 5kg on earth what would be it's mass in space:",
        options: ["5kg", "0kg", "-5kg", "2kg"],
        correct: 0
        hint: "Weight and mass are different quantities."
    },
    {
        question: "Who is the primary scientist responsible for organizing the Modern Periodic Table used today?",
        options: [
           
            "Dmitri Mendeleev",
            "Ernest Rutherford",
            "Albert Einstein",
            "Henry Moseley"
        ],
        correct: 3
    },
    {
        question: "A jacket's price is increased by 20%. A week later, the store puts the jacket on sale for 20% off. How does the final price compare to the original price?",
        options: ["The final price is higher than the original price", 
                  "The final price is lower than the original price", 
                  "The final price is exactly the same as the original price", 
                  "Why should I care about that jacket?"],
        correct: 1
    },
    {
        question: "If a massive star explodes in deep space, how loud would the explosion sound to a spaceship hovering nearby?",
        options: [
            "A faint, low-frequency rumble",
            "Completely silent",
            "It depends on the size of the star",
            "Incredibly loud, enough to shatter the ship's windows"
        ],
        correct: 1
    },
    {
        question: "An observer watches a spaceship pass by at nearly the speed of light. From the theoretical framework of special relativity, which statement correctly describes what the observer measures regarding the spaceship's clock?",
        options: [
         "The clock stops entirely from the observer's perspective.",
           "The clocks run at identical rates because time is a universal absolute.",
           "The spaceship's clock appears to run faster than the observer's own clock.",
           "The spaceship's clock appears to run slower than the observer's own clock."
        ],
        correct: 3

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

const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint-text");

/* =========================
   GAME STATE
========================= */

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let acceptingAnswers = true;
let activeQuestions = [];
let gameMode = "";
let globalTime = 60;
let globalTimer;
let gameMode = "hard";
// hard | easy | timeattack
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
easyBtn.addEventListener("click", () => {

    gameMode = "easy";
    activeQuestions = easyQuestions;

    startQuiz();
});

hardBtn.addEventListener("click", () => {

    gameMode = "hard";
    activeQuestions = hardQuestions;

    startQuiz();
});
/*startBtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", startQuiz);*/

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

    if (currentQuestion >= activeQuestions.length) {
        endQuiz();
        return;
    }

    const q = activeQuestions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${activeQuestions.length}`;

    questionText.textContent = q.question;

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.classList.add("option-btn");
        button.textContent = option;

        button.addEventListener("click", () => {
            if (!acceptingAnswers) return;
            handleAnswer(index);
        hintText.textContent = "";
        hintBtn.disabled = false;
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
   /*====  AGAR RUN NA HO TO EK BAAR YAHA INDENTATION CHECK KAR LENA*/
    if(gameMode === "timeattack") return;  
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
/*==== HINT BUTTON CLICK ====*/
hintBtn.addEventListener("click", () => {

    const q = activeQuestions[currentQuestion];

    hintText.textContent = q.hint;

    hintBtn.disabled = true;
});


/* =========================
   ANSWER HANDLING
========================= */

function handleAnswer(selectedIndex) {

    acceptingAnswers = false;

    clearInterval(timer);

    const q = activeQuestions[currentQuestion];

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

    const q = activeQuestions[currentQuestion];

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
        (score / (activeQuestions.length * 100)) * 100;

    if (percentage >= 80) {
        performanceMessage.textContent =
            "🌟Outstanding performance!";
    } else if (percentage >= 50) {
        performanceMessage.textContent =
            "👍 Good Job! You're doing well.";
    } else {
        performanceMessage.textContent =
            "📚 Keep Practicing! You'll improve with time...maybe";
    }

    renderLeaderboard();

    showScreen(endScreen);
}
/*==== TIME ATTACK =====*/
timeAttackBtn.addEventListener("click", startTimeAttack);

function startTimeAttack(){

    gameMode = "timeattack";

    activeQuestions = easyQuestions;

    currentQuestion = 0;
    score = 0;

    showScreen(quizScreen);

    startGlobalTimer();

    loadQuestion();
}
/*===== TIME ATTACK TIMER =====*/
function startGlobalTimer(){

    globalTime = 60;

    clearInterval(globalTimer);

    globalTimer = setInterval(() => {

        globalTime--;

        timerDisplay.textContent = globalTime;

        timerBar.style.width =
        `${(globalTime/60)*100}%`;

        if(globalTime <= 0){

            clearInterval(globalTimer);

            endTimeAttack();
        }

    },1000);
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
/*BUTTONS*/
homeBtn.addEventListener("click", () => {

    showScreen(startScreen);
});

timeAttackBtnEnd.addEventListener(
    "click",
    startTimeAttack
);
/* =========================
   LEADERBOARD TIME ATTACK
========================= */
function saveTimeAttackScore(score){

    let scores =
    JSON.parse(
        localStorage.getItem("timeAttackScores")
    ) || [];

    scores.push(score);

    scores.sort((a,b)=>b-a);

    scores = scores.slice(0,5);

    localStorage.setItem(
        "timeAttackScores",
        JSON.stringify(scores)
    );
}
