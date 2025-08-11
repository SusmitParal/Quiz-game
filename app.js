// ====== Game Data ======
// Example offline questions (can be expanded infinitely)
const questionBank = {
    beginner: [
        { q: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
        { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: 1 }
    ],
    intermediate: [
        { q: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Tesla", "Edison"], answer: 1 },
        { q: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Opium"], answer: 0 }
    ],
    expert: [
        { q: "What is the value of Planck's constant (h) to 2 decimal places ×10^-34?", options: ["6.63", "3.14", "9.81", "1.61"], answer: 0 },
        { q: "Which is the largest known prime number category?", options: ["Mersenne", "Fermat", "Twin", "Sophie Germain"], answer: 0 }
    ]
};

// Online mode coin levels
const coinLevels = {
    "Delhi Delight": "beginner",
    "Mumbai Master": "intermediate",
    "Kolkata King": "expert",
    "Chennai Champion": "expert"
};

// ====== Game State ======
let coins = 100;
let exp = 0;
let currentLevel = "beginner";
let usedQuestions = [];
let currentQuestion = null;

// ====== Elements ======
const questionText = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const coinsDisplay = document.querySelector("#coins");
const expDisplay = document.querySelector("#exp");

// ====== Functions ======
function startGame(level) {
    currentLevel = level;
    usedQuestions = [];
    nextQuestion();
}

function nextQuestion() {
    const levelQuestions = questionBank[currentLevel];
    const available = levelQuestions.filter(q => !usedQuestions.includes(q));

    if (available.length === 0) {
        // Reset used questions if exhausted
        usedQuestions = [];
        nextQuestion();
        return;
    }

    currentQuestion = available[Math.floor(Math.random() * available.length)];
    usedQuestions.push(currentQuestion);

    displayQuestion(currentQuestion);
}

function displayQuestion(qObj) {
    questionText.textContent = qObj.q;
    optionsContainer.innerHTML = "";

    qObj.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(idx);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === currentQuestion.answer) {
        coins += 5;
        exp += 10;
    } else {
        coins -= 5;
    }
    updateStatus();
    nextQuestion();
}

function updateStatus() {
    coinsDisplay.textContent = coins;
    expDisplay.textContent = exp;
}

// ====== Example: Start beginner mode by default ======
startGame("beginner");
updateStatus();