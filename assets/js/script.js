var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')

var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timerEl = document.getElementById("timer")
var questionIndex = 0;
var time = 60;
var timerInterval;
var score = 0;

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () =>{
    correctQuestionIndex++
    setNextQuestion()
})

function clockTick(){
    timerEl.textContent = time;
    time--;
}
function startGame(){
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    timerInterval = setInterval(clockTick, 1000)
    setNextQuestion()
}

function setNextQuestion(){
    if(questionIndex > 0) {
        resetState();
    }
    showQuestion(questions[questionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = ""
    question.answers.forEach(function(answer){
        var button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        button.setAttribute('value', answer.correct)
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    var selectedButton = e.target
    

    if(selectedButton.value === 'true') {
        console.log('correct')
        score++;
    }
    else {
        console.log('wrong')
        time -= 10;
        console.log(time)
    }
    questionIndex++;
    if (questionIndex === questions.length){
        console.log('endGame')
        endGame()
    }
    else{
        showQuestion(questions[questionIndex])
    }
    
}
function endGame(){
    questionContainerElement.classList.add('hide')
    var endScreenElement = document.querySelector('.endscreen')
    endScreenElement.classList.remove('hide')
    var endSentence = document.createElement('h4')
    endSentence.textContent = 'Congrats! You got ' + score + ' questions correct with ' + time + ' seconds remaining'
    endScreenElement.appendChild(endSentence)
}
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    }
    else {
        element.classList.add("wrong")
    }
}




function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
    {
        question: 'Commonly used data types DO Not include:',
        answers :[
            { text: 'strings', correct: false},
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: true},
            { text: 'number', correct: false},
        ],
    },
    {
        question: 'The condition in an if / else statement is enclosed with ____.',
        answers :[
            { text: 'quotes', correct: false},
            { text: 'curly brackets', correct: false},
            { text: 'parenthesis', correct: true},
            { text: 'square branches', correct: false},
        ],
    },
    {
        question: 'Arrays in JavaScript can be used to store ______.',
        answers :[
            { text: 'numbers and strings', correct: false},
            { text: 'other arrays', correct: false},
            { text: 'booleans', correct: false},
            { text: 'all of the above', correct: true},
        ],
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers :[
            { text: 'commas', correct: false},
            { text: 'curly brackets', correct: false},
            { text: 'quotes', correct: true},
            { text: 'paraenthesis', correct: false},
        ],
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers :[
            { text: 'JavaScript', correct: false},
            { text: 'terminal/bash', correct: false},
            { text: 'for loops', correct: false},
            { text: 'console.log', correct: true},
        ],
    },
]