import { Redirect } from '../utils.js';
var first = true;
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('button[type="play"]');
    const yesButton1 = document.querySelector('button[type="Proceed1"]');
    const noButton1 = document.querySelector('button[type="Don\'t Proceed1"]');
    const animation = document.querySelector('#breathing-animation');
    const breathCount = document.querySelector('#breath-count');
    animation.style.animationPlayState = 'paused';

    playButton.addEventListener('click', function() {
        animation.style.animationPlayState = 'running';
    });

    yesButton1.addEventListener('click', function() {
        console.log('Yes, proceed');
        Redirect.continueToTab();
    });

    noButton1.addEventListener('click', function() {
        console.log('No, don\'t proceed');
        Redirect.closeTab();
    });

    animation.addEventListener('animationiteration', function() {
        let count = parseInt(breathCount.textContent, 10);
        if (count > 0) {
            if (first) {
                first = false;
            }
            else{
                breathCount.textContent = count - 1;
            }
            
        } else {
            animation.style.animationPlayState = 'paused';
        }
    });
}
);