import { Redirect } from './utils.js';

function goToJournal() {
    window.location.href = 'journal.html';
}

function goToRoutine() {
    window.location.href = 'routine.html';
}

function goToTimer() {
    window.location.href = 'reflection_timer.html';
}

function exitAndFocus() {
    Redirect.closeTab();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('journalButton').addEventListener('click', goToJournal);
    document.getElementById('routineButton').addEventListener('click', goToRoutine);
    document.getElementById('reflectionTimerButton').addEventListener('click', goToTimer);
    document.getElementById('exitAndFocusButton').addEventListener('click', exitAndFocus);
});
