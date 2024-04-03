var clicked = false; // sus start button one time only
var timeRemaining = 60;
document.getElementById("startButton").addEventListener("click", function() {
    if (clicked == false) {
        var timerElement = document.getElementById('timer');
        var progressCircle = document.querySelector('.timer-progress');
        
        var strokeDashoffset = 570;
        this.disable = true;
        function updateTimer() {
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = timeRemaining % 60;
            var formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            timerElement.textContent = formattedTime;

            var percentRemaining = (timeRemaining / 60) * 100;
            progressCircle.style.strokeDashoffset = strokeDashoffset - (percentRemaining / 100) * strokeDashoffset;

            timeRemaining--;

            if (timeRemaining < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "00:00";
                console.log('timer done');
                window.location.href = '/src/reveal.js-master/proceed.html';
            }
        }

        var timerInterval = setInterval(updateTimer, 1000); 
    }
    clicked = true;
    console.log('clicked ture');
});
