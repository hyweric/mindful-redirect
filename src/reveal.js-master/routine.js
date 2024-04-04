;import { Redirect } from '../utils.js';
var first = true;

chrome.storage.sync.get(['routine'], function(items) {
    console.log(items.routine);
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
                console.log('first');
            }
            else{
                breathCount.textContent = count - 1;
                console.log('breath count: ' + count);
            }
        } else {
            console.log('breath count: ' + count);
            animation.style.animationPlayState = 'paused';
            setTimeout(function() {
                Reveal.next();
            }, 100); 
        }
    });

    Reveal.addEventListener('slidechanged', function(event) {
        animation.style.animationPlayState = 'paused';
        console.log('slidechanged');

        if (event.indexh == 1) {
            console.log('slide 2');
            animation.style.animationPlayState = 'running';
        }
        
        if ((event.indexh >= 2 && event.indexh <= 6)) { 
            console.log('slides skippy');
            setTimeout(function() { Reveal.next();}, 7000); 
            // document.getElementById('animated-heading').style.animationPlayState = 'running';
        } else {
            console.log('not slides skippy');
            // document.getElementById('animated-heading').style.animationPlayState = 'paused';
        }
    });
}
);