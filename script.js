var secondsLeft = 0;
var totalSeconds = 75;
// var timerEl = document.getElementById("countdown-timer");
var startQuizBtn = document.getElementById("quiz-start-button");
var interval;
var timeDisplayEl = document.getElementById("timer-display");

// change seconds left to 0 on page load
// timerEl.textContent="Time: " + secondsLeft;

function setTime() {
    clearInterval(interval);
    secondsLeft = totalSeconds;
}

function renderTime() {
    timeDisplayEl.textContent = secondsLeft;
    
}
function startTimer() {
    setTime();
    console.log("total seconds left = " + secondsLeft);
    console.log("the timer should start");
    interval = setInterval(function() {
        secondsLeft--;
        console.log(secondsLeft);
        renderTime();
    },1000);
}
// set even listener for count-down timer based on start quiz button
startQuizBtn.addEventListener("click", function() {
    console.log("the start quiz button was clicked");
    startTimer();
    
})