var clicked = false; 
var totalTime = 100;
var timeRemaining = totalTime;

chrome.storage.sync.get(['timer'], function(items) {
    console.log(items.timer);
    totalTime = items.timer;
    timeRemaining = totalTime;
});

function startTimer() {
    if (!clicked) {
        var timerElement = document.getElementById('timer');
        var progressCircle = document.querySelector('.timer-progress');
        
        var strokeDashoffset = 570;
        this.disable = true;
        function updateTimer() {
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = timeRemaining % 60;
            var formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            timerElement.textContent = formattedTime;

            var circumference = Math.PI * parseFloat(progressCircle.getAttribute("r")) * 2;
            var percentRemaining = (timeRemaining / 60) * 100;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = circumference - (percentRemaining / 100) * circumference * ((60/totalTime));

            timeRemaining--;

            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "00:00";
                console.log('timer done');
                window.location.href = '/reveal.js-master/proceed.html';
            }
        }

        var timerInterval = setInterval(updateTimer, 1000); 
    }
    clicked = true;
    console.log('clicked true');
}

document.getElementById("startButton").addEventListener("click", startTimer);
