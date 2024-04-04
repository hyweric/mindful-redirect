import {Redirect} from './utils.js';

console.log('popup.js');

function journalHandler(){
    console.log('journal');
    window.location.href = 'journal.html';
}
function redirectHandler(){
    console.log('redirect');
    Redirect.continueToTab();
}
function routineHandler(){
    console.log('routine');
    window.location.href = '/reveal.js-master/routine.html';
}
function timerHandler(){
    console.log('timer');
    window.location.href = 'reflection_timer.html';

}
function exitHandler(){
    console.log('exit and focus');
    Redirect.closeTab();
}
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('journalButton').addEventListener('click', journalHandler);
    document.getElementById('redirectButton').addEventListener('click', redirectHandler);
    document.getElementById('routineButton').addEventListener('click', routineHandler);
    document.getElementById('reflectionTimerButton').addEventListener('click', timerHandler);
    document.getElementById('exitAndFocusButton').addEventListener('click', exitHandler);

});


const canvas = document.getElementById('sineCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
animateWaves();

// Single wave
function drawSineWave(phase, amplitude, frequency, speed, rotationAngle, Xshift, YShift) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    
    for (let x = 0; x < canvas.width*2; x += 10) {
        const y = amplitude * Math.sin(frequency * x + phase) + canvas.height / 2; 
        const rotatedX = Math.cos(rotationAngle) * x - Math.sin(rotationAngle) * y + Xshift;
        const rotatedY = Math.sin(rotationAngle) * x + Math.cos(rotationAngle) * y + YShift;
        if (x === 0) {
            ctx.moveTo(rotatedX, rotatedY);
        } else {
            ctx.lineTo(rotatedX, rotatedY);
        }
    }
    ctx.stroke(); 
    
    return phase + speed;
}

function animateWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    for (let i = 1; i <= 8; i++) {
        animateWaves['phase' + i] =  drawSineWave(animateWaves['phase' + i] || i * 20, 30, 0.02, i/3 * 0.01, Math.PI / 4, i + 50* (i-2), 0 - 200 * (i-0.5)); }
        // varying speed looks cool imo

    requestAnimationFrame(animateWaves);
}

