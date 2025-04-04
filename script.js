// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        correct: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "5", "4", "6"],
        correct: "4"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

// Load the first question
loadQuestion();

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";

    currentQuiz.options.forEach(option => {
        const optionEl = document.createElement("div");
        optionEl.textContent = option;
        optionEl.classList.add("option");
        optionEl.addEventListener("click", () => selectAnswer(option, optionEl));
        optionsEl.appendChild(optionEl);
    });

    nextBtn.disabled = true;
    selectedAnswer = null;
}

function selectAnswer(option, element) {
    // Clear previous selection
    const options = optionsEl.getElementsByClassName("option");
    for (let opt of options) {
        opt.classList.remove("selected");
    }
    // Highlight selected option
    element.classList.add("selected");
    selectedAnswer = option;
    nextBtn.disabled = false;
}

function nextQuestion() {
    // Check if answer is correct
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
    const percentage = (score / quizData.length) * 100;
    scoreEl.textContent = `You scored ${score} out of ${quizData.length} (${percentage.toFixed(1)}%)!`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizEl.classList.remove("hidden");
    resultEl.classList.add("hidden");
    loadQuestion();
}