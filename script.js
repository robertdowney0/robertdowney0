const questions = [
    {
        question: "When is Robert's Birthday?",
        answers: [
            { text: "10th November", correct: true},
            { text: "4th December", correct: false},
            { text: "13th November", correct: false},
            { text: "23rd December", correct: false},
        ]
    },
    {
        question: "What is Robert's favourite food?",
        answers: [
            { text: "Pizza", correct: false},
            { text: "Roast Dinner", correct: false},
            { text: "Burger", correct: false},
            { text: "Chicken", correct: true},
        ]
    },
    {
        question: "What is Robert' favourite colour?",
        answers: [
            { text: "Red", correct: false},
            { text: "Green", correct: false},
            { text: "Blue", correct: true},
            { text: "Yellow", correct: false},
        ]
    },
    {
        question: "What age is Robert?",
        answers: [
            { text: "15", correct: false},
            { text: "16", correct: true},
            { text: "17", correct: false},
            { text: "18", correct: false},
        ]
    },
    {
        question: "What height is Robert?",
        answers: [
            { text: "8ft", correct: false},
            { text: "6ft", correct: false},
            { text: "5'10", correct: false},
            { text: "5'11", correct: true},
        ]
    },
    {
        question: "What football team does Robert support?",
        answers: [
            { text: "Arsenal", correct: false},
            { text: "Man City", correct: false},
            { text: "Liverpool", correct: true},
            { text: "None", correct: false},
        ]
    },
    {
        question: "How many pets does Robert have?",
        answers: [
            { text: "0", correct: false},
            { text: "1", correct: false},
            { text: "2", correct: true},
            { text: "3", correct: false},
        ]
    },
    {
        question: "What subject does Robert NOT study?",
        answers: [
            { text: "Physics", correct: true},
            { text: "Maths", correct: false},
            { text: "Geography", correct: false},
            { text: "SSD", correct: false},
        ]
    },
    {
        question: "What is Robert's favourite movie?",
        answers: [
            { text: "Iron man II", correct: false},
            { text: "Avengers Endgame", correct: true},
            { text: "The Batman", correct: false},
            { text: "Star Wars IV", correct: false},
        ]
    },
    {
        question: "What is the name of Robert's Dog?",
        answers: [
            { text: "Maggie", correct: false},
            { text: "Macie", correct: true},
            { text: "Minnie", correct: false},
            { text: "Mario", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display - "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();    
    }
});


startQuiz();