var questionTxtEl = document.getElementById("question-text");
var questionLocEl = document.getElementById("questions");
var answerLocationEl = document.getElementById("answer-location");
var answerFeedbackLocationEl = document.getElementById("answer-feedback");
var answeredRightEl = document.getElementById("answered-right");
var answeredWrongEl = document.getElementById("answered-wrong");
var enterInitialsEl = document.getElementById("enter-initials");
var viewHighScoreEl = document.getElementById("view-high-score");
var inititalsLbl = document.getElementById("enter-initials-lbl");
var timerDisplayEl = document.getElementById("timer-display");
var startQuizButton = document.getElementById("quiz-start-button");
var homePageContentEl = document.getElementById("homepage-content");
var initialsSubmitBtnEl = document.getElementById("submit-high-score-button");
var hTagEl = document.createElement("h4");
var initialsBoxLbl = document.createElement("label");
var initialsboxEl = document.createElement("input");
var initialsBoxElId = "enter-initials-div";
var initialsEntryBtn = document.createElement("button");
var answerSelected;
var correctAnsCount = 0;
var wrongAnsCount = 0;
var currentQuestionIndex = 0;
var secondsLeft = 0;
var totalSeconds = 75;
var penaltySeconds = 15;
var interval;
var initialsInputTxt;
var questionsArray = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["string", "booleans", "alerts", "numbers"],
    answer: 2,
  },
  {
    question:
      "The condition in an if / else statement is enclosed within _______.",
    choices: [
      "quotes",
      "curly braces",
      "parentheses",
      "square brackets"
    ],
    answer: 2,
  },
  {
    question: "Arrays in javascript can be used to store _______.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: 3,
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    choices: [
      "commas",
      "curly brackets",
      "quotes",
      "parentheses"
    ],
    answer: 2,
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    choices: [
      "Javascript",
      "terminal/bash",
      "for loops",
      "console.log"
    ],
    answer: 5,
  },
];

//  set the max question count so we know when to go to final page
var maxQuestions = questionsArray.length - 1;


// display questions and answer options on screen
function renderQuestion(qstIndx) {

  if (currentQuestionIndex <= maxQuestions) {
    questionTxtEl.textContent = questionsArray[qstIndx].question;

    answerLocationEl.textContent = "";


    for (var i = 0; i < questionsArray[qstIndx].choices.length; i++) {
      answerLocationEl.classList.add("btn-group-vertical");
      // answerLocationEl.classList.add("p5");

      var ansBtn = document.createElement("button");

      ansBtn.textContent = questionsArray[qstIndx].choices[i];
      ansBtn.id = i;
      ansBtn.classList.add("btn");
      ansBtn.classList.add("btn-primary");
      ansBtn.classList.add("bg-purple");

      answerLocationEl.appendChild(ansBtn);
    }
  } else {
    renderQuizEnd();
  }
}

function answerClick(event) {
  if (event.target.matches("button")) {
    event.preventDefault();
    answerSelected = parseInt(event.target.id);
  }
  checkAnswer(answerSelected);
}

// listen for the answer button clicks
answerLocationEl.addEventListener("click", answerClick);

//function that checks to see if user selected answer is correct answer
function checkAnswer(selectedAnswerId) {
  var rightWrongInt;
  if (questionsArray[currentQuestionIndex].answer === selectedAnswerId) {
    rightWrongInt = 1;
  } else {
    rightWrongBool = 0;
    secondsLeft = secondsLeft - penaltySeconds;
  }

  // var selectedAnsTxt =
  renderFeedback(rightWrongInt);
}

// function that renders the question feedback
function renderFeedback(rightOrwrong) {
  if (rightOrwrong === 1) {
    hTagEl.textContent = "That answer is correct!!";
    answerFeedbackLocationEl.appendChild(hTagEl);
    correctAnsCount++;
  } else {
    hTagEl.textContent = "Sorry, That Answer is Wrong!";
    answerFeedbackLocationEl.appendChild(hTagEl);
    wrongAnsCount++;
    
  }

  currentQuestionIndex++;

  // display counts of right and wrong answers
  answeredRightEl.textContent = "Correct Answers: " + correctAnsCount;
  answeredWrongEl.textContent = "Incorrect Answers: " + wrongAnsCount;

  if (currentQuestionIndex > maxQuestions || secondsLeft === 0) {
    renderQuizEnd();
  } else {
    renderQuestion(currentQuestionIndex);
  }
}

// // function display answer feedback
// function displayFeedbackTxt(feedbackTxt){

// }

// should be attached to start quiz button event listener
// renderQuestion(currentQuestionIndex);

function renderQuizEnd() {



  // submit initials button
  initialsEntryBtn.setAttribute("type","submit");
  initialsEntryBtn.classList.add("btn");
  initialsEntryBtn.classList.add("btn-primary");
  initialsEntryBtn.classList.add("mt-2");
  initialsEntryBtn.textContent="Submit";
  initialsSubmitBtnEl.appendChild(initialsEntryBtn);

  initialsBoxLbl.setAttribute("for", initialsBoxElId);
  initialsBoxLbl.textContent = "Please enter your initials to record your score of " + timerDisplayEl.textContent;

  initialsboxEl.setAttribute("type", "text");
  initialsboxEl.setAttribute("placeholder", "enter initials");
  initialsboxEl.id = initialsBoxElId;
  inititalsLbl.appendChild(initialsBoxLbl);
  enterInitialsEl.appendChild(initialsboxEl);
  answerLocationEl.textContent = "";
  answerFeedbackLocationEl.textContent = "";
  questionTxtEl.textContent = "You Have Reached The End of The Quiz";
  clearInterval(interval);


}

initialsEntryBtn.addEventListener("click", function(){

var finalTime = timerDisplayEl.value;


initialsInputTxt = initialsboxEl.value;

console.log("initials submit button was clicked");
console.log("final time:" +  finalTime);
console.log("initials that were entered are: "+ initialsInputTxt);

localStorage.setItem(initialsInputTxt,timerDisplayEl.textContent);



})

// add event listener so you can view high scores when element clicked
viewHighScoreEl.addEventListener("click",function() {
  console.log("you clicked view high scores");
}
);

// ----------------timer related functions ----------------------//
// function to set the time for timer
function setTime() {
  clearInterval(interval);
  secondsLeft = totalSeconds;
}

function renderTime() {
  if (secondsLeft === 0 || secondsLeft - penaltySeconds < 0){
    console.log(secondsLeft);
   renderQuizEnd();
  }
  timerDisplayEl.textContent = secondsLeft;
}

// function to start timer
function startTimer() {
  setTime();
  interval = setInterval(function () {
    secondsLeft--;
    renderTime();
  }, 1000);
}

// set event listener for start quiz button
startQuizButton.addEventListener("click", function () {
  hideHomepageSection();
  startTimer();
  renderQuestion(currentQuestionIndex);
});

//  function to hide homepage content
function hideHomepageSection() {
  homePageContentEl.style.display = "none";
}

// view high scores function
function viewHighScoreList () {
  var scoreList = localStorage;
  var scoreListArr = Object(scoreList);
  console.log(scoreListArr);

}

