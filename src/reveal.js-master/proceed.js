;import { Redirect } from '../utils.js';
var first = true;

chrome.storage.sync.get(['routine'], function(items) {
    try {
        document.getElementById('customMSG').textContent = items.routine;
    } catch (error) {
        console.log('Error' + error);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const yesButton1 = document.querySelector('button[type="Proceed1"]');
    const noButton1 = document.querySelector('button[type="Don\'t Proceed1"]');
    const animation = document.querySelector('#breathing-animation');


    yesButton1.addEventListener('click', function() {
        Redirect.toPrevTab();
    });

    noButton1.addEventListener('click', function() {
        Redirect.closeTab();
    });
}
);