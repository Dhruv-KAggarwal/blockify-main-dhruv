const quizData = [
    {
        question: "What is a blockchain?",
        options: [
            "A centralized database",
            "A distributed ledger technology",
            "A type of cryptocurrency",
            "A software application"
        ],
        correct: 1,
        roadmap: [
            "Read articles on blockchain technology basics.",
            "Watch introductory videos on how blockchain works."
        ]
    },
    {
        question: "Which cryptocurrency was the first to be created?",
        options: [
            "Ethereum",
            "Bitcoin",
            "Litecoin",
            "Ripple"
        ],
        correct: 1,
        roadmap: [
            "Study the history of cryptocurrencies.",
            "Learn about the evolution of Bitcoin."
        ]
    },
    {
        question: "What does 'mining' refer to in blockchain?",
        options: [
            "Creating new blocks",
            "Transaction validation",
            "Data storage",
            "Decentralized applications"
        ],
        correct: 0,
        roadmap: [
            "Explore how mining works in Bitcoin.",
            "Understand the role of miners in blockchain networks."
        ]
    },
    {
        question: "What is a smart contract?",
        options: [
            "A legally binding contract",
            "A self-executing contract with the terms written in code",
            "A contract that is printed on paper",
            "An agreement between two parties"
        ],
        correct: 1,
        roadmap: [
            "Learn about smart contracts and their applications.",
            "Study examples of smart contracts in Ethereum."
        ]
    },
    {
        question: "Which of the following is a feature of blockchain?",
        options: [
            "Immutability",
            "Centralization",
            "High transaction fees",
            "Single point of failure"
        ],
        correct: 0,
        roadmap: [
            "Research blockchain features and benefits.",
            "Understand the concept of immutability in databases."
        ]
    },
    {
        question: "What is a public key in blockchain?",
        options: [
            "A key used to unlock your account",
            "A key that is known to everyone and used for encryption",
            "A private access key",
            "A unique identifier for a smart contract"
        ],
        correct: 1,
        roadmap: [
            "Study public and private key cryptography.",
            "Learn how keys are used in blockchain transactions."
        ]
    },
    {
        question: "Which consensus mechanism is most commonly used in Bitcoin?",
        options: [
            "Proof of Stake",
            "Proof of Work",
            "Delegated Proof of Stake",
            "Byzantine Fault Tolerance"
        ],
        correct: 1,
        roadmap: [
            "Research different consensus mechanisms.",
            "Study how Proof of Work is implemented in Bitcoin."
        ]
    },
    {
        question: "What is the main purpose of a cryptocurrency wallet?",
        options: [
            "To mine cryptocurrencies",
            "To store cryptocurrencies and private keys",
            "To create new coins",
            "To trade cryptocurrencies"
        ],
        correct: 1,
        roadmap: [
            "Learn about cryptocurrency wallets and their types.",
            "Explore how wallets interact with blockchain networks."
        ]
    },
    {
        question: "What is an Initial Coin Offering (ICO)?",
        options: [
            "A process of launching a new cryptocurrency",
            "A method of trading cryptocurrencies",
            "A type of cryptocurrency exchange",
            "A wallet for storing coins"
        ],
        correct: 0,
        roadmap: [
            "Study the concept of ICOs and how they work.",
            "Learn about the regulatory environment surrounding ICOs."
        ]
    },
    {
        question: "Which of the following is a layer-2 scaling solution for Ethereum?",
        options: [
            "Ethereum 2.0",
            "Polkadot",
            "Lightning Network",
            "Polygon"
        ],
        correct: 3,
        roadmap: [
            "Research layer-2 solutions and their benefits.",
            "Explore how Polygon improves Ethereum scalability."
        ]
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    document.getElementById("result").textContent = "";
    const questionData = quizData[currentQuestion];
    document.getElementById("question").textContent = `${currentQuestion + 1}. ${questionData.question}`;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
    document.getElementById("progress").textContent = `${currentQuestion + 1} of ${quizData.length} Questions`;
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timer);
    startTimer();
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = quizData[currentQuestion].correct;
    const options = document.getElementsByClassName("option");
    Array.from(options).forEach((btn, idx) => {
        if (idx === correct) {
            btn.classList.add("correct");
        }
        if (idx === selected && selected !== correct) {
            document.getElementById("result").innerHTML = `
                <div>Suggested Roadmap to Improve:</div>
                <ul>
                    ${quizData[currentQuestion].roadmap.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }
        btn.onclick = null;
    });
    if (selected === correct) {
        score += 10;
        document.getElementById("score").textContent = `Score: ${score} / 100`;
    }
    document.getElementById("next-btn").style.display = "block";
}

function showNextQuestion() {
    clearInterval(timer);
    document.getElementById("next-btn").style.display = "none";
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function nextQuestion() {
    showNextQuestion();
}

function showFinalScore() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Your Final Score: ${score}/100</h2>
        <button class="btn" onclick="playAgain()">Play Again</button>
        <button class="btn" onclick="goHome()">Home</button>`;
}

function playAgain() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz-container").innerHTML = `
        <div id="score">Score: 0 / 100</div>
        <div id="timer">Time Left: <span id="time">10</span>s</div>
        <div id="question"></div>
        <div id="options"></div>
        <div id="result"></div>
        <button id="next-btn" class="btn" onclick="nextQuestion()">Next</button>
        <div id="progress">1 of ${quizData.length} Questions</div>
    `;
    loadQuestion();
}

function goHome() {
    window.location.href = "index.html";
}

window.onload = loadQuestion;
