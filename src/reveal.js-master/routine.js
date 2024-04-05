;import { Redirect } from '../utils.js';
var first = true;

chrome.storage.sync.get(['routine'], function(items) {
    document.getElementById('customMSG').textContent = items.routine;
});


document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('button[type="play"]');
    const yesButton1 = document.querySelector('button[type="Proceed1"]');
    const noButton1 = document.querySelector('button[type="Don\'t Proceed1"]');
    const animation = document.querySelector('#breathing-animation');
    const breathCount = document.querySelector('#breath-count');
    animation.style.animationPlayState = 'paused';

    yesButton1.addEventListener('click', function() {
        Redirect.toPrevTab();
    });

    noButton1.addEventListener('click', function() {
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
            setTimeout(function() {
                Reveal.next();
            }, 100); 
        }
    });

    Reveal.addEventListener('slidechanged', function(event) {
        animation.style.animationPlayState = 'paused';

        if (event.indexh == 1) {
            animation.style.animationPlayState = 'running';
        }
        
        if ((event.indexh >= 2 && event.indexh <= 6)) { 
            setTimeout(function() { Reveal.next();}, 7000); 
            // document.getElementById('animated-heading').style.animationPlayState = 'running';
        } else {
            // document.getElementById('animated-heading').style.animationPlayState = 'paused';
        }
    });
}
);