import {Redirect} from './utils.js';

console.log('popup.js');

function journalHandler(){
    console.log('journal');
    window.location.href = 'journal.html';
    // let journal = document.querySelector('.journal');
    // journal.classList.toggle('journal--active');
}
function redirectHandler(){
    console.log('redirect');
    Redirect.continueToTab();
    // let handle = document.querySelector('.redirect');
    // handle.classList.toggle('redirect--active');
}
function routineHandler(){
    console.log('routine');
    window.location.href = '/src/reveal.js-master/routine.html';
    // let routine = document.querySelector('.routine');
    // routine.classList.toggle('routine--active');
}
function timerHandler(){
    console.log('timer');
    window.location.href = 'reflection_timer.html';
    // let timer = document.querySelector('.timer');
    // timer.classList.toggle('timer--active');
}
function exitHandler(){
    console.log('exit and focus');
    // let popup = document.querySelector('.popup');
    // popup.classList.toggle('popup--active');
}
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('journalButton').addEventListener('click', journalHandler);
    document.getElementById('redirectButton').addEventListener('click', redirectHandler);
    document.getElementById('routineButton').addEventListener('click', routineHandler);
    document.getElementById('reflectionTimerButton').addEventListener('click', timerHandler);
    document.getElementById('exitAndFocusButton').addEventListener('click', exitHandler);

});