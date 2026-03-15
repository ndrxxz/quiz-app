const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlinking Text Management Language", correct: false },
        ]
    },
    {
        question: "Which programming language is mainly used for web page styling?",
        answers: [
            { text: "Python", correct: false },
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which of the following is a loop structure in programming?",
        answers: [
            { text: "Switch", correct: false },
            { text: "For", correct: true },
            { text: "Class", correct: false },
            { text: "Object", correct: false }
        ]
    },
    {
        question: "Which language is commonly used for data analysis and machine learning?",
        answers: [
            { text: "C", correct: false },
            { text: "Python", correct: true },
            { text: "HTML", correct: false },
            { text: "PHP", correct: false }
        ]
    },
    {
        question: "What symbol is commonly used to end a statement in C, C++, and Java?",
        answers: [
            { text: "Colon :", correct: false },
            { text: "Period .", correct: false },
            { text: "Comma ,", correct: false },
            { text: "Semicolon ;", correct: true }
        ]
    }
];

const timerContainer = document.querySelector(".timer-container");
const timerElement = document.querySelector("#timer");
const questionElement = document.querySelector("#question");
const answersBtn = document.querySelector("#answers-btn");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer = 15;
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timer = 15;
    nextBtn.innerHTML = "Next";
    timerContainer.style.display = "flex";
    showQuestion();
}

function showQuestion() {
    resetState();

    clearInterval(timerInterval);
    timeLeft = 15;
    timerElement.textContent = `${timeLeft}s`;
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answersBtn.appendChild(btn);

        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";

    while (answersBtn.firstChild) {
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

function showCorrectAnswer() {
    Array.from(answersBtn.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

    nextBtn.style.display = "block";
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            showCorrectAnswer();
        }
    }, 1000);
}

function selectAnswer(e) {
    clearInterval(timerInterval);

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    showCorrectAnswer();
}

function showScore() {
    resetState();

    timerContainer.style.display = "none";
    questionElement.innerHTML = `You got ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();