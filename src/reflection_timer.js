let clicked = false;
let totalTime = 15;
let timeRemaining = totalTime;
let timerInterval = null;

chrome.storage.sync.get({ timer: '15' }, function (items) {
    totalTime = Number(items.timer) || 15;
    timeRemaining = totalTime;
});

function formatTime(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return (
        (minutes < 10 ? '0' : '') + minutes +
        ':' +
        (seconds < 10 ? '0' : '') + seconds
    );
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const progressCircle = document.querySelector('.timer-progress');
    const circumference = Math.PI * parseFloat(progressCircle.getAttribute('r')) * 2;

    timerElement.textContent = formatTime(timeRemaining);
    progressCircle.style.strokeDasharray = circumference;

    const percentRemaining = timeRemaining / totalTime;
    progressCircle.style.strokeDashoffset = circumference - percentRemaining * circumference;

    timeRemaining--;

    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        timerElement.textContent = '00:00';
        window.location.href = 'confirm.html';
    }
}

function startTimer() {
    if (clicked) return;

    clicked = true;
    document.getElementById('startButton').disabled = true;

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

document.getElementById('startButton').addEventListener('click', startTimer);
