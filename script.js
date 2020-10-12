const highscoreBtn = document.querySelector('#highscore');

const timerSpan = document.querySelector('#timer');

const contentDiv = document.querySelector('#content');
const startBtn = document.querySelector('#start-btn');

const allowedTime = 60;

const questions = [
   {
    prompt: 'What does HTML stand for?',
    choices: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'All of the above'],
    correct: 0,
},
{
    prompt: 'Inside which HTML element do we put the JavaScript code?',
    choices: ['script', 'Javascript', 'js', 'java'],
    correct: 0,
},
{
    prompt:  'What does CSS stand for?',
    choices: ['Computer Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'None of the above'],
    correct: 2,
},
{
    prompt: 'Which of the following function of an array object adds and/or removes elements from an array?',
    choices: ['toSource', 'sort', 'unshift', 'splice'],
    correct: 3,
},
{
    prompt: 'Which of the following function of String object combines the text of two strings and returns a new string?',
    choices: ['add', 'concat', 'merge', 'append'],
    correct: 1,
},
];

let timeLeft = 0;
let timerHandle;

let currentQuestion = 0;

startBtn.addEventListener('click', startQuiz);

function setTime(seconds) {
    timeleft = seconds;
    timerSpan.textContent = timeleft;
}

function startTimer() {
    clearInterval(timerHandle);
    setTime(allowedTime);
    timerHandle = setInterval(function () {
        setTime(timeleft - 1);
        if (timeleft <= 0) {
            setTime(0);
            endQuiz();
        }
    }, 1000);
}

function startQuiz() {
    clearContent();
    currentQuestion = 0;
    displayQuestion(currentQuestion);
    startTimer();
}

function endQuiz() {
    clearContent();
    clearInterval(timerHandle);
    const form = document.createElement('form');
    const initialsInputLabel = document.createElement('label');
    initialsInputLabel.htmlFor = 'initials-input';
    initialsInputLabel.textContent = 'Initials: ';
    const initialsInput = document.createElement('input');
    initialsInput.id = 'initials-input';
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.type = 'submit';

    form.append(initialsInputLabel, initialsInput, saveBtn);
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const initials = initialsInput.value;
    });
    contentDiv.append(form);
}

function displayHighscores() {
    clearContent();
    contentDiv.textContent = 'these are some highscores';
}

function clearContent() {
    contentDiv.innerHTML = '';
}

function displayQuestion(index) {
    clearContent();
    const question = questions[index];
    const h2 = document.createElement('h2');
    h2.textContent = question.prompt;
    contentDiv.append(h2);
    for (let i = 0; i < question.choices.length; i++) {
        const button = document.createElement('button');
        button.textContent = question.choices[i];
        button.addEventListener('click', function () {
            processAnswer(i === question.correct);
        });
        contentDiv.append(button);
    }
}

function processAnswer(correct) {
    clearContent();
    if (correct) {
        console.log('you got it correct');
    }else{
        console.log('you got it wrong');
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    }else{
        endQuiz();
    }
}
